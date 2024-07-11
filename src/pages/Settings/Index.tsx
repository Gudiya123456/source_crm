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

import Settings from './Settings';
import ListEmployee from './Employee/ListEmployee';
import Dropdown from './Dropdown';
import ProductSales from './ProductSales';
import AddEmployee from './Employee/AddEmployee';
import { IRootState } from '../../store';
import LeadAutomation from './LeadAutomation';
import Iptracking from './Iptracking';
import Whatsapp from './whatsapp/Whatsapp';
import Sms from './sms/Sms';
import Email from './Email';
import Payments from './PaymentGateWay/Payments';
import Permission from './Permission';

export default function Index() {

    const navigate = useNavigate();
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const settingTap = useSelector((state: IRootState) => state.themeConfig.settingTap);


    useEffect(() => {
        if (!crmToken) navigate('/login')
    }, [crmToken])


    const APIurl = 'http://127.0.0.1:8000/api/';
    const [isLoading, setIsLoading] = useState(false)
    const [dropdowns, setDropdown] = useState([])

    useEffect(() => { fetchDropdowns(); }, [])

    const fetchDropdowns = async () => {
        setIsLoading(true);
        try {
            const response = await axios({
                method: 'get',
                url: APIurl + "settings-dropdowns",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });
            console.log(response.data.dropdowns);
            if (response.data.status == 'success') {
                setDropdown(response.data.dropdowns)
                console.log(response.data)
            }

        } catch (error: any) {

            if (error.response.status == 401) navigate('/login')
        } finally {
            setIsLoading(false);
        }
    }


    return (

        <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
            <div className={`panel xl:block p-4 dark:gray-50 w-[300px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden`}>
                <div className="flex flex-col h-full pb-2">
                    <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                        <LeftTab />
                    </PerfectScrollbar>
                </div>
            </div>

            {

                settingTap == 'general' ? <Settings /> :

                settingTap == "employee" ? <ListEmployee /> :

                settingTap == "addemployee" ? <AddEmployee /> :

                settingTap == "permission" ? <Permission /> :

                settingTap == "dropdown" ? <Dropdown /> :

                settingTap == "product" ? <ProductSales dropdowns={dropdowns.filter((dropdown) => dropdown.dd_type == "Lead Products")} /> :

                // settingTap == "leadautomation" ? <LeadAutomation dropdowns={dropdowns.filter((dropdown) => dropdown.dd_type == "Lead Status")} /> :

                settingTap == "iptracking" ? <Iptracking /> :

                settingTap == "whatsapp" ? <Whatsapp /> :

                settingTap == "sms" ? <Sms dropdowns={dropdowns.filter((dropdown) => dropdown.dd_type == "Sender Id")} /> :

                settingTap == "email" ? <Email /> :

                settingTap == "payments" ? <Payments /> :

                null

            }

        </div>
    )
}
