import { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import CommonLeftnav from '../CommonLeftnav';
import Flatpickr from 'react-flatpickr';
import ReactApexChart from 'react-apexcharts';

const CustomDashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {dispatch(setPageTitle('Custom Dashboard'));});

    const navigate = useNavigate();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
   useEffect(()=>{
   if(!crmToken)navigate('/login')
   },[crmToken])

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    // CallsHistoryLeadsChart
    const CallsHistoryLeadsChart: any = {
        series: [
            {
                name: 'Leads',
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
        ],
        options: {
            chart: {
                type: 'area',
                height: 300,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#805dca'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                curve: 'smooth',
            },
            xaxis: {
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -40 : 0,
                },
            },
            labels: ['EmpName1', 'EmpName2', 'EmpName3', 'EmpName4', 'EmpName5', 'EmpName6', 'EmpName7', 'EmpName8', 'EmpName9', 'EmpName10', 'EmpName11', 'EmpName12'],
            legend: {
                horizontalAlign: 'left',
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
        },
    };
    // FreeTrailLeadsChart
    const FreeTrailLeadsChart: any = {
        series: [
            {
                name: 'Leads',
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
        ],
        options: {
            chart: {
                type: 'area',
                height: 300,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#805dca'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                curve: 'smooth',
            },
            xaxis: {
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -40 : 0,
                },
            },
            labels: ['EmpName1', 'EmpName2', 'EmpName3', 'EmpName4', 'EmpName5', 'EmpName6', 'EmpName7', 'EmpName8', 'EmpName9', 'EmpName10', 'EmpName11', 'EmpName12'],
            legend: {
                horizontalAlign: 'left',
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
        },
    };
    // FollowUpLeadsChart
    const FollowUpLeadsChart: any = {
        series: [
            {
                name: 'Leads',
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
        ],
        options: {
            chart: {
                type: 'area',
                height: 300,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#805dca'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                curve: 'smooth',
            },
            xaxis: {
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -40 : 0,
                },
            },
            labels: ['EmpName1', 'EmpName2', 'EmpName3', 'EmpName4', 'EmpName5', 'EmpName6', 'EmpName7', 'EmpName8', 'EmpName9', 'EmpName10', 'EmpName11', 'EmpName12'],
            legend: {
                horizontalAlign: 'left',
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
        },
    };
    // OngoingFreeTrailLeadsChart
    const OngoingFreeTrailLeadsChart: any = {
        series: [
            {
                name: 'Leads',
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
        ],
        options: {
            chart: {
                type: 'area',
                height: 300,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#805dca'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                curve: 'smooth',
            },
            xaxis: {
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -40 : 0,
                },
            },
            labels: ['EmpName1', 'EmpName2', 'EmpName3', 'EmpName4', 'EmpName5', 'EmpName6', 'EmpName7', 'EmpName8', 'EmpName9', 'EmpName10', 'EmpName11', 'EmpName12'],
            legend: {
                horizontalAlign: 'left',
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
        },
    };
    const [CustomDate, selectDate] = useState<any>('2022-07-05 to 2022-07-10');
    return (
        <div>
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                <div className={`panel xl:block p-4 dark:gray-50 w-[300px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden`}>
                    <div className="flex flex-col h-full pb-16">
                        <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                            <div className="space-y-1">
                                <CommonLeftnav/>
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>
                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                    <div className="flex flex-col h-full">
                    <div className='panel'>
                        <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                            <div className="w-[260px]">
                                <h5 className="font-semibold text-lg dark:text-white-light">Custom Dashboard </h5>
                            </div>
                            <div className="flex ltr:ml-auto rtl:mr-auto">
                                <form className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                        <div>
                                            <label htmlFor="dropdownValue">Select Duration</label>
                                            <Flatpickr
                                                options={{
                                                    mode: 'range',
                                                    dateFormat: 'Y-m-d',
                                                    position: isRtl ? 'auto right' : 'auto left',
                                                }}
                                                value={CustomDate}
                                                className="form-input"
                                                onChange={(CustomDate) => selectDate(CustomDate)}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <hr className="my-4 dark:border-[#191e3a]" />
                        <div className='mb-5'>
                            <div className="panel mb-4">
                                <div className="mb-5 flex items-center justify-between">
                                    <h5 className="text-lg font-semibold dark:text-white">Calls History</h5>
                                </div>
                                <div className="mb-5">
                                    <ReactApexChart series={CallsHistoryLeadsChart.series} options={CallsHistoryLeadsChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="area" height={300} />
                                </div>
                            </div>

                            <div className="panel mb-4">
                                <div className="mb-5 flex items-center justify-between">
                                    <h5 className="text-lg font-semibold dark:text-white">Free Trail</h5>
                                </div>
                                <div className="mb-5">
                                    <ReactApexChart series={FreeTrailLeadsChart.series} options={FreeTrailLeadsChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="area" height={300} />
                                </div>
                            </div>
                            <div className="panel mb-4">
                                <div className="mb-5 flex items-center justify-between">
                                    <h5 className="text-lg font-semibold dark:text-white">Follow Up</h5>
                                </div>
                                <div className="mb-5">
                                    <ReactApexChart series={FollowUpLeadsChart.series} options={FollowUpLeadsChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="area" height={300} />
                                </div>
                            </div>
                            <div className="panel mb-4">
                                <div className="mb-5 flex items-center justify-between">
                                    <h5 className="text-lg font-semibold dark:text-white">Ongoing Free Trail</h5>
                                </div>
                                <div className="mb-5">
                                    <ReactApexChart series={OngoingFreeTrailLeadsChart.series} options={OngoingFreeTrailLeadsChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="area" height={300} />
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomDashboard;
