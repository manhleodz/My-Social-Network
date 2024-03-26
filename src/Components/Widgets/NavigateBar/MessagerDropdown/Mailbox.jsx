import React, { memo, useEffect } from 'react';
import SingleChat from './SingleChat';
import { clearUnread, setCreateGroup, setIsOpenChat } from '../../../../Redux/MessagerSlice';
import GroupChat from './GroupChat';
import { useDispatch } from 'react-redux';

function Mailbox({ allChat }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearUnread());
    }, [])

    console.log(allChat);

    return (
        <>
            <div className='bg-white fixed right-10 top-12 rounded-xl pl-3 pb-3 pt-3 overflow-y-auto' style={{ width: "360px", maxHeight: "90%", boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
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
                    <h1>Hãy bắt đầu trò chuyện với mọi người nhé</h1>
                ) : (
                    <div className=' w-full pr-3' key="list">
                        {allChat.map((chat, index) => (
                            <>
                                {chat.RelationshipId != null ? (
                                    <SingleChat key={index} chat={chat} />
                                ) : (
                                    <GroupChat key={index} chat={chat} />
                                )}
                            </>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default memo(Mailbox)