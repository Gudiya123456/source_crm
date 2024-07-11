import { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import IconUsersGroup from '../../components/Icon/IconUsersGroup';
import IconChatDots from '../../components/Icon/IconChatDots';
import IconLink from '../../components/Icon/IconLink';
import CommonLeftnav from '../CommonLeftnav';
import ReactApexChart from 'react-apexcharts';
import { IRootState } from '../../store';

const LeadsDashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {dispatch(setPageTitle('Lead Dashboard'));});

    const navigate = useNavigate();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    useEffect(()=>{
    if(!crmToken)navigate('/login')
    },[crmToken])

    // followersOptions
    const followers: any = {
        series: [
            {
                data: [38, 60, 38, 52, 36, 40, 28],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: ['#4361ee'],
            grid: {
                padding: {
                    top: 5,
                },
            },
            yaxis: {
                show: false,
            },
            tooltip: {
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        },
    };
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    // allLeadsChart
    const allLeadsChart: any = {
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
    // newLeadsChart
    const newLeadsChart: any = {
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
    // LeadsbyStatus
    const LeadsbyStatus: any = {
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
            labels: ['Followup', 'Status', 'Status', 'Status', 'Status', 'Status', 'Status', 'Status', 'Status', 'Status', 'Status', 'Status'],
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

                <div className=" p-0 flex-1 overflow-x-hidden h-full">
                    <div className="flex flex-col h-full">
                        <div className="panel mb-4">
                            <div className="mb-5 flex items-center justify-between">
                                <h5 className="text-lg font-semibold dark:text-white">All Leads</h5>
                                <span className="flex items-center">
                                    Total Leads - 0
                                </span>
                            </div>
                            <div className="mb-5">
                                <ReactApexChart series={allLeadsChart.series} options={allLeadsChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="area" height={300} />
                            </div>
                        </div>
                        <div className="panel mb-4">
                            <div className="mb-5 flex items-center justify-between">
                                <h5 className="text-lg font-semibold dark:text-white">New Leads</h5>
                                <span className="flex items-center">
                                    Total New Leads - 0
                                </span>
                            </div>
                            <div className="mb-5">
                                <ReactApexChart series={newLeadsChart.series} options={newLeadsChart.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="area" height={300} />
                            </div>
                        </div>
                        <div className="panel mb-2">
                            <div className="mb-5 flex items-center justify-between">
                                <h5 className="text-lg font-semibold dark:text-white">Leads By Status</h5>
                                <span className="flex items-center">
                                    Total Leads - 0
                                </span>
                            </div>
                            <div className="mb-5">
                                <ReactApexChart series={LeadsbyStatus.series} options={LeadsbyStatus.options} className="rounded-lg bg-white dark:bg-black overflow-hidden" type="area" height={300} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LeadsDashboard;
