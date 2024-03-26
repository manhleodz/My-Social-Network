import React, { useState } from 'react';
import socket from '../../../../Network/Socket';
import { ChatApi } from '../../../../Network/Chat';
import typingAnimation from '../../../../Assets/Gif icons/Typing2.gif';
import { useDispatch } from 'react-redux';
import { updateMessageCache, updateOneChat } from '../../../../Redux/MessagerSlice';
import { isMobile } from 'react-device-detect';

export default function InputForm({ listMessage, setListMessage, chat, user, typing, setTyping }) {

    const [newMessenger, setNewMessenger] = useState("");
    const [format, setFormat] = useState("text");

    const dispatch = useDispatch();

    const sendMessage = async () => {
        if (newMessenger !== "") {

            const now = Date.now();
            const messageData = {
                sender: user.id,
                receiver: chat.id,
                message: newMessenger,
                RelationshipId: chat.RelationshipId,
                type: format,
                updatedAt: new Date(now).toISOString(),
            };

            await ChatApi.sendMessage(messageData).then(async (res) => {

                const messageResponse = res.data.data;

                socket.emit("send_message", {
                    id: messageResponse.id,
                    room: `coversation-${chat.RelationshipId}`,
                    createdAt: messageResponse.createdAt,
                    updatedAt: new Date(now).toISOString(),
                    sender: user.id,
                    nickname: user.nickname,
                    receiver: chat.id,
                    RelationshipId: chat.RelationshipId,
                    type: format,
                    message: newMessenger,
                });

                dispatch(updateOneChat(messageData));

                const newMessage = {
                    id: messageResponse.id,
                    RelationshipId: chat.RelationshipId,
                    createdAt: messageResponse.createdAt,
                    sender: user.id,
                    message: newMessenger,
                }

                let date = newMessage.createdAt;
                date = new Date(date).toLocaleDateString();

                const newListMessage = { ...listMessage };

                newListMessage[date].push(newMessage);
                setListMessage(newListMessage);
                dispatch(updateMessageCache(newMessage));

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
                socket.emit("typing", { room: `coversation-${chat.RelationshipId}`, userId: user.id });
            }
        } else {

            if (typing) {

                let lastTypingTime = new Date().getTime();
                var timerLength = 3000;
                setTimeout(() => {
                    var timeNow = new Date().getTime();
                    var timeDiff = timeNow - lastTypingTime;
                    if (timeDiff >= timerLength && typing) {
                        socket.emit("stop typing", { room: `coversation-${chat.RelationshipId}`, userId: user.id });
                        setTyping(false);
                    }
                }, timerLength);
            }
        }
    };

    return (
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
                className=' p-2 rounded-3xl h-10 bg-gray-200 relative flex items-center'
            >
                <input
                    onChange={typingHandler}
                    value={newMessenger}
                    placeholder='Tin nhắn mới'
                    className='bg-gray-200 outline-none ring-0 p-2 rounded-3xl'
                    autoFocus
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
    )
}
