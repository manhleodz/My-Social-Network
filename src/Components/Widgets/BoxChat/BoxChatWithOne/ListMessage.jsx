import React, { memo, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { ChatApi } from '../../../../Network/Chat';
import { isMobile } from 'react-device-detect';
import Styles from '../BoxChat.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../../Network/Socket';
import { updateAfterDeleteMessage, updateMessageCache } from '../../../../Redux/MessagerSlice';
import DivideDay from '../DivideDay/DivideDay';

function ListMessage({ listMessage, chat, setListMessage }) {

    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const deleteMessage = ({ id, date }) => {
        ChatApi.deleteMessage(id).then(() => {
            const newMessagesByDate = { ...listMessage };
            newMessagesByDate[date] = newMessagesByDate[date].filter(m => m.id !== id);
            setListMessage(newMessagesByDate);

            dispatch(updateAfterDeleteMessage({
                RelationshipId: chat.RelationshipId,
                id: id,
                date: date
            }));

            socket.emit("delete_message", {
                receiver: chat.id,
                id: id,
                room: `coversation-${chat.RelationshipId}`,
                RelationshipId: chat.RelationshipId,
                date: date
            })
        })
    }

    useEffect(() => {
        socket.on("delete_message_receiver", async (data) => {
            if (user.id === data.receiver) {
                const date = data.date
                const id = data.id;
                let newListMessage = { ...listMessage };
                const dataChange = newListMessage[date].filter(m => m.id !== id);
                setListMessage({
                    ...newListMessage,
                    dataChange
                })
                dispatch(updateAfterDeleteMessage({
                    RelationshipId: data.RelationshipId,
                    id: id,
                    date: date
                }));
            }
        });

        return () => socket.disconnect();
    }, [socket]);


    const messagesByDateKeys = Object.keys(listMessage);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (data.room === `coversation-${chat.RelationshipId}`) {
                let date = data.createdAt;
                date = new Date(date).toLocaleDateString();

                const newListMessage = { ...listMessage };

                newListMessage[date].push(data);
                setListMessage(newListMessage);
                dispatch(updateMessageCache(data));
            }
        });

        return () => socket.disconnect();
    }, [socket]);


    return (
        <>
            <div className={` space-y-2`} >
                <ScrollToBottom className={`${Styles.boxchat_listmess} overflow-y-visible overflow-x-hidden ${isMobile ? 'w-[300px] h-[290px]' : 'w-80 h-[300px]'} p-2 duration-500`}>

                    {messagesByDateKeys.map(date => (
                        <>
                            <DivideDay date={date} firstMessage={listMessage[date][0]} />
                            {listMessage[date].map((message, index) => (
                                <div key={index}>
                                    {message.sender === user.id ? (
                                        <>
                                            <div className=' flex items-center justify-end w-full mb-1 space-x-2' key={message.id}>
                                                <div onClick={() => deleteMessage({ id: message.id, date: date })} >
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
                        </>
                    ))}
                    {/* {(typing && newMessenger.length === 0) && (
                            <div className=' flex items-center space-x-2 justify-start w-full mb-1' key="typing">
                                <img src={chat.smallAvatar} className=' w-8 h-8 rounded-full object-cover' />
                                <img alt='typing' src={typingAnimation} className='h-8 w-12 object-fill rounded-2xl bg-gray-300' />
                            </div>
                        )} */}
                </ScrollToBottom>
            </div>
        </>
    )
}

export default memo(ListMessage)