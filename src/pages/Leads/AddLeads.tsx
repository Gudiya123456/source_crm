import { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import Select from 'react-select';
import { Link, NavLink } from 'react-router-dom';
import { IRootState } from '../../store';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import CommonLeftnav from '../CommonLeftnav';

const options5 = [
  { value: 'orange', label: 'Orange' },
  { value: 'white', label: 'White' },
  { value: 'purple', label: 'Purple' },
];
const AddLeads = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Add Leads'));
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
                          <h5 className="font-semibold text-lg dark:text-white-light">Create New Leads</h5>
                          <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        <hr className="my-4 dark:border-[#191e3a]" />
                        {/* Add New Leads */}
                        <div className='mb-5 space-y-5'>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="owner">Lead Owner</label>
                                    <input name="owner" type="text" placeholder="Lead Owner Name" className="form-input" readOnly/>
                                </div>
                                <div>
                                    <label htmlFor="first_name">First Name</label>
                                    <input name="first_name" type="text" placeholder="Enter First Name" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="last_name">Last Name</label>
                                    <input name="last_name" type="text" placeholder="Enter Last Name" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="phone">Lead Mobile Number</label>
                                    <input name="phone" type="text" placeholder="Enter Lead Mobile Number" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="second_phone">Alternative Mobile Number</label>
                                    <input name="second_phone" type="text" placeholder="Enter Lead Mobile Number" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="email">Lead Email</label>
                                    <input id="email" type="email" placeholder="Enter Lead Email Address" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="status">Lead Status</label>
                                    <select name="status" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="source">Lead Source</label>
                                    <input id="source" type="text" placeholder="Enter Lead Mobile Number" className="form-input" />
                                </div>
                                {/* <div>
                                    <label htmlFor="invest">Investment</label>
                                    <select name="status" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div> */}
                                <div>
                                    <label htmlFor="state">State</label>
                                    <select id="state" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="city">City</label>
                                    <input id="city" type="text" placeholder="Enter City" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="products">Products</label>
                                    <Select placeholder="Select an Products" options={options5} isMulti isSearchable={false}/>
                                </div>
                                <div>
                                    <label htmlFor="followup">Followup Date</label>
                                    <Flatpickr value={date1} name="followup" options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date) => setDate1(date)} />
                                </div>
                                <div>
                                    <label htmlFor="first_trail">1st Date</label>
                                    <Flatpickr value={date1} name="first_trail" options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date) => setDate1(date)} />
                                </div>
                                <div>
                                    <label htmlFor="second_trail">2nd Date</label>
                                    <Flatpickr value={date1} name="second_trail" options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date) => setDate1(date)} />
                                </div>
                                <div>
                                    <label htmlFor="invest">Investment Size</label>
                                    <select name="invest" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="lotSize">Lot Size</label>
                                    <select id="lotSize" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="dnd">DND Status</label>
                                    <select id="dnd" className="form-select text-white-dark">
                                        <option>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                              <div className="flex">
                                  <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] whitespace-nowrap">
                                  Description
                                  </div>
                                  <textarea name="desc" rows={4} className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"></textarea>
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

export default AddLeads;
