import React, { useEffect, useState } from 'react';
import socket from '../../../../Network/Socket';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, setOpenNotification } from '../../../../Redux/NotificationSlice';
import SingleNotification from './SingleNotification';
import { useLocation } from 'react-router-dom';
import { MobileView, BrowserView } from 'react-device-detect';

export default function Notification() {

    const notifications = useSelector(state => state.notifications.notifications);
    const isOpen = useSelector(state => state.notifications.isOpen);
    const count = useSelector(state => state.notifications.count);

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {

        socket.on("notification", (data) => {
            dispatch(addNotification(data));
        })
    }, [socket])

    useEffect(() => {
        dispatch(setOpenNotification(false));
    }, [location.pathname])

    return (
        <>
            <BrowserView>
                <div onClick={() => {
                    if (!isOpen)
                        dispatch(setOpenNotification(true))
                    else
                        dispatch(setOpenNotification(false))
                }} className=' w-10 h-10 flex justify-center relative items-center bg-gray-300 rounded-full hover:bg-gray-400 active:ring-gray-300 active:ring cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 448 512" className=' fill-gray-700'>
                        <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                    </svg>
                    {count > 0 && (
                        <div className=' absolute w-4 h-4 text-white top-0 right-0 p-2 flex justify-center items-center bg-red-600 text-sm font-semibold  rounded-full'>{count}</div>
                    )}
                </div>
                {isOpen && (
                    <div className='bg-white fixed shadow-xl right-10 top-12 rounded-xl pl-3 pb-3 pt-3' style={{ width: "360px", boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px", maxHeight: "80%" }}>
                        <div className=' overflow-y-auto space-y-3 rounded-xl w-full h-full'>
                            <h1 className=' font-bold text-[25px]'>Thông báo</h1>
                            <div className=' flex items-center space-x-2'>
                                <button className='text-sm bg-blue-100 hover:bg-blue-200 font-semibold text-blue-600 rounded-xl p-2'>Tất cả</button>
                                <button className='text-sm bg-white hover:bg-gray-200 font-semibold rounded-xl p-2'>Chưa đọc</button>
                            </div>
                            <h1 className=' font-semibold'>Trước đó</h1>
                            {notifications.length > 0 && notifications.map((notification, index) => (
                                <>
                                    <SingleNotification notification={notification} key={index} />
                                </>
                            ))}
                        </div>
                    </div>
                )}
            </BrowserView>

            <MobileView>
                <div onClick={() => {
                }} className=' w-10 h-10 flex justify-center relative items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 448 512" className=' fill-gray-500'>
                        <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
                    </svg>
                    {count > 0 && (
                        <div className=' absolute w-4 h-4 text-white top-0 right-0 p-2 flex justify-center items-center bg-red-600 text-sm font-semibold  rounded-full'>{count}</div>
                    )}
                </div>
            </MobileView>
        </>
    )
}
