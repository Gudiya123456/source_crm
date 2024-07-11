import { useState, useEffect, useRef } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setPageTitle, setSettingToggleData } from '../../store/themeConfigSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import LeftTab from './LeftTab';
import { IRootState } from '../../store';
import Select from 'react-select';

const Settings = () => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(setPageTitle('Settings')); });
    const APIurl = 'http://127.0.0.1:8000/api/';

    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [words, setWords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [settings, setSettings] = useState('')
    // const settingData = useSelector((state: IRootState) => state.themeConfig.settingData);

    // console.log("settingData",settingData)
    useEffect(() => {
        if (!crmToken) navigate('/login')
    }, [crmToken])

    useEffect(() => { fetchSettings(); }, [])
    const options5 = [
        { value: 'analyst', label: 'Analyst' },
        { value: 'account', label: 'Account' },
    ];
    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const response = await axios({
                method: 'get',
                url: APIurl + "settingsupdatesAPI",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            console.log(response.data);
            if (response.data.status == 'success' && response.data.settingupdates) {
                setSettings(response.data.settingupdates);
                const data = response.data.settingupdates;
                setParams({
                    id: data.id,
                    set_adminemail: data.set_adminemail,
                    set_accountemail: data.set_accountemail,
                    set_complianceemail: data.set_complianceemail,
                    set_crmname: data.set_crmname,
                    set_crmtitle: data.set_crmtitle,
                    set_crmip: data.set_crmip,
                    set_crmnews: data.set_crmnews,
                    set_logo: data.set_logo,
                    set_favicon: data.set_favicon,
                    set_whatsapp: data.set_whatsapp,
                    set_sms: data.set_sms,
                    set_application: data.set_application,
                    set_email: data.set_email,
                    set_kyc: data.set_kyc,
                    set_riskprofile: data.set_riskprofile,
                    set_aggriment: data.set_aggriment,


                });
                // dispatch(setSettingToggleData(response.data.settingupdates))
            }
        } catch (error) {
            console.log(error)
            if (error.response.status == 401) navigate('/login')
        } finally {
            setIsLoading(false);
        }
    }
    const fileLogoRef = useRef<HTMLInputElement>(null);
    const fileIconRef = useRef<HTMLInputElement>(null);
    const [logoPriview, setLogoPriview] = useState<any>('https://dummyimage.com/600x400/000/fff');
    const [iconPriview, setIconPriview] = useState<any>('https://dummyimage.com/600x400/000/fff');


    const [modal, setModal] = useState<any>(false);
    const [defaultParams] = useState({
        id: '',
        set_adminemail: "",
        set_accountemail: "",
        set_complianceemail: "",
        set_crmname: "",
        set_crmtitle: "",
        set_crmip: "",
        set_crmnews: "",
        set_logo: '',
        set_favicon: '',
        set_whatsapp: '',
        set_sms: '',
        set_application: '',
        set_email: '',
        set_kyc: '',
        set_riskprofile: '',
        set_aggriment: ''
    });

    const setImage = (e: any) => {
        const { name } = e.target;
        setErros({ ...errors, [name]: "" });
        if (e.target.files[0]) {
            if (
                e.target.files[0].type &&
                e.target.files[0].type.indexOf("image") === -1
            ) {
                setErros({ ...errors, [name]: "file is not a valid image" });
                return;
            }
            const maxSizeInBytes = 2 * 1024 * 1024;
            if (e.target.files[0].size > maxSizeInBytes) {
                setErros({ ...errors, [name]: "maximum file size is 2 mb" });
                return;
            }
            const reader = new FileReader();
            reader.onload = function (event: any) {
                if (name == "set_favicon") setIconPriview(reader.result);
                else setLogoPriview(reader.result);

                setParams({ ...params, [name]: e.target.files[0] });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const [params, setParams] = useState<any>(
        JSON.parse(JSON.stringify(defaultParams))
    );
    const [errors, setErros] = useState<any>({});

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: "" });
        setParams({ ...params, [name]: value });
        console.table(params)
    };
    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.set_crmname) {
            errors = { ...errors, set_crmname: " CRM Name is required" };
        }

        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };
    // const setSettingToggleData=useSelector((state:IRootState)=>state.themeConfig.settingToggleData);


    const [btnLoading, setBtnLoading] = useState(false);

    const UpdateSettingsApi = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: APIurl + "settingsupdatesAPI",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + crmToken,
                },
            });
            if (response.data.status == 'success') {
                // alert('sucessss');
                setSettings(settings);
                setParams(response.data.updated)
                dispatch(setSettingToggleData(response.data.updated))

                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });
            } else {

                alert("Failed")
            }

        } catch (error: any) {
            console.log(error)
            if (error.response.status == 401) navigate('/login')
            if (error?.response?.status === 422) {
                const serveErrors = error.response.data.errors;
                let serverErrors = {};
                for (var key in serveErrors) {
                    serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
                    console.log(serveErrors[key][0])
                }
                setErros(serverErrors);
                Swal.fire({
                    title: "Server Validation Error! Please solve",
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    showCancelButton: false,
                    width: 450,
                    timer: 2000,
                    customClass: {
                        popup: "color-danger"
                    }
                });
            }
        } finally {
            setBtnLoading(false)
        }
    };


    // const updateStatus = (settings: any) => {
    //     const Hello=settings
    //     const UserData={
    //         ...Hello , name:'nehaaaa',
    //         set_kyc:Hello.set_kyc==1?0:1,
    //     }
    //     setSettings(UserData);
    //     setParams(UserData);
    // }


    const updateToggle = async (e) => {
        const {
            name
        } = e.target
        console.log(name)
        try {
            const response = await axios({
                method: 'post',
                url: APIurl + "setting-toggle-update",
                data: { field: name },
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + crmToken,
                },
            });


            if (response.data.status == 'success') {
                setParams({ ...params, [name]: params[name] ? 0 : 1 })
                console.log(name)
                // dispatch(setSettingToggleData(name))

            }
            // console.log(response)
        } catch (error) {

        }
        //
    }


    const formSubmit = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("id", params.id);
        data.append("set_adminemail", params.set_adminemail);
        data.append("set_accountemail", params.set_accountemail);
        data.append("set_complianceemail", params.set_complianceemail);
        data.append("set_crmname", params.set_crmname);
        data.append("set_crmtitle", params.set_crmtitle);
        data.append("set_crmip", params.set_crmip);
        data.append("set_crmnews", params.set_crmnews);
        data.append("set_logo", params.set_logo);
        data.append("set_favicon", params.set_favicon);
        data.append("set_whatsapp", params.set_whatsapp);
        data.append("set_sms", params.set_sms);
        data.append("set_application", params.set_application);
        data.append("set_kyc", params.set_kyc);
        data.append("set_riskprofile", params.set_riskprofile);
        data.append("set_email", params.set_email);
        data.append("set_aggriment", params.set_aggriment);
        UpdateSettingsApi(data);
    };




    // useEffect(() => {
    //     const crmipdata = localStorage.getItem('crmip');
    //     console.log('crmip', JSON.parse(crmipdata));
    //     if (crmipdata) {
    //         setInputValue(JSON.parse(crmipdata));
    //     }
    // }, []);
    // Function to handle the input change for ip config

    const handleChange = (e) => {
        const newInputValue = e.target.value;
        setInputValue(newInputValue);
        console.log("newInputValue", newInputValue);
        console.log("words", words);
        console.log('settings', settings);
        // Log the current settings
        const NewSettingData = settings;
        const newSettings = { ...NewSettingData, set_crmip: words };
        console.log("newSettings", newSettings);
        // localStorage.setItem('crmip', JSON.stringify(words));

        setParams(newSettings);
        setSettings(newSettings)
    };


    // Function to handle the input key press
    const handleKeyPress = (e) => {
        if (e.key === ' ' || e.key === ',' || e.key === 'Enter') {
            e.preventDefault();
            const newWord = inputValue.trim();
            if (newWord && !words.includes(newWord)) {
                setWords([...words, newWord]);
            }
            setInputValue('');
        }
    };

    // Function to remove a word from the list
    const handleRemoveWord = (wordToRemove) => {
        setWords(words.filter(word => word !== wordToRemove));
    };

    const [crmphone, setCrmphone] = useState([]);
    useEffect(() => {
        const storedValues = localStorage.getItem('phonehide');
        console.log('phonehide', JSON.parse(storedValues))
        if (storedValues) {
            setCrmphone(JSON.parse(storedValues));
        }
    }, []);

    const handleSelectChange = (selectedOptions) => {
        const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
        const NewSettingData = settings;

        const newHidePhone = { ...NewSettingData, set_crmnews: selectedValues };
        console.log("newHidePhone", newHidePhone);
        setCrmphone(selectedValues);
        localStorage.setItem('phonehide', JSON.stringify(selectedValues));

        setParams(newHidePhone);
        setSettings(newHidePhone)

        console.log('Selected values:', selectedValues);
    };
    console.log("crmphone",crmphone)
    const newValue = crmphone?.map(value => options5.find(option => option.value === value));
    console.log('new values', newValue);

    return (
        <div className="panel p-0 flex-1 overflow-x-hidden h-full">
            {isLoading ? (<>Loading</>) : (

                <div className="flex flex-col h-full">
                    <div className='panel'>
                        <div className='flex items-center justify-between mb-5'>
                            <h5 className="font-semibold text-lg dark:text-white-light">General Settings</h5>
                            <button type="button" onClick={() => { formSubmit() }} className="btn btn-primary">{params.id ? 'Update' : 'Add'}</button>
                        </div>
                        <hr className="my-4 dark:border-[#191e3a]" />
                        <div className='mb-5 space-y-5'>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="set_adminemail">Admin Email</label>
                                    <input type="text" placeholder="Enter Admin Email" className="form-input"
                                        name='set_adminemail'
                                        value={params.set_adminemail}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.set_adminemail ? <div className="text-danger mt-1">{errors.set_adminemail}</div> : ''}
                                </div>
                                <div>
                                    <label htmlFor="set_accountemail">Account Email</label>
                                    <input type="text" placeholder="Enter Account Email" className="form-input"
                                        name='set_accountemail'
                                        value={params.set_accountemail}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.set_accountemail ? <div className="text-danger mt-1">{errors.set_accountemail}</div> : ''}
                                </div>
                                <div>
                                    <label htmlFor="set_complianceemail">Compliance Email</label>
                                    <input type="text" placeholder="Enter Compliance Email" className="form-input"
                                        name='set_complianceemail'
                                        value={params.set_complianceemail}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.set_complianceemail ? <div className="text-danger mt-1">{errors.set_complianceemail}</div> : ''}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="set_crmname">CRM Name</label>
                                    <input type="text" placeholder="Enter CRM Name" className="form-input"
                                        name='set_crmname'
                                        value={params.set_crmname}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.set_crmname ? <div className="text-danger mt-1">{errors.set_crmname}</div> : ''}
                                </div>
                                <div>
                                    <label htmlFor="set_crmtitle">CRM Title</label>
                                    <input type="text" placeholder="Enter CRM Title" className="form-input"
                                        name='set_crmtitle'
                                        value={params.set_crmtitle}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.set_crmtitle ? <div className="text-danger mt-1">{errors.set_crmtitle}</div> : ''}
                                </div>
                                <div>
                                    <label htmlFor="set_crmip">IP Config</label>
                                    <input type="text" placeholder="Enter CRM IP Address" className="form-input"
                                        name='set_crmip'
                                        value={params.set_crmip}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {/* <div
                                        className='form-input'
                                        style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', border: '1px solid #ccc', padding: '6px', borderRadius: '4px' }}
                                    >
                                        {
                                            words.length ? (<>
                                                {words.map((word, index) => (
                                                    <div key={index} style={{ backgroundColor: '#e0e0e0', borderRadius: '2px', padding: '2px 2px', marginRight: '2px', display: 'flex', alignItems: 'center' }}>
                                                        <span>{word}</span>
                                                        <button onClick={() => handleRemoveWord(word)} style={{ marginLeft: '5px', background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}>×</button>
                                                    </div>
                                                ))}
                                            </>) :
                                            <div>{params.set_crmip} </div>
                                        }

                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyPress}

                                            placeholder="Type a word and press space, comma, or enter"
                                            style={{ border: 'none', outline: 'none', flexGrow: 1 }}
                                        />
                                    </div> */}
                                    {errors?.set_crmip ? <div className="text-danger mt-1">{errors.set_crmip}</div> : ''}
                                </div>

                                <div>
                                    <label htmlFor="">Mobile No Hide</label>
                                    <Select placeholder="Mobile No Hide"
                                    onChange={handleSelectChange}
                                    value={newValue}
                                    options={options5} isMulti isSearchable={false} />
                                </div>


                                <div>
                                    <label htmlFor="set_crmip">Whatsapp</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" name='set_whatsapp' value={params.set_whatsapp} onChange={(e) => { updateToggle(e) }} checked={params.set_whatsapp == 1 ? true : false} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className={`
                                        outline_checkbox border-2 border-[#d15553] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#d15553] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300`}></span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="set_crmip">SMS</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" name='set_sms' value={params.set_sms ? params.set_sms : ""} onChange={(e) => { updateToggle(e) }} checked={params.set_sms == 1 ? true : false} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className={`
                                        outline_checkbox border-2 border-[#d15553] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#d15553] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300`}></span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="set_crmip">Application</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" name='set_application' value={params.set_application} onChange={(e) => { updateToggle(e) }} checked={params.set_application == 1 ? true : false} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className={`
                                        outline_checkbox border-2 border-[#d15553] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#d15553] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300`}></span>
                                        </label>
                                    </div>
                                </div>


                                <div>
                                    <label htmlFor="set_crmip">Email</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" name='set_email' value={params.set_email ? params.set_email : ''} onChange={(e) => { updateToggle(e) }} checked={params.set_email == 1 ? true : false} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className={`
                                        outline_checkbox border-2 border-[#d15553] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#d15553] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300`}></span>
                                        </label>
                                    </div>
                                </div>



                                <div>
                                    <label htmlFor="set_crmip">KYC</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" name='set_kyc' value={params.set_kyc ? params.set_kyc : ''} onChange={(e) => { updateToggle(e) }} checked={params.set_kyc == 1 ? true : false} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className={`
                                        outline_checkbox border-2 border-[#d15553] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#d15553] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300`}></span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="set_crmip">Risk Profile</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" name='set_riskprofile' value={params.set_riskprofile ? params.set_riskprofile : ''} onChange={(e) => { updateToggle(e) }} checked={params.set_riskprofile == 1 ? true : false} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className={`
                                        outline_checkbox border-2 border-[#d15553] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#d15553] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300`}></span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="set_crmip">Agreement</label>
                                    <div className="flex flex-col gap-2">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" name='set_aggriment' onChange={(e) => { updateToggle(e) }} value={params.set_aggriment ? params.set_aggriment : ''} checked={params.set_aggriment == 1 ? true : false} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className={`
                                        outline_checkbox border-2 border-[#d15553] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#d15553] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-success peer-checked:before:bg-success before:transition-all before:duration-300`}></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="set_logo">Logo</label>
                                    <input ref={fileLogoRef} name="set_logo" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
                                    <span className="w-full h-20 relative">
                                        <img className="w-40 h-20  overflow-hidden object-cover" id="set_logo" onClick={() => {
                                            fileLogoRef.current!.click()
                                        }} src={logoPriview} alt="set_logo" />
                                    </span>
                                    {errors?.set_logo ? <div className="text-danger mt-1">{errors.set_logo}</div> : ''}
                                </div>


                                <div className="mb-5">
                                    <label htmlFor="set_favicon">Fave Icon</label>
                                    <input ref={fileIconRef} name="set_favicon" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
                                    <span className="w-full h-20 relative">
                                        <img className="w-20 h-20  overflow-hidden object-cover" id="set_favicon" onClick={() => {
                                            fileIconRef.current!.click()
                                        }} src={iconPriview} alt="set_favicon" />
                                    </span>
                                    {errors?.set_favicon ? <div className="text-danger mt-1">{errors.set_favicon}</div> : ''}
                                </div>

                            </div>
                            {/* <div>
                                <div className="flex">
                                    <div className="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b] whitespace-nowrap">CRM News</div>
                                    <textarea rows={4} className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"
                                        name='set_crmnews'
                                        value={params.set_crmnews}
                                        onChange={(e) => changeValue(e)}></textarea>
                                    {errors?.set_crmnews ? <div className="text-danger mt-1">{errors.set_crmnews}</div> : ''}
                                </div>
                            </div> */}



                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
