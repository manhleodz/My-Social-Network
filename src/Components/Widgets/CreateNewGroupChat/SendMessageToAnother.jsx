import React, { useEffect, useState } from 'react';
import { ChatApi } from '../../../Network/Chat';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';
import Styles from '../BoxChat/BoxChat.module.scss';
import { isMobile } from 'react-device-detect';
import socket from '../../../Network/Socket';
import { FriendApi } from '../../../Network/Friend';
export default function SendMessageToAnother({ newUser }) {

    const user = useSelector(state => state.authentication.user);

    const dispatch = useDispatch();

    const [chat, setChat] = useState(null);
    const [listMessage, setListMessage] = useState([]);
    const [newMessenger, setNewMessenger] = useState("");
    const [format, setFormat] = useState("text");
    const [typing, setTyping] = useState(false);

    const sendMessage = async () => {
        if (newMessenger !== "") {
            const messageData = {
                sender: user.id,
                receiver: chat.id,
                message: newMessenger,
                RelationshipId: chat.relationshipId,
                type: format
            };

            await ChatApi.sendMessage(messageData).then(async (res) => {

                const newMess = res.data.data;

                socket.emit("send_message", {
                    id: newMess.id,
                    room: `coversation-${chat.relationshipId}`,
                    createdAt: newMess.createdAt,
                    sender: user.id,
                    nickname: user.nickname,
                    receiver: chat.id,
                    type: format,
                    message: newMess.message,
                });

                setListMessage(prev => [...prev, {
                    id: newMess.id,
                    RelationshipId: chat.relationshipId,
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

    const typingHandler = (e) => {
        setNewMessenger(e.target.value);
        if (newMessenger.length > 0) {
            if (!socket.connected) return;

            if (!typing) {
                setTyping(true);
                socket.emit("typing", { room: `coversation-${chat.relationshipId}`, userId: user.id });
            }
        } else {

            if (typing) {

                let lastTypingTime = new Date().getTime();
                var timerLength = 3000;
                setTimeout(() => {
                    var timeNow = new Date().getTime();
                    var timeDiff = timeNow - lastTypingTime;
                    if (timeDiff >= timerLength && typing) {
                        socket.emit("stop typing", { room: `coversation-${chat.relationshipId}`, userId: user.id });
                        setTyping(false);
                    }
                }, timerLength);
            }
        }
    };

    const openMessageRequest = () => {
        FriendApi.openChannelMessageRequest({ user: newUser.id }).then(res => {
            const newChat = {
                id: newUser.id,
                nickname: newUser.nickname,
                username: newUser.username,
                smallAvatar: newUser.smallAvatar,
                relationshipId: res.data.relationshipId.id
            }


            ChatApi.getMessage(res.data.relationshipId.id).then((res) => {
                if (res.status === 200) {
                    setListMessage(prev => prev = [...prev, ...res.data.data]);
                } else
                    setListMessage([]);
            })

            setChat(newChat);
        })
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (data.room === `coversation-${chat.relationshipId}`) {
                setListMessage(prev => [...prev, data]);
            }
        });

    }, [socket, chat]);

    useEffect(() => {
        socket.on("typing", () => setTyping(true));
        socket.on("stop typing", () => setTyping(false));
    }, [])

    useEffect(() => {

        openMessageRequest();
    }, []);

    console.log(chat);

    if (!user || !chat) return null;
    return (
        <>
            {listMessage && (
                <div className={` space-y-2`} >
                    <ScrollToBottom className={`${Styles.boxchat_listmess} overflow-y-visible overflow-x-hidden ${isMobile ? 'w-[300px] h-[290px]' : 'w-80 h-[300px]'} p-2 duration-500`}>
                        {listMessage.map((message, index) => (
                            <div key={index}>
                                {message.sender === user.id ? (
                                    <>
                                        <div className=' flex items-center justify-end w-full mb-1 space-x-2' key={message.id}>
                                            <div onClick={() => ChatApi.deleteMessage(message.id)}>
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
                    </ScrollToBottom>
                </div>
            )}
            <div className={`w-full ${isMobile ? 'h-[40px] p-2 py-3' : 'h-[70px]  p-2 py-4'} flex items-center justify-between`}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=' w-5 h-5 cursor-pointer bg-gray-200 fill-black'>
                        <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                    </svg>
                </div>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await sendMessage();
                    }}
                    className=' p-2 rounded-xl h-10 bg-gray-200 relative flex items-center'
                >
                    <input
                        onChange={typingHandler}
                        value={newMessenger}
                        className='bg-gray-200 outline-none ring-0 p-2 rounded-xl'
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=' w-5 h-5 cursor-pointer bg-gray-200 fill-black'>
                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg>
                </form>
                <button onClick={() => sendMessage()} onDoubleClick={() => { }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=' w-5 h-5 fill-black'>
                        <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                    </svg>
                </button>
            </div>
        </>
    )
}
