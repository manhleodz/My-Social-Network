import React from 'react';

import NavigateBar from '../NavigateBar/NavigateBar';
import BoxChat from '../BoxChat/BoxChat';
import { useSelector } from 'react-redux';

export default function Layout({ children }) {

  const boxChat = useSelector(state => state.messenger.boxChat);

  return (
    <div className="h-full bg-gray-100 relative">
      <div className="flex flex-col h-screen">
        <div className=" z-40" id='sidebar'>
          <NavigateBar />
        </div>
        <main className=" w-full h-full bg-gray-100" id='children'>{children}</main>
      </div>
      {boxChat.length > 0 && (
        <>
          <div className='fixed z-50 bottom-5 right-20 rounded-2xl shadow-2xl' id='box-chat'>
            <BoxChat />
          </div>
        </>
      )}
    </div>
  )
}
