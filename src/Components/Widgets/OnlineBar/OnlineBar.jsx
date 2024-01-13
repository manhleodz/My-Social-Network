import React, { useEffect, useState } from 'react'
import { FriendApi } from '../../../Network/Friend';
import { useNavigate } from 'react-router-dom';

export default function OnlineBar({ userId }) {

    const [frs, setFrs] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        FriendApi.getListFriend(userId).then(res => {
            setFrs(res.data);
        })
    }, []);

    if (!frs) return null;

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
                    <div key={index} className='flex items-center cursor-pointer hover:bg-gray-200 p-1.5 rounded-lg' onClick={() => navigate(`/${fr.User.username}`)}>
                        <div className='w-14 h-14 rounded-full relative'>
                            <img alt={fr.User.username} src={fr.User.avatar} className=' w-full rounded-full object-cover' />
                            <div className={`w-3 h-3 rounded-full absolute right-0 bottom-3 border-2 border-white ${fr.User.online === true ? 'bg-green-600 ' : 'bg-gray-400'}`}></div>
                        </div>
                        <h1 className=' font-semibold px-2 max-xl:text-sm'>{fr.User.nickname}</h1>
                    </div>
                )))}
            </div>
        </div>
    )
}
