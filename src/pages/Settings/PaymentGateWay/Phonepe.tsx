import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCrmToken, setPageTitle } from '../../../store/themeConfigSlice';
import { useNavigate } from 'react-router-dom';
import { IRootState } from '../../../store';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Phonepe({ paymentGateways, setPaymentGateways }: any) {


    const phonepe = paymentGateways.find((pg: any) => pg.payment_gateway_name == "Phonepe")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);

    const [defaultParams] = useState({
        payment_gateway_name: 'Phonepe',
        status: '',
        field_1: '',
        field_2: '',
        field_3: '',
    });

    const [errors, setErros] = useState<any>({});
    const [params, setParams] = useState<any>(defaultParams);

    useEffect(() => {
        if (!crmToken) navigate('/')
        else if (phonepe) {
            setParams({
                payment_gateway_name: 'Phonepe',
                status: phonepe.status,
                field_1: phonepe.field_1,
                field_2: phonepe.field_2,
                field_3: phonepe.field_3,
            })
        }
        dispatch(setPageTitle('Settings | Payments | Phonepe'))
    }, [phonepe])


    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.payment_gateway_name) {
            errors = { ...errors, payment_gateway_name: "payment gateway name is required" };
        }
        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };
    const [btnLoading, setBtnLoading] = useState(false);


    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: "" });
        setParams({ ...params, [name]: value });
        console.table(params)
    };
    const APIurl = 'http://127.0.0.1:8000/api/';
    const AddEmployee = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: APIurl + "payment-gateways",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + crmToken,
                },
            });

            if (response.data.status == 'success') {
                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });

                const index = paymentGateways.findIndex((a: any) => a.payment_gateway_name == 'Phonepe');
                if (index >= 0) {
                    const newPaymentGateways = [...paymentGateways];
                    newPaymentGateways[index] = response.data.phonepe;
                    console.log("new ", newPaymentGateways)
                    setPaymentGateways(newPaymentGateways)
                } else {
                    const newPaymentGateways = [...paymentGateways, response.data.phonepe];
                    setPaymentGateways(newPaymentGateways)
                }
            }

        } catch (error: any) {
            console.log(error)
            if (error.response.status == 401) dispatch(setCrmToken(''))
            if (error?.response?.status === 422) {
                const serveErrors = error.response.data.errors;
                let serverErrors = {};
                for (var key in serveErrors) {
                    serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
                    console.log(serveErrors[key][0])
                }
                setErros(serverErrors);
                Swal.fire({
                    title: "Server Validation Error! Please Solve",
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
        data.append("payment_gateway_name", params.payment_gateway_name);
        data.append("status", params.status);
        data.append("field_1", params.field_1);
        data.append("field_2", params.field_2);
        data.append("field_3", params.field_3);
        AddEmployee(data);
    };

    return (
        <form className="space-y-5">
            <div>
                <input type="text" placeholder="Enter API Key *" name='field_1' className="form-input" value={params.field_1} onChange={(e) => changeValue(e)} />
            </div>
            <div>
                <input type="text" placeholder="Enter Secret Key *" name='field_2' className="form-input" value={params.field_2} onChange={(e) => changeValue(e)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <select name="field_3" className='form-select' value={params.field_3} onChange={(e) => changeValue(e)}>
                        <option value="">Select Environment</option>
                        <option value="Live">Live</option>
                        <option value="Demo">Demo</option>
                    </select>
                </div>
                <div>
                    <select name="status" className='form-select' value={params.status} onChange={(e) => changeValue(e)}>
                        <option value="">Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Blocked</option>
                    </select>
                </div>
            </div>
            <button type="button" className="btn btn-primary !mt-6" onClick={() => formSubmit()} disabled={btnLoading}>
                {btnLoading ? 'Please Wait' : 'Submit'}
            </button>
        </form>
    )
}