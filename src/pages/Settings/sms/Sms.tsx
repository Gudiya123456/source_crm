import { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setCrmToken, setPageTitle } from '../../../store/themeConfigSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IRootState } from '../../../store';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdDelete, MdDeleteOutline } from 'react-icons/md';
import { FaEdit, FaRegEye } from 'react-icons/fa';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { downloadExcel } from 'react-export-table-to-excel';
import sortBy from 'lodash/sortBy';
import IconFile from '../../../components/Icon/IconFile';
import IconPrinter from '../../../components/Icon/IconPrinter';
import ConfigurationDrawer from './ConfigurationDrawer';

const Sms = ({ dropdowns }: any) => {
    console.log(dropdowns)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const APIurl = 'http://127.0.0.1:8000/api/';
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'id', direction: 'asc' });


    const [search, setSearch] = useState('');
    useEffect(() => {
        fetchdropdownsq();
    }, [page, pageSize, search])
    const [response, setResponse] = useState<any>(null);
    const [smsConfiguration, setSmsConfiguration] = useState(0);
    const fetchdropdownsq = async () => {
        setIsLoading(true)
        try {
            const a = smsConfiguration;
            const response = await axios({
                method: 'get',
                url: APIurl + "smstemplate?page=" + page + "&pageSize=" + pageSize + "&search=" + search + "&smsConfiguration=" + a,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });

            if (response.data.status == "success") {
                setResponse(response.data.data);
                setDropdown(response.data.data.data)

                if (response.data.smsConfiguration) setSmsConfiguration(response.data.smsConfiguration)
            }

            console.log(response)
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    function handleDownloadExcel() {
        const header = ['#', 'Sender ID', 'Template Name', 'Template', 'Status'];
        downloadExcel({
            fileName: 'Last Login',
            sheet: 'react-export-table-to-excel',
            tablePayload: {
                header,
                body: dropdownsq.map((sms: any, index) => ({
                    a: index + 1,
                    b: sms.sender_id,
                    c: sms.template_name,
                    d: sms.template,
                    e: sms.status ? 'Active' : 'Blocked',
                })),
            },
        });
    }


    const exportTable = (type: any) => {
        let columns: any = ['#', 'Sender ID', 'Template Name', 'Template', 'Status'];
        let records = dropdownsq.map((sms: any, index) => ({
            "#": index + 1,
            "Sender ID": sms.sender_id,
            "Template Name": sms.template_name,
            "template": sms.template,
            "Status": sms.status ? 'Active' : 'Blocked',
        }));
        let filename = 'SMS';
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

    useEffect(() => {
        if (!crmToken) navigate('/')
        else {
            console.log(page)
            dispatch(setPageTitle('Dropdown'));

        }
    }, [page, pageSize]);


    const editDropdown = location?.state?.dropdown;
    const [isLoading, setIsLoading] = useState(false)
    const [dropdownsq, setDropdown] = useState([])
    const [modal, setModal] = useState<any>(false);



    useEffect(() => {
        if (editDropdown) {
            setParams({
                id: editDropdown.id,
                sender_id: editDropdown.sender_id,
                template_name: editDropdown.template_name,
                template: editDropdown.template,
                status: editDropdown.status,
            })
        }
    }, [editDropdown])



    const [defaultParams] = useState({
        id: '',
        sender_id: '',
        template_name: '',
        template: '',
        status: '',
    });



    const [params, setParams] = useState<any>(defaultParams);
    const [errors, setErros] = useState<any>({});
    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.template_name) {
            errors = { ...errors, template_name: "template name is required" };
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
                url: APIurl + "smstemplate",
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
                fetchdropdownsq()
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
        data.append("sender_id", params.sender_id);
        data.append("template_name", params.template_name);
        data.append("template", params.template);
        data.append("status", params.status);
        AddDropdown(data);
    };
    const UpdateDropdown = (data: any) => {
        setErros({});
        if (data) {
            setParams({
                id: data.id,
                sender_id: data.sender_id,
                template_name: data.template_name,
                template: data.template,
                status: data.status
            });



        } else {
            const defaltData = JSON.parse(JSON.stringify(defaultParams));
            setParams(defaltData);
        }
        setModal(true)
    }
    const distroy = (dropdownsq: any) => {

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
                        url: APIurl + 'smstemplate/' + dropdownsq.id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "Bearer " + crmToken,
                        },
                    });
                    if (response.data.status === "success") {
                        Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });
                        fetchdropdownsq()
                    }
                } catch (error: any) {
                    if (error.response.status == 401) navigate('/login')
                } finally {

                }
            }
        });

    }












    const updateStatus = (id: any) => {
        const dropdown: any = dropdownsq.find((d: any) => d.id == id);
        AddDropdown({ ...dropdown, status: dropdown.status ? 0 : 1 })
    }

    const [showDrawer, setShowDrawer] = useState(false);

    return (
        <div className='w-full'>
            <ConfigurationDrawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} smsConfiguration={smsConfiguration} />
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full ">
                <div className={`panel xl:block p-4 dark:gray-50 w-[400px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden`}>
                    <div className=''>




                        <div className='flex items-center justify-between mb-5'>
                            <h5 className="font-semibold text-lg dark:text-white-light">Template Details</h5>
                            <div className='flex gap-4'>
                                {params.id ? <button type="button" onClick={() => setParams(defaultParams)} className="btn btn-sm btn-primary">Add Template</button> : ''}
                                <button type="button" onClick={() => setShowDrawer(true)} className="btn btn-sm btn-primary">Configuration</button>

                            </div>
                        </div>
                        <hr className="my-4 dark:border-[#191e3a]" />


                        <div className='mb-5 space-y-5'>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="sender_id">Sender ID</label>
                                    <select name="sender_id" className="form-select text-white-dark" onChange={(e) => changeValue(e)} value={params.sender_id ? params.sms_tempid : ''}>
                                        <option value={''}>Select Sender ID</option>

                                        {dropdowns?.map((dropdown: any) => (
                                            <option value={dropdown.dd_value}>{dropdown.dd_value}</option>
                                        ))}

                                    </select>
                                    {errors?.sender_id ? <div className="text-danger mt-1">{errors.sender_id}</div> : ''}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="template_name">Template Name</label>
                                    <input type="text" placeholder="Enter Template Name" className="form-input"
                                        name='template_name'
                                        value={params.template_name}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.template_name ? <div className="text-danger mt-1">{errors.template_name}</div> : ''}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="template">Content</label>
                                    <textarea name="template" rows={3} className="form-textarea" placeholder="Enter Content" value={params.template} onChange={(e) => changeValue(e)}></textarea>
                                    {errors?.template ? <div className="text-danger mt-1">{errors.template}</div> : ''}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="status">Status</label>
                                    <select name="status" className="form-select text-white-dark" onChange={(e) => changeValue(e)} value={params.status ? params.status : ''}>
                                        <option value={''}>Select Status</option>
                                        <option value={1}>Active</option>
                                        <option value={0}>Inactive</option>
                                    </select>
                                    {errors?.status ? <div className="text-danger mt-1">{errors.status}</div> : ''}
                                </div>
                            </div>
                            <button type="button" onClick={() => formSubmit()} disabled={btnLoading} className="btn bg-[#1d67a7] text-white ltr:ml-4 rtl:mr-4">
                                {params.id ? <div>{btnLoading ? 'Please wait' : 'Update Whatsapp Template'}</div> : <div>{btnLoading ?
                                    'Please wait' : editDropdown ? 'Update Whatsapp Template' :
                                        'Add Whatsapp Template'}</div>}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                    <div className="flex flex-col h-full">
                        <div className='panel'>
                            <div className='flex items-center justify-between mb-1'>
                                <h5 className="font-semibold text-lg dark:text-white-light">SMS Template List</h5>
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
                                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                </div>
                            </div>
                            <hr className="my-4 dark:border-[#191e3a]" />
                            <div className='mb-5'>
                                <div className="datatables">



                                    <DataTable
                                        className="whitespace-nowrap table-hover"
                                        records={dropdownsq}
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
                                                accessor: 'sender_id',
                                                sortable: true,
                                                render: ({ sender_id }) => (
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-semibold">{sender_id}</div>
                                                    </div>
                                                ),
                                            },
                                            {
                                                accessor: 'template_name',
                                                sortable: true,
                                                render: ({ template_name }) => (
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-semibold">{template_name}</div>
                                                    </div>
                                                ),
                                            },

                                            {
                                                accessor: 'template',
                                                sortable: true,
                                                render: ({ template }) => (
                                                    <div className="flex items-center gap-2">
                                                        <div className="font-semibold">{template}</div>
                                                    </div>
                                                ),
                                            },

                                            {
                                                accessor: 'status',
                                                sortable: true,
                                                render: ({ id, status }) => (
                                                    <div className="flex flex-col gap-2">
                                                        <label className="w-12 h-6 relative">
                                                            <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" onChange={(e) => {
                                                                updateStatus(id)
                                                            }} id="custom_switch_checkbox1" checked={status ? true : false} />
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

export default Sms;
