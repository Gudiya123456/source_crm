import { useState, useEffect, Fragment } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
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

const APIurl = 'http://127.0.0.1:8000/api/';
const rowData = [
    {
        Leadowner: 'CRM name',
        Name: 'Prabunath',
        Mobile: '9600400943',
        State: 'prabunaath@gmail.com',
        Status: 'New',
        Source: 'IND',
    },
];

const options = [
    { value: 'all leads', label: 'View Leads' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
];
const ViewLeads = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 50, 100, 200, 500, 1000];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    useEffect(() => {
        if(!crmToken) navigate('/')
            else{
        console.log(page)
        dispatch(setPageTitle('View Leads'));
        fetchLeads(page)
        }
    }, [page, pageSize]);

    const [isLoading, setIsLoading] = useState(true);
    const [leads, setLeads] = useState([]);
    const [response, setResponse] = useState(null);


    const fetchLeads = async () => {
        setIsLoading(true)
        try {

            const response = await axios({
                method: 'get',
                url: APIurl + "leads?page=" + page + "&pageSize=" + pageSize,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });

            if (response.data.status == "success") {
                setResponse(response.data.data);
                setLeads(response.data.data.data)
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

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    const [transferdata, dataTransfer] = useState(false);
    const [requestlead, leadRequest] = useState(false);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [hideCols, setHideCols] = useState<any>(['age', 'dob', 'isActive']);
    const showHideColumns = (col: any, value: any) => {
        if (hideCols.includes(col)) {
            setHideCols((col: any) => hideCols.filter((d: any) => d !== col));
        } else {
            setHideCols([...hideCols, col]);
        }
    };
    const cols = [
        { accessor: 'first_name', title: 'first_name' },
        { accessor: 'last_name', title: 'last_name' },
        { accessor: 'email', title: 'email' },
        { accessor: 'phone', title: 'phone' },
        { accessor: 'second_phone', title: 'second_phone' },
        { accessor: 'status', title: 'status' },
        { accessor: 'invest', title: 'invest' },
        { accessor: 'first_trail', title: 'first_trail' },
        { accessor: 'second_trail', title: 'second_trail' },
        { accessor: 'followup', title: 'followup' },
        { accessor: 'source', title: 'source' },
        { accessor: 'dnd', title: 'dnd' },
        { accessor: 'city', title: 'city' },
        { accessor: 'state', title: 'state' },
        { accessor: 'products', title: 'products' },
        { accessor: 'desc', title: 'desc' },
        { accessor: 'kyc_status', title: 'kyc_status' },
        { accessor: 'rp_status', title: 'rp_status' },
        { accessor: 'created_at', title: 'created_at' },
        { accessor: 'updated_at', title: 'updated_at' },
        // $table -> string('user_id') -> nullable();
    ];
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
                        <div className="panel mt-6">
                            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                                <div className="w-[260px]" style={{color : 'red'}}>
                                    <Select defaultValue={options[0]} options={options} isSearchable={false} />
                                </div>
                                <div className="flex ltr:ml-auto rtl:mr-auto">
                                    {/* Column Filter */}
                                    <div className="dropdown mr-1">
                                        <Dropdown
                                            placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                            btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                            button={
                                                <>
                                                    <span className="ltr:mr-1 rtl:ml-1">Edit Table</span>
                                                    <IconCaretDown className="w-5 h-5" />
                                                </>
                                            }
                                        >
                                            <ul className="!min-w-[140px]">
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
                                                                        className="form-checkbox"
                                                                        defaultValue={col.accessor}
                                                                        onChange={(event: any) => {
                                                                            setHideCols(event.target.value);
                                                                            showHideColumns(col.accessor, event.target.checked);
                                                                        }}
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
                                    {/* Data Transfer */}
                                    <div className='mr-1'>
                                        <button type="button" className="btn btn-outline-primary" onClick={() => dataTransfer(true)}>Data Transfer</button>
                                        <Transition appear show={transferdata} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                open={transferdata}
                                                onClose={() => {
                                                    dataTransfer(false);
                                                }}
                                            >
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
                                                <div id="register_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
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
                                                            <Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-sm my-8 text-black dark:text-white-dark">
                                                                <div className="flex items-center justify-between p-5 font-semibold text-lg dark:text-white">
                                                                    <h5>Bulk Lead Update</h5>
                                                                    <button type="button" onClick={() => dataTransfer(false)} className="text-white-dark hover:text-dark">
                                                                        <IconX className="w-5 h-5" />
                                                                    </button>
                                                                </div>
                                                                <div className="p-3">
                                                                    <form>
                                                                        <div className="relative mb-4">
                                                                            <select id="dataType" className="form-select text-white-dark">
                                                                                <option>Select DataType</option>
                                                                                <option>Lead Owner</option>
                                                                                <option>Lead Status</option>
                                                                                <option>Lead Source</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="relative mb-4">
                                                                            <select id="dataType" className="form-select text-white-dark">
                                                                                <option>Select Owner</option>
                                                                                <option>Name 1</option>
                                                                                <option>Name 2</option>
                                                                                <option>Name 3</option>
                                                                            </select>
                                                                        </div>
                                                                        <button type="button" className="btn btn-primary w-full">
                                                                            Update
                                                                        </button>
                                                                    </form>
                                                                </div>
                                                            </Dialog.Panel>
                                                        </Transition.Child>
                                                    </div>
                                                </div>
                                            </Dialog>
                                        </Transition>
                                    </div>
                                    {/* Lead Request */}
                                    <div>
                                        <button type="button" className="btn btn-outline-primary" onClick={() => leadRequest(true)}>Lead Request</button>
                                        <Transition appear show={requestlead} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                open={requestlead}
                                                onClose={() => {
                                                    leadRequest(false);
                                                }}
                                            >
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
                                                <div id="register_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
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
                                                            <Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-sm my-8 text-black dark:text-white-dark">
                                                                <div className="flex items-center justify-between p-5 font-semibold text-lg dark:text-white">
                                                                    <h5>Lead Request</h5>
                                                                    <button type="button" onClick={() => leadRequest(false)} className="text-white-dark hover:text-dark">
                                                                        <IconX className="w-5 h-5" />
                                                                    </button>
                                                                </div>
                                                                <div className="p-3">
                                                                    <form>
                                                                        <div className="relative mb-4">
                                                                            <select id="dataType" className="form-select text-white-dark">
                                                                                <option>Select State</option>
                                                                                <option>Andhra Pradesh</option>
                                                                                <option>Tamilnadu</option>
                                                                                <option>Karnataka</option>
                                                                                <option>Kerala</option>
                                                                                <option>North</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="relative mb-4">
                                                                            <input id="leadCount" type="text" placeholder="Enter Count" className="form-input" />
                                                                        </div>
                                                                        <button type="button" className="btn btn-primary w-full">
                                                                            Request
                                                                        </button>
                                                                    </form>
                                                                </div>
                                                            </Dialog.Panel>
                                                        </Transition.Child>
                                                    </div>
                                                </div>
                                            </Dialog>
                                        </Transition>
                                    </div>
                                </div>
                            </div>
                            <div className="datatables">

                                {isLoading ?
                                    <>
                                        <div className='text-center'>
                                            <span>Loading...</span>
                                        </div>
                                    </> : <>
                                        <DataTable
                                            className="whitespace-nowrap table-hover"
                                            records={leads}
                                            columns={[
                                                {
                                                    accessor: 'first_name',
                                                    title: 'First Name',
                                                    sortable: true,
                                                    hidden: hideCols.includes('first_name'),
                                                },
                                                {

                                                    accessor: 'last_name',
                                                    title: 'Last Name',
                                                    sortable: true,
                                                    hidden: hideCols.includes('last_name'),
                                                },
                                                {
                                                    accessor: 'email',
                                                    title: 'Email',
                                                    sortable: true,
                                                    hidden: hideCols.includes('email'),
                                                },
                                                {
                                                    accessor: 'phone',
                                                    title: 'Phone',
                                                    sortable: true,
                                                    hidden: hideCols.includes('phone'),
                                                },
                                                {
                                                    accessor: 'second_phone',
                                                    title: 'Second Phone',
                                                    sortable: true,
                                                    hidden: hideCols.includes('second_phone'),
                                                },
                                                {
                                                    accessor: 'status',
                                                    title: 'Status',
                                                    sortable: true,
                                                    hidden: hideCols.includes('status'),
                                                },
                                                {
                                                    accessor: 'invest',
                                                    title: 'Invest',
                                                    sortable: true,
                                                    hidden: hideCols.includes('invest'),
                                                },
                                                {
                                                    accessor: 'first_trail',
                                                    title: 'First Trail',
                                                    sortable: true,
                                                    hidden: hideCols.includes('first_trail'),
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
                                                    title: 'Source',
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
                                                    title: 'State',
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
                                            paginationText={({ from, to, totalRecords }) => `Showing  ${response?.from} to ${response.to} of ${totalRecords} entries`}
                                        />
                                    </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewLeads;
