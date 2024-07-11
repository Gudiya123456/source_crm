import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setCrmToken, setPageTitle } from '../../../store/themeConfigSlice';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';

export default function Bank() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const APIurl = 'http://127.0.0.1:8000/api/';
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);

    useEffect(() => {
        if (!crmToken) navigate('/')
        else {

            dispatch(setPageTitle('Dropdown'));
            fetchBanks()
        }
    }, []);

    const [isLoading, setIsLoading] = useState(true);
    const [banks, setBanks] = useState([]);

    const fetchBanks = async () => {
        try {
            setIsLoading(true)
            const response = await axios({
                method: 'get',
                url: APIurl + "banks",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });

            if (response.data.status == "success") {
                setBanks(response.data.banks)
            }

            console.log(response)
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    const [bankModal, setBankModal] = useState(false);

    const [defaultParams] = useState({
        id: '',
        bank_name: '',
        account_number: '',
        ifsc_code: '',
        branch: '',
        status: ''
    });

    const [params, setParams] = useState<any>(defaultParams);
    const [errors, setErros] = useState<any>({});

    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.account_number) {
            errors = { ...errors, account_number: "account number is required" };
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

    const addOrUpdateBank = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: APIurl + "banks",
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
                setBankModal(false);

                const already = banks.find((b: any) => b.id == response.data.bank.id);
                const bank = response.data.bank;
                const newBanks: any = [...banks];
                if (already) {
                    const index = newBanks.findIndex((b: any) => b.id == bank.id);
                    newBanks[index] = bank;
                } else {
                    newBanks.unshift(bank)
                }

                setBanks(newBanks)

                setParams(defaultParams)

            } else { alert("Failed") }

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

    const UpdateBank = (data: any) => {
        setErros({});
        if (data) {
            setParams({
                id: data.id,
                bank_name: data.bank_name,
                account_number: data.account_number,
                ifsc_code: data.ifsc_code,
                branch: data.branch,
                status: data.status
            });
            setBankModal(true)
        }
    }
    const formSubmit = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("id", params.id);
        data.append("bank_name", params.bank_name);
        data.append("account_number", params.account_number);
        data.append("ifsc_code", params.ifsc_code);
        data.append("branch", params.branch);
        data.append("status", params.status);
        addOrUpdateBank(data);
    };

    const deleteBank = (bank: any) => {

        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Delete',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then(async (result) => {
            if (result.value) {
                try {
                    const response = await axios({
                        method: 'delete',
                        url: APIurl + 'banks/' + bank.id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "Bearer " + crmToken,
                        },
                    });
                    if (response.data.status === "success") {
                        Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });

                        const newbanks = banks.filter((b: any) => b.id != bank.id);
                        setBanks(newbanks)
                    }
                } catch (error: any) {
                    if (error.response.status == 401) navigate('/login')
                } finally {

                }
            }
        });

    }


    return (
        <div>

            {isLoading ? (<>Loading</>) : (
                <>


                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='font-bold text-lg'>Banks</h2>
                        <button className='btn btn-sm btn-dark' onClick={() => setBankModal(true)}>Add New Bank</button>
                    </div>
                    <div className="table-responsive mb-5">
                        <table>
                            <thead>
                                <tr>
                                    <th>Bank Name</th>
                                    <th>A/c Number</th>
                                    <th>IFSC Code</th>
                                    <th>Branch</th>
                                    <th>Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {banks.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>
                                                <div className="whitespace-nowrap">{data.bank_name}</div>
                                            </td>
                                            <td>{data.account_number}</td>
                                            <td>{data.ifsc_code}</td>
                                            <td>{data.branch}</td>
                                            <td>
                                                <div
                                                    className={`whitespace-nowrap ${data.status == "1" ? 'text-success'
                                                        : 'text-danger'}`}
                                                >
                                                    {data.status == "1" ? 'Active' : 'Inactive'}
                                                </div>
                                            </td>
                                            <td className="text-center flex gap-4">

                                                <button type="button" onClick={() => UpdateBank(data)}>
                                                    E
                                                </button>

                                                <button type="button" onClick={() => deleteBank(data)}>
                                                    D
                                                </button>

                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>


                    <div className="mb-5">

                        <Transition appear show={bankModal} as={Fragment}>
                            <Dialog as="div" open={bankModal} onClose={() => setBankModal(true)}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0" />
                                </Transition.Child>
                                <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                                    <div className="flex items-start justify-center min-h-screen px-4">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                                    <div className="font-bold text-lg">Modal Title</div>
                                                    <button type="button" onClick={() => setBankModal(false)} className="text-white-dark hover:text-dark">
                                                        X
                                                    </button>
                                                </div>
                                                <div className="p-5">



                                                    <form className="space-y-5">
                                                        <div>
                                                            <input type="text" name='bank_name' value={params.bank_name} onChange={(e) => changeValue(e)} placeholder="Enter Bank Name" className="form-input" />
                                                            {errors?.bank_name ? <div className="text-danger mt-1">{errors.bank_name}</div> : ''}
                                                        </div>
                                                        <div>
                                                            <input type="text" name='account_number' value={params.account_number} onChange={(e) => changeValue(e)} placeholder="Enter A/c Number" className="form-input" />
                                                            {errors?.account_number ? <div className="text-danger mt-1">{errors.account_number}</div> : ''}
                                                        </div>
                                                        <div>
                                                            <input type="text" name='ifsc_code' value={params.ifsc_code} onChange={(e) => changeValue(e)} placeholder="Enter IFSC Code" className="form-input" />
                                                            {errors?.ifsc_code ? <div className="text-danger mt-1">{errors.ifsc_code}</div> : ''}
                                                        </div>
                                                        <div>
                                                            <input type="text" name='branch' value={params.branch} onChange={(e) => changeValue(e)} placeholder="Enter Branch" className="form-input" />
                                                            {errors?.branch ? <div className="text-danger mt-1">{errors.branch}</div> : ''}
                                                        </div>
                                                        <div>
                                                            <select name="status" className="form-select" onChange={(e) => changeValue(e)} value={params.status}>
                                                                <option value="">Select Status</option>
                                                                <option value="1">Active</option>
                                                                <option value="0">Inactive</option>
                                                            </select>
                                                            {errors?.status ? <div className="text-danger mt-1">{errors.status}</div> : ''}
                                                        </div>
                                                    </form>

                                                    <div className="flex justify-end items-center mt-8">
                                                        <button type="button" onClick={() => setBankModal(false)} className="btn btn-outline-danger">
                                                            Discard
                                                        </button>
                                                        <button type="button" onClick={() => formSubmit()} className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>

                </>
            )}
        </div>
    )
}
