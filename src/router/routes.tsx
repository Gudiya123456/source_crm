import { lazy } from 'react';
import Notepad from '../pages/Notepad';
import AddLeads from '../pages/Leads/AddLeads';
import UploadLeads from '../pages/Leads/UploadLeads';
import ViewLeads from '../pages/Leads/ViewLeads';
import ViewSales from '../pages/Sales/ViewSales';
import GenerateReport from '../pages/Reports/GenerateReport';
import LeadsDashboard from '../pages/Dashboard/LeadsDashboard';
import SalesDashboard from '../pages/Dashboard/SalesDashboard';
import CustomDashboard from '../pages/Dashboard/CustomDashboard';
import Settings from '../pages/Settings/Index';
import ListEmployee from '../pages/Settings/Employee/ListEmployee';
import AddEmployee from '../pages/Settings/Employee/AddEmployee';
import Dropdown from '../pages/Settings/Dropdown';
import ProductSales from '../pages/Settings/ProductSales';
import MainDashboard from '../pages/Dashboard/MainDashboard';
import Login from '../pages/Authentication/Login';
import NotificationReport from '../pages/Reports/NotificationReport';
import WhatsappReport from '../pages/Reports/WhatsappReport';
import SmsReport from '../pages/Reports/SmsReport';
import Saleservice from '../pages/Analyst/Saleservice';
import Expiredservice from '../pages/Analyst/Expiredservice';
import Agreement from '../pages/Documents/Agreement';
import Riskprofile from '../pages/Documents/Riskprofile';
import Kycdetails from '../pages/Documents/Kycdetails';
import ViewRecommendation from '../pages/Analyst/ViewRecommendation';
const Index = lazy(() => import('../pages/Index'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <MainDashboard />,
        layout: 'default',
    },

    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },

     // notepad
    {
        path: '/notepad',
        element: <Notepad />,
    },

    {
        path: '/leads/addleads',
        element: <AddLeads />,
    },

    {
        path: '/leads/uploadleads',
        element: <UploadLeads />,
    },

    {
        path: '/leads/viewleads',
        element: <ViewLeads />,
    },
    {
        path: '/sales/viewsales',
        element: <ViewSales />,
    },
    // Report
    {
        path: '/reports/generatereport',
        element: <GenerateReport />,
    },
    {
        path: '/reports/smsreport',
        element: <SmsReport />,
    },
    {
        path: '/reports/whatsappreport',
        element: <WhatsappReport />,
    },
    {
        path: '/reports/notificationreport',
        element: <NotificationReport />,
    },
    // {
    //     path: '/dashboard/maindashboard',
    //     element: <MainDashboard />,
    // },
    // Dashbaord
    {
        path: '/dashboard/leadsdashboard',
        element: <LeadsDashboard />,
    },
    {
        path: '/dashboard/salesdashboard',
        element: <SalesDashboard />,
    },
    {
        path: '/dashboard/customdashboard',
        element: <CustomDashboard />,
    },
    // Analyst
    {
        path: '/analyst/saleservice',
        element: <Saleservice />,
    },
    {
        path: '/analyst/expiredservice',
        element: <Expiredservice />,
    },
    {
        path: '/analyst/viewrecommendation',
        element: <ViewRecommendation />,
    },
    // Documents
    {
        path: '/documents/agreement',
        element: <Agreement />,
    },
    {
        path: '/documents/kyc',
        element: <Kycdetails />,
    },
    {
        path: '/documents/riskprofile',
        element: <Riskprofile />,
    },
    // Settings
    {
        path: '/settings',
        element: <Settings />,
    },
    {
        path: '/settings/employee/listemployee',
        element: <ListEmployee />,
    },
    {
        path: '/settings/employee/addemployee',
        element: <AddEmployee />,
    },
    {
        path: '/settings/dropdown',
        element: <Dropdown />,
    },
    {
        path: '/settings/productsales',
        element: <ProductSales />,
    },


];

export { routes };
