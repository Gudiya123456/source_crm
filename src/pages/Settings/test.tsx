import React, { useRef } from "react";
import { useState, Fragment, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { setPageTitle } from "../../store/themeConfigSlice";
import { IRootState } from "../../store";



const General = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[settings,setSettings]=useState([])
    const token = useSelector(
        (state: IRootState) => state.themeConfig.token
    );

    // console.log(crmToken);
    const [isLoading, setIsLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    // const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    // const crmData1=useSelector((state:IRootState)=>state.themeConfig.crmData);
    // console.log("CRM DATA......",crmData1);


    useEffect(() => {
        dispatch(setPageTitle("Settings"));
        fetchSettings();
    }, []);

    // fetchSettings
    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const response = await axios({
                method: "get",
                url: window.location.origin+ "/api/settings",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            console.log("Setthings Datatatat",response.data.setting);

            if (response.data.status == "success") {
                if(response.data.setting) storeOrUpdate(response.data.setting)
                    else storeOrUpdate();
                setSettings(response.data.setting);
                console.log(response.data);
            }

            if (response.data.status == "error") {
                alert(99999);
            }
        } catch (error: any) {
            if (error.response.status == 401) {
                // ErrorHandle();
                console.log(error)
            } else console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fileLogoRef = useRef<HTMLInputElement>(null);
    const fileIconRef = useRef<HTMLInputElement>(null);
    const [logoPriview, setLogoPriview] = useState<any>('https://dummyimage.com/600x400/000/fff');
    const [iconPriview, setIconPriview] = useState<any>('https://dummyimage.com/600x400/000/fff');



    const [defaultParams] = useState({
        id: "",
        name:'',
        email:'',
        account:'',
        complaince:'',
        ip:'',
        contact:'',
        status:'1',
        image:'',
        fav_icons:''

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
                if (name == "image") setLogoPriview(reader.result);
                else setIconPriview(reader.result);

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
    };
    console.table(params);


    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.name) {
            errors = {
                ...errors,
                name: " Name is required!",
            };
        }
        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };

    const storeOrUpdateApi = async (data: any) => {
        setBtnLoading(true);
        try {
            const response = await axios({
                method: "post",
                url: window.location.origin+ "/api/settings/1",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + token,
                },
            });
            if (response.data.status == "success") {
                alert('successs');
                Swal.fire({
                    icon: response.data.status,
                    title: response.data.title,
                    text: response.data.message,
                    padding: "2em",
                    customClass: "sweet-alerts",
                });

                // fetchSettings();
                // dispatch(setCrmData(response.data.setting));
                // navigate('/restaurants')
            } else {
                alert("Failed");
            }
        } catch (error: any) {
            console.log(error);
            if (error.response.status === 401) {
                // ErrorHandle();
                console.log(error)
            }
            if (error?.response?.status === 422) {
                const serveErrors = error.response.data.errors;
                let serverErrors = {};
                for (var key in serveErrors) {
                    serverErrors = { ...serverErrors, [key]: serveErrors[key][0] };
                    console.log(serveErrors[key][0]);
                }
                setErros(serverErrors);
                CrmSwal.fire({
                    title: "Server Validation Error! Please solve",
                    toast: true,
                    position: "top",
                    showConfirmButton: false,
                    showCancelButton: false,
                    width: 450,
                    timer: 2000,
                    customClass: {
                        popup: "color-danger",
                    },
                });
            }
        } finally {
            setBtnLoading(false);
        }
    };

    const formSubmit = () => {
        const isValid = validate();
        if (isValid.totalErrors) return false;
        const data = new FormData();
        data.append("id", params.id);
        data.append("name", params.name);
        data.append("email", params.email);
        data.append("account", params.account);
        data.append("complaince", params.complaince);
        data.append("ip", params.ip);
        data.append("contact", params.contact);
        data.append("status", params.status);
        data.append("image", params.image);
        data.append("fav_icons", params.fav_icons);



        storeOrUpdateApi(data);
    };

    const storeOrUpdate = (data) => {
        setErros({});
        if (data) {
            setParams({
                id: data.id,
                name: data.name,
                email: data.email,
                account: data.account,
                complaince: data.complaince,
                ip: data.ip,
                contact: data.contact,

                image: "",
                fav_icons: "",
                status: data.status ? "1" : "0",
            });

            data.image
                ? setLogoPriview(window.location.origin +'/'+ data.image)
                : setLogoPriview('https://dummyimage.com/600x400/000/fff');

            data.fav_icons
                ? setIconPriview(window.location.origin +'/'+ data.fav_icons)
                : setIconPriview('https://dummyimage.com/600x400/000/fff');
        } else {
            setParams(defaultParams);
            setLogoPriview('https://dummyimage.com/600x400/000/fff');
            setIconPriview('https://dummyimage.com/600x400/000/fff');
        }
    };

    return (
        <div>

                <div className="">

                    <div className=" " >
                        <div className="px-8 py-8 dark:bg-[#202125] bg-white">
                        <h2 className='text-amber-500 text-xl font-bold mb-4 ' >General Settings</h2>

                            <form>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-x-5">
                                <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="rname"
                                        >
                                            CRM  Name
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="name"
                                            value={params.name}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.name ? (
                                            <div className="text-danger mt-1">
                                                {errors.name}
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                    </div>
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="rname"
                                        >
                                            Admin Email
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"

                                            name="email"
                                            value={params.email}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.email ? (
                                            <div className="text-danger mt-1">
                                                {errors.email}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="rname"
                                        >
                                         Accounts
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="account"
                                            value={params.account}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.account ? (
                                            <div className="text-danger mt-1">
                                                {errors.account}
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                    </div>
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="rname"
                                        >
                                           Complaince
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="complaince"
                                            value={params.complaince}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.complaince ? (
                                            <div className="text-danger mt-1">
                                                {errors.complaince}
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                    </div>
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="rname"
                                        >
                                          IP
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="ip"
                                            value={params.ip}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.ip ? (
                                            <div className="text-danger mt-1">
                                                {errors.ip}
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                    </div>
                                    <div className="mb-1">
                                        <label
                                            className="text-style roboto-light"
                                            htmlFor="rname"
                                        >
                                           Marque Contact
                                        </label>
                                        <input
                                            type="text"
                                            className="input-form dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="contact"
                                            value={params.contact}
                                            onChange={(e) => {
                                                changeValue(e);
                                            }}
                                        />
                                        {errors?.contact ? (
                                            <div className="text-danger mt-1">
                                                {errors.contact}
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                    </div>



                                    <div className="mb-1">
                                        <label
                                            htmlFor="name"
                                            className="text-style roboto-light"
                                        >
                                           Status
                                        </label>

                                        <select
                                            className="input-form h-[33px]  dark:border-[#5E5E5E] dark:bg-transparent"
                                            name="console_mode"

                                        >
                                            {/* <option className="" value="">
                                                Select Status
                                            </option> */}
                                            <option className="" value={1} defaultChecked={params.status == 1 ? true : false}

                                        onClick={(e) => changeValue(e)} >
                                               Active
                                            </option>
                                            <option className="" value={0} defaultChecked={params.status == 0 ? true : false}
                                            onClick={(e) => changeValue(e)}
                                            >
                                               Disabled
                                            </option>

                                        </select>

                                    </div>

                                    <div className="mb-5">
                                                <label htmlFor="image">image</label>
                                                <input ref={fileLogoRef} name="image" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
                                                <span className="w-full h-20 relative">
                                                    <img className="w-40 h-20  overflow-hidden object-cover" id="image" onClick={() => {
                                                        fileLogoRef.current!.click()
                                                    }} src={logoPriview} alt="image" />
                                                </span>
                                                {errors?.image ? <div className="text-danger mt-1">{errors.image}</div> : ''}
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="fav_icons">Fave Icon</label>
                                                <input ref={fileIconRef} name="fav_icons" type="file" onChange={(e) => setImage(e)} className="form-input hidden" accept="image/*" />
                                                <span className="w-full h-20 relative">
                                                    <img className="w-20 h-20  overflow-hidden object-cover" id="fav_icons" onClick={() => {
                                                        fileIconRef.current!.click()
                                                    }} src={iconPriview} alt="fav_icons" />
                                                </span>
                                                {errors?.fav_icons ? <div className="text-danger mt-1">{errors.fav_icons}</div> : ''}
                                            </div>
                                    </div>



                            </form>
                            <div className="mt-8 flex items-center justify-end">
                                <button
                                    type="button"
                                    className="btn  btn-dark btn-sm px-10 rounded-2xl border-none bg-amber-500 text-white dark:bg-white dark:text-black "
                                    onClick={()=>{formSubmit()}}

                                >
                                {
                                    btnLoading?'Please wait':'Update'
                                }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>



        </div>
    );
};

export default General;
