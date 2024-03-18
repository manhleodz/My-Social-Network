import React, { useEffect, useState } from 'react'
import socket from '../../../../Network/Socket';
import { useDispatch, useSelector } from 'react-redux';
import { MobileView, BrowserView } from 'react-device-detect';
import SingleChat from './SingleChat';
import { setCreateGroup, setIsOpenChat } from '../../../../Redux/MessagerSlice';


export default function MessagerDropdown() {

    const user = useSelector(state => state.authentication.user);
    const allChat = useSelector(state => state.messenger.allChat);
    const isOpen = useSelector(state => state.messenger.isOpen);

    const dispatch = useDispatch();

    const [numberMessages, setNumberMessages] = useState(0);

    useEffect(() => {
        socket.on(`receiver`, (data) => {
            console.log(data);
            setNumberMessages(numberMessages => numberMessages + 1);
        });

    }, [socket]);

    console.log(allChat);

    return (
        <>
            <BrowserView>
                <div onClick={() => dispatch(setIsOpenChat(!isOpen))} className={` w-10 h-10 flex justify-center items-center relative bg-gray-300 rounded-full hover:bg-gray-400 active:ring-gray-300 active:ring cursor-pointer`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 512 512" className=' fill-gray-700'>
                        <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4
                        62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4
                        17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32
                        0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                        />
                    </svg>
                    {numberMessages > 0 && (
                        <div className=' absolute w-4 h-4 text-white top-0 right-0 p-2 flex justify-center items-center bg-red-600 text-sm font-semibold  rounded-full'>{numberMessages}</div>
                    )}
                </div>

                {/* {isOpen && (
                    <div className='bg-white fixed shadow-xl right-10 top-12 rounded-xl pl-3 pb-3 pt-3 overflow-y-auto' style={{ width: "360px", maxHeight: "90%" }}>
                        <div className=' flex items-center justify-between'>
                            <h1 className=' font-bold text-[25px]'>Đoạn chat</h1>
                            <svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=' w-5 mr-3 fill-gray-700 cursor-pointer'
                                onClick={() => {
                                    dispatch(setCreateGroup(true));
                                    dispatch(setIsOpenChat(false))
                                }}
                            >
                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                            </svg>
                        </div>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className={`z-50 w-full rounded-lg outline-none space-y-3 p-1.5 pr-3`}>
                            <div className="relative z-50 w-full">
                                <div className="absolute z-50 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="search" id="default-search"
                                    className={`block text-xl w-full pl-10 text-gray-900 border-0 rounded-3xl bg-gray-200 focus:ring-0 focus:outline-none`}
                                    placeholder="Tìm kiếm"
                                />
                            </div>
                        </div>
                        <div className=' flex items-center space-x-2 mb-2'>
                            <button className='text-sm bg-blue-100 hover:bg-blue-200 font-semibold text-blue-600 rounded-xl p-2'>Hộp thư</button>
                            <button className='text-sm bg-white hover:bg-gray-200 font-semibold rounded-xl p-2'>Tin chờ</button>
                        </div>
                        {allChat.length === 0 ? (
                            <h1></h1>
                        ) : (
                            <div className=' w-full'>
                                {allChat.map((chat, index) => (
                                    <SingleChat key={index} chat={chat} />
                                ))}
                            </div>
                        )}
                    </div>
                )} */}
            </BrowserView>

            <MobileView>
                <div onClick={() => { }} className={` w-10 h-10 flex justify-center items-center relative `}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 512 512" className=' fill-gray-500'>
                        <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4
                        62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4
                        17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32
                        0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                        />
                    </svg>
                    {numberMessages > 0 && (
                        <div className=' absolute w-4 h-4 text-white top-0 right-0 p-2 flex justify-center items-center bg-red-600 text-sm font-semibold  rounded-full'>{numberMessages}</div>
                    )}
                </div>
            </MobileView>
        </>
    )
}
