import React from 'react';
import { useDispatch } from 'react-redux';
import { closeOneBox, smallOneBox } from '../../../../Redux/MessagerSlice';
import Styles from '../BoxChat.module.scss';
import { isMobile } from 'react-device-detect';
import ChatContainer from './ChatContainer';

export default function BoxChatWithOne({ chat }) {

    const dispatch = useDispatch();

    if (!chat) return null;

    return (
        <div className={`${Styles.boxchat} ${isMobile ? 'w-[300px] h-[400px]' : 'w-80 h-[430px]'} rounded-xl shadow-xl  bg-white flex flex-col items-start relative`}>
            <div className={`h-[60px] flex items-center justify-between p-0.5 ${isMobile ? 'w-[300px]' : 'w-80'}`} style={{ boxShadow: '0px 10px 10px -15px #111' }}>
                <div className='flex items-center w-7/12 hover:bg-gray-100 p-0.5 rounded-lg cursor-pointer'>
                    <img alt='avatar' src={chat.smallAvatar} className=' rounded-full object-cover w-12 h-12 p-1' />
                    <div className=' w-8/12 '>
                        <h1 className=' break-words font-semibold text-[16px] text-ellipsis whitespace-nowrap overflow-hidden w-full' title={chat.nickname}>{chat.nickname}</h1>
                        {chat.online ? (
                            <>
                                <div className=' text-[12px] w-full text-gray-500 flex items-center'>
                                    <div className='w-3 h-3 rounded-full bg-green-400 mr-1'></div>
                                    Đang hoạt động
                                </div>
                            </>
                        ) : (
                            <>
                                <h1 className=' text-[12px] w-full text-gray-500'>Không hoạt động</h1>
                            </>
                        )}
                    </div>
                </div>
                <div className='flex items-center justify-end w-5/12 space-x-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=' w-7 h-7 p-1 hover:bg-gray-200 cursor-pointer fill-gray-500 rounded-full '>
                        <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className=' w-7 h-7 p-1 hover:bg-gray-200 cursor-pointer fill-gray-500 rounded-full '>
                        <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z" />
                    </svg>
                    {isMobile ? (
                        <>
                            <svg
                                onClick={() => {
                                    dispatch(closeOneBox(chat.id));
                                    document.getElementById("list-contact").scrollLeft -= 300;
                                }}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className=' w-8 h-8 p-1 hover:bg-gray-200 cursor-pointer fill-gray-500 rounded-full '>
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </>
                    ) : (
                        <>
                            <svg
                                onClick={() => {
                                    dispatch(smallOneBox(chat.id))
                                }}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className=' w-8 h-8 p-1 hover:bg-gray-200 cursor-pointer fill-gray-500 rounded-full '>
                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                            </svg>
                            <svg
                                onClick={() => {
                                    dispatch(closeOneBox(chat.id))
                                }}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className=' w-8 h-8 p-1 hover:bg-gray-200 cursor-pointer fill-gray-500 rounded-full '>
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </>
                    )}
                </div>
            </div>
            <ChatContainer chat={chat} />
        </div>
    )
}