import { createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';
import themeConfig from '../theme.config';

const defaultState = {
    isDarkMode: false,
    mainLayout: 'app',
    theme: 'light',
    menu: 'horizontal',
    layout: 'full',
    rtlClass: 'ltr',
    animation: '',
    navbar: 'navbar-sticky',
    locale: 'en',
    sidebar: false,
    pageTitle: '',
    languageList: [
        { code: 'zh', name: 'Chinese' },
        { code: 'da', name: 'Danish' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'el', name: 'Greek' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'it', name: 'Italian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'pl', name: 'Polish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'es', name: 'Spanish' },
        { code: 'sv', name: 'Swedish' },
        { code: 'tr', name: 'Turkish' },
    ],
    semidark: false,
    crmToken: '',
    authUser: null,
    settingTap: 'general',
    settingData:null,
    hideCols: ['id', 'last_name', 'email', 'second_phone', 'invest', 'first_trail', 'second_trail', 'followup', 'dnd', 'city', 'first_trail', 'products', 'desc', 'kyc_status', 'rp_status', 'created_at', 'updated_at']
};

const initialState = {
    theme: localStorage.getItem('theme') || themeConfig.theme,
    menu: localStorage.getItem('menu') || themeConfig.menu,
    layout: localStorage.getItem('layout') || themeConfig.layout,
    rtlClass: localStorage.getItem('rtlClass') || themeConfig.rtlClass,
    animation: localStorage.getItem('animation') || themeConfig.animation,
    navbar: localStorage.getItem('navbar') || themeConfig.navbar,
    locale: localStorage.getItem('i18nextLng') || themeConfig.locale,
    isDarkMode: false,
    sidebar: localStorage.getItem('sidebar') || defaultState.sidebar,
    semidark: localStorage.getItem('semidark') || themeConfig.semidark,
    languageList: [
        { code: 'zh', name: 'Chinese' },
        { code: 'da', name: 'Danish' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'el', name: 'Greek' },
        { code: 'hu', name: 'Hungarian' },
        { code: 'it', name: 'Italian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'pl', name: 'Polish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'es', name: 'Spanish' },
        { code: 'sv', name: 'Swedish' },
        { code: 'tr', name: 'Turkish' },
        { code: 'ae', name: 'Arabic' },
    ],

    crmToken: localStorage.getItem('crmToken') || defaultState.crmToken,
    settingTap: localStorage.getItem('settingTap') || defaultState.settingTap,

    authUser: JSON.parse(localStorage.getItem('authUser')) || themeConfig.authUser || themeConfig.authUser,
    hideCols: JSON.parse(localStorage.getItem('hideCols')) || defaultState.hideCols || defaultState.hideCols,
    settingData:JSON.parse(localStorage.getItem('settingData')) || themeConfig.settingData || themeConfig.settingData
};


const themeConfigSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        toggleTheme(state, { payload }) {
            payload = payload || state.theme; // light | dark | system
            localStorage.setItem('theme', payload);
            state.theme = payload;
            if (payload === 'light') {
                state.isDarkMode = false;
            } else if (payload === 'dark') {
                state.isDarkMode = true;
            } else if (payload === 'system') {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    state.isDarkMode = true;
                } else {
                    state.isDarkMode = false;
                }
            }

            if (state.isDarkMode) {
                document.querySelector('body')?.classList.add('dark');
            } else {
                document.querySelector('body')?.classList.remove('dark');
            }
        },
        toggleMenu(state, { payload }) {
            payload = payload || state.menu; // vertical, collapsible-vertical, horizontal
            state.sidebar = false; // reset sidebar state
            localStorage.setItem('menu', payload);
            state.menu = payload;
        },
        toggleLayout(state, { payload }) {
            payload = payload || state.layout; // full, boxed-layout
            localStorage.setItem('layout', payload);
            state.layout = payload;
        },
        toggleRTL(state, { payload }) {
            payload = payload || state.rtlClass; // rtl, ltr
            localStorage.setItem('rtlClass', payload);
            state.rtlClass = payload;
            document.querySelector('html')?.setAttribute('dir', state.rtlClass || 'ltr');
        },
        toggleAnimation(state, { payload }) {
            payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
            payload = payload?.trim();
            localStorage.setItem('animation', payload);
            state.animation = payload;
        },
        toggleNavbar(state, { payload }) {
            payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static
            localStorage.setItem('navbar', payload);
            state.navbar = payload;
        },
        toggleSemidark(state, { payload }) {
            payload = payload === true || payload === 'true' ? true : false;
            localStorage.setItem('semidark', payload);
            state.semidark = payload;
        },
        toggleLocale(state, { payload }) {
            payload = payload || state.locale;
            i18next.changeLanguage(payload);
            state.locale = payload;
        },
        toggleSidebar(state) {
            state.sidebar = !state.sidebar;
        },

        setPageTitle(state, { payload }) {
            document.title = `${payload} | Sourcefile CRM`;
        },
        setCrmToken(state, { payload }) {
            localStorage.setItem('crmToken', payload);
            state.crmToken = payload;
        },
        setAuthUser(state, { payload }) {
            localStorage.setItem('authUser', JSON.stringify(payload));
            state.authUser = payload;
        },

        setHideCols(state, { payload }) {
            localStorage.setItem('hideCols', JSON.stringify(payload));
            state.hideCols = payload;
        },

        setSettingTap(state, { payload }) {
            localStorage.setItem('settingTap', payload);
            state.settingTap = payload;
        },
        setSettingToggleData(state, { payload }) {
            localStorage.setItem('settingData', JSON.stringify(payload));
            state.settingData = payload;
        },




    },
});

export const { setSettingToggleData,setSettingTap, setHideCols, setAuthUser, setCrmToken, toggleTheme, toggleMenu, toggleLayout, toggleRTL, toggleAnimation, toggleNavbar, toggleSemidark, toggleLocale, toggleSidebar, setPageTitle } = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
