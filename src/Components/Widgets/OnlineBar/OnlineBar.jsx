import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addBoxChat, openOneBox } from '../../../Redux/MessagerSlice';

export default function OnlineBar({ userId }) {

    const frs = useSelector(state => state.friends.friends);
    const dispatch = useDispatch();

    return (
        <div className=' w-1/5 max-xl:w-3/12 fixed space-y-3 divide-y divide-gray-300'>
            <div>
                <h1>Trang và trang cá nhân của bạn</h1>
            </div>
            <div>
                <div className='flex items-center justify-between'>
                    <h1>Người liên hệ</h1>
                    <div className='flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                        <button>...</button>
                    </div>
                </div>
                {frs.map(((fr, index) => (
                    <div
                        key={index} className='flex items-center cursor-pointer hover:bg-gray-200 p-1.5 rounded-lg'
                        onClick={() => {
                            sessionStorage.setItem('openBox', JSON.stringify(fr));
                            dispatch(addBoxChat(fr));
                            dispatch(openOneBox(fr));
                        }}
                    >
                        <div className='rounded-full relative'>
                            <img alt={fr.username} src={fr.avatar} className='w-12 h-12 object-center rounded-full object-cover' />
                            <div className={`w-3 h-3 rounded-full absolute right-0 bottom-0 border-2 border-white ${fr.online === true ? 'bg-green-600 ' : 'bg-gray-400'}`}></div>
                        </div>
                        <h1 className=' font-semibold px-2 max-xl:text-sm break-words text-ellipsis whitespace-nowrap overflow-hidden'>{fr.nickname}</h1>
                    </div>
                )))}
            </div>
        </div>
    )
}
