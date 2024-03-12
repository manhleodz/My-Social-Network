import React, { useEffect, useState } from 'react'
import socket from '../../../../Network/Socket';
import { useSelector } from 'react-redux';

export default function MessagerDropdown() {

    const user = useSelector(state => state.authentication.user);
    const messages = useSelector(state => state.messenger.messages);
    const frs = useSelector(state => state.friends.friends);

    const [numberMessages, setNumberMessages] = useState(0);
    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
        socket.on(`receiver`, () => {
            setNumberMessages(numberMessages => numberMessages + 1);
        });

    }, [socket]);

    return (
        <div className=' w-10 h-10 flex justify-center items-center relative bg-gray-300 rounded-full hover:bg-gray-400 active:ring-gray-300 active:ring cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 512 512" className=' fill-gray-700'>
                <path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 
                    62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 
                    17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 208a32 32 
                    0 1 1 0 64 32 32 0 1 1 0-64zm128 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                />
            </svg>
            {numberMessages > 0 && (
                <div className=' absolute w-4 h-4 text-white top-0 right-0 p-2 flex justify-center items-center bg-red-600 text-sm font-semibold  rounded-full'>{numberMessages}</div>
            )}
        </div>
    )
}
