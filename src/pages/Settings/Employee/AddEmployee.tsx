import { useState, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import 'react-quill/dist/quill.snow.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setCrmToken, setPageTitle } from '../../../store/themeConfigSlice';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IRootState } from '../../../store';
import 'flatpickr/dist/flatpickr.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import LeftTab from '../LeftTab';

export default function AddEmployee({ setTab }) {
    const dispatch = useDispatch(); useEffect(() => { dispatch(setPageTitle('Add Employee')); });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [isLoading, setIsLoading] = useState(false);
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const navigate = useNavigate();

    const location = useLocation();
    const APIurl = 'http://127.0.0.1:8000/api/';
    const editEmployee = location?.state?.employee;

    useEffect(() => {
        if (!crmToken) navigate('/login')
    }, [crmToken])

    useEffect(() => {
        if (editEmployee) {
            setParams({
                id: editEmployee.id,
                employee_id: editEmployee.employee_id,
                first_name: editEmployee.first_name,
                last_name: editEmployee.last_name,
                email: editEmployee.email,
                password: editEmployee.show_password,
                user_type: editEmployee.user_type,
                user_status: editEmployee.user_status,
                phone_number: editEmployee.phone_number,

            })
        }
    }, [editEmployee])

    const [defaultParams] = useState({
        id: '',
        employee_id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        user_type: '',
        user_status: ''
    });
    const [params, setParams] = useState<any>(defaultParams);
    const [errors, setErros] = useState<any>({});
    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.employee_id) {
            errors = { ...errors, employee_id: "Testimonial name is required" };
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
        // console.table(params)
    };
    const AddEmployee = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: APIurl + "users",
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
                navigate('/settings/employee/listemployee')
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

    const formSubmit = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("id", params.id);
        data.append("employee_id", params.employee_id);
        data.append("first_name", params.first_name);
        data.append("last_name", params.last_name);
        data.append("email", params.email);
        data.append("phone_number", params.phone_number);
        data.append("password", params.password);
        data.append("user_type", params.user_type);
        data.append("user_status", params.user_status);
        AddEmployee(data);
    };

    return (


        <div className="panel p-0 flex-1 overflow-x-hidden h-full">
            <div className="flex flex-col h-full">
                <div className='panel'>
                    <div className='flex items-center justify-between mb-5'>
                        <h5 className="font-semibold text-lg dark:text-white-light">Employee Details</h5>

                        <button type="button" onClick={() => setTab('employees')} className="btn btn-outline-primary">Back</button>

                    </div>
                    <hr className="my-4 dark:border-[#191e3a]" />
                    <div className='space-y-5 mb-5'>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="employee_id">Employee ID</label>
                                <input type="text" placeholder="Enter Employee ID" className="form-input"
                                    name='employee_id'
                                    value={params.employee_id}
                                    onChange={(e) => changeValue(e)}
                                />
                                {errors?.employee_id ? <div className="text-danger mt-1">{errors.employee_id}</div> : ''}
                            </div>
                            <div>
                                <label htmlFor="first_name">First Name</label>
                                <input type="text" placeholder="Enter First Name" className="form-input"
                                    name='first_name'
                                    value={params.first_name}
                                    onChange={(e) => changeValue(e)}
                                />
                                {errors?.first_name ? <div className="text-danger mt-1">{errors.first_name}</div> : ''}
                            </div>
                            <div>
                                <label htmlFor="last_name">Last Name</label>
                                <input type="text" placeholder="Enter Last Name" className="form-input"
                                    name='last_name'
                                    value={params.last_name}
                                    onChange={(e) => changeValue(e)}
                                />
                                {errors?.last_name ? <div className="text-danger mt-1">{errors.last_name}</div> : ''}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="email">Email Address</label>
                                <input type="text" placeholder="Enter Email Address" className="form-input"
                                    name='email'
                                    value={params.email}
                                    onChange={(e) => changeValue(e)}
                                />
                                {errors?.email ? <div className="text-danger mt-1">{errors.email}</div> : ''}
                            </div>
                            <div>
                                <label htmlFor="phone_number">Phone Number</label>
                                <input type="text" placeholder="Enter Phone Number" className="form-input"
                                    name='phone_number'
                                    value={params.phone_number}
                                    onChange={(e) => changeValue(e)}
                                />
                                {errors?.phone_number ? <div className="text-danger mt-1">{errors.phone_number}</div> : ''}
                            </div>
                            <div>
                                <label htmlFor="[password]">CRM Password</label>
                                <input type="text" placeholder="Enter CRM Password" className="form-input"
                                    name='password'
                                    value={params.password}
                                    onChange={(e) => changeValue(e)}
                                />
                                {errors?.password ? <div className="text-danger mt-1">{errors.password}</div> : ''}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="user_type">User Type</label>
                                <select name="user_type" className="form-select text-white-dark" onChange={(e) => changeValue(e)} value={params.user_type ? params.user_type : ''}>
                                    <option value={''}>Select Type</option>
                                    <option>Admin</option>
                                    <option>BDE</option>
                                    <option>Accounts</option>
                                    <option>Team Leader</option>
                                    <option>Manager</option>
                                    <option>HR</option>
                                </select>
                                {errors?.user_type ? <div className="text-danger mt-1">{errors.user_type}</div> : ''}
                            </div>
                            <div>
                                <label htmlFor="user_status">Status</label>
                                <select name="user_status" className="form-select text-white-dark" onChange={(e) => changeValue(e)} value={params.user_status ? params.user_status : ''}>
                                    <option value={''}>Select Status</option>
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                                {errors?.user_status ? <div className="text-danger mt-1">{errors.user_status}</div> : ''}
                            </div>
                        </div>
                        <button type="button" onClick={() => formSubmit()} disabled={btnLoading} className="btn bg-[#1d67a7] text-white ltr:ml-4 rtl:mr-4">
                            {params.id ? <div>{btnLoading ? 'Please wait' : 'Update'}</div> : <div>{btnLoading ?
                                'Please wait' : editEmployee ? 'Update Employee' :
                                    'Add Employee'}</div>}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
