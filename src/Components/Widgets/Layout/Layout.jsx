import React, { useState } from 'react';
import NavigateBar from '../NavigateBar/NavigateBar';
import BoxChat from '../BoxChat/BoxChat';
import { useDispatch, useSelector } from 'react-redux';
import { openMobileChat, openOneBox, setIsOpenChat } from '../../../Redux/MessagerSlice';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import CreateNewMessage from '../CreateNewGroupChat/CreateNewMessage';
import GroupChat from './GroupChat';
import SingleChat from './SingleChat';

export default function Layout({ children }) {

  const boxChat = useSelector(state => state.messenger.boxChat);
  const openChat = useSelector(state => state.messenger.openChat);
  const isOpenChatMobile = useSelector(state => state.messenger.isOpen);
  const user = useSelector(state => state.authentication.user);
  const allChat = useSelector(state => state.messenger.allChat);
  const createGroup = useSelector(state => state.messenger.createGroup);

  const dispatch = useDispatch();

  return (
    <div className="h-full bg-gray-100 relative">
      <div className="flex flex-col h-screen">
        <div className={`z-40 ${isMobile ? ' mb-14' : ''}`} id='sidebar'>
          <NavigateBar />
        </div>
        <main className=" w-full h-full bg-gray-100" id='children'>{children}</main>
        <MobileView className='z-50'>
          <div className='fixed flex flex-col items-end space-y-3 bottom-5 right-2'>

            {(isOpenChatMobile) && (
              <div
                className='flex items-center justify-center w-[300px] h-[400px] rounded-xl overflow-hidden z-40 scroll-smooth' id='list-contact'
                style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}
              >
                <div className='flex items-center justify-end w-[900px] h-[400px] z-30 duration-1000 scroll-smooth'>
                  <div className=' w-[300px] h-[400px] bg-white shadow-2xl rounded-xl relative'>
                  </div>
                  <div className=' w-[300px] h-[400px] bg-white shadow-2xl rounded-xl relative'>
                    <div className='w-full h-[55px] rounded-t-xl flex items-center justify-center' style={{ backgroundImage: "linear-gradient(to right, #00b09b, #96c93d)" }}>
                      <h1 className=' font-semibold text-white'>Danh sách hội thoại</h1>
                    </div>
                    <div className=' w-full h-[345px] rounded-b-xl overflow-y-auto p-2'>
                      {allChat.length > 0 && (
                        <div className=' w-full h-fit' key="list">
                          {allChat.map((chat, index) => (
                            <>
                              {chat.RelationshipId ? (
                                <div className=' w-full h-fit' onClick={() => {
                                  dispatch(openMobileChat(chat));
                                  document.getElementById('list-contact').scrollLeft += 300;
                                }}>
                                  <SingleChat chat={chat} key={index} />
                                </div>
                              ) : (
                                <div className=' w-full h-fit' onClick={() => {
                                  dispatch(openMobileChat(chat));
                                  document.getElementById('list-contact').scrollLeft += 300;
                                }}>
                                  <GroupChat chat={chat} key={index} />
                                </div>
                              )}
                            </>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=' w-[300px] h-[400px] bg-white shadow-2xl rounded-xl relative' >
                    {openChat.length > 0 && (
                      <>
                        <BoxChat chat={openChat[0]} />
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div onClick={() => dispatch(setIsOpenChat(!isOpenChatMobile))} className='w-14 h-14 p-3 flex items-center rounded-full bg-white justify-center cursor-pointer' style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.7 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z" />
              </svg>
            </div>
          </div>
        </MobileView>
        <BrowserView className='z-50'>
          <div className='fixed flex flex-col z-50 items-center space-y-3 bottom-5 right-2'>

            {boxChat.length > 0 && (
              <>
                {boxChat.map((chat, index) => (
                  <div className='rounded-full relative' key={index} onClick={() => dispatch(openOneBox(chat))}>
                    <img alt={chat.username} src={chat.smallAvatar || chat.avatar} className='w-14 h-14 object-center rounded-full object-cover' />
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
          <div className='fixed flex items-center space-x-2 z-50 bottom-5 right-20 rounded-2xl shadow-2xl' id='box-chat'>
            {openChat.length > 0 && (
              <>
                {openChat.map((chat, index) => (
                  <BoxChat chat={chat} key={index} />
                ))}
              </>
            )}
            {createGroup && (
              <>
                <CreateNewMessage />
              </>
            )}
          </div>
        </BrowserView>
      </div>
    </div>
  )
}
