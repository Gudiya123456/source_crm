import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import PerfectScrollbar from 'react-perfect-scrollbar';
export default function NotificationBox({ showNotificationDrawer, setShowNotificationDrawer }: any) {

    return (
        <div>
            <div className={`${(showNotificationDrawer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`}  onClick={() => setShowNotificationDrawer(false)}></div>

            <nav className={`${(showNotificationDrawer && 'ltr:!right-0 rtl:!left-0') || ''
                    } bg-white fixed ltr:-right-[800px] rtl:-left-[800px] top-0 bottom-0 w-full max-w-[600px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-1000 z-[51] dark:bg-black p-4`}>
                <div className="flex flex-col h-screen overflow-hidden">
                    <div className="w-full text-center  p-4">
                        <button type="button" className="px-4 py-4 absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowNotificationDrawer(false)}>
                            <IoCloseSharp className=" w-5 h-5" />
                        </button>
                        <h3 className="mb-1 dark:text-white font-bold text-[18px]">Send Recommendation</h3>
                        <hr className="my-4 dark:border-[#191e3a]" />
                    </div>
                    <section className="flex-1 overflow-y-auto overflow-x-hidden perfect-scrollbar mt-5">
                        <PerfectScrollbar className="relative h-full sm:h-[calc(100vh_-_300px)] chat-conversation-box">
                            <div className="space-y-5 p-4 sm:pb-0 pb-[68px] sm:min-h-[300px] min-h-[400px]">
                                <div className="flex items-start gap-3 justify-end">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PerfectScrollbar>
                    </section>
                </div>
            </nav>
        </div>
    )
}
