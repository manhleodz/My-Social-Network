import React, { memo, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { ChatApi } from '../../../../Network/Chat';
import { isMobile } from 'react-device-detect';
import Styles from '../BoxChat.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../../Network/Socket';
import { updateAfterDeleteMessage } from '../../../../Redux/MessagerSlice';

function ListMessage({ listMessage, chat, setListMessage }) {

    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const deleteMessage = (id) => {
        ChatApi.deleteMessage(id).then(() => {
            const newList = listMessage.filter(message => message.id !== id);
            setListMessage(newList);

            dispatch(updateAfterDeleteMessage({
                RelationshipId: chat.RelationshipId,
                id: id
            }));

            socket.emit("delete_message", {
                receiver: chat.id,
                id: id,
                room: `coversation-${chat.RelationshipId}`,
                RelationshipId: chat.RelationshipId,
            })
        })
    }

    return (
        <>
            {listMessage.length > 0 && (
                <div className={` space-y-2`} >
                    <ScrollToBottom className={`${Styles.boxchat_listmess} overflow-y-visible overflow-x-hidden ${isMobile ? 'w-[300px] h-[290px]' : 'w-80 h-[300px]'} p-2 duration-500`}>
                        {listMessage.map((message, index) => (
                            <div key={index}>
                                {message.sender === user.id ? (
                                    <>
                                        <div className=' flex items-center justify-end w-full mb-1 space-x-2' key={message.id}>
                                            <div onClick={() => deleteMessage(message.id)} >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" className=' w-6 h-6 p-1 hover:bg-gray-200 fill-gray-500 cursor-pointer rounded-full'>
                                                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                                                </svg>
                                            </div>
                                            <h1 className={` p-2 rounded-2xl text-white bg-blue-500 text-[14.5px] break-words`} style={{ maxWidth: "230px" }}>{message.message}</h1>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className=' flex items-center space-x-2 justify-start w-full mb-1' key={message.id}>
                                            <img src={chat.smallAvatar} className=' w-8 h-8 rounded-full object-cover' />
                                            <h1 className={` p-2 rounded-2xl text-black bg-gray-300 text-[14.5px] break-words`} style={{ maxWidth: "230px" }}>{message.message}</h1>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                        {/* {(typing && newMessenger.length === 0) && (
                            <div className=' flex items-center space-x-2 justify-start w-full mb-1' key="typing">
                                <img src={chat.smallAvatar} className=' w-8 h-8 rounded-full object-cover' />
                                <img alt='typing' src={typingAnimation} className='h-8 w-12 object-fill rounded-2xl bg-gray-300' />
                            </div>
                        )} */}
                    </ScrollToBottom >
                </div >
            )
            }
        </>
    )
}

export default memo(ListMessage)