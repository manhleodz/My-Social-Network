import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socket from '../../../../Network/Socket';
import { addBoxChat, openOneBox, setIsOpenChat } from '../../../../Redux/MessagerSlice';

export default function SingleChat({ chat }) {

    const user = useSelector(state => state.authentication.user);

    const dispatch = useDispatch();

    const [online, setOnline] = useState(false);
    const [isWatched, setIsWatched] = useState(chat.seen);

    let updatedAt = new Date(chat.updatedAt);
    const now = new Date();

    if (now - updatedAt < 3600000) {
        if (Math.round((now - updatedAt) / 60000) === 0) {
            updatedAt = "Vừa xong";
        } else
            updatedAt = Math.round((now - updatedAt) / 60000) + " phút";
    } else if (now - updatedAt < 86400000) {
        updatedAt = Math.round((now - updatedAt) / 3600000) + " giờ";
    } else if (now - updatedAt < 604800000) {
        updatedAt = Math.round((now - updatedAt) / 86400000) + " ngày";
    } else {
        updatedAt = updatedAt.getDate() + " tháng " + updatedAt.getMonth() + " lúc " + updatedAt.getHours() + ":" + updatedAt.getMinutes();
    }

    useEffect(() => {

        if (chat.relationshipId) {

            socket.on('connected', (data) => {
                if (data === chat.id) setOnline(true);
            })

            socket.on('disconnected', (data) => {
                if (data === chat.id) setOnline(false);
            })

            socket.on('seen', (data) => {
                if (data === chat.id) setIsWatched(true);
            })
        }
    }, [socket, chat.id]);

    return (
        <div
            className=' flex items-center justify-between rounded-lg hover:bg-gray-100 w-full p-2 cursor-pointer'
            onClick={() => {
                dispatch(setIsOpenChat(false))
                dispatch(openOneBox(chat));
                dispatch(addBoxChat(chat))
            }}
        >
            {chat.relationshipId ? (
                <>
                    <div className=' w-10/12 flex items-center space-x-2'>
                        <div className='w-16 h-16 rounded-full relative'>
                            <img alt='avatar' src={chat.smallAvatar} className='w-16 h-16 rounded-full object-cover' />
                            {online && (
                                <div className={`w-4 h-4 rounded-full absolute right-0 bottom-0 border-2 border-white bg-green-600`}></div>
                            )}
                        </div>
                        <div style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }}>
                            <h1 className=' font-semibold'>{chat.nickname}</h1>
                            {chat.lastMessage && (
                                <span className={` text-[14px] ${!isWatched ? 'font-semibold' : 'text-gray-600'}`}>{chat.lastMessage && chat.lastMessage.split("@@split@@")[0] == user.id ? (
                                    `bạn: ${chat.lastMessage.split("@@split@@")[1]}`
                                ) : (
                                    `${chat.lastMessage.split("@@split@@")[1]}`
                                )}
                                    . {updatedAt}
                                </span>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className=' w-10/12 flex items-center space-x-2'>
                        <img alt='avatar' src={chat.avatar} className='w-16 h-16 rounded-full object-cover' />
                        <div style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }}>
                            <h1 className=' font-semibold'>{chat.name}</h1>
                            {chat.lastMessage && (
                                <span className=' text-[15px] text-gray-600'>{chat.lastMessage && chat.lastMessage.split("@@split@@")[0] == user.id ? (
                                    `bạn: ${chat.lastMessage.split("@@split@@")[1]}`
                                ) : (
                                    `${chat.lastMessage.split("@@split@@")[1]}`
                                )}
                                    . {updatedAt}
                                </span>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}