import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function OnlineBar({ userId }) {

    const frs = useSelector(state => state.friends.friends);
    const navigate = useNavigate();

    if (frs.length === 0) return null;

    return (
        <div className=' w-1/5 max-xl:w-1/6 fixed space-y-3 divide-y divide-gray-300'>
            <div>
                <h1>Trang và trang cá nhân của bạn</h1>
            </div>
            <div>
                <div className='flex items-center justify-between'>
                    <h1>Người liên hệ</h1>
                    <div className='flex items-center'>
                        ...
                    </div>
                </div>
                {frs.map(((fr, index) => (
                    <div key={index} className='flex items-center cursor-pointer hover:bg-gray-200 p-1.5 rounded-lg' onClick={() => navigate(`/${fr.username}`)}>
                        <div className='w-12 h-12 rounded-full relative'>
                            <img alt={fr.username} src={fr.avatar} className=' w-full rounded-full object-cover' />
                            <div className={`w-3 h-3 rounded-full absolute right-0 bottom-0 border-2 border-white ${fr.online === true ? 'bg-green-600 ' : 'bg-gray-400'}`}></div>
                        </div>
                        <h1 className=' font-semibold px-2 max-xl:text-sm'>{fr.nickname}</h1>
                    </div>
                )))}
            </div>
        </div>
    )
}
