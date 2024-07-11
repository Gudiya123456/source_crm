import React, { useEffect, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { Navigate, useNavigate } from 'react-router-dom';
import { setCrmToken, setPageTitle } from '../../../store/themeConfigSlice';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from 'axios';
const CrmSwal = withReactContent(Swal);

export default function ConfigurationDrawer({ showDrawer, setShowDrawer, smsConfiguration }: any) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);



    useEffect(() => {
        if (!crmToken) dispatch(setCrmToken(''))
        else {
            dispatch(setPageTitle('Marketplace | Integration | Swiggy'));
        }
    }, [crmToken])



    const defaultParams = {
        sms_user_name: "",
        otp_number: "",
        sms_numbers: "",
        api_key: "",
        client_id: "",
    };

    const [errors, setErrors] = useState<any>({});
    const [params, setParams] = useState<any>(defaultParams);

    useEffect(() => {
        if (smsConfiguration) {
            setParams({
                sms_user_name: smsConfiguration.sms_user_name,
                otp_number: smsConfiguration.otp_number,
                sms_numbers: smsConfiguration.sms_numbers,
                api_key: smsConfiguration.api_key,
                client_id: smsConfiguration.client_id,
            });
        } else setParams(defaultParams)
    }, [smsConfiguration])



    const changeValue = (e: any) => {

        console.log(e)
        console.log(e.target.name)
        const { value, name } = e.target;
        setErrors({ ...errors, [name]: '' });
        setParams({ ...params, [name]: value });
        console.table(params)
    };



    const validate = () => {
        setErrors({});
        let errors = {};
        if (!params.api_key) {
            errors = { ...errors, api_key: 'api key is required.' };
        }

        if (!params.client_id) {
            errors = { ...errors, client_id: 'client id required.' };
        }


        setErrors(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const [btnLoading, setBtnLoading] = useState(false);
    const APIurl = 'http://127.0.0.1:8000/api/';
    const storeOrUpdateApi = async (data: any) => {
        setBtnLoading(true)
        try {



            const response = await axios({
                method: 'post',
                url: APIurl + "sms-configurations",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + crmToken,
                },
            });

            if (response.data.status === 'success') {
                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: "2em",
                    customClass: "sweet-alerts",
                });
                setShowDrawer(false)

            } else {
                alert("Error")
            }
        } catch (error: any) {
            if (error?.response?.status === 401) {
                dispatch(setCrmToken(""))
            } else if (error?.response?.status === 422) {

                const serveErrors = error.response.data.errors;
                let serverErrors = {};
                for (var key in serveErrors) {
                    serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
                    setErrors(serverErrors)
                    console.log(serveErrors[key][0])
                }

                CrmSwal.fire({
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
        data.append("sms_user_name", params.sms_user_name);
        data.append("otp_number", params.otp_number);
        data.append("sms_numbers", params.sms_numbers);
        data.append("api_key", params.api_key);
        data.append("client_id", params.client_id);
        storeOrUpdateApi(data);
    };



    return (
        <div>
            <div className={`${(showDrawer && '!block') || ''} fixed inset-0 bg-[black]/60 z-[51] px-4 hidden transition-[display]`} onClick={() => setShowDrawer(!showDrawer)}></div>

            <nav
                className={`${(showDrawer && 'ltr:!right-0 rtl:!left-0') || ''
                    } bg-white fixed ltr:-right-[800px] rtl:-left-[800px] top-0 bottom-0 w-full max-w-[800px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-1000 z-[51] dark:bg-black p-4`}
            >




                <div className="flex flex-col h-screen overflow-hidden">
                    <div className="w-full text-center border-b border-grey p-4">
                        <button type="button" className="px-4 py-4 absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowDrawer(false)}>
                            <IoCloseSharp className=" w-5 h-5" />
                        </button>

                        <h4 className="mb-1 dark:text-white font-bold">SMS Configurations</h4>

                    </div>

                    <section className="flex-1 overflow-y-auto overflow-x-hidden perfect-scrollbar mt-5">

                        <form action="" method="post" className='p-5'>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className='text-white-dark'>SMS Username</label>
                                    <input type="text" placeholder="Enter SMS Username" className="form-input"
                                        name="sms_user_name" onChange={(e) => changeValue(e)} value={params.sms_user_name}
                                    />
                                    <div className="text-danger font-semibold text-sm">{errors.sms_user_name}</div>
                                </div>

                                <div>
                                    <label className='text-white-dark'>OTP Number</label>
                                    <input type="number" placeholder="Enter OTP Numbers" className="form-input"
                                        name="otp_number" onChange={(e) => changeValue(e)} value={params.otp_number}
                                    />
                                    <div className="text-danger font-semibold text-sm">{errors.otp_number}</div>
                                </div>

                            </div>

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark'>SMS Numbers</label>
                                <input type="text" placeholder="Enter SMS Numbers" className="form-input"
                                    name="sms_numbers" onChange={(e) => changeValue(e)} value={params.sms_numbers}
                                />
                                <div className="text-danger font-semibold text-sm">{errors.sms_numbers}</div>
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="fullname" className='text-white-dark'>API Key</label>
                                <input type="text" placeholder="Enter API Key" className="form-input"
                                    name="api_key" onChange={(e) => changeValue(e)} value={params.api_key}
                                />
                                <div className="text-danger font-semibold text-sm">{errors.api_key}</div>
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="client_id" className='text-white-dark'>Client ID</label>
                                <input type="text" placeholder="Enter Client ID" className="form-input"
                                    name="client_id" onChange={(e) => changeValue(e)} value={params.client_id}
                                />
                                <div className="text-danger font-semibold text-sm">{errors.client_id}</div>
                            </div>

                            <div className='flex justify-end gap-5 py-2'>
                                <button type="button" className='btn shadow' onClick={() => setShowDrawer(false)}>Cancel</button>
                                <button type="button" onClick={() => formSubmit()} disabled={btnLoading} className="btn  btn-dark shadow bg-black">
                                    {btnLoading ? 'Please Wait...' : 'Save Changes'}
                                </button>
                            </div>

                        </form>
                    </section>
                </div>
            </nav>
        </div>
    )
}
