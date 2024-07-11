import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import PerfectScrollbar from 'react-perfect-scrollbar';
export default function Chatbox({ showDrawer, setShowDrawer }: any) {

    return (
        <div>
            <div className={`${(showDrawer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`}  onClick={() => setShowDrawer(false)}></div>

            <nav
                className={`${(showDrawer && 'ltr:!right-0 rtl:!left-0') || ''
                    } bg-white fixed ltr:-right-[800px] rtl:-left-[800px] top-0 bottom-0 w-full max-w-[450px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-1000 z-[51] dark:bg-black p-4`}
            >


                <div className="flex flex-col h-screen overflow-hidden">
                    <div className="w-full text-center  p-4">
                        <button type="button" className="px-4 py-4 absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowDrawer(false)}>
                            <IoCloseSharp className=" w-5 h-5" />
                        </button>
                        <h3 className="mb-1 dark:text-white font-bold text-[18px]">Today's Recommendation</h3>
                    </div>
                    <section className="flex-1 overflow-y-auto overflow-x-hidden perfect-scrollbar mt-5">

                    <PerfectScrollbar className="relative h-full sm:h-[calc(100vh_-_300px)] chat-conversation-box">
                        <div className="space-y-5 p-4 sm:pb-0 pb-[68px] sm:min-h-[300px] min-h-[400px]">
                            <div className="block m-6 mt-0">
                                <h4 className="text-xs text-center border-b border-[#f4f4f4] dark:border-gray-800 relative">
                                    <span className="relative top-2 px-3 bg-white dark:bg-black">Thursday (04-07-2024)</span>
                                </h4>
                            </div>
                            <div className="flex items-start gap-3 justify-end">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="dark:bg-gray-800 p-4 py-2 rounded-md bg-black/10 ltr:rounded-br-none rtl:rounded-bl-none !bg-primary text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                                    </div>
                                    <div className="text-xs text-white-dark ltr:text-right rtl:text-left">5h ago</div>
                                </div>
                            </div>
                        </div>
                    </PerfectScrollbar>
                    </section>
                    <footer className="w-full text-center border-t border-grey p-4">
                        <div className='mb-3'>
                            <textarea id="ctnTextarea" rows={3} className="form-textarea" placeholder="Recommendations" required></textarea>
                        </div>
                        <div className='flex justify-end gap-5 py-2'>
                            <button className='btn shadow'>Older Broadcast</button>
                            <button className='btn btn-success'>Send Notification</button>
                        </div>
                    </footer>
                </div>
            </nav>
        </div>
    )
}
