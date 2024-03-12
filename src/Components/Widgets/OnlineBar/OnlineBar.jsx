import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addBoxChat, addGroupChat, openOneBox } from '../../../Redux/MessagerSlice';
import Bar from './OnlineBar.module.scss';
import { ChatApi } from '../../../Network/Chat';
import UserTag from './UserTag';

export default function OnlineBar({ userId }) {

    const frs = useSelector(state => state.friends.friends);
    const groupChats = useSelector(state => state.messenger.groupChat);
    const dispatch = useDispatch();
    const [link, setLink] = useState("https://images.ctfassets.net/m3qyzuwrf176/5KozoZzaJPtsTlGPEVziad/7be04e4d62922b31292acd2116de7571/9_before_sunrise-thumbnail.jpg?w=2000");
    const [text, setText] = useState("Before Sunrise");

    useEffect(() => {

        
    }, [])

    return (
        <div
            className=' w-1/5 max-xl:w-3/12 fixed h-full overflow-y-auto space-y-3 divide-y divide-gray-300' id={Bar.content}
        >
            <div className=' w-full'>
                <h1 className=' text-xl font-semibold'>Phim hôm nay</h1>
                <div
                    className='w-full h-[180px] flex items-center justify-center relative'
                >
                    <img src={link} alt='qc' className='z-0 absolute w-full h-full top-0 left-0 object-cover rounded-lg scale-100 hover:scale-110' />
                    <div className=' absolute w-full h-full z-50 top-0 left-0 rounded-lg flex justify-center items-center bg-[rgb(0,0,0,0.25)] hover:bg-[rgb(0,0,0,0.28)] cursor-pointer'>
                        <h1 className='text-white text-3xl font-bold max-lg:text-2xl'>{text}</h1>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex items-center justify-between'>
                    <h1>Người liên hệ</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="30" viewBox="0 0 512 512" className=' cursor-pointer hover:bg-gray-300 rounded-full p-1'>
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </div>
                {frs.map(((fr, index) => (
                    <UserTag fr={fr} key={index} />
                )))}
            </div>
            <div>
                <div className='flex items-center justify-between'>
                    <h1>Nhóm của bạn</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="30" viewBox="0 0 512 512" className=' cursor-pointer hover:bg-gray-300 rounded-full p-1'>
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </div>
                {groupChats.map(((group, index) => (
                    <div
                        key={index} className='flex items-center  w-full cursor-pointer hover:bg-gray-200 p-1.5 rounded-lg'
                        onClick={() => {
                            sessionStorage.setItem('openBox', JSON.stringify(group));
                        }}
                    >
                        <div className='rounded-full relative'>
                            <img alt={group.name} src={group.avatar} className='w-12 h-12 object-center rounded-full object-cover' />
                        </div>
                        <h1 className=' font-semibold px-2 w-8/12 max-xl:text-sm break-words text-ellipsis whitespace-nowrap overflow-hidden'>{group.name}</h1>
                    </div>
                )))}
            </div>
        </div>
    )
}
