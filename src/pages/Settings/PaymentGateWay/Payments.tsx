import { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { IRootState } from '../../../store';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { MdVerified } from "react-icons/md";
import Razorpay from './Razorpay';
import Paytm from './Paytm';
import Phonepe from './Phonepe';
import Bank from './Bank';
// payment-gateways

const Payments = () => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(setPageTitle('Settings')); });
    const APIurl = 'http://127.0.0.1:8000/api/';

    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!crmToken) navigate('/')
        else {
            dispatch(setPageTitle('Payments'));
            fetchPayments()
        }
    }, [crmToken])
    const [settings, setSettings] = useState([])
    const [tab, setTab] = useState('Razorpay');
    const [paymentGateways, setPaymentGateways] = useState([]);

    const fetchPayments = async () => {
        setIsLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: APIurl + "payment-gateways",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            if (response.data.status == "success") {
                setPaymentGateways(response.data.paymentGateways);
            }

        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="panel p-0 flex-1 overflow-x-hidden h-full">
            <div className="flex flex-col h-full">

                {isLoading ? <>Loading</> : (
                    <div className='panel'>
                        <div className='flex items-center justify-between mb-5'>
                            <h5 className="font-semibold text-lg dark:text-white-light">Payment Integration</h5>
                            <div className='flex gap-5'>
                                <button type="button" className={`btn ${tab == "Razorpay" ? 'btn-dark' : 'btn-primary'} `} onClick={() => setTab('Razorpay')}>RazorPay</button>
                                <button type="button" className={`btn ${tab == "Paytm" ? 'btn-dark' : 'btn-primary'} `} onClick={() => setTab('Paytm')}>Paytm</button>
                                <button type="button" className={`btn ${tab == "PhonePe" ? 'btn-dark' : 'btn-primary'} `} onClick={() => setTab('PhonePe')}>PhonePe</button>
                                <button type="button" className={`btn ${tab == "Banks" ? 'btn-dark' : 'btn-primary'} `} onClick={() => setTab('Banks')}>Banks</button>
                            </div>
                        </div>
                        <hr className="my-4 dark:border-[#191e3a]" />
                        <div className='mb-5 space-y-5'>
                            {tab == 'Razorpay' ? <Razorpay
                                paymentGateways={paymentGateways}
                                setPaymentGateways={setPaymentGateways}
                            />
                                : tab == 'Paytm' ? <Paytm
                                    paymentGateways={paymentGateways}
                                    setPaymentGateways={setPaymentGateways}
                                />
                                    : tab == 'PhonePe' ? <Phonepe
                                        paymentGateways={paymentGateways}
                                        setPaymentGateways={setPaymentGateways}
                                    /> : tab == 'Banks' ? <Bank />
                                        : null}

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Payments;
