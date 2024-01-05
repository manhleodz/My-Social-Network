import React from 'react'
import { useSelector } from 'react-redux';
import leo from '../../../Assets/leo.png';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Search from '../Search/Search';


export default function Sidebar() {

    const user = useSelector(state => state.authentication.user);
    const navigate = useNavigate();
    const link = useParams();

    if (!user) return null;

    return (
        <>
            <div
                id="default-sidebar"
                className={`fixed top-0 z-10 left-0`}
                aria-label="Sidebar"
            >
                <div className=' w-screen shadow-md flex flex-row justify-between items-center bg-white p-2 pr-7'>
                    <div className=' flex items-center w-1/3 space-x-3 max-md:hidden'>
                        <div className="flex items-center mb-4 sm:mb-0 cursor-pointer" onClick={() => navigate('/')}>
                            <img src={leo} alt="logo" className="w-12 h-12" />
                        </div>
                        <Search />
                    </div>
                    <div className=' flex justify-between items-center w-1/4'>
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
                                className={` flex-shrink-0 w-8 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${link['*'] === '' ? 'fill-blue-600' : ''}`}
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
                                className={`flex-shrink-0 w-8 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${link['*'] === 'community' ? 'fill-blue-600' : ''}`}
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
                                className={`flex-shrink-0 w-8 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${link['*'] === 'listpage' ? 'fill-blue-600' : ''}`}
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
                                className={`flex-shrink-0 w-8 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${link['*'] === 'music' ? 'fill-blue-600' : ''}`}
                            >
                                <path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" />
                            </svg>
                        </button>
                    </div>
                    <div className='flex items-center justify-end space-x-4 w-1/3'>
                        <div className=' w-10 h-10 flex justify-center items-center bg-gray-300 rounded-full hover:bg-gray-400 active:ring-gray-300 active:ring cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" className=' fill-gray-700'>
                                <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                            </svg>
                        </div>
                        <div className=' w-10 h-10 flex justify-center items-center bg-gray-300 rounded-full hover:bg-gray-400 active:ring-gray-300 active:ring cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512" className=' fill-gray-700'>
                                <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                            </svg>
                        </div>
                        <div className='  rounded-full hover:bg-gray-400 active:ring-gray-300 active:ring cursor-pointer'>
                            <img alt='avatar' src={`${user.avatar}`} className='w-10 h-10 rounded-full object-cover'/>
                        </div>
                    </div>
                </div>
              
            </div>
        </>
    )
}
