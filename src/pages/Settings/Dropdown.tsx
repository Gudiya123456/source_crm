import { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setCrmToken, setPageTitle } from '../../store/themeConfigSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IRootState } from '../../store';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdDelete, MdDeleteOutline } from 'react-icons/md';
import { FaEdit, FaRegEye } from 'react-icons/fa';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { downloadExcel } from 'react-export-table-to-excel';
import sortBy from 'lodash/sortBy';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';

const Dropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const APIurl = 'http://127.0.0.1:8000/api/';
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [filterType, setFilterType] = useState('');
    const [search, setSearch] = useState('');
    const [dropdowns, setDropdown] = useState([])
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });

    useEffect(() => {
        if (!crmToken) navigate('/')
        else {
            console.log(page)
            dispatch(setPageTitle('Dropdown'));
            fetchDropdowns()
        }
    }, [page]);

    const [isLoading, setIsLoading] = useState(false)

    const [defaultParams] = useState({
        id: '',
        dd_type: '',
        dd_value: '',
        dd_status: ''
    });

    useEffect(() => {
        fetchDropdowns();
    }, [page, pageSize, search, filterType])

    const [response, setResponse] = useState(null);

    const fetchDropdowns = async () => {
        setIsLoading(true)
        try {

            const response = await axios({
                method: 'get',
                url: APIurl + "dropdownsAPI?page=" + page + "&pageSize=" + pageSize + "&filterType=" + filterType + "&search=" + search,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });

            if (response.data.status == "success") {
                setResponse(response.data.data);
                setDropdown(response.data.data.data)
            }

            console.log(response)
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }
    function handleDownloadExcel() {
        const header = ['#', 'Type', 'Value', 'Status'];
        downloadExcel({
            fileName: 'Dropdowns',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: dropdowns.map((dropdown: any, index) => ({
                    a: index + 1,
                    b: dropdown.dd_type,
                    c: dropdown.dd_value,
                    h: dropdown.dd_status == "Active" ? 'Active' : 'Blocked',
                })),
            },
        });
    }
    const exportTable = (type: any) => {
        let columns: any = ['#', 'Type', 'Value', 'Status'];;
        let records = dropdowns.map((dropdown: any, index) => ({
            "#": index + 1,
            "Type": dropdown.dd_type,
            "Value": dropdown.dd_value,
            "Status": dropdown.dd_status == "Active" ? 'Active' : 'Blocked',
        }));
        let filename = 'Dropdowns';
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

    const [params, setParams] = useState<any>(defaultParams);
    const [errors, setErros] = useState<any>({});
    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.dd_value) {
            errors = { ...errors, dd_value: "Dropdown Value is required" };
        }
        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };
    const [btnLoading, setBtnLoading] = useState(false);

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: "" });
        setParams({ ...params, [name]: value });
        // console.table(params)
    };
    const AddDropdown = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: APIurl + "dropdownsAPI",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + crmToken,
                },
            });

            if (response.data.status == 'success') {
                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });

                setParams(defaultParams)
                fetchDropdowns()
            } else { alert("Failed") }

        } catch (error: any) {
            console.log(error)
            if (error.response.status == 401) dispatch(setCrmToken(''))
            if (error?.response?.status === 422) {
                const serveErrors = error.response.data.errors;
                let serverErrors = {};
                for (var key in serveErrors) {
                    serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
                    console.log(serveErrors[key][0])
                }
                setErros(serverErrors);
                Swal.fire({
                    title: "Server Validation Error! Please Solve",
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    showCancelButton: false,
                    width: 450,
                    timer: 2000,
                    customClass: {
                        popup: "color-danger"
                    }
                });
            }
        } finally {
            setBtnLoading(false)
        }
    };
    const formSubmit = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("id", params.id);
        data.append("dd_type", params.dd_type);
        data.append("dd_value", params.dd_value);
        data.append("dd_status", params.dd_status);
        AddDropdown(data);
    };
    const UpdateDropdown = (data: any) => {
        setErros({});
        if (data) {
            setParams({
                id: data.id,
                dd_type: data.dd_type,
                dd_value: data.dd_value,
                dd_status: data.dd_status
            });
        }
    }
    const distroy = (dropdowns: any) => {

        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then(async (result) => {
            if (result.value) {
                try {
                    const response = await axios({
                        method: 'delete',
                        url: APIurl + 'dropdownsAPI/' + dropdowns.id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "Bearer " + crmToken,
                        },
                    });
                    if (response.data.status === "success") {
                        Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });
                        fetchDropdowns()
                    }
                } catch (error: any) {
                    if (error.response.status == 401) navigate('/login')
                } finally {

                }
            }
        });

    }
    const updateStatus = (id: any) => {
        const dropdown = dropdowns.find((d) => d.id == id);
        AddDropdown({ ...dropdown, dd_status: dropdown.dd_status == "Active" ? 'Inactive' : 'Active' })
    }
    return (
        <div className='w-full'>
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full ">
                <div className={`panel xl:block p-4 dark:gray-50 w-[300px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden`}>
                    <div className=''>
                        <div className='flex items-center justify-between mb-5'>
                            <h5 className="font-semibold text-lg dark:text-white-light">Dropdown Details</h5>
                            {params.id ? <button className='btn btn-sm btn-primary'>Add Dropdown</button> : ''}

                        </div>
                        <hr className="my-4 dark:border-[#191e3a]" />
                        <div className='mb-5 space-y-5'>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="userType">Dropdown Type</label>
                                    <select name="dd_type" className="form-select text-white-dark" onChange={(e) => changeValue(e)} value={params.dd_type ? params.dd_type : ''}>
                                        <option value={''}>Select Type</option>
                                        <option value={'Lead Source'}>Lead Source</option>
                                        <option value={'Lead Status'}>Lead Status</option>
                                        <option value={'Lead Products'}>Lead Products</option>
                                        <option value={'Bank Account'}>Bank Account</option>
                                        <option value={'Service By'}>Service By</option>
                                        <option value={'Client Type'}>Client Type</option>
                                        <option value={'Sender Id'}>Sender Id</option>
                                    </select>
                                    {errors?.dd_type ? <div className="text-danger mt-1">{errors.dd_type}</div> : ''}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="dropdownValue">Value</label>
                                    <input type="text" placeholder="Enter Dropdown Value" className="form-input"
                                        name='dd_value'
                                        value={params.dd_value}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.dd_value ? <div className="text-danger mt-1">{errors.dd_value}</div> : ''}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="userStatus">Status</label>
                                    <select name="dd_status" className="form-select text-white-dark" onChange={(e) => changeValue(e)} value={params.dd_status ? params.dd_status : ''}>
                                        <option value={''}>Select Status</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                    {errors?.dd_status ? <div className="text-danger mt-1">{errors.dd_status}</div> : ''}
                                </div>
                            </div>
                            <button type="button" onClick={() => formSubmit()} disabled={btnLoading} className="btn bg-[#1d67a7] text-white ltr:ml-4 rtl:mr-4">
                                {btnLoading ? 'Please wait' : params.id ? 'Update Dropdown' : 'Add Dropdown'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                    <div className="flex flex-col h-full">
                        <div className='panel'>
                            <div className='flex items-center justify-between mb-1'>
                                <h5 className="font-semibold text-lg dark:text-white-light">Dropdown List</h5>


                                <div className='flex gap-4'>
                                    <select className='form-select w-[150px]' onChange={(e: any) => setFilterType(e.target.value)}>
                                        <option value="">All</option>
                                        <option value={'Lead Source'}>Lead Source</option>
                                        <option value={'Lead Status'}>Lead Status</option>
                                        <option value={'Lead Products'}>Lead Products</option>
                                        <option value={'Bank Account'}>Bank Account</option>
                                        <option value={'Service By'}>Service By</option>
                                        <option value={'Client Type'}>Client Type</option>
                                        <option value={'Sender Id'}>Sender Id</option>
                                    </select>
                                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e: any) => setSearch(e.target.value)} />
                                </div>

                                <div className="flex items-center flex-wrap">
                                    <button type="button" className="btn btn-primary btn-sm m-1"
                                        onClick={handleDownloadExcel}
                                    >
                                        <IconFile className="w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                        EXCEL
                                    </button>
                                    <button type="button"
                                        onClick={() => exportTable('print')}
                                        className="btn btn-primary btn-sm m-1">
                                        <IconPrinter className="ltr:mr-2 rtl:ml-2" />
                                        PRINT
                                    </button>
                                </div>
                            </div>
                            <hr className="my-4 dark:border-[#191e3a]" />
                            <div className='mb-5'>
                                <div className="datatables">

                                    <DataTable
                                        className="whitespace-nowrap table-hover"
                                        records={dropdowns}
                                        columns={[
                                            {
                                                accessor: 'id',
                                                sortable: true,
                                                render: ({ id }) => (
                                                    <div className="flex flex-col gap-2">
                                                        <div className="font-semibold">{id}</div>
                                                    </div>
                                                ),
                                            },
                                            {
                                                accessor: 'Type',
                                                sortable: true,
                                                render: ({ dd_type }) => (
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-semibold">{dd_type}</div>
                                                    </div>
                                                ),
                                            },
                                            {
                                                accessor: 'Value',
                                                sortable: true,
                                                render: ({ dd_value }) => (
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-semibold">{dd_value}</div>
                                                    </div>
                                                ),
                                            },
                                            {
                                                accessor: 'Status',
                                                sortable: true,
                                                render: ({ id, dd_status }) => (
                                                    <div className="flex flex-col gap-2">
                                                        <label className="w-12 h-6 relative">
                                                            <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" onChange={(e) => {
                                                                updateStatus(id)
                                                            }} id="custom_switch_checkbox1" checked={dd_status == "Active" ? true : false} />
                                                            <span className={`outline_checkbox border-2 border-[#d15553] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#d15553] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300`}></span>
                                                        </label>
                                                    </div>
                                                ),
                                            },
                                            {
                                                accessor: 'Action',
                                                sortable: true,
                                                render: (userFullData) => (
                                                    <div className="flex gap-2">
                                                        <button type="button" onClick={() => { UpdateDropdown(userFullData) }} className="btn btn-dark w-10 h-10 p-0 rounded-full"><FaEdit /></button>
                                                        <button type="button" onClick={() => { distroy(userFullData) }} className="btn btn-dark w-10 h-10 p-0 rounded-full"><MdDelete /></button>
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
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
