import { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import { IRootState } from '../../store';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import CommonLeftnav from '../CommonLeftnav';

const options5 = [
  { value: 'orange', label: 'Orange' },
  { value: 'white', label: 'White' },
  { value: 'purple', label: 'Purple' },
];
const UploadLeads = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Upload Leads'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('2022-07-05');
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
                      <div id='forms_grid' className='panel'>
                        <div className='flex items-center justify-between mb-5'>
                          <h5 className="font-semibold text-lg dark:text-white-light">Bulk Upload</h5>
                          <button type="submit" className="btn btn-success">Fetch Data</button>
                        </div>
                        <hr className="my-4 dark:border-[#191e3a]" />
                        <div className='mb-5'>
                          <form className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="leadName">Lead Name</label>
                                    <select id="leadName" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="leadEmail">Lead Email</label>
                                    <select id="leadEmail" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="leadMobile">Lead Mobile Number</label>
                                    <select id="leadMobile" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <div>
                                    <label htmlFor="leadStatus">Lead Status</label>
                                    <select id="leadStatus" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="leadSource">Lead Source</label>
                                    <select id="leadSource" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="leadState">Lead State</label>
                                    <select id="leadState" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="leadCity">Lead City</label>
                                    <select id="leadCity" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>
                          </form>  
                        </div>
                      </div>
      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadLeads;
