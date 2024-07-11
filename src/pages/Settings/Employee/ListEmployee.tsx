import React from 'react'
import { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle, setCrmToken } from '../../../store/themeConfigSlice';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { downloadExcel } from 'react-export-table-to-excel';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import IconFile from '../../../components/Icon/IconFile';
import IconPrinter from '../../../components/Icon/IconPrinter';
import { IRootState } from '../../../store';
import { FaRegEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import AddEmployee from './AddEmployee';
import Swal from 'sweetalert2';

export default function ListEmployee() {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(setPageTitle('List Employee')); });
    const APIurl = 'http://127.0.0.1:8000/api/';
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const settingData=useSelector((state:IRootState)=>state.themeConfig.settingData)
    console.log('employee setting daaata', settingData);
    if(settingData?.set_crmnews){
       console.log(settingData.set_crmnews=='analyst,account')
    }
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [filterStatus, setFilterStatus] = useState(0);
    const [filterUserType, setFilterUserType] = useState(0);
    const [search, setSearch] = useState('');



    useEffect(() => {
        if (!crmToken) navigate('/login')
    }, [crmToken])

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    useEffect(() => {
        fetchEmployee();
    }, [filterStatus, filterUserType, search, page])

    const [employees, setEmployee] = useState([])
    const [response, setResponse] = useState(null);
    const fetchEmployee = async () => {
        setIsLoading(true);
        try {
            const response = await axios({
                method: 'get',
                url: APIurl + "users?page=" + page + "&pageSize=" + pageSize + "&filterStatus=" + filterStatus + "&filterUserType=" + filterUserType + "&search=" + search,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            console.log(response.data.employees);
            if (response.data.status == 'success') {
                setEmployee(response.data.data.data)
                setResponse(response.data.data);

            }

        } catch (error: any) {
            if (error.response.status == 401) dispatch(setCrmToken(''))
        } finally {
            setIsLoading(false);
        }
    }

    const updateStatus = (userId: number, user_status: boolean) => {

        if (!userId) return false;

        Swal.fire({
            title: 'Are you sure?',
            confirmButtonText: 'Yes',
            cancelButtonText: "No",
            showCancelButton: true,
            icon: 'question',
            text: `You want to ${user_status == true ? 'Block' : 'Activate'} this employee`,
            showLoaderOnConfirm: true,
            customClass: 'sweet-alerts',
            preConfirm: async () => {
                try {


                    const response = await axios({
                        method: 'post',
                        url: APIurl + "user-update-status",
                        data: { id: userId },
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + crmToken,
                        },
                    });

                    if (response.data.status == "success") {
                        Swal.fire({
                            icon: response.data.status,
                            text: response.data.message,
                            padding: '2em',
                            customClass: 'sweet-alerts',
                        });
                        const index = employees.findIndex((e) => e.id == response.data.employee.id)
                        if (response.data.employee) {
                            const newrecord: any = [...employees];
                            newrecord[index] = response.data.employee
                            setEmployee(newrecord)
                        }
                    } else if (response.data.status == "error") {
                        Swal.fire({
                            icon: response.data.status,
                            text: response.data.message,
                            padding: '2em',
                            customClass: 'sweet-alerts',
                        });
                    }
                } catch (error: any) {
                    console.log(error)
                    if (error.response.status == 401) dispatch(setCrmToken(''))
                }
            },
        });
    }
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    useEffect(() => { setPage(1); }, [pageSize]);

    // useEffect(() => {
    //     console.log("d", initialRecords)
    //     setRecordsData([...initialRecords]);
    // }, [page, pageSize, initialRecords]);



    // useEffect(() => {
    //     const data = sortBy(initialRecords, sortStatus.columnAccessor);
    //     setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    //     setPage(1);
    // }, [sortStatus]);


    function handleDownloadExcel() {
        const header = ['#', 'Emp id', 'First Name', 'Last Name', 'Email', 'Phone', 'User Type', 'Status'];
        downloadExcel({
            fileName: 'employees',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: employees.map((person: any, index) => ({
                    a: index + 1,
                    b: person.employee_id,
                    c: person.first_name,
                    d: person.last_name,
                    e: person.email,
                    f: person.phone_number,
                    g: person.user_type,
                    h: person.user_status == 1 ? 'Active' : 'Blocked',
                })),
            },
        });
    }

    const exportTable = (type: any) => {
        let columns: any = ['id', 'Emp id', 'First Name', 'Last Name', 'Email', 'Phone', 'User Type', 'Status'];
        let records = employees.map((person: any, index) => ({
            id: index + 1,
            "Emp id": person.employee_id,
            "First Name": person.first_name,
            "Last Name": person.last_name,
            "Email": person.email,
            "Phone": person.phone_number,
            "User Type": person.user_type,
            "Status": person.user_status == 1 ? 'Active' : 'Blocked',
        }));
        let filename = 'employees';
        let newVariable: any;
        newVariable = window.navigator;
        if (type === 'print') {
            var rowhtml = '<p>' + filename + '</p>';
            rowhtml +=
                '<table style="width: 100%; " cellpadding="0" cellcpacing="0"><thead><tr style="color: #515365; background: #eff5ff; -webkit-print-color-adjust: exact; print-color-adjust: exact; "> ';
            columns.map((d: any) => {
                rowhtml += '<th>' + capitalize(d) + '</th>';
            });
            rowhtml += '</tr></thead>';
            rowhtml += '<tbody>';
            records.map((item: any) => {
                rowhtml += '<tr>';
                columns.map((d: any) => {
                    let val = item[d] ? item[d] : '';
                    rowhtml += '<td>' + val + '</td>';
                });
                rowhtml += '</tr>';
            });
            rowhtml +=
                '<style>body {font-family:Arial; color:#495057;}p{text-align:center;font-size:18px;font-weight:bold;margin:15px;}table{ border-collapse: collapse; border-spacing: 0; }th,td{font-size:12px;text-align:left;padding: 4px;}th{padding:8px 4px;}tr:nth-child(2n-1){background:#f7f7f7; }</style>';
            rowhtml += '</tbody></table>';
            var winPrint: any = window.open('', '', 'left=0,top=0,width=1000,height=600,toolbar=0,scrollbars=0,status=0');
            winPrint.document.write('<title>Print</title>' + rowhtml);
            winPrint.document.close();
            winPrint.focus();
            winPrint.print();
        }
    };

    const capitalize = (text: any) => {
        return text
            .replace('_', ' ')
            .replace('-', ' ')
            .toLowerCase()
            .split(' ')
            .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    };


    const [tab, setTab] = useState('employees')
//     console.log(localStorage.getItem('crmphone'));
//     const storedValues = localStorage.getItem('crmphone');
// console.log("storedValues",storedValues);
// const data = localStorage.getItem('key')
const storedValues = localStorage.getItem('phonehide');
console.log('employeee lsit', JSON.parse(storedValues))

    return (
        <>
            {tab == "employees" ? <>
                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                    <div className="flex flex-col h-full">
                        <div className='panel'>
                            <div className='flex items-center justify-between mb-5'>
                                <h5 className="font-semibold text-lg dark:text-white-light">Employee List</h5>
                                <button type="submit" className="btn btn-primary" onClick={() => setTab("add-employee")}>Add Employee</button>
                            </div>
                            <hr className="my-4 dark:border-[#191e3a]" />
                            <div className="flex md:items-center justify-between md:flex-row flex-col mb-4.5 gap-5">
                                <div className="flex items-center flex-wrap">
                                    <button type="button" className="btn btn-primary btn-sm m-1" onClick={handleDownloadExcel}>
                                        <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                        EXCEL
                                    </button>
                                    <button type="button" onClick={() => exportTable('print')} className="btn btn-primary btn-sm m-1">
                                        <IconPrinter className="ltr:mr-2 rtl:ml-2" />
                                        PRINT
                                    </button>
                                </div>

                                <div className="flex gap-4">
                                    <select className='form-select w-[240px]' onChange={(e: any) => setFilterStatus(e.target.value)}>
                                        <option value="">All</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>

                                    <select className='form-select w-[240px]' onChange={(e: any) => setFilterUserType(e.target.value)}>
                                        <option value="">All</option>
                                        <option value='Admin'>Admin</option>
                                        <option value='BDE'>BDE</option>
                                        <option value='Accounts'>Accounts</option>
                                        <option value='Team Leader'>Team Leader</option>
                                        <option value='Manager'>Manager</option>
                                        <option value='HR'>HR</option>
                                    </select>

                                </div>
                                <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <div className="datatables">
                                <DataTable
                                    highlightOnHover
                                    className="whitespace-nowrap table-hover"
                                    records={employees}
                                    columns={[
                                        {
                                            accessor: 'Emp. ID',
                                            sortable: true,
                                            render: ({ employee_id }) => (
                                                <div className="flex flex-col gap-2">
                                                    <div className="font-semibold">{employee_id}</div>
                                                </div>
                                            ),
                                        },
                                        {
                                            accessor: 'Name',
                                            sortable: true,
                                            render: ({ first_name, last_name }) => (
                                                <div className="flex items-center gap-2">
                                                    <img src={`https://ui-avatars.com/api/?name=${first_name}&background=random`} className="w-9 h-9 rounded-full max-w-none" alt="user-profile" />
                                                    <div className="font-semibold">{first_name} {last_name}</div>
                                                </div>
                                            ),
                                        },
                                        {
                                            accessor: 'email',
                                            sortable: true,
                                            render: ({ email }) => (
                                                <div className="flex items-center gap-2">
                                                    <div className="font-semibold">{email}</div>
                                                </div>
                                            ),
                                        },
                                        // {
                                        //     accessor: 'Mobile Number',
                                        //     sortable: true,
                                        //     render: ({ phone_number }) => (
                                        //         <div className="flex items-center gap-2">
                                        //             <div className="font-semibold">{phone_number}</div>
                                        //         </div>
                                        //     ),
                                        // },

                                        {
                                            accessor: 'Mobile Number',
                                            sortable: true,
                                            render: ({ phone_number }) => {
                                                const formatPhoneNumber = (number) => {
                                                    const digitsOnly = number.replace(/\D/g, ''); // Remove non-digit characters
                                                    if (digitsOnly.length !== 10) {
                                                        return number; // Return the original number if it's not 10 digits
                                                    }
                                                    return digitsOnly.split('').map((digit, index) =>
                                                        index <= 5 ? 'x' : digit
                                                    ).join('');
                                                };

                                                return (
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-semibold">{settingData?.set_crmnews? formatPhoneNumber(phone_number):phone_number}</div>
                                                    </div>
                                                );
                                            },
                                        },
                                        {
                                            accessor: 'Type',
                                            sortable: true,
                                            render: ({
                                                user_type }) => (
                                                <div className="flex flex-col gap-2">
                                                    <span className="badge badge-outline-primary w-fit">{user_type}</span>
                                                </div>
                                            ),
                                        },
                                        {
                                            accessor: 'Status',
                                            sortable: true,
                                            render: ({ user_status, id }) => (
                                                <div className="flex flex-col gap-2">
                                                    <label className="w-12 h-6 relative">
                                                        <input type="checkbox" onChange={() => updateStatus(id, user_status)} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" checked={user_status == 1 ? true : false} />
                                                        <span className={`
outline_checkbox border-2 border-[#d15553] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#d15553] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300`}></span>
                                                    </label>
                                                </div>
                                            ),
                                        },
                                        {
                                            accessor: 'Action',
                                            sortable: true,
                                            render: (userFullData) => (
                                                <div className="flex gap-2">
                                                    <button type="button" className="btn btn-dark w-10 h-10 p-0 rounded-full"><FaRegEye /></button>

                                                    <NavLink
                                                        to="/settings/employee/addemployee" state={{ employee: userFullData }}
                                                        className="btn btn-dark w-10 h-10 p-0 rounded-full"><FaEdit /></NavLink>
                                                    <button type="button" className="btn btn-dark w-10 h-10 p-0 rounded-full"><MdDeleteOutline /></button>
                                                </div>
                                            ),
                                        },
                                    ]}
                                    highlightOnHover
                                    totalRecords={response?.total}
                                    recordsPerPage={pageSize}
                                    page={page}
                                    onPageChange={(p) => setPage(p)}
                                    recordsPerPageOptions={PAGE_SIZES}
                                    onRecordsPerPageChange={setPageSize}
                                    sortStatus={sortStatus}
                                    onSortStatusChange={setSortStatus}
                                    // selectedRecords={selectedRecords}
                                    // onSelectedRecordsChange={setSelectedRecords}
                                    minHeight={200}
                                    fetching={isLoading}
                                    loaderColor="blue"
                                    loaderBackgroundBlur={4}
                                    paginationText={({ from, to, totalRecords }) => `Showing  ${response?.form} to ${response.to} of ${totalRecords} entries`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </> :

                tab == "add-employee" ? <AddEmployee setTab={setTab} />


                    : null}



        </>

    )
}
