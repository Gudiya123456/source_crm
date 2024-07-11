import { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setCrmToken, setPageTitle } from '../../store/themeConfigSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import LeftTab from './LeftTab';
import { IRootState } from '../../store';
import axios from 'axios';
import Swal from 'sweetalert2';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { downloadExcel } from 'react-export-table-to-excel';
import IconFile from '../../components/Icon/IconFile';
import IconPrinter from '../../components/Icon/IconPrinter';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const LeadAutomation = ({ dropdowns }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => { dispatch(setPageTitle('Lead Automation')); });


    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    useEffect(() => {
        if (!crmToken) navigate('/login')
    }, [crmToken])


    const APIurl = 'http://127.0.0.1:8000/api/';

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [5, 10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });
    const [filterStatus, setFilterStatus] = useState('');
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [leadautomation, setLeadautomation] = useState([])
    const [response, setResponse] = useState(null);

    useEffect(() => {
        fetchLeadautomation();
    }, [page, pageSize, filterStatus, search])

    const fetchLeadautomation = async () => {
        setIsLoading(true);
        try {
            const response = await axios({
                method: 'get',
                url: APIurl + "leadautomation?page=" + page + "&pageSize=" + pageSize + "&filterStatus=" + filterStatus + "&search=" + search,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            console.log(response.data.leadautomation);
            if (response.data.status == 'success') {
                setLeadautomation(response.data.data.data)
                setResponse(response.data.data);

            }

        } catch (error: any) {
            console.log(error)
            if (error.response.status == 401) dispatch(setCrmToken(''))
        } finally {
            setIsLoading(false);
        }
    }


    function handleDownloadExcel() {
        const header = ['#', 'Lead Status', 'Lead Count', 'BDE Lead Count', 'Update Lead Count', 'Status'];
        downloadExcel({
            fileName: 'Lead Automation',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: leadautomation.map((automation: any, index) => ({
                    a: index + 1,
                    b: automation.dd_value,
                    c: automation.auto_leadcount,
                    d: automation.auto_bdecount,
                    e: automation.auto_updatecount,
                    h: automation.auto_status == "Active" ? 'Active' : 'Blocked',
                })),
            },
        });
    }


    const exportTable = (type: any) => {
        let columns: any = ['#', 'Lead Status', 'Lead Count', 'BDE Lead Count', 'Update Lead Count', 'Status'];
        let records = leadautomation.map((automation: any, index) => ({
            "#": index + 1,
            "Lead Status": automation.dd_value,
            "Lead Count": automation.auto_leadcount,
            "BDE Lead Count": automation.auto_bdecount,
            "Update Lead Count": automation.auto_updatecount,
            "Status": automation.pro_status == "Active" ? 'Active' : 'Blocked',
        }));
        let filename = 'Lead Automation';
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



    const [defaultParams] = useState({
        id: '',
        auto_leadstatus: '',
        auto_leadcount: '',
        auto_bdecount: '',
        auto_updatecount: '',
        auto_status: ''
    });








    const [params, setParams] = useState<any>(defaultParams);
    const [errors, setErros] = useState<any>({});
    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.auto_leadstatus) {
            errors = { ...errors, auto_leadstatus: "Lead Status is required" };
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
        console.table(params)
    };
    const AddLeadautomation = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: APIurl + "leadautomation",
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
                fetchLeadautomation()
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
        data.append("auto_leadstatus", params.auto_leadstatus);
        data.append("auto_leadcount", params.auto_leadcount);
        data.append("auto_bdecount", params.auto_bdecount);
        data.append("auto_updatecount", params.auto_updatecount);
        data.append("auto_status", params.auto_status);
        AddLeadautomation(data);
    };

    const UpdateLeadautomation = (data: any) => {
        setErros({});
        if (data) {
            setParams({
                id: data.id,
                auto_leadstatus: data.auto_leadstatus,
                auto_leadcount: data.auto_leadcount,
                auto_bdecount: data.auto_bdecount,
                auto_updatecount: data.auto_updatecount,
                auto_status: data.auto_status
            });
        }
    }

    const distroy = (leadautomation: any) => {

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
                        url: APIurl + 'leadautomation/' + leadautomation.id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "Bearer " + crmToken,
                        },
                    });
                    if (response.data.status === "success") {
                        Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });
                        fetchLeadautomation()
                    }
                } catch (error: any) {
                    if (error.response.status == 401) navigate('/login')
                } finally {

                }
            }
        });

    }


















    const updateLAStatus = (id: any) => {
        const leadautomations = leadautomation.find((d) => d.id == id);
        AddLeadautomation({ ...leadautomations, auto_status: leadautomations.auto_status == "Active" ? 'Inactive' : 'Active' })
    }


    return (
        <div className='w-full'>
            <div className='flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full '>
                <div className={`panel xl:block p-4 dark:gray-50 w-[400px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden`}>
                    <div className=''>
                        <div className='flex items-center justify-between mb-5'>
                            <h5 className="font-semibold text-lg dark:text-white-light">Lead Automation Details</h5>
                        </div>
                        <hr className="my-4 dark:border-[#191e3a]" />
                        <div className='mb-5 space-y-5'>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="auto_leadstatus">Lead Status</label>
                                    <select name="auto_leadstatus" className="form-select text-white-dark" onChange={(e) => changeValue(e)} value={params.auto_leadstatus ? params.auto_leadstatus : ''}>
                                        <option value={''}>Select Lead Status</option>
                                        {dropdowns.map((dropdown) => (<option value={dropdown.id}>{dropdown.dd_value}</option>
                                        ))}
                                    </select>
                                    {errors?.auto_leadstatus ? <div className="text-danger mt-1">{errors.auto_leadstatus}</div> : ''}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="auto_leadcount">Lead Count</label>
                                    <input type="text" placeholder="Enter Alert Lead Count" className="form-input"
                                        name='auto_leadcount'
                                        value={params.auto_leadcount}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.auto_leadcount ? <div className="text-danger mt-1">{errors.auto_leadcount}</div> : ''}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="auto_bdecount">BDE Count</label>
                                    <input type="text" placeholder="Enter Automatic BDE Count" className="form-input"
                                        name='auto_bdecount'
                                        value={params.auto_bdecount}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.auto_bdecount ? <div className="text-danger mt-1">{errors.auto_bdecount}</div> : ''}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="auto_updatecount">Auto Update Count</label>
                                    <input type="text" placeholder="Enter Auto Update Count" className="form-input"
                                        name='auto_updatecount'
                                        value={params.auto_updatecount}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.auto_updatecount ? <div className="text-danger mt-1">{errors.auto_updatecount}</div> : ''}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="auto_status">Status</label>
                                    <select name="auto_status" className="form-select text-white-dark" onChange={(e) => changeValue(e)} value={params.auto_status ? params.auto_status : ''}>
                                        <option value={''}>Select Status</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                    {errors?.auto_status ? <div className="text-danger mt-1">{errors.auto_status}</div> : ''}
                                </div>
                            </div>
                            <button type="button" onClick={() => formSubmit()} disabled={btnLoading} className="btn bg-[#1d67a7] text-white ltr:ml-4 rtl:mr-4">
                                {btnLoading ? 'Please wait' : params.id ? 'Update Lead Automation' : 'Add Lead Automation'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                    <div className="flex flex-col h-full">
                        <div className='panel'>

                            <div className='flex items-center justify-between mb-1'>
                                <h5 className="font-semibold text-lg dark:text-white-light">Lead Automation List</h5>


                                <div className='flex gap-4'>
                                    <select className='form-select w-[150px]' onChange={(e: any) => setFilterStatus(e.target.value)}>
                                        <option value="">All</option>
                                        <option value={"Active"}>Active</option>
                                        <option value={"Inactive"}>Blocked</option>

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
                                        highlightOnHover
                                        className="whitespace-nowrap table-hover"
                                        records={leadautomation}
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
                                                accessor: 'Lead Status',
                                                sortable: true,
                                                render: ({ dd_value }) => (
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-semibold">{dd_value}</div>
                                                    </div>
                                                ),
                                            },
                                            {
                                                accessor: 'Count',
                                                sortable: true,
                                                render: ({ auto_leadcount }) => (
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-semibold">{auto_leadcount}</div>
                                                    </div>
                                                ),
                                            },
                                            {
                                                accessor: 'BDE Count',
                                                sortable: true,
                                                render: ({ auto_bdecount }) => (
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-semibold">{auto_bdecount}</div>
                                                    </div>
                                                ),
                                            },
                                            {
                                                accessor: 'Auto Update Count',
                                                sortable: true,
                                                render: ({ auto_updatecount }) => (
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-semibold">{auto_updatecount}</div>
                                                    </div>
                                                ),
                                            },
                                            {
                                                accessor: 'Status',
                                                sortable: true,
                                                render: ({ id, auto_status }) => (
                                                    <div className="flex flex-col gap-2">
                                                        <label className="w-12 h-6 relative">
                                                            <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" onChange={(e) => {
                                                                updateLAStatus(id)
                                                            }} id="custom_switch_checkbox1" checked={auto_status == "Active" ? true : false} />
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
                                                        <button type="button" onClick={() => { UpdateLeadautomation(userFullData) }} className="btn btn-dark w-10 h-10 p-0 rounded-full"><FaEdit /></button>
                                                        <button type="button" onClick={() => { distroy(userFullData) }} className="btn btn-dark w-10 h-10 p-0 rounded-full"><MdDelete /></button>
                                                    </div>
                                                ),
                                            },
                                        ]}
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

export default LeadAutomation;
