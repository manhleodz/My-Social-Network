import React, { useEffect, useState } from 'react';
import cloudLogin from '../../../Assets/icons8-login-100.png';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useNavigate } from 'react-router-dom';
import { ChatApi } from '../../../Network/Chat';

export default function BoxChat({ user, socket, open, setOpen }) {

    const [currentMessage, setCurrentMessage] = useState("");
    const navigate = useNavigate();
    const [messageList, setMessageList] = useState('');

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                author: user.username,
                receiver: 0,
                message: currentMessage,
                room: user.id,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            ChatApi.sendMessage(user.id, messageData).then(() => {
                socket.emit("send_message", messageData);
                setMessageList((list) => [...list, messageData]);
                setCurrentMessage("");
            }).catch((err) => console.log(err));
        }
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    useEffect(() => {
        if (user) {
            ChatApi.getMessage(user.id).then((res) => {
                setMessageList(res.data);
            });
        }
    }, [open]);

    if (!messageList) return null;

    return (
        <>
            {open && (
                <div>
                    <div className=' bg-green-700 flex items-center justify-between p-3 rounded-t-2xl text-white '>
                        <img alt='emiu' src='https://i.ex-cdn.com/mgn.vn/files/content/2022/08/30/dtcl-chi-tiet-cac-linh-thu-moi-1-1545.jpg' className='w-10 h-10 rounded-full' />
                        <div>
                            <h1 >Hung Luxury</h1>
                            <h1 className='w-56 text-base'
                                style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }}
                                title='Sẵn sàng giải đáp mọi thắc mắc của bạn'
                            >
                                Sẵn sàng giải đáp mọi thắc mắc của bạn
                            </h1>
                        </div>
                        <div
                            className=' cursor-pointer'
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512" className=' fill-white w-7 h-7 p-1.5 rounded-full bg-green-600 hover:bg-green-700 '>
                                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                            </svg>
                        </div>
                    </div>
                    <div className=' bg-white'>
                        <ScrollToBottom className='message-container'>
                            <div
                                className="message"
                                id="shop"
                            >
                                <div className='w-full'>
                                    <div className="message-content">
                                        <p>Hãy để lại lời nhắn. Hung Luxury sẽ hỗ trợ bạn. Hung Luxury xin cảm ơn!</p>
                                    </div>
                                    <div className="message-meta flex">
                                        <p id="author">Melody Mark</p>
                                    </div>
                                </div>
                            </div>
                            {messageList.map((messageContent, index) => {
                                return (
                                    <div
                                        className="message"
                                        id={user.id === Number(messageContent.room) ? "you" : "shop"}
                                        key={index}
                                    >
                                        {user.id !== Number(messageContent.room) ? (
                                            <div className='w-full'>
                                                <div className="message-content">
                                                    <p>{messageContent.message}</p>
                                                </div>
                                                <div className="message-meta flex">
                                                    <p id="time">{messageContent.time}</p>
                                                    <p id="author">Melody Mark</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='flex'>
                                                <div>
                                                    <div className="message-content">
                                                        <p>{messageContent.message}</p>
                                                    </div>
                                                    <div className="message-meta flex">
                                                        <p id="time">{messageContent.time}</p>
                                                        <p id="author">{messageContent.author}</p>
                                                    </div>
                                                </div>
                                                <img src={user.avatar} alt='...' className='w-10 h-10 rounded-full' />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </ScrollToBottom>
                    </div>
                    <div>
                        <div className="flex">
                            <div className="relative w-full">
                                <div className="relative">
                                    {user ? (
                                        <>
                                            <input
                                                type="text" id="default-search"
                                                autoComplete='false'
                                                className="block w-full p-3 pl-4 pr-14 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                                                placeholder="Hỏi gì đi em..." required
                                                onChange={(event) => {
                                                    setCurrentMessage(event.target.value);
                                                }}
                                                value={currentMessage}
                                                onKeyDown={handleKeyDown}
                                            />
                                            <button
                                                onClick={sendMessage}
                                                className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none active:ring-0 font-medium rounded-lg text-sm px-2 py-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" fill='red'>
                                                    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                                                </svg>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className=' cursor-pointer'
                                                onClick={() => {
                                                    document.getElementById("mess-alert").style.display = "block";
                                                }}
                                            >
                                                <div className=' absolute z-50 w-full h-full'></div>
                                                <input
                                                    type="text" id="default-search"
                                                    className="block w-full p-4 pl-4 pr-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                                                    placeholder="Hỏi gì đi em..."
                                                    disabled
                                                />
                                            </div>
                                            <button
                                                className="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none active:ring-0 font-medium rounded-lg text-sm px-2 py-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512" fill='red'>
                                                    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                                                </svg>
                                            </button>
                                            <div className=' fixed z-10 bottom-24 right-9 w-72 border-2 border-yellow-200 rounded-xl hidden' id='mess-alert'>
                                                <div className='flex items-center justify-between p-3'>
                                                    <h1 className='text-lg'>Vui lòng đăng nhập tại</h1>
                                                    <img src={cloudLogin} alt='...' className='w-14 cursor-pointer' onClick={() => navigate("/login")} />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}