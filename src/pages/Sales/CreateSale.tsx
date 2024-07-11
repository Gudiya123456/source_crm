import { useState, Fragment, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { IRootState } from '../../store';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { Dialog, Transition, Tab } from '@headlessui/react';
import IconX from '../../components/Icon/IconX';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { MdDelete } from "react-icons/md";

const options5 = [
    { value: 'orange', label: 'Orange' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
];
export default function CreateSale({ showLeadViewDrawer, setLeadViewShowDrawer }: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const hideCols = useSelector((state: IRootState) => state.themeConfig.hideCols);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('2022-07-05');
    const [modalSaleDescription, setModalSaleDescription] = useState(false);
    const [modalLeadDescription, setModalLeadDescription] = useState(false);
    return (
        <div>
            <div className={`${(showLeadViewDrawer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} onClick={() => setLeadViewShowDrawer(false)}></div>

            <nav className={`${(showLeadViewDrawer && 'ltr:!right-0 rtl:!left-0') || ''
                } bg-white fixed ltr:-right-[900px] rtl:-left-[900px] top-0 bottom-0 w-full max-w-[900px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-1000 z-[51] dark:bg-black p-4`}
            >
                <div className="flex flex-col h-screen overflow-hidden">
                    <div className="w-full text-center">
                        <div className="p-1 flex sm:flex-row flex-col w-full sm:items-center gap gap-4">
                            <div className="ltr:mr-3 rtl:ml-3 flex justify-start align-baseline gap-2 items-center">
                                <h5 className="font-semibold text-lg dark:text-white-light">View Sales</h5>
                                <h5 className="font-semibold text-md dark:text-white-light"> <Tippy content="KYC">
                                    <h1 className=' bg-black text-white px-2 rounded'>K</h1>
                                </Tippy> </h5>
                                <h5 className="font-semibold text-md dark:text-white-light">
                                <Tippy content="Account Verify">
                                    <h1 className=' bg-black text-white px-2 rounded' >A</h1>
                                </Tippy> </h5>
                                <h5 className="font-semibold text-md dark:text-white-light">
                                <Tippy content="Sales Approved">
                                    <h1 className=' bg-black text-white px-2 rounded'>S</h1>
                                </Tippy> </h5>


                            </div>
                            <div className="flex items-center justify-center sm:justify-end sm:flex-auto flex-1">
                                {/* Sale Description */}
                                <button className='btn btn-outline-primary mr-[15px] btn-sm' onClick={() => setModalSaleDescription(true)}>Sales History</button>
                                <Transition appear show={modalSaleDescription} as={Fragment}>
                                    <Dialog as="div" open={modalSaleDescription} onClose={() => setModalSaleDescription(false)}>
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
                                                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                                            <div className="text-lg font-bold">Sales History</div>
                                                            <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModalSaleDescription(false)}>
                                                                <IconX />
                                                            </button>
                                                        </div>
                                                        <div className="p-5">
                                                            <PerfectScrollbar className="h-[calc(50vh-80px)] relative">
                                                                <div>
                                                                    <div className='flex justify-between items-center'>
                                                                        <div className="flex items-center">
                                                                            <div className="flex-none">
                                                                                <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=PRABUNATH`} className="rounded-full h-12 w-12 object-cover" alt="" />
                                                                            </div>
                                                                            <div className="mx-3">
                                                                                <p className="mb-1 font-semibold">Prabunath - <span className="badge badge-outline-info">View</span></p>
                                                                                <p className="text-xs text-white-dark">07/05/2024  - 05/07/2024</p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className="mx-3">
                                                                                <p className="mb-1 text-xs text-dark font-bold">HDFC - ₹ 5,00,000</p>
                                                                                <span className="badge bg-secondary">Requested</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr className="my-4 dark:border-[#191e3a]" />
                                                                </div>
                                                                <div>
                                                                    <div className='flex justify-between items-center'>
                                                                        <div className="flex items-center">
                                                                            <div className="flex-none">
                                                                                <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=PRABUNATH`} className="rounded-full h-12 w-12 object-cover" alt="" />
                                                                            </div>
                                                                            <div className="mx-3">
                                                                                <p className="mb-1 font-semibold">Prabunath - <span className="badge badge-outline-info">View</span></p>
                                                                                <p className="text-xs text-white-dark">07/05/2024  - 05/07/2024</p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className="mx-3">
                                                                                <p className="mb-1 text-xs text-dark font-bold">HDFC - ₹ 5,00,000</p>
                                                                                <span className="badge bg-success">Approved</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr className="my-4 dark:border-[#191e3a]" />
                                                                </div>
                                                                <div>
                                                                    <div className='flex justify-between items-center'>
                                                                        <div className="flex items-center">
                                                                            <div className="flex-none">
                                                                                <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=PRABUNATH`} className="rounded-full h-12 w-12 object-cover" alt="" />
                                                                            </div>
                                                                            <div className="mx-3">
                                                                                <p className="mb-1 font-semibold">Prabunath - <span className="badge badge-outline-info">View</span></p>
                                                                                <p className="text-xs text-white-dark">07/05/2024  - 05/07/2024</p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className="mx-3">
                                                                                <p className="mb-1 text-xs text-dark font-bold">HDFC - ₹ 5,00,000</p>
                                                                                <span className="badge bg-warning">Pending</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr className="my-4 dark:border-[#191e3a]" />
                                                                </div>
                                                            </PerfectScrollbar>
                                                            <div className="flex justify-end items-center mt-8">
                                                                <button type="button" className="btn btn-outline-danger" onClick={() => setModalSaleDescription(false)}>
                                                                    Discard
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition>
                                {/* sales Description */}
                                <button className='btn btn-outline-primary mr-[15px] btn-sm' onClick={() => setModalLeadDescription(true)}>Description</button>
                                <Transition appear show={modalLeadDescription} as={Fragment}>
                                    <Dialog as="div" open={modalLeadDescription} onClose={() => setModalLeadDescription(false)}>
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
                                                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                                            <div className="text-lg font-bold">Status History</div>
                                                            <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModalLeadDescription(false)}>
                                                                <IconX />
                                                            </button>
                                                        </div>
                                                        <div className="p-5">
                                                            <PerfectScrollbar className="h-[calc(50vh-80px)] relative">
                                                                <div>
                                                                    <div className='flex justify-between items-center'>
                                                                        <div className="flex items-center">
                                                                            <div className="flex-none">
                                                                                <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=PRABUNATH`} className="rounded-full h-12 w-12 object-cover" alt="" />
                                                                            </div>
                                                                            <div className="mx-3">
                                                                                <p className="mb-1 font-semibold">Prabunath</p>
                                                                                <p className="text-xs text-white-dark">2024-07-03  12:50:15</p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <span className="badge bg-secondary">New</span>
                                                                        </div>
                                                                    </div>
                                                                    <hr className="my-4 dark:border-[#191e3a]" />
                                                                </div>
                                                                <div>
                                                                    <div className='flex justify-between items-center'>
                                                                        <div className="flex items-center">
                                                                            <div className="flex-none">
                                                                                <img src={`https://ui-avatars.com/api/?background=189aa8&color=fff&name=RAMESH`} className="rounded-full h-12 w-12 object-cover" alt="" />
                                                                            </div>
                                                                            <div className="mx-3">
                                                                                <p className="mb-1 font-semibold">Prabunath</p>
                                                                                <p className="text-xs text-white-dark">2024-07-03  12:50:15</p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <span className="badge bg-secondary">Follow Up</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className='mt-3'>
                                                                        <p className="text-xs text-dark"><b>Description :</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                                                    </div>
                                                                    <hr className="my-4 dark:border-[#191e3a]" />
                                                                </div>
                                                                <div>
                                                                    <div className='flex justify-between items-center'>
                                                                        <div className="flex items-center">
                                                                            <div className="flex-none">
                                                                                <img src={`https://ui-avatars.com/api/?background=189aa8&color=fff&name=RAMESH`} className="rounded-full h-12 w-12 object-cover" alt="" />
                                                                            </div>
                                                                            <div className="mx-3">
                                                                                <p className="mb-1 font-semibold">Prabunath</p>
                                                                                <p className="text-xs text-white-dark">2024-07-03  12:50:15</p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <span className="badge bg-secondary">Follow Up</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className='mt-3'>
                                                                        <p className="text-xs text-dark"><b>Description :</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                                                    </div>
                                                                    <hr className="my-4 dark:border-[#191e3a]" />
                                                                </div>
                                                            </PerfectScrollbar>
                                                            <div className="flex justify-end items-center mt-8">
                                                                <button type="button" className="btn btn-outline-danger" onClick={() => setModalLeadDescription(false)}>
                                                                    Discard
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition>
                                 {/* Lead Description */}
                                 <button className='btn btn-outline-primary mr-[15px] btn-sm' onClick={() => setModalLeadDescription(true)}>Invoice</button>
                                <Transition appear show={modalLeadDescription} as={Fragment}>
                                    <Dialog as="div" open={modalLeadDescription} onClose={() => setModalLeadDescription(false)}>
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
                                                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                                            <div className="text-lg font-bold">Status History</div>
                                                            <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModalLeadDescription(false)}>
                                                                <IconX />
                                                            </button>
                                                        </div>
                                                        <div className="p-5">
                                                            <PerfectScrollbar className="h-[calc(50vh-80px)] relative">
                                                                <div>
                                                                    <div className='flex justify-between items-center'>
                                                                        <div className="flex items-center">
                                                                            <div className="flex-none">
                                                                                <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=PRABUNATH`} className="rounded-full h-12 w-12 object-cover" alt="" />
                                                                            </div>
                                                                            <div className="mx-3">
                                                                                <p className="mb-1 font-semibold">Prabunath</p>
                                                                                <p className="text-xs text-white-dark">2024-07-03  12:50:15</p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <span className="badge bg-secondary">New</span>
                                                                        </div>
                                                                    </div>
                                                                    <hr className="my-4 dark:border-[#191e3a]" />
                                                                </div>
                                                                <div>
                                                                    <div className='flex justify-between items-center'>
                                                                        <div className="flex items-center">
                                                                            <div className="flex-none">
                                                                                <img src={`https://ui-avatars.com/api/?background=189aa8&color=fff&name=RAMESH`} className="rounded-full h-12 w-12 object-cover" alt="" />
                                                                            </div>
                                                                            <div className="mx-3">
                                                                                <p className="mb-1 font-semibold">Prabunath</p>
                                                                                <p className="text-xs text-white-dark">2024-07-03  12:50:15</p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <span className="badge bg-secondary">Follow Up</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className='mt-3'>
                                                                        <p className="text-xs text-dark"><b>Description :</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                                                    </div>
                                                                    <hr className="my-4 dark:border-[#191e3a]" />
                                                                </div>
                                                                <div>
                                                                    <div className='flex justify-between items-center'>
                                                                        <div className="flex items-center">
                                                                            <div className="flex-none">
                                                                                <img src={`https://ui-avatars.com/api/?background=189aa8&color=fff&name=RAMESH`} className="rounded-full h-12 w-12 object-cover" alt="" />
                                                                            </div>
                                                                            <div className="mx-3">
                                                                                <p className="mb-1 font-semibold">Prabunath</p>
                                                                                <p className="text-xs text-white-dark">2024-07-03  12:50:15</p>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <span className="badge bg-secondary">Follow Up</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className='mt-3'>
                                                                        <p className="text-xs text-dark"><b>Description :</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                                                                    </div>
                                                                    <hr className="my-4 dark:border-[#191e3a]" />
                                                                </div>
                                                            </PerfectScrollbar>
                                                            <div className="flex justify-end items-center mt-8">
                                                                <button type="button" className="btn btn-outline-danger" onClick={() => setModalLeadDescription(false)}>
                                                                    Discard
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition>
                                {/* Update Status */}
                                <button className='btn btn-success mr-[15px] btn-sm'>Update Status</button>
                                {/* <p className="ltr:mr-3 rtl:ml-3">1-10 of 24</p>
                                <button type="button" className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 ltr:mr-3 rtl:ml-3 disabled:opacity-60 disabled:cursor-not-allowed">
                                    <IconCaretDown className="w-5 h-5 rtl:-rotate-90 rotate-90" />
                                </button>
                                <button type="button" className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 disabled:opacity-60 disabled:cursor-not-allowed">
                                    <IconCaretDown className="w-5 h-5 rtl:rotate-90 -rotate-90" />
                                </button>
                                <button type="button" className="bg-[#f4f4f4] ml-[15px] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30" onClick={() => setLeadViewShowDrawer(false)}>
                                    <IoCloseSharp className=" w-5 h-5" />
                                </button> */}

                                <div className='mr-1'>
                                        {/* <button onClick={()=>setLeadViewShowDrawer(!showLeadViewDrawer)} className="btn btn-ganger"> */}
<MdDelete color='red' size={20} />

                                       {/* </button> */}
                                    </div>
                            </div>
                        </div>
                        <hr className="my-4 dark:border-[#191e3a]" />
                    </div>
                    <section className="flex-1 overflow-y-auto overflow-x-hidden perfect-scrollbar mt-5">
                        {/* View Leads */}
                        <div className='mb-5 space-y-5'>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                <div>
                                    <label htmlFor="first_name">First Name</label>
                                    <input name="first_name" type="text" placeholder="Enter First Name" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="last_name">Last Name</label>
                                    <input name="last_name" type="text" placeholder="Enter Last Name" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="email"> Email</label>
                                    <input id="email" type="email" placeholder="Enter  Email Address" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="phone"> Mobile Number</label>
                                    <input name="phone" type="text" placeholder="Enter  Mobile Number" className="form-input" />
                                </div>


                                <div>
                                    <label htmlFor="status">Bank Details</label>
                                    <select name="status" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="status">Select Client Type</label>
                                    <select name="status" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="status">Sale Service</label>
                                    <select name="status" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="source">Sale Date</label>
                                    <input id="source" type="date" placeholder="Enter Lead Mobile Number" className="form-input" />
                                </div>

                                <div>
                                    <label htmlFor="source">Start Date</label>
                                    <input id="source" type="date" placeholder="Enter Lead Mobile Number" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="source">Due Date</label>
                                    <input id="source" type="date" placeholder="Enter Lead Mobile Number" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="invest">Select Product</label>
                                    <select name="status" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="source">Sale Price</label>
                                    <input id="source" type="text" placeholder="" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="source">Client Paid</label>
                                    <input id="source" type="text" placeholder="Enter Lead Mobile Number" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="source">Offer Price</label>
                                    <input id="source" type="text" placeholder="price" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="source">Inclusive Gst</label>
                                    <input id="source" type="text" placeholder="Inclusive Gst" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="source">Gst Value</label>
                                    <input id="source" type="text" placeholder=" Gst Value" className="form-input" />
                                </div>


                                {/* <div>
                                    <label htmlFor="products">Products</label>

                                    <Select placeholder="Select an Products" options={options5} isMulti isSearchable={false} />
                                </div> */}
                                {/* <div>
                                    <label htmlFor="followup">Followup Date</label>
                                    <Flatpickr value={date1} name="followup" options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date) => setDate1(date)} />
                                </div>
                                <div>
                                    <label htmlFor="first_trail">1st Date</label>
                                    <Flatpickr value={date1} name="first_trail" options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date) => setDate1(date)} />
                                </div>
                                <div>
                                    <label htmlFor="second_trail">2nd Date</label>
                                    <Flatpickr value={date1} name="second_trail" options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date) => setDate1(date)} />
                                </div>
                                <div>
                                    <label htmlFor="invest">Investment Size</label>
                                    <select name="invest" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="lotSize">Lot Size</label>
                                    <select id="lotSize" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="dnd">DND Status</label>
                                    <select id="dnd" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div> */}
                            </div>
                            <div>
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] whitespace-nowrap">
                                        Description
                                    </div>
                                    <textarea name="desc" rows={4} className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"></textarea>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </nav>
        </div>
    )
}
