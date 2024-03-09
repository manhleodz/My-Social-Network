import React, { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import SearchStyle from '../../Assets/SCSS/Search.module.scss';

export default function Search() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchParams = queryParams.get('q');

    useEffect(() => {
        document.title = `${searchParams} - Kết quả tìm kiếm | ML`;
    }, [searchParams]);

    return (
        <div className=' w-full bg-gray-100 h-full'>
            <div className='w-full relative top-10 flex items-start justify-start bg-gray-100 h-full'>
                <div className={`${SearchStyle.filter}  max-xl:hidden left-0 divide-y divide-gray-300 h-screen shadow-md text-black `}>
                    <div className={`${SearchStyle.filter_content} fixed top-0 left-0 bg-white h-screen p-4 divide-y-2 divide-gray-300`}>
                        <h1 className=' mt-14 text-2xl font-bold'>Kết quả tìm kiếm</h1>
                        <div>
                            <h1 className=' font-semibold text-lg'>Bộ lọc</h1>
                            <div className='space-y-2'>
                                <Link to={{
                                    pathname: "",
                                    search: `?q=${searchParams}`,
                                }}>
                                    <div
                                        className={`${location.pathname === "/search" ? "bg-gray-100" : ""} flex space-x-3 items-center font-medium cursor-pointer hover:bg-gray-100 rounded-xl p-2`}
                                        onClick={() => {
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-9 h-9 bg-gray-300 p-1.5 rounded-full'>
                                            <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                                        </svg>
                                        <h1>Tất cả</h1>
                                    </div>
                                </Link>
                                <Link to={{
                                    pathname: "posts",
                                    search: `?q=${searchParams}`,
                                }}>
                                    <div
                                        className={`${location.pathname.includes("posts") ? "bg-gray-100" : ""} flex space-x-3 items-center font-medium cursor-pointer hover:bg-gray-100 rounded-xl p-2`}
                                        onClick={() => {
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-9 h-9 bg-gray-300 p-1.5 rounded-full'>
                                            <path d="M96 96c0-35.3 28.7-64 64-64H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H80c-44.2 0-80-35.8-80-80V128c0-17.7 14.3-32 32-32s32 14.3 32 32V400c0 8.8 7.2 16 16 16s16-7.2 16-16V96zm64 24v80c0 13.3 10.7 24 24 24H296c13.3 0 24-10.7 24-24V120c0-13.3-10.7-24-24-24H184c-13.3 0-24 10.7-24 24zm208-8c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H384c-8.8 0-16 7.2-16 16zM160 304c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z" />
                                        </svg>
                                        <h1>Bài viết</h1>
                                    </div>
                                </Link>
                                <Link to={{
                                    pathname: "users",
                                    search: `?q=${searchParams}`,
                                }}>
                                    <div
                                        className={`${location.pathname.includes("users") ? "bg-gray-100" : ""} flex space-x-3 items-center font-medium cursor-pointer hover:bg-gray-100 rounded-xl p-2`}
                                        onClick={() => {
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className='w-9 h-9 bg-gray-300 p-1.5 rounded-full'>
                                            <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                                        </svg>
                                        <h1>Mọi người</h1>
                                    </div>
                                </Link>
                                <Link to={`images?q=${searchParams}`}>
                                    <div
                                        className={`${location.pathname.includes("images") ? "bg-gray-100" : ""} flex space-x-3 items-center font-medium cursor-pointer hover:bg-gray-100 rounded-xl p-2`}
                                        onClick={() => {
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className='w-9 h-9 bg-gray-300 p-1.5 rounded-full'>
                                            <path d="M45.6 32C20.4 32 0 52.4 0 77.6V434.4C0 459.6 20.4 480 45.6 480c5.1 0 10-.8 14.7-2.4C74.6 472.8 177.6 440 320 440s245.4 32.8 259.6 37.6c4.7 1.6 9.7 2.4 14.7 2.4c25.2 0 45.6-20.4 45.6-45.6V77.6C640 52.4 619.6 32 594.4 32c-5 0-10 .8-14.7 2.4C565.4 39.2 462.4 72 320 72S74.6 39.2 60.4 34.4C55.6 32.8 50.7 32 45.6 32zM96 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm272 0c7.9 0 15.4 3.9 19.8 10.5L512.3 353c5.4 8 5.6 18.4 .4 26.5s-14.7 12.3-24.2 10.7C442.7 382.4 385.2 376 320 376c-65.6 0-123.4 6.5-169.3 14.4c-9.8 1.7-19.7-2.9-24.7-11.5s-4.3-19.4 1.9-27.2L197.3 265c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l26.4 33.1 87-127.6c4.5-6.6 11.9-10.5 19.8-10.5z" />
                                        </svg>
                                        <h1>Ảnh</h1>
                                    </div>
                                </Link>
                                <Link to={`videos?q=${searchParams}`}>
                                    <div
                                        className={`${location.pathname.includes("videos") ? "bg-gray-100" : ""} flex space-x-3 items-center font-medium cursor-pointer hover:bg-gray-100 rounded-xl p-2`}
                                        onClick={() => {
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='w-9 h-9 bg-gray-300 p-1.5 rounded-full'>
                                            <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                                        </svg>
                                        <h1>Video</h1>
                                    </div>
                                </Link>
                                <Link to={`groups?q=${searchParams}`}>
                                    <div
                                        className={`${location.pathname.includes("groups") ? "bg-gray-100" : ""} flex space-x-3 items-center font-medium cursor-pointer hover:bg-gray-100 rounded-xl p-2`}
                                        onClick={() => {
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className='w-9 h-9 bg-gray-300 p-1.5 rounded-full'>
                                            <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                                        </svg>
                                        <h1>Nhóm</h1>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' w-full bg-gray-100 space-y-4 flex flex-col items-center mt-10 justify-start '>
                    <Outlet context={{ searchParams }} />
                </div>
            </div>
        </div>
    )
}
