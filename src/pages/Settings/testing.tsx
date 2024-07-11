import PerfectScrollbar from 'react-perfect-scrollbar';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import Dropdown from '../components/Dropdown';
import { setCrmToken, setPageTitle } from '../store/themeConfigSlice';
import IconNotes from '../components/Icon/IconNotes';
import IconNotesEdit from '../components/Icon/IconNotesEdit';
import IconStar from '../components/Icon/IconStar';
import IconSquareRotated from '../components/Icon/IconSquareRotated';
import IconPlus from '../components/Icon/IconPlus';
import IconMenu from '../components/Icon/IconMenu';
import IconUser from '../components/Icon/IconUser';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import IconPencil from '../components/Icon/IconPencil';
import IconTrashLines from '../components/Icon/IconTrashLines';
import IconEye from '../components/Icon/IconEye';
import IconX from '../components/Icon/IconX';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Notepad = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Notepad'));
        fetchNotepad();
    }, []);
    const [notesList, setNoteList] = useState([
        {
            id: 1,
            user: 'Max Smith',
            thumb: 'profile-16.jpeg',
            title: 'Meeting with Kelly',
            description: 'Curabitur facilisis vel elit sed dapibus sodales purus rhoncus.',
            date: '11/01/2020',
            is_fav: false,
            tag: 'personal',
        },
        {
            id: 2,
            user: 'John Doe',
            thumb: 'profile-14.jpeg',
            title: 'Receive Package',
            description: 'Facilisis curabitur facilisis vel elit sed dapibus sodales purus.',
            date: '11/02/2020',
            is_fav: true,
            tag: '',
        },
        {
            id: 3,
            user: 'Kia Jain',
            thumb: 'profile-15.jpeg',
            title: 'Download Docs',
            description: 'Proin a dui malesuada, laoreet mi vel, imperdiet diam quam laoreet.',
            date: '11/04/2020',
            is_fav: false,
            tag: 'work',
        },
        {
            id: 4,
            user: 'Max Smith',
            thumb: 'profile-16.jpeg',
            title: 'Meeting at 4:50pm',
            description: 'Excepteur sint occaecat cupidatat non proident, anim id est laborum.',
            date: '11/08/2020',
            is_fav: false,
            tag: '',
        },
    ]);
    const crmToken = useSelector((state: IRootState) => state.themeConfig.crmToken);
    const [isLoading, setIsLoading] = useState(false);
    const [notepads, setNotepads] = useState([])

    const fetchNotepad = async () => {
        setIsLoading(true)
        try {

            const response = await axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/notes',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + crmToken,
                },
            });

            if (response.data.status == "success") {
                setNotepads(response.data.notepads);
                console.log(response.data.notepads)
            }

        } catch (error) {
            console.log(error)

        } finally {
            setIsLoading(false)
        }

    }
    const defaultParams = { id: '', title: '', description: '', tag: '', is_fav: '1' };
    const [params, setParams] = useState<any>(defaultParams);
    const [errors, setErros] = useState<any>({});
    const validate = () => {
        setErros({});
        let errors = {};
        if (!params.title) {
            errors = { ...errors, title: "Title is required" };
        }
        console.log(errors);
        setErros(errors);
        return { totalErrors: Object.keys(errors).length };
    };
    const [btnLoading, setBtnLoading] = useState(false);
    const navigate = useNavigate();

    const changeValue = (e: any) => {
        const { value, name } = e.target;
        setErros({ ...errors, [name]: "" });
        setParams({ ...params, [name]: value });
        // console.table(params)
    };
    const AddDropdown = async (data: any) => {
        setBtnLoading(true)
        try {
            const response = await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/notes',
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

                setParams(defaultParams)
                alert('lllll')
                fetchNotepad();
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
        data.append("title", params.title);
        data.append("description", params.description);
        data.append("tag", params.tag);
        data.append("is_fav", params.is_fav);

        AddDropdown(data);
        setAddContactModal(false)
        // fetchNotepad()


    };

    const UpdateDropdown = (data: any) => {
        setAddContactModal(true);
        setErros({});
        if (data) {
            setParams({
                id: data.id,
                title: data.title,
                description: data.description,
                tag: data.tag,
                is_fav: data.is_fav

            });
        }
        else {
            setParams(defaultParams);
        }
    }

    // const defaultParams = { id: null, title: '', description: '', tag: '', user: '', thumb: '' };
    const [addContactModal, setAddContactModal] = useState<any>(false);
    const [isDeleteNoteModal, setIsDeleteNoteModal] = useState<any>(false);
    const [isShowNoteMenu, setIsShowNoteMenu] = useState<any>(false);
    const [isViewNoteModal, setIsViewNoteModal] = useState<any>(false);
    const [filterdNotesList, setFilterdNotesList] = useState<any>('');
    const [selectedTab, setSelectedTab] = useState<any>('all');
    const [deletedNote, setDeletedNote] = useState<any>(null);
    // console.log('filterdNotesListfilterdNotesListfilterdNotesList',filterdNotesList)

    const searchNotes = () => {


        if (selectedTab == 'fav') {

            if (selectedTab !== 'all') {
                setFilterdNotesList(notepads.filter((d) => d.tag === selectedTab));
            } else {
                setFilterdNotesList(notepads);
            }
        }
         else {
            setFilterdNotesList(notepads.filter((d) => d.is_fav));
        }
    };
    const tabChanged = (type: string) => {
        console.log(type)
        setSelectedTab(type);
        setIsShowNoteMenu(false);
        searchNotes();
    };



    const setFav = (note: any) => {
        let list = filterdNotesList;
        let item = list.find((d: any) => d.id === note.id);
        item.is_fav = !item.is_fav;
        // item.is_fav==1?0:1

        console.log('itemsss', item.is_fav)
        setFilterdNotesList(item);
        setFilterdNotesList([...list]);
        // console.log('list',list)
        // console.log('items',item)

        // if (selectedTab !== 'all' || selectedTab === 'delete') {
        //     searchNotes();
        // }
    };
    const updateStatus = (note: any) => {
        const dropdown = filterdNotesList.find((d) => d.id == note.id);
        AddDropdown({ ...dropdown, is_fav: dropdown.is_fav == 1 ? 0 : 1 })
        console.log('AddDropdownAddDropdown', AddDropdown);

        if (selectedTab !== 'all' || selectedTab === 'delete') {
            searchNotes();
        }
    }

    const setTag = (note: any, title: string = '') => {
        let list = filterdNotesList;
        let item = filterdNotesList.find((d: any) => d.id === note.id);
        item.tag = title;
        setFilterdNotesList([...list]);
        if (selectedTab !== 'all' || selectedTab === 'delete') {
            searchNotes();
        }
    };

    // const changeValue = (e: any) => {
    //     const { value, id } = e.target;
    //     setParams({ ...params, [id]: value });
    // };

    // const deleteNoteConfirm = (note: any) => {
    //     setDeletedNote(note);
    //     setIsDeleteNoteModal(true);
    // };

    // const viewNote = (note: any) => {
    //     setParams(note);
    //     setIsViewNoteModal(true);
    // };

    // const editNote = (note: any = null) => {
    //     setIsShowNoteMenu(false);
    //     const json = JSON.parse(JSON.stringify(defaultParams));
    //     setParams(json);
    //     if (note) {
    //         let json1 = JSON.parse(JSON.stringify(note));
    //         setParams(json1);
    //     }
    //     setAddContactModal(true);
    // };

    // const deleteNote = () => {
    //     setNoteList(notesList.filter((d: any) => d.id !== deletedNote.id));
    //     searchNotes();
    //     showMessage('Note has been deleted successfully.');
    //     setIsDeleteNoteModal(false);
    // };

    // const showMessage = (msg = '', type = 'success') => {
    //     const toast: any = Swal.mixin({
    //         toast: true,
    //         position: 'top',
    //         showConfirmButton: false,
    //         timer: 3000,
    //         customClass: { container: 'toast' },
    //     });
    //     toast.fire({
    //         icon: type,
    //         title: msg,
    //         padding: '10px 20px',
    //     });
    // };

    useEffect(() => {
        searchNotes();
    }, [selectedTab, notesList]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;


    const deleteNotepad = (note: any) => {

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
                        url: 'http://127.0.0.1:8000/api/notes/' + note.id,
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: "Bearer " + crmToken,
                        },
                    });
                    if (response.data.status === "success") {
                        Swal.fire({ title: response.data.title, text: response.data.message, icon: 'success', customClass: 'sweet-alerts' });
                        fetchNotepad()
                    }
                } catch (error: any) {
                    console.log(error)
                } finally {

                }
            }
        });

    }
    return (
        <div>
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                <div className={`bg-black/60 z-10 w-full h-full rounded-md absolute hidden ${isShowNoteMenu ? '!block xl:!hidden' : ''}`} onClick={() => setIsShowNoteMenu(!isShowNoteMenu)}></div>
                <div
                    className={`panel
                    p-4
                    flex-none
                    w-[240px]
                    absolute
                    xl:relative
                    z-10
                    space-y-4
                    h-full
                    xl:h-auto
                    hidden
                    xl:block
                    ltr:lg:rounded-r-md ltr:rounded-r-none
                    rtl:lg:rounded-l-md rtl:rounded-l-none
                    overflow-hidden ${isShowNoteMenu ? '!block h-full ltr:left-0 rtl:right-0' : 'hidden shadow'}`}
                >
                    <div className="flex flex-col h-full pb-16">
                        <div className="flex text-center items-center">
                            <div className="shrink-0">
                                <IconNotes />
                            </div>
                            <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">Notes</h3>
                        </div>

                        <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b] my-4"></div>
                        <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                            <div className="space-y-1">
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${selectedTab === 'all' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => tabChanged('all')}
                                >
                                    <div className="flex items-center">
                                        <IconNotesEdit className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">All Notes</div>
                                    </div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${selectedTab === 'fav' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => tabChanged('fav')}
                                >
                                    <div className="flex items-center">
                                        <IconStar className="shrink-0" />
                                        <div className="ltr:ml-3 rtl:mr-3">Favourites</div>
                                    </div>
                                </button>
                                <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
                                <div className="px-1 py-3 text-white-dark">Tags</div>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-primary ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${selectedTab === 'personal' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => tabChanged('personal')}
                                >
                                    <IconSquareRotated className="fill-primary shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">Personal</div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-warning ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${selectedTab === 'work' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => tabChanged('work')}
                                >
                                    <IconSquareRotated className="fill-warning shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">Work</div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-info ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${selectedTab === 'social' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => tabChanged('social')}
                                >
                                    <IconSquareRotated className="fill-info shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">Social</div>
                                </button>
                                <button
                                    type="button"
                                    className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-danger ltr:hover:pl-3 rtl:hover:pr-3 duration-300 ${selectedTab === 'important' && 'ltr:pl-3 rtl:pr-3 bg-gray-100 dark:bg-[#181F32]'
                                        }`}
                                    onClick={() => tabChanged('important')}
                                >
                                    <IconSquareRotated className="fill-danger shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">Important</div>
                                </button>
                            </div>
                        </PerfectScrollbar>
                    </div>
                    <div className="ltr:left-0 rtl:right-0 absolute bottom-0 p-4 w-full">
                        <button className="btn btn-primary w-full" type="button" onClick={() => setAddContactModal(true)}>
                            <IconPlus className="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
                            Add New Note
                        </button>
                    </div>
                </div>
                <div className="panel flex-1 overflow-auto h-full">
                    <div className="pb-5">
                        <button type="button" className="xl:hidden hover:text-primary" onClick={() => setIsShowNoteMenu(!isShowNoteMenu)}>
                            <IconMenu />
                        </button>
                    </div>
                    {filterdNotesList.length ? (
                        <div className="sm:min-h-[300px] min-h-[400px]">
                            <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                                {filterdNotesList.map((note: any) => {
                                    return (
                                        <div
                                            className={`panel pb-12 ${note.tag === 'personal'
                                                    ? 'bg-primary-light shadow-primary'
                                                    : note.tag === 'work'
                                                        ? 'bg-warning-light shadow-warning'
                                                        : note.tag === 'social'
                                                            ? 'bg-info-light shadow-info'
                                                            : note.tag === 'important'
                                                                ? 'bg-danger-light shadow-danger'
                                                                : 'dark:shadow-dark'
                                                }`}
                                            key={note.id}
                                        >
                                            <div className="min-h-[142px]">
                                                <div className="flex justify-between">
                                                    <div className="flex items-center w-max">
                                                        <div className="flex-none">
                                                            {note.title && (
                                                                <div >
                                                                    <img className="rounded-md w-10 h-10 object-cover" src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${note?.title}`} alt="userProfile" />
                                                                </div>
                                                            )}

                                                        </div>
                                                        <div className="ltr:ml-2 rtl:mr-2">
                                                            <div className="font-semibold">{note.title}</div>
                                                            <div className="text-sx text-white-dark">{note.created_at}</div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mt-4">{note.title}</h4>
                                                    <p className="text-white-dark mt-2">{note.description}</p>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-5 left-0 w-full px-5">
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="dropdown fdfdf">
                                                        <Dropdown
                                                            offset={[0, 5]}
                                                            placement={`${isRtl ? 'bottom-end' : 'bottom-start'}`}
                                                            btnClassName={`${note.tag === 'personal'
                                                                    ? 'text-primary'
                                                                    : note.tag === 'work'
                                                                        ? 'text-warning'
                                                                        : note.tag === 'social'
                                                                            ? 'text-info'
                                                                            : note.tag === 'important'
                                                                                ? 'text-danger'
                                                                                : ''
                                                                }`}
                                                            button={
                                                                <span>
                                                                    <IconSquareRotated
                                                                        className={
                                                                            note.tag === 'personal'
                                                                                ? 'fill-primary'
                                                                                : note.tag === 'work'
                                                                                    ? 'fill-warning'
                                                                                    : note.tag === 'social'
                                                                                        ? 'fill-info'
                                                                                        : note.tag === 'important'
                                                                                            ? 'fill-danger'
                                                                                            : ''
                                                                        }
                                                                    />
                                                                </span>
                                                            }
                                                        >
                                                            <ul className="text-sm font-medium">
                                                                <li>
                                                                    <button type="button" onClick={() => setTag(note, 'personal')}>
                                                                        <IconSquareRotated className="ltr:mr-2 rtl:ml-2 fill-primary text-primary" />
                                                                        Personal
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button type="button" onClick={() => setTag(note, 'work')}>
                                                                        <IconSquareRotated className="ltr:mr-2 rtl:ml-2 fill-warning text-warning" />
                                                                        Work
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button type="button" onClick={() => setTag(note, 'social')}>
                                                                        <IconSquareRotated className="ltr:mr-2 rtl:ml-2 fill-info text-info" />
                                                                        Social
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button type="button" onClick={() => setTag(note, 'important')}>
                                                                        <IconSquareRotated className="ltr:mr-2 rtl:ml-2 fill-danger text-danger" />
                                                                        Important
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </Dropdown>
                                                    </div>
                                                    <div className="flex items-center">

                                                        <button type="button" onClick={() => UpdateDropdown(note)}>
                                                            <IconPencil className="w-4 h-4 ltr:mr-3 rtl:ml-3 shrink-0" />

                                                        </button>

                                                        <button type="button" className="text-danger" onClick={() => deleteNotepad(note)}>
                                                            <IconTrashLines />
                                                        </button>

                                                        <button type="button" className="text-warning group ltr:ml-2 rtl:mr-2" onClick={() => updateStatus(note)}>
                                                            <IconStar className={`w-4.5 h-4.5  ${note.is_fav == 1 ? 'fill-warning' : false}`} />
                                                            {/* group-hover:fill-warning */}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center sm:min-h-[300px] min-h-[400px] font-semibold text-lg h-full">No data available</div>
                    )}

                    <Transition appear show={addContactModal} as={Fragment}>
                        <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-[51]">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-[black]/60" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center px-4 py-8">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                            <button
                                                type="button"
                                                onClick={() => setAddContactModal(false)}
                                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                            >
                                                <IconX />
                                            </button>
                                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                                {params.id ? 'Edit Note' : 'Add Note'}
                                            </div>
                                            <div className="p-5">
                                                <form>
                                                    <div className="mb-5">
                                                        <label htmlFor="title">Title</label>
                                                        <input name="title" type="text" placeholder="Enter Title" className="form-input" value={params.title} onChange={(e) => changeValue(e)} />
                                                        {errors?.title ? <div className="text-danger mt-1">{errors.title}</div> : ''}

                                                    </div>

                                                    <div className="mb-5">
                                                        <label htmlFor="tag">Tag</label>
                                                        <select name="tag" className="form-select" value={params.tag} onChange={(e) => changeValue(e)}>
                                                            <option value="">None</option>
                                                            <option value="personal">Personal</option>
                                                            <option value="work">Work</option>
                                                            <option value="social">Social</option>
                                                            <option value="important">Important</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-5">
                                                        <label htmlFor="desc">Description</label>
                                                        <textarea
                                                            name="description"
                                                            rows={3}
                                                            className="form-textarea resize-none min-h-[130px]"
                                                            placeholder="Enter Description"
                                                            value={params.description}
                                                            onChange={(e) => changeValue(e)}
                                                        ></textarea>
                                                    </div>
                                                    <div className="flex justify-end items-center mt-8">
                                                        <button type="button" className="btn btn-outline-danger gap-2" onClick={() => setAddContactModal(false)}>
                                                            Cancel
                                                        </button>
                                                        <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => { formSubmit() }}>
                                                            {params.id ? 'Update Note' : 'Add Note'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>

                    {/* delete modal  */}
                    <Transition appear show={isDeleteNoteModal} as={Fragment}>
                        <Dialog as="div" open={isDeleteNoteModal} onClose={() => setIsDeleteNoteModal(false)} className="relative z-[51]">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-[black]/60" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center px-4 py-8">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                            <button
                                                type="button"
                                                onClick={() => setIsDeleteNoteModal(false)}
                                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                            >
                                                <IconX />
                                            </button>
                                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Delete Notes</div>
                                            <div className="p-5 text-center">
                                                <div className="text-white bg-danger ring-4 ring-danger/30 p-4 rounded-full w-fit mx-auto">
                                                    <IconTrashLines className="w-7 h-7 mx-auto" />
                                                </div>
                                                <div className="sm:w-3/4 mx-auto mt-5">Are you sure you want to delete Notes?</div>

                                                <div className="flex justify-center items-center mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setIsDeleteNoteModal(false)}>
                                                        Cancel
                                                    </button>
                                                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => { deleteNotepad() }}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>

                    <Transition appear show={isViewNoteModal} as={Fragment}>
                        <Dialog as="div" open={isViewNoteModal} onClose={() => setIsViewNoteModal(false)} className="relative z-[51]">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-[black]/60" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center px-4 py-8">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                            <button
                                                type="button"
                                                onClick={() => setIsViewNoteModal(false)}
                                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                            >
                                                <IconX />
                                            </button>
                                            <div className="flex items-center flex-wrap gap-2 text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                                <div className="ltr:mr-3 rtl:ml-3">{params.title}</div>
                                                {params.tag && (
                                                    <button
                                                        type="button"
                                                        className={`badge badge-outline-primary rounded-3xl capitalize ltr:mr-3 rtl:ml-3 ${(params.tag === 'personal' && 'shadow-primary',
                                                                params.tag === 'work' && 'shadow-warning',
                                                                params.tag === 'social' && 'shadow-info',
                                                                params.tag === 'important' && 'shadow-danger')
                                                            }`}
                                                    >
                                                        {params.tag}
                                                    </button>
                                                )}
                                                {params.is_fav && (
                                                    <button type="button" className="text-warning">
                                                        <IconStar className="fill-warning" />
                                                    </button>
                                                )}
                                            </div>
                                            <div className="p-5">
                                                <div className="text-base">{params.description}</div>

                                                <div className="ltr:text-right rtl:text-left mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setIsViewNoteModal(false)}>
                                                        Close
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
            </div>
        </div>
    );
};

export default Notepad;
