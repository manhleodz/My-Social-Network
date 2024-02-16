import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import leo from '../../../Assets/leo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Search from '../Search/Search';
import { Auth } from '../../../Network/Auth';


export default function NavigateBar() {

    const user = useSelector(state => state.authentication.user);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const link = useParams();

    if (!user) return null;

    return (
        <>
            <div
                id="default-sidebar"
                className={`fixed top-0 z-10 left-0`}
                aria-label="Sidebar"
            >
                <div className=' w-screen shadow-md flex flex-row justify-between items-center bg-white p-1 pr-7'>
                    <div className=' flex items-center w-1/3 space-x-3 max-md:hidden'>
                        <div className="flex items-center w-11 h-11 rounded-full mb-4 sm:mb-0 cursor-pointer" onClick={() => navigate('/')}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/my-social-network-815dc.appspot.com/o/posts%2F7ac0233d-c2ab-424a-80ac-0526ee7cba10.png_2024-2-16%2013%3A57%3A53_6189e03f-f66b-484c-a067-145db73a4015?alt=media&token=0dfd44ba-5cc9-4c91-b33e-c8778022463c" alt="logo" className="w-11 h-11 rounded-full" />
                        </div>
                        <Search />
                    </div>
                    <div className=' flex justify-between items-center w-1/4 max-sm:w-full'>
                        <button
                            onClick={() => {
                                navigate("/");
                            }}
                            className="w-full flex items-center justify-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 576 512"
                                aria-hidden="true"
                                fill="currentColor"
                                className={` flex-shrink-0 w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${link['*'] === '' ? 'fill-blue-600' : ''}`}
                            >
                                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => {
                                navigate("/community");
                            }}
                            className="w-full flex items-center justify-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 640 512"
                                aria-hidden="true"
                                fill="currentColor"
                                className={`flex-shrink-0 w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${link['*'] === 'community' ? 'fill-blue-600' : ''}`}
                            >
                                <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => {
                                navigate("/listpage");
                            }}
                            className="w-full flex items-center justify-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                                aria-hidden="true"
                                fill="currentColor"
                                className={`flex-shrink-0 w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${link['*'] === 'listpage' ? 'fill-blue-600' : ''}`}
                            >
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => {
                                navigate("/music");
                            }}
                            className="w-full flex items-center justify-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                                aria-hidden="true"
                                fill="currentColor"
                                className={`flex-shrink-0 w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${link['*'] === 'music' ? 'fill-blue-600' : ''}`}
                            >
                                <path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" />
                            </svg>
                        </button>
                    </div>
                    <div className='flex items-center justify-end space-x-4 w-1/3 max-sm:hidden'>
                        <div className=' w-10 h-10 flex justify-center items-center bg-gray-300 rounded-full hover:bg-gray-400 active:ring-gray-300 active:ring cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 512 512" className=' fill-gray-700'>
                                <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                            </svg>
                        </div>
                        <div className=' w-10 h-10 flex justify-center items-center bg-gray-300 rounded-full hover:bg-gray-400 active:ring-gray-300 active:ring cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 448 512" className=' fill-gray-700'>
                                <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                            </svg>
                        </div>
                        <div className='  rounded-full hover:bg-gray-400 active:ring-gray-300 active:ring cursor-pointer relative' onClick={() => setOpen(!open)}>
                            <img alt='avatar' src={`${user.avatar}`} className='w-10 h-10 rounded-full object-cover z-0' />
                            <div className='absolute bottom-0 right-0 z-50 bg-gray-200 rounded-full p-1 border-2 border-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="7" width="7" viewBox="0 0 512 512">
                                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                                </svg>
                            </div>
                        </div>
                        {open && (
                            <div
                                id='modal1' className='bg-white fixed shadow-inner space-y-3 right-10 top-14 rounded-xl p-3' style={{ width: "360px" }}
                            >
                                <div className='w-full rounded-xl' style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 15px" }}>
                                    <div className='flex items-center divide divide-gray-300 p-2 hover:bg-gray-100 rounded-xl cursor-pointer' onClick={() => navigate(`/${user.username}`)}>
                                        <img alt='avatar' src={user.avatar} className='w-10 h-10 rounded-full object-cover' />
                                        <h1 className='text-lg font-semibold px-2'>{user.nickname}</h1>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                                <div className='flex items-center w-full justify-between font-semibold cursor-pointer hover:bg-gray-100 rounded-lg p-2'>
                                    <div className='flex items-center w-full space-x-2'>
                                        <div className='rounded-full p-2 bg-gray-300'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="23" width="23" viewBox="0 0 512 512">
                                                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                                            </svg>
                                        </div>
                                        <h1>Cài đặt và quyền riêng tư</h1>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 320 512" fill='gray'>
                                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                                    </svg>
                                </div>
                                <div className='flex items-center w-full justify-between font-semibold cursor-pointer hover:bg-gray-100 rounded-lg p-2'>
                                    <div className='flex items-center w-full space-x-2'>
                                        <div className='rounded-full p-2 bg-gray-300'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="23" width="23" viewBox="0 0 512 512">
                                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                                            </svg>
                                        </div>
                                        <h1>Trợ giúp & hỗ trợ</h1>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 320 512" fill='gray'>
                                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                                    </svg>
                                </div>
                                <div className='flex items-center w-full justify-between font-semibold cursor-pointer hover:bg-gray-100 rounded-lg p-2'>
                                    <div className='flex items-center w-full space-x-2'>
                                        <div className='rounded-full p-2 bg-gray-300'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="23" width="23" viewBox="0 0 640 512">
                                                <path d="M544 248v3.3l69.7-69.7c21.9-21.9 21.9-57.3 0-79.2L535.6 24.4c-21.9-21.9-57.3-21.9-79.2 0L416.3 64.5c-2.7-.3-5.5-.5-8.3-.5H296c-37.1 0-67.6 28-71.6 64H224V248c0 22.1 17.9 40 40 40s40-17.9 40-40V176c0 0 0-.1 0-.1V160l16 0 136 0c0 0 0 0 .1 0H464c44.2 0 80 35.8 80 80v8zM336 192v56c0 39.8-32.2 72-72 72s-72-32.2-72-72V129.4c-35.9 6.2-65.8 32.3-76 68.2L99.5 255.2 26.3 328.4c-21.9 21.9-21.9 57.3 0 79.2l78.1 78.1c21.9 21.9 57.3 21.9 79.2 0l37.7-37.7c.9 0 1.8 .1 2.7 .1H384c26.5 0 48-21.5 48-48c0-5.6-1-11-2.7-16H432c26.5 0 48-21.5 48-48c0-12.8-5-24.4-13.2-33c25.7-5 45.1-27.6 45.2-54.8v-.4c-.1-30.8-25.1-55.8-56-55.8c0 0 0 0 0 0l-120 0z" />
                                            </svg>
                                        </div>
                                        <h1>Đóng góp ý kiến</h1>
                                    </div>
                                </div>
                                <div
                                    className='flex items-center w-full justify-between font-semibold cursor-pointer hover:bg-gray-100 rounded-lg p-2'
                                    onClick={() => {
                                        Auth.signOut();
                                        window.location.reload();
                                    }}
                                >
                                    <div className='flex items-center w-full space-x-2'>
                                        <div className='rounded-full p-2 bg-gray-300'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="23" width="23" viewBox="0 0 576 512">
                                                <path d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z" />
                                            </svg>
                                        </div>
                                        <h1>Đăng xuất</h1>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
