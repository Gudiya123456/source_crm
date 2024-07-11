import { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import LeftTab from './LeftTab';
import { IRootState } from '../../store';


const Email = () => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(setPageTitle('Settings')); });
    const APIurl = 'http://127.0.0.1:8000/api/';

    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!crmToken) navigate('/login')
    }, [crmToken])


    useEffect(() => { fetchSettings(); }, [])
    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const response = await axios({
                method: 'get',
                url: APIurl + "emailconfiguration",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });

            if (response.data.status == 'success' && response.data.emailconfiguration) {
                const emailconfiguration = response.data.emailconfiguration;
                setParams({
                    admin_name: emailconfiguration.admin_name,
                    admin_email: emailconfiguration.admin_email,
                    is_queue: emailconfiguration.is_queue,
                    email_driver: emailconfiguration.email_driver,
                    email_port: emailconfiguration.email_port,
                    email_encryption: emailconfiguration.email_encryption,
                    email_host: emailconfiguration.email_host,
                    email_username: emailconfiguration.email_username,
                    email_password: emailconfiguration.email_password,
                })
            }
            // else UpdateSettings();
        } catch (error) {
            console.log(error)
            if (error.response.status == 401) navigate('/login')
        } finally {
            setIsLoading(false);
        }
    }





    const [defaultParams] = useState({
        admin_name: "",
        admin_email: "",
        is_queue: "",
        email_driver: "",
        email_port: "",
        email_encryption: "",
        email_host: "",
        email_username: "",
        email_password: "",
    });


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
        if (!params.email_username) {
            errors = { ...errors, email_username: " email username is required" };
        }

        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const [btnLoading, setBtnLoading] = useState(false);

    const UpdateSettingsApi = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: APIurl + "emailconfiguration",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + crmToken,
                },
            });
            if (response.data.status == 'success') {
                // alert('sucessss');
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



    const formSubmit = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("admin_name", params.admin_name);
        data.append("admin_email", params.admin_email);
        data.append("is_queue", params.is_queue);
        data.append("email_driver", params.email_driver);
        data.append("email_port", params.email_port);
        data.append("email_encryption", params.email_encryption);
        data.append("email_host", params.email_host);
        data.append("email_username", params.email_username);
        data.append("email_password", params.email_password);
        UpdateSettingsApi(data);
    };




    return (
        <div className="panel p-0 flex-1 overflow-x-hidden h-full">
            <div className="flex flex-col h-full">
                {isLoading ? <>Loading</> : (
                    <div className='panel'>
                        <div className='flex items-center justify-between mb-5'>
                            <h5 className="font-semibold text-lg dark:text-white-light">Email Integration</h5>
                            <button type="submit" onClick={() => { formSubmit() }} className="btn btn-primary">Update</button>
                        </div>
                        <hr className="my-4 dark:border-[#191e3a]" />
                        <div className='mb-5 space-y-5'>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="admin_name">Admin Name</label>
                                    <input type="text" placeholder="Enter Admin Name" className="form-input"
                                        name='admin_name'
                                        value={params.admin_name}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.admin_name ? <div className="text-danger mt-1">{errors.admin_name}</div> : ''}
                                </div>
                                <div>
                                    <label htmlFor="admin_email">Admin Email</label>
                                    <input type="text" placeholder="Enter Admin Email" className="form-input"
                                        name='admin_email'
                                        value={params.admin_email}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.admin_email ? <div className="text-danger mt-1">{errors.admin_email}</div> : ''}
                                </div>
                                <div>
                                    <label htmlFor="is_queue">Email Queue</label>
                                    <select name="is_queue" className="form-select text-white-dark" onChange={(e) => changeValue(e)} value={params.is_queue ? params.is_queue : ''}>
                                        <option value={''}>Select Queue</option>
                                        <option value={1}>Yes</option>
                                        <option value={0}>No</option>
                                    </select>
                                    {errors?.is_queue ? <div className="text-danger mt-1">{errors.is_queue}</div> : ''}
                                </div>
                                <div>
                                    <label htmlFor="email_driver">Email Driver</label>
                                    <select name="email_driver" className="form-select text-white-dark" onChange={(e) => changeValue(e)} value={params.email_driver ? params.email_driver : ''}>
                                        <option value={''}>Select Driver</option>
                                        <option value={'SMPT'}>SMPT</option>
                                        <option value={'POP'}>POP</option>
                                    </select>
                                    {errors?.email_driver ? <div className="text-danger mt-1">{errors.email_driver}</div> : ''}
                                </div>
                                <div>
                                    <label htmlFor="email_port">Mail Port</label>
                                    <input type="text" placeholder="Enter Mail Port" className="form-input"
                                        name='email_port'
                                        value={params.email_port}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.email_port ? <div className="text-danger mt-1">{errors.email_port}</div> : ''}
                                </div>
                                <div>
                                    <label htmlFor="email_encryption">Mail Encryption</label>
                                    <select name="email_encryption" className="form-select text-white-dark" onChange={(e) => changeValue(e)} value={params.email_encryption ? params.email_encryption : ''}>
                                        <option value={''}>Select Encryption</option>
                                        <option>TSL</option>
                                        <option>SSL</option>
                                        <option>NONE</option>
                                    </select>
                                    {errors?.email_encryption ? <div className="text-danger mt-1">{errors.email_encryption}</div> : ''}
                                </div>
                                <div>
                                    <label htmlFor="email_host">Mail Host</label>
                                    <input type="text" placeholder="Enter Mail Host" className="form-input"
                                        name='email_host'
                                        value={params.email_host}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.email_host ? <div className="text-danger mt-1">{errors.email_host}</div> : ''}
                                </div>
                                <div>
                                    <label htmlFor="email_username">Mail Username</label>
                                    <input type="text" placeholder="Enter Mail Username" className="form-input"
                                        name='email_username'
                                        value={params.email_username}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.email_username ? <div className="text-danger mt-1">{errors.email_username}</div> : ''}
                                </div>
                                <div>
                                    <label htmlFor="email_password">Mail Password</label>
                                    <input type="text" placeholder="Enter Mail Password" className="form-input"
                                        name='email_password'
                                        value={params.email_password}
                                        onChange={(e) => changeValue(e)}
                                    />
                                    {errors?.email_password ? <div className="text-danger mt-1">{errors.email_password}</div> : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Email;
