import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";

export default function AreaDrawer({ showDrawer, setShowDrawer }: any) {

    return (
        <div>
            <div className={`${(showDrawer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} ></div>

            <nav
                className={`${(showDrawer && 'ltr:!right-0 rtl:!left-0') || ''
                    } bg-white fixed ltr:-right-[800px] rtl:-left-[800px] top-0 bottom-0 w-full max-w-[800px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-1000 z-[51] dark:bg-black p-4`}
            >

                {showDrawer && (<button
                    type="button"
                    className="bg-danger ltr:rounded-tl-full rtl:rounded-tr-full ltr:rounded-bl-full rtl:rounded-br-full absolute ltr:-left-12 rtl:-right-12 top-0 bottom-0 my-auto w-12 h-10 flex justify-center items-center text-white cursor-pointer"
                    onClick={() => setShowDrawer(!showDrawer)}
                >
                    <IoCloseSharp className=" w-5 h-5" />
                </button>)}

                <div className="flex flex-col h-screen overflow-hidden">
                    <div className="w-full text-center border-b border-grey p-4">
                        <button type="button" className="px-4 py-4 absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowDrawer(false)}>
                            <IoCloseSharp className=" w-5 h-5" />
                        </button>
                        <h4 className="mb-1 dark:text-white font-bold">Add Area</h4>
                        <p className="text-white-dark">Set preferences that will be cookied for your live preview demonstration.</p>
                    </div>

                    <section className="flex-1 overflow-y-auto overflow-x-hidden perfect-scrollbar mt-5">
                        <form action="" method="post" className='p-5'>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="gridEmail" className='text-white-dark'>Area Type</label>
                                    <select name="" id="" className="form-select" >
                                        <option value="">One</option>
                                        <option value="">Two</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="gridEmail" className='text-white-dark'>Area Name</label>
                                    <input type="text" className="form-input" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="gridEmail" className='text-white-dark'>Containers Charges</label>
                                    <select name="" id="" className="form-select" >
                                        <option value="">One</option>
                                        <option value="">Two</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="gridEmail" className='text-white-dark'>Service Charge</label>
                                    <select name="" id="" className="form-select" >
                                        <option value="">One</option>
                                        <option value="">Two</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="gridEmail" className='text-white-dark'>Tables</label>
                                <label className="inline-flex cursor-pointer">
                                    <input type="checkbox" className="form-checkbox text-success" />
                                    <span className="text-white-dark">Check All</span>
                                </label>
                            </div>
                            <div className='mt-2'>
                                <label className="inline-flex me-2">
                                    <input type="checkbox" className="form-checkbox text-success" />
                                    <span>Table 1</span>
                                </label>
                                <label className="inline-flex me-2">
                                    <input type="checkbox" className="form-checkbox text-success" />
                                    <span>Table 2</span>
                                </label>
                                <label className="inline-flex me-2">
                                    <input type="checkbox" className="form-checkbox text-success" />
                                    <span>Table 3</span>
                                </label>
                            </div>

                            <div className='mt-4'>
                                <label htmlFor="gridEmail" className='text-white-dark'>Status</label>
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="outline_checkbox bg-icon border-2 border-danger dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-danger dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full before:bg-[url(/assets/images/close.svg)] before:bg-no-repeat before:bg-center peer-checked:before:left-7 peer-checked:before:bg-[url(/assets/images/checked.svg)] peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300"></span>
                                </label>
                            </div>

                        </form>
                    </section>
                    <footer className="w-full text-center border-t border-grey p-4">
                        <div className='flex justify-end gap-5 py-2'>
                            <button className='btn shadow' onClick={() => setShowDrawer(false)}>Cancel</button>
                            <button className='btn btn-dark'>Save Changes</button>
                        </div>
                    </footer>
                </div>
            </nav>
        </div>
    )
}
