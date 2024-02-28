import React, { useEffect, useRef, useState } from 'react';
import { ChatApi } from '../../../Network/Chat';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import { closeOneBox, smallOneBox } from '../../../Redux/MessagerSlice';
import Styles from './BoxChat.module.scss';

export default function BoxChat({ chat, socket }) {

    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const [listMessage, setListMessage] = useState([]);
    const [newMessenger, setNewMessenger] = useState("");

    const sendMessage = async () => {
        if (newMessenger !== "") {
            const messageData = {
                sender: user.id,
                receiver: chat.id,
                message: newMessenger,
                room: chat.relationshipId,
            };

            await ChatApi.sendMessage(messageData).then(async (res) => {

                const newMess = res.data.data;

                await socket.emit("send_message", {
                    id: newMess.id,
                    room: chat.relationshipId,
                    createdAt: newMess.createdAt,
                    sender: user.id,
                    message: newMess.message,
                });

                setListMessage(prev => [...prev, {
                    id: newMess.id,
                    room: chat.relationshipId,
                    createdAt: newMess.createdAt,
                    sender: user.id,
                    message: newMess.message,
                }]);

            }).catch((err) => {
                console.log(err);
            });
            setNewMessenger("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (data.room === chat.relationshipId)
                setListMessage(prev => [...prev, data]);
        });

    }, [socket, chat]);

    useEffect(() => {
        socket.emit("join_room", chat.relationshipId);

        ChatApi.getMessage(chat.id).then((res) => {
            if (res.status === 200) {
                setListMessage(prev => prev = [...prev, ...res.data.data]);
            } else
                setListMessage([]);
        })

    }, [chat]);

    if (!user || !chat) return null;

    return (
        <div className={`${Styles.boxchat} w-80 rounded-lg shadow-xl h-[430px] bg-white flex flex-col items-start relative`}>
            <div className='h-[60px] flex items-center justify-between p-0.5 w-80' style={{ boxShadow: '0px 10px 10px -15px #111' }}>
                <div className='flex items-center w-7/12 hover:bg-gray-100 p-0.5 rounded-lg cursor-pointer'>
                    <img alt='avatar' src={chat.avatar} className=' rounded-full object-cover w-12 h-12 p-1' />
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
                </div>
            </div>
            {listMessage && (
                <div className={` space-y-2`} >
                    <ScrollToBottom className={`${Styles.boxchat_listmess} h-[300px] overflow-y-auto w-80 p-2 duration-500`}>
                        {listMessage.map((message, index) => (
                            <div key={index}>
                                {message.sender === user.id ? (
                                    <>
                                        <div className=' flex items-center justify-end w-full mb-1' key={message.id}>
                                            <h1 className={` p-2 rounded-2xl text-white bg-blue-500 text-[14.5px]`} >{message.message}</h1>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className=' flex items-center space-x-2 justify-start w-full mb-1' key={message.id}>
                                            <img src={chat.avatar} className=' w-8 h-8 rounded-full object-cover' />
                                            <h1 className={` p-2 rounded-2xl text-black bg-gray-300 text-[14.5px]`} >{message.message}</h1>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </ScrollToBottom>
                </div>
            )}
            <div className='w-full h-[70px] flex items-center justify-between p-2 py-4'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=' w-5 h-5 cursor-pointer bg-gray-200 fill-black'>
                        <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                    </svg>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }}
                    className=' p-2 rounded-xl h-10 bg-gray-200 relative flex items-center'
                >
                    <input
                        onChange={(e) => {
                            setNewMessenger(e.target.value);
                        }}
                        value={newMessenger}
                        className='bg-gray-200 outline-none ring-0 p-2 rounded-xl'
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=' w-5 h-5 cursor-pointer bg-gray-200 fill-black'>
                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg>
                </form>
                <svg onClick={() => sendMessage()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=' w-5 h-5 cursor-pointer fill-black'>
                    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                </svg>
            </div>
        </div>
    )
}