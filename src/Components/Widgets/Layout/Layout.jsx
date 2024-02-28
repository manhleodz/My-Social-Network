import React from 'react';
import { io } from 'socket.io-client';
import NavigateBar from '../NavigateBar/NavigateBar';
import BoxChat from '../BoxChat/BoxChat';
import { useDispatch, useSelector } from 'react-redux';
import { openOneBox } from '../../../Redux/MessagerSlice';

const socket = io.connect(import.meta.env.VITE_CHAT_URL);

export default function Layout({ children }) {

  const boxChat = useSelector(state => state.messenger.boxChat);
  const openChat = useSelector(state => state.messenger.openChat);
  const dispatch = useDispatch();

  return (
    <div className="h-full bg-gray-100 relative">
      <div className="flex flex-col h-screen">
        <div className=" z-40" id='sidebar'>
          <NavigateBar />
        </div>
        <main className=" w-full h-full bg-gray-100" id='children'>{children}</main>
      </div>
      <div className='fixed flex flex-col items-center space-y-3 bottom-5 right-2'>

        {boxChat.length > 0 && (
          <>
            {boxChat.map((chat, index) => (
                <div className='rounded-full relative' key={index} onClick={() => dispatch(openOneBox(chat))}>
                  <img alt={chat.username} src={chat.avatar} className='w-14 h-14 object-center rounded-full object-cover' />
                  <div className={`w-3 h-3 rounded-full absolute right-1 bottom-0 border-2 border-white ${chat.online === true ? 'bg-green-600 ' : 'bg-gray-400'}`}></div>
                </div>
            ))}
          </>
        )}
        <div className='w-14 h-14 p-3 flex items-center rounded-full bg-white justify-center cursor-pointer' style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className=' fill-black bg-white '>
            <path d="M160 64c0-35.3 28.7-64 64-64H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H336.8c-11.8-25.5-29.9-47.5-52.4-64H384V320c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v32h64V64L224 64v49.1C205.2 102.2 183.3 96 160 96V64zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 
              352h53.3C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7H26.7C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z"/>
          </svg>
        </div>
      </div>
      {openChat.length > 0 && (
        <>
          <div className='fixed flex items-center space-x-2 z-50 bottom-5 right-20 rounded-2xl shadow-2xl' id='box-chat'>
            {openChat.map((chat, index) => (
              <>
                <BoxChat chat={chat} key={index} socket={socket}/>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
