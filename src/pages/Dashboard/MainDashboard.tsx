import ReactApexChart from "react-apexcharts";
import IconCaretDown from "../../components/Icon/IconCaretDown";
import IconPlus from "../../components/Icon/IconPlus";
import IconLink from "../../components/Icon/IconLink";
import IconUsersGroup from "../../components/Icon/IconUsersGroup";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {
    const navigate = useNavigate();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
   useEffect(()=>{
   if(!crmToken)navigate('/login')
   },[crmToken])


    return (
        <div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                <div className="panel h-full p-0 border-0 overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-[#4361ee] to-[#160f6b] min-h-[130px]">
                        <div className="text-white flex justify-between items-center">
                            <p className="text-xl">Total Leads</p>
                            <h5 className="ltr:ml-auto rtl:mr-auto text-2xl">
                                <span className="text-white-light"></span>2953
                            </h5>
                        </div>
                    </div>
                    <div className="-mt-12 px-8 grid grid-cols-2 gap-2">
                        <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
                            <span className="flex justify-between items-center mb-4 dark:text-white">
                                Closed Won
                            </span>
                            <div className="btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]">9799</div>
                        </div>
                        <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
                            <span className="flex justify-between items-center mb-4 dark:text-white">
                                Other Leads
                            </span>
                            <div className="btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]">5300</div>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                            <p className="text-[#515365] font-semibold">Today's Call</p>
                                <p className="text-base">
                                    <span className="font-semibold ">1566</span>
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-[#515365] font-semibold">Today's Follow Up</p>
                                <p className="text-base">
                                   <span className="font-semibold">1385</span>
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                            <p className="text-[#515365] font-semibold">Today's Free Trail</p>
                                <p className="text-base">
                                    <span className="font-semibold ">1566</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel h-full p-0 border-0 overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-[#258433] to-[#065011] min-h-[130px]">
                        <div className="text-white flex justify-between items-center">
                            <p className="text-xl">Total Sales</p>
                            <h5 className="ltr:ml-auto rtl:mr-auto text-2xl">
                                <span className="text-white-light"></span>2953
                            </h5>
                        </div>
                    </div>
                    <div className="-mt-12 px-8 grid grid-cols-2 gap-2">
                        <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
                            <span className="flex justify-between items-center mb-4 dark:text-white">
                                Today Sales
                            </span>
                            <div className="btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]">9799</div>
                        </div>
                        <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
                            <span className="flex justify-between items-center mb-4 dark:text-white">
                                Monthly Sales
                            </span>
                            <div className="btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]">5300</div>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                            <p className="text-[#515365] font-semibold">Today's Call</p>
                                <p className="text-base">
                                    <span className="font-semibold ">1566</span>
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-[#515365] font-semibold">Today's Follow Up</p>
                                <p className="text-base">
                                   <span className="font-semibold">1385</span>
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                            <p className="text-[#515365] font-semibold">Today's Free Trail</p>
                                <p className="text-base">
                                    <span className="font-semibold ">1566</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel h-full p-0 border-0 overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-[#193B8B] to-[#0A2564] min-h-[130px]">
                        <div className="text-white flex justify-between items-center">
                            <p className="text-xl">Total Employee</p>
                            <h5 className="ltr:ml-auto rtl:mr-auto text-2xl">
                                <span className="text-white-light"></span>2953
                            </h5>
                        </div>
                    </div>
                    <div className="-mt-12 px-8 grid grid-cols-2 gap-2">
                        <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
                            <span className="flex justify-between items-center mb-4 dark:text-white">
                                Total BDE
                            </span>
                            <div className="btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]">9799</div>
                        </div>
                        <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
                            <span className="flex justify-between items-center mb-4 dark:text-white">
                                Total Team Leaders
                            </span>
                            <div className="btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]">5300</div>
                        </div>
                        <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
                            <span className="flex justify-between items-center mb-4 dark:text-white">
                                Total Managers
                            </span>
                            <div className="btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]">5300</div>
                        </div>
                        <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
                            <span className="flex justify-between items-center mb-4 dark:text-white">
                                Others
                            </span>
                            <div className="btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]">5300</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;
