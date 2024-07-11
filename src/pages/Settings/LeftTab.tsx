import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiArrowRightCircle } from 'react-icons/fi'
import { TbCircleLetterD, TbCircleLetterE, TbCircleLetterG, TbCircleLetterP, TbCircleLetterL, TbCircleLetterI, TbCircleLetterW, TbCircleLetterS } from 'react-icons/tb'
import { FaWandMagicSparkles, FaArrowsDownToLine } from "react-icons/fa6";
import { FcGlobe } from "react-icons/fc";
import { FaGlobeAmericas, FaUsers, FaRupeeSign } from "react-icons/fa";
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import { IRootState } from '../../store'
import { RiWhatsappFill } from "react-icons/ri";
import { MdSms, MdEmail } from "react-icons/md";
import { BsTrophyFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineSecurity } from "react-icons/md";
import { setPageTitle, setSettingTap } from '../../store/themeConfigSlice';
export default function LeftTab() {
    const dispatch = useDispatch();
    const settingTap = useSelector((state: IRootState) => state.themeConfig.settingTap);
    const settingData = useSelector((state: IRootState) => state.themeConfig.settingData);

    //    useEffect(()=>{
    // console.log(dropdowns)
    //    },[dropdowns])
    return (
        <div className="space-y-1">
            <button onClick={() => dispatch(setSettingTap('general'))} className='w-full'>
                <div className={`py-2 px-4 mb-2 ${settingTap == "general" ? 'bg-dark text-white' : 'bg-primary-light'}`}>
                    <div className="flex justify-between">
                        <div className="flex items-center w-max flex-none">
                            <div className="bg-gray-300 dark:bg-gray-700 rounded-full p-2">
                                <TbCircleLetterG className="w-4.5 h-4.5" />
                            </div>
                            <div className="ltr:ml-2 rtl:mr-2">
                                <div className="font-semibold">General</div>
                                <div className="text-sx text-white-dark">Settings</div>
                            </div>
                        </div>
                        <div className="p-2">
                            <FiArrowRightCircle className="w-4.5 h-4.5" />
                        </div>
                    </div>
                </div>
            </button>
            <button onClick={() => dispatch(setSettingTap('employee'))} className='w-full'>
                <div className={`py-2 px-4 mb-2  ${settingTap == "employee" ? 'bg-dark text-white' : 'bg-primary-light'}`}>
                    <div className="flex justify-between">
                        <div className="flex items-center w-max flex-none">
                            <div className="bg-gray-300 dark:bg-gray-700 rounded-full p-2">
                                <TbCircleLetterE className="w-4.5 h-4.5" />
                            </div>
                            <div className="ltr:ml-2 rtl:mr-2">
                                <div className="font-semibold text-left">Employee</div>
                                <div className="text-sx text-white-dark">Add, Edit, Delete</div>
                            </div>
                        </div>
                        <div className="p-2">
                            <FaUsers className="w-4.5 h-4.5" />
                        </div>
                    </div>
                </div>
            </button>
            <button onClick={() => dispatch(setSettingTap('permission'))} className='w-full'>
                <div className={`py-2 px-4 mb-2  ${settingTap == "permission" ? 'bg-dark text-white' : 'bg-primary-light'}`}>
                    <div className="flex justify-between">
                        <div className="flex items-center w-max flex-none">
                            <div className="bg-gray-300 dark:bg-gray-700 rounded-full p-2">
                                <TbCircleLetterP className="w-4.5 h-4.5" />
                            </div>
                            <div className="ltr:ml-2 rtl:mr-2">
                                <div className="font-semibold text-left">Permission</div>
                                <div className="text-sx text-white-dark">Add, Edit, Delete</div>
                            </div>
                        </div>
                        <div className="p-2">
                            <MdOutlineSecurity className="w-4.5 h-4.5" />
                        </div>
                    </div>
                </div>
            </button>
            <button onClick={() => dispatch(setSettingTap('dropdown'))} className='w-full'>
                <div className={`py-2 px-4 mb-2 ${settingTap == "dropdown" ? 'bg-dark text-white' : 'bg-primary-light'}`}>
                    <div className="flex justify-between">
                        <div className="flex items-center w-max flex-none">
                            <div className="bg-gray-300 dark:bg-gray-700 rounded-full p-2">
                                <TbCircleLetterD className="w-4.5 h-4.5" />
                            </div>
                            <div className="ltr:ml-2 rtl:mr-2">
                                <div className="font-semibold">Dropdown</div>
                                <div className="text-sx text-white-dark text-left">Fields</div>
                            </div>
                        </div>
                        <div className="p-2">
                            <FaArrowsDownToLine className="w-4.5 h-4.5" />
                        </div>
                    </div>
                </div>
            </button>
            <button onClick={() => dispatch(setSettingTap('product'))} className='w-full'>
                <div className={`py-2 px-4 mb-2 ${settingTap == "product" ? 'bg-dark text-white' : 'bg-primary-light'}`}>
                    <div className="flex justify-between">
                        <div className="flex items-center w-max flex-none">
                            <div className="bg-gray-300 dark:bg-gray-700 rounded-full p-2">
                                <TbCircleLetterP className="w-4.5 h-4.5" />
                            </div>
                            <div className="ltr:ml-2 rtl:mr-2">
                                <div className="font-semibold text-left">Products</div>
                                <div className="text-sx text-white-dark text-left">Add, Edit, Delete</div>
                            </div>
                        </div>
                        <div className="p-2">
                            <BsTrophyFill className="w-4.5 h-4.5" />
                        </div>
                    </div>
                </div>
            </button>
            {/* <button onClick={() => dispatch(setSettingTap('leadautomation'))} className='w-full'>
                <div className={`py-2 px-4 mb-2 ${settingTap == "leadautomation" ? 'bg-dark text-white' : 'bg-primary-light'}`}>
                    <div className="flex justify-between">
                        <div className="flex items-center w-max flex-none">
                            <div className="bg-gray-300 dark:bg-gray-700 rounded-full p-2">
                                <TbCircleLetterL className="w-4.5 h-4.5" />
                            </div>
                            <div className="ltr:ml-2 rtl:mr-2">
                                <div className="font-semibold text-left">Lead Automation</div>
                                <div className="text-sx text-white-dark text-left">AI</div>
                            </div>
                        </div>
                        <div className="p-2">
                            <FaWandMagicSparkles className="w-4.5 h-4.5" />
                        </div>
                    </div>
                </div>
            </button> */}
            {
                settingData?.set_whatsapp==1 &&
                <button onClick={() => dispatch(setSettingTap('whatsapp'))} className='w-full'>
                <div className={`py-2 px-4 mb-2 ${settingTap == "whatsapp" ? 'bg-dark text-white' : 'bg-primary-light'}`}>
                    <div className="flex justify-between">
                        <div className="flex items-center w-max flex-none">
                            <div className="bg-gray-300 dark:bg-gray-700 rounded-full p-2">
                                <TbCircleLetterW className="w-4.5 h-4.5" />
                            </div>
                            <div className="ltr:ml-2 rtl:mr-2">
                                <div className="font-semibold text-left">WhatsApp</div>
                                <div className="text-sx text-white-dark text-left">Template Integration</div>
                            </div>
                        </div>
                        <div className="p-2">
                            <RiWhatsappFill className="w-4.5 h-4.5" />
                        </div>
                    </div>
                </div>
            </button>
            }

           {
            settingData?.set_sms==1 && <button onClick={() => dispatch(setSettingTap('sms'))} className='w-full'>
            <div className={`py-2 px-4 mb-2 ${settingTap == "sms" ? 'bg-dark text-white' : 'bg-primary-light'}`}>
                <div className="flex justify-between">
                    <div className="flex items-center w-max flex-none">
                        <div className="bg-gray-300 dark:bg-gray-700 rounded-full p-2">
                            <TbCircleLetterS className="w-4.5 h-4.5" />
                        </div>
                        <div className="ltr:ml-2 rtl:mr-2">
                            <div className="font-semibold text-left">SMS</div>
                            <div className="text-sx text-white-dark text-left">Template Integration</div>
                        </div>
                    </div>
                    <div className="p-2">
                        <MdSms className="w-4.5 h-4.5" />
                    </div>
                </div>
            </div>
        </button>
           }



            {
                settingData?.set_email==1 &&   <button onClick={() => dispatch(setSettingTap('email'))} className='w-full'>
                <div className={`py-2 px-4 mb-2 ${settingTap == "email" ? 'bg-dark text-white' : 'bg-primary-light'}`}>
                    <div className="flex justify-between">
                        <div className="flex items-center w-max flex-none">
                            <div className="bg-gray-300 dark:bg-gray-700 rounded-full p-2">
                                <TbCircleLetterE className="w-4.5 h-4.5" />
                            </div>
                            <div className="ltr:ml-2 rtl:mr-2">
                                <div className="font-semibold text-left">Email</div>
                                <div className="text-sx text-white-dark text-left">SMTP Integration</div>
                            </div>
                        </div>
                        <div className="p-2">
                            <MdEmail className="w-4.5 h-4.5" />
                        </div>
                    </div>
                </div>
            </button>
            }

            <button onClick={() => dispatch(setSettingTap('payments'))} className='w-full'>
                <div className={`py-2 px-4 mb-2 ${settingTap == "payments" ? 'bg-dark text-white' : 'bg-primary-light'}`}>
                    <div className="flex justify-between">
                        <div className="flex items-center w-max flex-none">
                            <div className="bg-gray-300 dark:bg-gray-700 rounded-full p-2">
                                <TbCircleLetterP className="w-4.5 h-4.5" />
                            </div>
                            <div className="ltr:ml-2 rtl:mr-2">
                                <div className="font-semibold text-left">Payments</div>
                                <div className="text-sx text-white-dark text-left">Bank Gateway</div>
                            </div>
                        </div>
                        <div className="p-2">
                            <FaRupeeSign className="w-4.5 h-4.5" />
                        </div>
                    </div>
                </div>
            </button>
            <button onClick={() => dispatch(setSettingTap('iptracking'))} className='w-full'>
                <div className={`py-2 px-4 mb-2 ${settingTap == "iptracking" ? 'bg-dark text-white' : 'bg-primary-light'}`}>
                    <div className="flex justify-between">
                        <div className="flex items-center w-max flex-none">
                            <div className="bg-gray-300 dark:bg-gray-700 rounded-full p-2">
                                <TbCircleLetterI className="w-4.5 h-4.5" />
                            </div>
                            <div className="ltr:ml-2 rtl:mr-2">
                                <div className="font-semibold text-left">IP Tracking</div>
                                <div className="text-sx text-white-dark text-left">Last Login's</div>
                            </div>
                        </div>
                        <div className="p-2">
                            <FaGlobeAmericas className="w-4.5 h-4.5" />
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )
}
