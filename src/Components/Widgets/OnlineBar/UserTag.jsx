import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBoxChat, addGroupChat, openOneBox } from '../../../Redux/MessagerSlice';
import socket from '../../../Network/Socket';

export default function UserTag({ fr }) {

    const dispatch = useDispatch();
    const [online, setOnline] = useState(fr.online);

    useEffect(() => {

        socket.on('connected', (data) => {
            if (data === fr.id) setOnline(true);
        })

        socket.on('disconnected', (data) => {
            if (data === fr.id) setOnline(false);
        })
    }, [socket, fr.id])

    return (
        <div
            className='flex items-center  w-full cursor-pointer hover:bg-gray-200 p-1.5 rounded-lg'
            onClick={() => {
                sessionStorage.setItem('openBox', JSON.stringify(fr));
                dispatch(addBoxChat(fr));
                dispatch(openOneBox(fr));
            }}
        >
            <div className='rounded-full relative'>
                <img alt={fr.username} src={fr.smallAvatar} className='w-12 h-12 object-center rounded-full object-cover' />
                <div className={`w-3 h-3 rounded-full absolute right-0 bottom-0 border-2 border-white ${online ? 'bg-green-600 ' : 'bg-gray-400'}`}></div>
            </div>
            <h1 className=' font-semibold px-2 w-8/12 max-xl:text-sm break-words text-ellipsis whitespace-nowrap overflow-hidden'>{fr.nickname}</h1>
        </div>
    )
}
