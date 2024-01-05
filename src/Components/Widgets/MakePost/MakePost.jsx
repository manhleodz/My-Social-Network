import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import video from '../../../Assets/Địt mẹ thằng lồn Tiến/video-marketing-movie-camera-svgrepo-com.svg';

export default function MakePost() {

    const user = useSelector(state => state.authentication.user);
    const [open, setOpen] = useState(false);

    if (!user) return null;

    return (
        <>
            <div className=' w-9/12 p-4 rounded-lg flex flex-col justify-center space-y-1 bg-white divide-y divide-gray-300 shadow-md'>
                <div className=' flex items-center mb-2  space-x-3'>
                    <img alt='avatar' src={user.avatar} className=' w-12 h-12 rounded-full object-cover' />
                    <div className=' w-full p-2 h-12 rounded-3xl bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center text-gray-600 text-lg' onClick={(e) => setOpen(true)}>{user.nickname}, bạn đang nghĩ gì thế?</div>
                </div>
                <div className='flex items-center justify-between'>
                    {open && (
                        <div className='flex items-center justify-center fixed top-0 left-0 z-50 w-screen h-screen' style={{ backgroundColor: "rgb(0,0,0,0.3)" }}>
                            <div className='flex flex-col justify-center items-center bg-white py-3 divide-y divide-gray-300 rounded-lg' style={{ width: "500px" }}>
                                <div className=' flex justify-center items-center text-xl font-bold w-full relative'>
                                    <h1 className=' py-3'>Tạo bài viết</h1>
                                    <div className=' cursor-pointer absolute right-5 w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center' onClick={() => setOpen(false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className=' p-3 w-full space-y-3'>
                                    <div className='flex items-center'>
                                        <img alt='avatar1' src={user.avatar} className=' w-12 h-12 rounded-full object-cover' />
                                        <div className=''>
                                            <h1>{user.nickname}</h1>
                                            <div>
                                                dropdown
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <textarea className=' w-full text-2xl ring-0 resize-none border-none outline-none focus:outline-none active:outline-none' style={{height: "150px"}} placeholder={`${user.nickname} ơi, bạn đang nghĩ gì thế?`}></textarea>
                                        <div className=' flex items-center w-full justify-between'>
                                            <div>ngu</div>
                                            <div>dan</div>
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between border border-gray-300 rounded-lg p-3 shadow-md'>
                                        <h1>Thêm vào bài viết của bạn</h1>
                                        <div className='flex items-center space-x-4'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                                <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                                <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm130.7 57.9c-4.2-13.6 7.1-25.9 21.3-25.9H364.5c14.2 0 25.5 12.4 21.3 25.9C369 368.4 318.2 408 258.2 408s-110.8-39.6-127.5-94.1zm86.9-85.1l0 0 0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0zm160 0l0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0 0 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button className=' w-full p-3 text-lg font-bold bg-gray-300 rounded-lg text-gray-400'>Đăng</button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className=' flex items-center justify-center w-full text-center font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 h-10 py-7 rounded-lg mt-2'>
                        <img alt='video' src={video} className=' w-10 h-10' />
                        <h1 className='px-2'>Video trực tiếp</h1>
                    </div>
                    <div className=' flex items-center justify-center w-full text-center font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 h-10 py-7 rounded-lg mt-2'>
                        <svg width="50px" height="50px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M910.4 843.8H174.6c-27.4 0-49.7-22.3-49.7-49.7V298.2c0-27.4 22.3-49.7 49.7-49.7h735.8c27.4 0 49.7 22.3 49.7 49.7v495.9c0 27.4-22.3 49.7-49.7 49.7z" fill="#A7B8C6" />
                            <path d="M272.1 193.8H118.7c-22.8 0-41.2 18.5-41.2 41.2v512.7c0 22.8 18.5 41.2 41.2 41.2h752.7c22.8 0 41.2-18.5 41.2-41.2V235c0-22.8-18.5-41.2-41.2-41.2H272.1z" fill="#FFFFFF" />
                            <path d="M871.4 802.5H118.7c-30.2 0-54.8-24.6-54.8-54.8V235c0-30.2 24.6-54.8 54.8-54.8h752.7c30.2 0 54.8 24.6 54.8 54.8v512.7c0 30.3-24.6 54.8-54.8 54.8zM118.7 207.3c-15.3 0-27.7 12.4-27.7 27.7v512.7c0 15.3 12.4 27.7 27.7 27.7h752.7c15.3 0 27.7-12.4 27.7-27.7V235c0-15.3-12.4-27.7-27.7-27.7H118.7z" fill="#3E3A39" />
                            <path d="M302.8 246.7H170.5c-19.6 0-35.6 13.6-35.6 30.3v376.5c0 16.7 15.9 30.3 35.6 30.3h649.1c19.6 0 35.6-13.6 35.6-30.3V277c0-16.7-15.9-30.3-35.6-30.3H302.8z" fill="#95D4EB" />
                            <path d="M430.8 683.8L230.3 483.3 135 578.6v105.2z" fill="#75BFAB" /><path d="M374.4 394.3m-98.8 0a98.8 98.8 0 1 0 197.6 0 98.8 98.8 0 1 0-197.6 0Z" fill="#F9F5B1" />
                            <path d="M855.1 630L551.5 326.4 194.3 683.7h660.8z" fill="#57B79C" /><path d="M855.1 521.8l-83-83-245 245h328z" fill="#75BFAB" />
                            <path d="M709.9 743.8h-33.1c-0.8 0-1.5-0.7-1.5-1.5v-33.1c0-0.8 0.7-1.5 1.5-1.5h33.1c0.8 0 1.5 0.7 1.5 1.5v33.1c0 0.9-0.7 1.5-1.5 1.5zM774.2 743.8h-33.1c-0.8 0-1.5-0.7-1.5-1.5v-33.1c0-0.8 0.7-1.5 1.5-1.5h33.1c0.8 0 1.5 0.7 1.5 1.5v33.1c0 0.9-0.6 1.5-1.5 1.5zM838.6 743.8h-33.1c-0.8 0-1.5-0.7-1.5-1.5v-33.1c0-0.8 0.7-1.5 1.5-1.5h33.1c0.8 0 1.5 0.7 1.5 1.5v33.1c0 0.9-0.7 1.5-1.5 1.5z" fill="#3E3A39" />
                        </svg>
                        <h1 className='px-2'>Ảnh/Video</h1>
                    </div>
                    <div className=' flex items-center justify-center w-full text-center font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 h-10 py-7 rounded-lg mt-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" fill='#EAB026' className='' viewBox="0 0 512 512">
                            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                        </svg>
                        <h1 className='px-2'>Cảm xúc/hoạt động</h1>
                    </div>
                </div>
            </div>
        </>
    )
}
