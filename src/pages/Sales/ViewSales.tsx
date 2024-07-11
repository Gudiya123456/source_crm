// import { useState, useEffect } from 'react';
// import 'tippy.js/dist/tippy.css';
// import 'react-quill/dist/quill.snow.css';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import { useDispatch, useSelector } from 'react-redux';
// import { setPageTitle } from '../../store/themeConfigSlice';
// import Select from 'react-select';
// import { NavLink } from 'react-router-dom';
// import sortBy from 'lodash/sortBy';
// import { DataTable, DataTableSortStatus } from 'mantine-datatable';
// import CommonLeftnav from '../CommonLeftnav';
// const rowData = [
//   {
//       Leadowner: 'CRM name',
//       Name: 'Prabunath',
//       Salesdate: '9600400943',
//       Startdate: 'prabunaath@gmail.com',
//       Duedate: 'New',
//       Bankaccount: 'ICICI',
//       Paid: '10000',
//   },
// ];
// const options = [
//     { value: 'all sales', label: 'All Sales' },
//     { value: 'white', label: 'White' },
//     { value: 'purple', label: 'Purple' },
// ];
// const ViewSales = () => {

//     const dispatch = useDispatch();
//     useEffect(() => { dispatch(setPageTitle('View Sales')); });
//     const [page, setPage] = useState(1);
//     const PAGE_SIZES = [10, 20, 50, 100, 200, 500, 1000];
//     const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
//     const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
//     const [recordsData, setRecordsData] = useState(initialRecords);

//     const [selectedRecords, setSelectedRecords] = useState<any>([]);

//     const [search, setSearch] = useState('');
//     const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
//         columnAccessor: 'id',
//         direction: 'asc',
//     });

//     useEffect(() => {
//         setPage(1);
//     }, [pageSize]);

//     useEffect(() => {
//         const from = (page - 1) * pageSize;
//         const to = from + pageSize;
//         setRecordsData([...initialRecords.slice(from, to)]);
//     }, [page, pageSize, initialRecords]);

//     useEffect(() => {
//         setInitialRecords(() => {
//             return rowData.filter((item) => {
//                 return (
//                     item.Leadowner.toString().includes(search.toLowerCase()) ||
//                     item.Name.toLowerCase().includes(search.toLowerCase()) ||
//                     item.Salesdate.toLowerCase().includes(search.toLowerCase()) ||
//                     item.Startdate.toLowerCase().includes(search.toLowerCase()) ||
//                     item.Duedate.toLowerCase().includes(search.toLowerCase()) ||
//                     item.Bankaccount.toLowerCase().includes(search.toLowerCase())||
//                     item.Paid.toLowerCase().includes(search.toLowerCase())
//                 );
//             });
//         });
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [search]);

//     useEffect(() => {
//         const data = sortBy(initialRecords, sortStatus.columnAccessor);
//         setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [sortStatus]);
//     return (
//         <div>
//             <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
//                 <div className={`panel xl:block p-4 dark:gray-50 w-[300px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden`}>
//                     <div className="flex flex-col h-full pb-16">
//                         <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
//                             <div className="space-y-1">
//                                 <CommonLeftnav/>
//                             </div>
//                         </PerfectScrollbar>
//                     </div>
//                 </div>

//                 <div className="panel p-0 flex-1 overflow-x-hidden h-full">
//                     <div className="flex flex-col h-full">
//                         <div className="panel mt-6">
//                             <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
//                                 <div className="w-[260px] z-10">
//                                     <Select defaultValue={options[0]} options={options} isSearchable={false} />
//                                 </div>
//                                 <div className="ltr:ml-auto rtl:mr-auto">
//                                     <button type="button" className="btn btn-outline-primary">Data Transfer</button>
//                                 </div>
//                             </div>

//                             <div className="datatables">
//                                 <DataTable
//                                     className="whitespace-nowrap table-hover"
//                                     records={recordsData}


//                                     columns={[
//                                         { accessor: 'Leadowner',title:'Owner Name', sortable: true,
//                                             render:(data)=><div>
//                                                 <NavLink to='/'>


//                                             <td className="text-center">
//                                                           <button type="button" className='me-3'>
//                                                             {data.Leadowner}
//                                                           </button>

//                                                       </td>
//                                                       </NavLink>
//                                           </div>
//                                          },

//                                         { accessor: 'Name',title:'Client', sortable: true },
//                                         { accessor: 'Salesdate',title:'Product', sortable: true },
//                                         { accessor: 'Startdate', title:'Bank Details', sortable: true },
//                                         { accessor: 'Duedate',title:'Date', sortable: true },
//                                         { accessor: 'Paid', title:'Status', sortable: true },
//                                     ]}
//                                     highlightOnHover
//                                     totalRecords={initialRecords.length}
//                                     recordsPerPage={pageSize}
//                                     page={page}
//                                     onPageChange={(p) => setPage(p)}
//                                     recordsPerPageOptions={PAGE_SIZES}
//                                     onRecordsPerPageChange={setPageSize}
//                                     sortStatus={sortStatus}
//                                     onSortStatusChange={setSortStatus}
//                                     selectedRecords={selectedRecords}
//                                     onSelectedRecordsChange={setSelectedRecords}
//                                     minHeight={200}
//                                     paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewSales;

import { useState, useEffect, Fragment } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle, setHideCols } from '../../store/themeConfigSlice';
import Select from 'react-select';
import { NavLink, useNavigate } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';
import IconX from '../../components/Icon/IconX';
import IconUser from '../../components/Icon/IconUser';
import IconAt from '../../components/Icon/IconAt';
import IconLock from '../../components/Icon/IconLock';
import Dropdown from '../../components/Dropdown';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { IRootState } from '../../store';
import CommonLeftnav from '../CommonLeftnav';
import axios from 'axios';
import { MdDelete } from "react-icons/md";

import CreateSale from './CreateSale';

const APIurl = 'http://127.0.0.1:8000/api/';
console.log(window.location.origin)

const ViewSales = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const hideCols = useSelector((state: IRootState) => state.themeConfig.hideCols);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 50, 100, 200, 500, 1000];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [filteredOwner, setFilteredOwner] = useState(0);
    const [filteredStatus, setFilteredStatus] = useState(0);
    const [transferdata, dataTransfer] = useState(false);
    const [requestlead, leadRequest] = useState(false);
    useEffect(() => {
        // if(!crmToken) navigate('/')
        //     else{
        console.log(page)
        dispatch(setPageTitle('View Leads'));

        fetchLeads()
        // }

    }, [page, pageSize, filteredOwner, filteredStatus]);
    // Lead View
    const [showLeadViewDrawer, setLeadViewShowDrawer]=useState(false)
    // Lead View
    const [isLoading, setIsLoading] = useState(true);
    const [leads, setLeads] = useState([]);
    const [response, setResponse] = useState(null);

    const [owners, setOwners] = useState(0);
    const [statuses, setStatuses] = useState(0);
    const [leadStatuses, setLeadStatuses] = useState([]);
    const fetchLeads = async () => {
        setIsLoading(true)
        try {
            const onwer = owners ? 1 : 0;
            const status = statuses ? 1 : 0;
            const response = await axios({
                method: 'get',
                url: APIurl + "leads?page=" + page
                    + "&pageSize=" + pageSize
                    + "&owners=" + onwer
                    + "&statuses=" + status
                    + "&filteredOwner=" + filteredOwner
                    + "&filteredStatus=" + filteredStatus,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });

            if (response.data.status == "success") {
                setResponse(response.data.data);
                setLeads(response.data.data.data)
                if (response.data.owners) {
                    let a = response.data.owners
                    a.unshift({ value: 0, label: "All" })
                    setOwners(a)
                }
                if (response.data.statuses) {
                    let a = response.data.statuses
                    a.unshift({ value: 0, label: "All" })
                    setStatuses(a)
                }

                if (response.data.leadStatuses) {
                    setLeadStatuses(response.data.leadStatuses)
                }
            }

            console.log(response)
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        console.log(response)
        if (response) {

        }
    }, [response])

    // const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));

    const [selectedRecords, setSelectedRecords] = useState<any>([]);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const showHideColumns = (col: any, value: any) => hideCols.includes(col) ? dispatch(setHideCols(hideCols.filter(d => d !== col))) : dispatch(setHideCols([...hideCols, col]));

    const cols = [
        { accessor: 'id', title: 'Lead Id', editable: true },
        { accessor: 'owner', title: 'Owner', editable: true },
        { accessor: 'first_name', title: 'First Name', editable: false },
        { accessor: 'last_name', title: 'Last Name', editable: true },
        { accessor: 'email', title: 'Email', editable: true },
        { accessor: 'phone', title: 'Phone', editable: false },
        { accessor: 'second_phone', title: 'Second Phone', editable: true },
        { accessor: 'status', title: 'Status', editable: false },
        { accessor: 'invest', title: 'Invest', editable: true },
        { accessor: 'first_trail', title: 'First Trail', editable: true },
        { accessor: 'second_trail', title: 'Second Trail', editable: true },
        { accessor: 'followup', title: 'Follow Up', editable: true },
        { accessor: 'source', title: 'Source', editable: true },
        { accessor: 'dnd', title: 'DND', editable: true },
        { accessor: 'city', title: 'City', editable: true },
        { accessor: 'state', title: 'State', editable: false },
        { accessor: 'products', title: 'Products', editable: true },
        { accessor: 'desc', title: 'Description', editable: true },
        { accessor: 'bank', title: 'Bank Details', editable: true },
        { accessor: 'date', title: 'Dates', editable: true },


        // { accessor: 'kyc_status', title: 'KYC Status', editable: true },
        // { accessor: 'rp_status', title: 'RP Status', editable: true },
        // { accessor: 'created_at', title: 'Craeted At', editable: true },
        // { accessor: 'updated_at', title: 'Updated At', editable: true },
    ];

    const [statusModal, setStatusModal] = useState(false)
    const [statusLead, setStatusLead] = useState<any>(null);
    const [statusBtnLoading, setStatusBtnLoading] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(null);

    const updateLeadStatus = (lead: any) => {
        setStatusLead(lead)
        setStatusModal(true)
    }

    const leadStatusUpdateApi = async () => {
        try {
            setStatusBtnLoading(true)
            const response = await axios({
                method: 'get',
                url: APIurl + "update-lead-status",
                data: { id: statusLead.id, status: selectedStatus },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });

        } catch (error) {

        } finally {
            setStatusBtnLoading(false)
        }
    }
    const [callbackModal, setCallbackModal] = useState(false)
    const [callbackLead, setCallbackLead] = useState(null);
    const [callbackBtnLoading, setCallbackBtnLoading] = useState(false)

    const handleLeadCallback = (lead: any) => {
        setCallbackLead(lead)
        setCallbackModal(true)
    }
    //
    return (
        <div>
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                <div className={`panel xl:block p-4 dark:gray-50 w-[300px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden`}>
                    <div className="flex flex-col h-full pb-16">
                        <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                            <div className="space-y-1">
                                <CommonLeftnav />
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>

                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                    <div className="flex flex-col h-full">
                        <div className="panel ">

                            <div className='flex justify-between gap-4'>
                                {/* <h1 className=' w-[130px] text-xl font-bold' >View Sale</h1> */}

                                {/* <div className="flex w-[375px]">
                                    <input id="iconRight" type="tel" maxLength={10} placeholder="search" className="form-input ltr:rounded-r-none rtl:rounded-l-none py-1.5" />
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        s
                                    </div>
                                </div> */}

                                <div className='flex gap-3  w-full'>
                                    <div>
                                        <Select placeholder="Select Lead Owner" onChange={(e) => setFilteredOwner(e.value)} className='w-[230px] z-10' options={owners ? owners : []} />
                                    </div>

                                    <div>
                                        <Select placeholder="Select Lead Status" onChange={(e) => setFilteredStatus(e.value)} className='w-[230px] z-10' options={statuses ? statuses : []} />
                                    </div>
                                </div>

                                <div className='flex gap-3 justify-end  w-full'>
                                    {/* <button className='btn btn-sm btn-dark'>Table</button> */}
                                    <div className="dropdown mr-1">
                                        <Dropdown
                                            placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                            btnClassName="!btn btn-dark flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                            button={
                                                <>
                                                    <span className="ltr:mr-1 rtl:ml-1">Edit Table</span>
                                                    <IconCaretDown className="w-5 h-5" />
                                                </>
                                            }
                                        >
                                            <ul className="!min-w-[200px]">
                                                {cols.map((col, i) => {
                                                    return (
                                                        <li
                                                            key={i}
                                                            className="flex flex-col"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <div className="flex items-center px-4 py-1">
                                                                <label className="cursor-pointer mb-0">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={!hideCols.includes(col.accessor)}
                                                                        className="form-checkbox text-dark"
                                                                        defaultValue={col.accessor}
                                                                        onChange={(event: any) => {
                                                                            setHideCols(event.target.value);
                                                                            showHideColumns(col.accessor, event.target.checked);
                                                                        }}
                                                                        disabled={!col.editable}
                                                                    />
                                                                    <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                                                </label>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </Dropdown>
                                    </div>
                                    {/* View Data */}
                                    <div className='mr-1'>
                                        <button onClick={()=>setLeadViewShowDrawer(!showLeadViewDrawer)} className="btn btn-outline-success">
                                       Create</button>
                                        <CreateSale showLeadViewDrawer={showLeadViewDrawer} setLeadViewShowDrawer={setLeadViewShowDrawer}/>
                                    </div>



                                </div>
                            </div>

                            <div className="datatables mt-4">
                                <DataTable
                                    className="whitespace-nowrap table-hover"
                                    records={leads}
                                    columns={[
                                        {
                                            accessor: 'id',
                                            title: 'Lead Id',
                                            sortable: true,
                                            hidden: hideCols.includes('id'),
                                        },
                                        {
                                            accessor: 'owner',
                                            // title: 'Owner',
                                            sortable: true,
                                            render:
                                                (data)=> <div onClick={()=>setLeadViewShowDrawer(!showLeadViewDrawer)}>{data.owner}</div>
                                            ,
                                            hidden: hideCols.includes('owner'),
                                        },
                                        {
                                            accessor: 'first_name',
                                            // title: 'Client',
                                            sortable: true,
                                            hidden: hideCols.includes('first_name'),
                                        },
                                        {

                                            accessor: 'product',
                                            // title: 'Product',
                                            sortable: true,
                                            hidden: hideCols.includes('product'),
                                        },
                                        {

                                            accessor: 'bank',
                                            // title: 'Bank Details',
                                            sortable: true,
                                            hidden: hideCols.includes('bank'),
                                        },
                                        {

                                            accessor: 'date',
                                            // title: 'Dates',
                                            sortable: true,
                                            hidden: hideCols.includes('date'),
                                        },
                                        {
                                            accessor: 'status',
                                            title: 'Status',
                                            sortable: true,
                                            hidden: hideCols.includes('status'),
                                            render: (lead) => (
                                                lead.status == "Closed Won" ? <button type="button" className="btn btn-success btn-sm">Create Sale</button> :
                                                <div className='flex flex-col w-fit '>
                                                    <span className="badge bg-secondary text-center cursor-pointer" onClick={() => updateLeadStatus(lead)}>{lead.status}</span>
                                                    <span className="badge bg-primary text-center cursor-pointer" onClick={() => handleLeadCallback(lead)}>Callback</span>
                                                </div>
                                            ),
                                        },


                                        {
                                            accessor: 'second_trail',
                                            title: 'Second Trail',
                                            sortable: true,
                                            hidden: hideCols.includes('second_trail'),
                                        },
                                        {
                                            accessor: 'followup',
                                            title: 'Followup',
                                            sortable: true,
                                            hidden: hideCols.includes('followup'),
                                        },
                                        {
                                            accessor: 'source',
                                            title: 'Product',
                                            sortable: true,
                                            hidden: hideCols.includes('source'),
                                        },
                                        {
                                            accessor: 'dnd',
                                            title: 'DND',
                                            sortable: true,
                                            hidden: hideCols.includes('dnd'),
                                        },
                                        {
                                            accessor: 'city',
                                            title: 'City',
                                            sortable: true,
                                            hidden: hideCols.includes('city'),
                                        },
                                        {
                                            accessor: 'state',
                                            title: 'Bank Details',
                                            sortable: true,
                                            hidden: hideCols.includes('state'),
                                        },
                                        {
                                            accessor: 'products',
                                            title: 'Products',
                                            sortable: true,
                                            hidden: hideCols.includes('products'),
                                        },
                                        {
                                            accessor: 'products',
                                            title: 'hhhh',
                                            sortable: true,
                                            hidden: hideCols.includes('products'),
                                        },
                                        {
                                            accessor: 'desc',
                                            title: 'Desc',
                                            sortable: true,
                                            hidden: hideCols.includes('desc'),
                                        },
                                        {
                                            accessor: 'kyc_status',
                                            title: 'KYC Status',
                                            sortable: true,
                                            hidden: hideCols.includes('kyc_status'),
                                        },
                                        {
                                            accessor: 'rp_status',
                                            title: 'RP Status',
                                            sortable: true,
                                            hidden: hideCols.includes('rp_status'),
                                        },
                                        {
                                            accessor: 'created_at',
                                            title: 'Created At',
                                            sortable: true,
                                            hidden: hideCols.includes('created_at'),
                                        },
                                        {
                                            accessor: 'updated_at',
                                            title: 'Updated At',
                                            sortable: true,
                                            hidden: hideCols.includes('updated_at'),
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
                                    selectedRecords={selectedRecords}
                                    onSelectedRecordsChange={setSelectedRecords}
                                    minHeight={200}
                                    fetching={isLoading}
                                    loaderSize="xl"
                                    loaderColor="green"
                                    loaderBackgroundBlur={1}
                                    paginationText={({ from, to, totalRecords }) => `Showing  ${response?.from} to ${response.to} of ${totalRecords} entries`}
                                />
                            </div>
                            {/* Lead Status modal*/}
                            <div className="mb-5">
                                <Transition appear show={statusModal} as={Fragment}>
                                    <Dialog as="div" open={statusModal} onClose={() => setStatusModal(true)}>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0" />
                                        </Transition.Child>
                                        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                                            <div className="flex items-start justify-center min-h-screen px-4">
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0 scale-95"
                                                    enterTo="opacity-100 scale-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100 scale-100"
                                                    leaveTo="opacity-0 scale-95"
                                                >
                                                    <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                                            <div className="font-bold text-lg">Update Lead Status</div>
                                                            <button type="button" onClick={() => setStatusModal(false)} className="text-white-dark hover:text-dark">
                                                                x
                                                            </button>
                                                        </div>
                                                        <div className="p-5">
                                                            <div className='flex justify-between items-center'>
                                                                <div className="flex items-center">
                                                                    <div className="flex-none">
                                                                        <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${statusLead?.first_name} ${statusLead?.last_name}`} className="rounded-full h-12 w-12 object-cover" alt="" />
                                                                    </div>
                                                                    <div className="mx-3">
                                                                        <p className="mb-1 font-semibold">{statusLead?.first_name} {statusLead?.last_name}</p>
                                                                        <p className="text-xs text-white-dark">{statusLead?.phone}</p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <span className="badge bg-secondary">{statusLead?.status}</span>
                                                                </div>
                                                            </div>
                                                            <div className='m-4'>
                                                                <select className='form-select'>
                                                                    {leadStatuses.map((status) => (
                                                                        <option value="">{status.value}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="flex justify-end items-center mt-8">
                                                                <button type="button" onClick={() => setStatusModal(false)} className="btn btn-outline-danger">
                                                                    Discard
                                                                </button>
                                                                <button type="button" onClick={() => setStatusModal(false)} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                                    Update Status
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition>
                            </div>
                            {/* ? Call Back modal*/}
                            <div className="mb-5">
                                <Transition appear show={callbackModal} as={Fragment}>
                                    <Dialog as="div" open={callbackModal} onClose={() => setCallbackModal(true)}>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0" />
                                        </Transition.Child>
                                        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                                            <div className="flex items-start justify-center min-h-screen px-4">
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0 scale-95"
                                                    enterTo="opacity-100 scale-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100 scale-100"
                                                    leaveTo="opacity-0 scale-95"
                                                >
                                                    <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                                            <div className="font-bold text-lg">Lead Callback</div>
                                                            <button type="button" onClick={() => setCallbackModal(false)} className="text-white-dark hover:text-dark">
                                                                x
                                                            </button>
                                                        </div>
                                                        <div className="p-5">

                                                            <div className='flex justify-between items-center'>
                                                                <div className="flex items-center">
                                                                    <div className="flex-none">
                                                                        <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${callbackLead?.first_name} ${callbackLead?.last_name}`} className="rounded-full h-12 w-12 object-cover" alt="" />
                                                                    </div>
                                                                    <div className="mx-3">
                                                                        <p className="mb-1 font-semibold">{callbackLead?.first_name} {callbackLead?.last_name}</p>
                                                                        <p className="text-xs text-white-dark">{callbackLead?.phone}</p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <span className="badge bg-secondary">{callbackLead?.status}</span>
                                                                </div>
                                                            </div>
                                                            <div className='m-4 flex gap-4 justify-between'>
                                                                <input type="date" className='form-input' />
                                                                <input type="time" className='form-input' />
                                                            </div>
                                                            <div className="flex justify-end items-center mt-8">
                                                                <button type="button" onClick={() => setCallbackModal(false)} className="btn btn-outline-danger">
                                                                    Discard
                                                                </button>
                                                                <button type="button" onClick={() => setCallbackModal(false)} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                                    Update Status
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition>
                            </div>
                        </div >
                    </div >
                </div >
            </div >
        </div >
    );
};

export default ViewSales;
