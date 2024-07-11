import { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import IconUsersGroup from '../../components/Icon/IconUsersGroup';
import IconLink from '../../components/Icon/IconLink';
import IconChatDots from '../../components/Icon/IconChatDots';
import CommonLeftnav from '../CommonLeftnav';
import { IRootState } from '../../store';

const SalesDashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {dispatch(setPageTitle('Sales Dashboard'));});

    const navigate = useNavigate();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    useEffect(()=>{
    if(!crmToken)navigate('/login')
    },[crmToken])

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
                <div className="p-0 flex-1 overflow-x-hidden h-full">
                    <div className="flex flex-col h-full">
                    <div className="grid sm:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                        <div className="panel h-full p-0">
                            <div className="flex p-5">
                                <div className="shrink-0 bg-primary/10 text-primary rounded-xl w-11 h-11 flex justify-center items-center dark:bg-primary dark:text-white-light">
                                    <IconUsersGroup className="w-5 h-5" />
                                </div>
                                <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                                    <p className="text-xl dark:text-white-light">31.6K</p>
                                    <h5 className="text-[#506690] text-xs">Total Leads</h5>
                                </div>
                            </div>
                        </div>

                        <div className="panel h-full p-0">
                            <div className="flex p-5">
                                <div className="shrink-0 bg-danger/10 text-danger rounded-xl w-11 h-11 flex justify-center items-center dark:bg-danger dark:text-white-light">
                                    <IconLink className="w-5 h-5" />
                                </div>
                                <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                                    <p className="text-xl dark:text-white-light">1,900</p>
                                    <h5 className="text-[#506690] text-xs">Closed Won</h5>
                                </div>
                            </div>
                        </div>

                        <div className="panel h-full p-0">
                            <div className="flex p-5">
                                <div className="shrink-0 bg-success/10 text-success rounded-xl w-11 h-11 flex justify-center items-center dark:bg-success dark:text-white-light">
                                    <IconChatDots className="w-5 h-5" />
                                </div>
                                <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                                    <p className="text-xl dark:text-white-light">18.2%</p>
                                    <h5 className="text-[#506690] text-xs">Free Trail</h5>
                                </div>
                            </div>
                        </div>
                        <div className="panel h-full p-0">
                            <div className="flex p-5">
                                <div className="shrink-0 bg-success/10 text-success rounded-xl w-11 h-11 flex justify-center items-center dark:bg-success dark:text-white-light">
                                    <IconChatDots className="w-5 h-5" />
                                </div>
                                <div className="ltr:ml-3 rtl:mr-3 font-semibold">
                                    <p className="text-xl dark:text-white-light">18.2%</p>
                                    <h5 className="text-[#506690] text-xs">Follow Up</h5>
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

export default SalesDashboard;
