import { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import { NavLink } from 'react-router-dom';
import { TbCircleLetterG } from "react-icons/tb";
import { FiArrowRightCircle } from "react-icons/fi";
import { TbCircleLetterE } from "react-icons/tb";
import { TbCircleLetterD } from "react-icons/tb";
import { TbCircleLetterP } from "react-icons/tb";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';

const tableData = [
    {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@yahoo.com',
        date: '10/08/2020',
        sale: 120,
        status: 'Download',
        register: '5 min ago',
        progress: '40%',
        position: 'Developer',
        office: 'London',
    },
];
const GenerateReport = () => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(setPageTitle('Generate Report')); });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date3, setDate3] = useState<any>('2022-07-05 to 2022-07-10');
    return (
        <div>
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                <div className={`panel xl:block p-4 dark:gray-50 w-[400px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden`}>
                    <div className=''>
                        <div className='flex items-center justify-between mb-5'>
                            <h5 className="font-semibold text-lg dark:text-white-light">Report Details</h5>
                        </div>
                        <hr className="my-4 dark:border-[#191e3a]" />    
                        <div className='mb-5'>
                            <form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="generateType">Generate Type</label>
                                        <select id="generateType" className="form-select text-white-dark">
                                            <option>Select Type</option>
                                            <option>Leads</option>
                                            <option>Sales</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="reportStatus">Status</label>
                                        <select id="reportStatus" className="form-select text-white-dark">
                                            <option>Select Status</option>
                                            <option>All</option>
                                            <option>Closed Won</option>
                                            <option>Followup</option>
                                            <option>Free Trail</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="dropdownValue">Select Duration</label>
                                        <Flatpickr
                                            options={{
                                                mode: 'range',
                                                dateFormat: 'Y-m-d',
                                                position: isRtl ? 'auto right' : 'auto left',
                                            }}
                                            value={date3}
                                            className="form-input"
                                            onChange={(date3) => setDate3(date3)}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                    <div>
                                        <label htmlFor="reportName">Report Name</label>
                                        <input id="reportName" type="text" placeholder="Enter Report Name" className="form-input" />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary mt-6"> Add </button>
                            </form>  
                        </div>  
                    </div>
                </div>
                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                    <div className="flex flex-col h-full">
                        <div className='panel'>
                            <div className='flex items-center justify-between mb-5'>
                                <h5 className="font-semibold text-lg dark:text-white-light">Report List</h5>
                            </div>
                            <hr className="my-4 dark:border-[#191e3a]" />    
                            <div className='mb-5'>
                            <div className="table-responsive mb-5">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Duration</th>
                                            <th>Report Name</th>
                                            <th>File</th>
                                            <th>Created By</th>
                                            <th>Created On</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((data) => {
                                            return (
                                                <tr key={data.id}>
                                                    <td>{data.id}</td>
                                                    <td>
                                                        <div className="whitespace-nowrap">{data.name}</div>
                                                    </td>
                                                    <td>{data.email}</td>
                                                    <td className="text-center">{data.register}</td>
                                                    <td className="text-center">{data.register}</td>
                                                    <td>
                                                        <span
                                                            className={`badge whitespace-nowrap ${
                                                                data.status === 'Download'
                                                                    ? 'badge-outline-primary'
                                                                    : data.status === 'Pending'
                                                                    ? 'badge-outline-secondary'
                                                                    : data.status === 'In Progress'
                                                                    ? 'badge-outline-info'
                                                                    : data.status === 'Canceled'
                                                                    ? 'badge-outline-danger'
                                                                    : 'badge-outline-primary'
                                                            }`}
                                                        >
                                                            {data.status}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">{data.register}</td>
                                                    <td className="text-center">{data.register}</td>
                                                    <td className="text-center">{data.register}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateReport;
