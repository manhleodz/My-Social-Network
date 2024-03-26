import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socket from '../../../../Network/Socket';
import { addBoxChat, openOneBox, setIsOpenChat } from '../../../../Redux/MessagerSlice';

export default function GroupChat({ chat }) {

    const user = useSelector(state => state.authentication.user);

    const dispatch = useDispatch();

    const [isWatched, setIsWatched] = useState(chat.seen);
    const [lastMessage, setLastMessage] = useState(chat.InboxGroups && chat.InboxGroups[0]);

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
            <div className=' w-10/12 flex items-center space-x-2'>
                <img alt='avatar' src={chat.avatar} className='w-16 h-16 rounded-full object-cover' />
                <div style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }}>
                    <h1 className=' font-semibold'>{chat.name}</h1>
                    {lastMessage && (
                        <>
                            {(() => {
                                if (lastMessage.type === "text") {
                                    return (
                                        <span className={` text-[14px] ${!isWatched ? 'font-semibold' : 'text-gray-600'}`}>{lastMessage.sender == user.id ? (
                                            `bạn: ${lastMessage.message}`
                                        ) : (
                                            `${lastMessage.ChannelMember.nickname}: ${lastMessage.message}`
                                        )}
                                            . {updatedAt}
                                        </span>
                                    )
                                } else if (lastMessage.type === "image") {
                                    return (
                                        <span className={` text-[14px] ${!isWatched ? 'font-semibold' : 'text-gray-600'}`}>{lastMessage.sender == user.id ? (
                                            `bạn gửi một hình ảnh`
                                        ) : (
                                            `${lastMessage.ChannelMember.nickname} gửi một hình ảnh`
                                        )}
                                            . {updatedAt}
                                        </span>
                                    )
                                } else if (lastMessage.type === "gif") {
                                    return (
                                        <span className={` text-[14px] ${!isWatched ? 'font-semibold' : 'text-gray-600'}`}>{lastMessage.sender == user.id ? (
                                            `bạn gửi một hình ảnh`
                                        ) : (
                                            `${lastMessage.ChannelMember.nickname} gửi một hình ảnh`
                                        )}
                                            . {updatedAt}
                                        </span>
                                    )
                                }
                            })()}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
