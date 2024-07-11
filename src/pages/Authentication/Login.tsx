import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setPageTitle, setCrmToken, setAuthUser } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import axios from 'axios';
import Swal from 'sweetalert2';
const Login = () => {
    const dispatch = useDispatch();
    useEffect(() => { dispatch(setPageTitle('Login')); });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);


    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);




console.log(crmToken)


    useEffect(() => {
        if (crmToken) navigate('/')
    }, [crmToken])

    const [defaultParams] = useState({
        email: '',
        password : '',
    });
    const [params, setParams] = useState<any>(defaultParams);
    const [errors, setErros] = useState<any>({});
    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.email) {
            errors = { ...errors, email: "email is required" };
        }
        if (!params.password) {
            errors = { ...errors, password: "password is required" };
        }
        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };



    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: "" });
        setParams({ ...params, [name]: value });
        console.table(params)
    };

    const [isBtnLoading, setiSBtnLoading] = useState(false);

    const LoginApi = async (data: any) => {
        setiSBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: "http://127.0.0.1:8000/api/login",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    // Authorization: "Bearer " + crmToken,
                },
            });

            if (response.data.status == 'success') {
               dispatch(setCrmToken(response.data.token))
               dispatch(setAuthUser(response.data.user))
            } else { alert("Failed") }

        } catch (error: any) {
            console.log(error)
            // if (error.response.status == 401) navigate('/login')
            if (error?.response?.status === 422) {
                const serveErrors = error.response.data.errors;
                let serverErrors = {};
                for (var key in serveErrors) {
                    serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
                    console.log(serveErrors[key][0])
                }
                setErros(serverErrors);
                // Swal.fire({
                //     title: "Server Validation Error! Please Solve",
                //     toast: true,
                //     position: 'top',
                //     showConfirmButton: false,
                //     showCancelButton: false,
                //     width: 450,
                //     timer: 2000,
                //     customClass: {
                //         popup: "color-danger"
                //     }
                // });
            }
        } finally {
            setiSBtnLoading(false)
        }
    };

    const formSubmit = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("email", params.email);
        data.append("password", params.password);
        LoginApi(data);
    };


    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[500px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-8 lg:min-h-[auto] py-6">
                        <div className="space-y-5 mx-auto w-full ">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input name="email" type="email" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark"
                                        onChange={(e)=>changeValue(e)}
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                    <span className='text-danger'>{errors?.email?errors.email:''}</span>
                                </div>
                                <div>
                                    <label htmlFor="Password">Password</label>
                                    <div className="relative text-white-dark">
                                        <input name="password" type="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark"
                                         onChange={(e)=>changeValue(e)}/>
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                    <span className='text-danger'>{errors?.password?errors.password:''}</span>
                                </div>
                                <div>
                                    <label className="flex cursor-pointer items-center">
                                        <input type="checkbox" className="form-checkbox bg-white dark:bg-black" />
                                        <span className="text-white-dark">Remember me</span>
                                    </label>
                                </div>
                                <button type="button" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]" disabled={isBtnLoading?true:false} onClick={()=>formSubmit()}>
                                     {isBtnLoading?"Please wait...":"Sign in"}
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
