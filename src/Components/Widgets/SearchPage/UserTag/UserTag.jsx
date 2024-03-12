import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FriendApi } from '../../../../Network/Friend';
import socket from '../../../../Network/Socket';
import { useDispatch } from 'react-redux';
import { fetchFriend } from '../../../../Redux/FriendSlice';

export default function UserTag({ result, user }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [status, setStatus] = useState(result.isFriend);

    const getListFriends = async () => {
        await FriendApi.getListFriend().then((res) => {
            dispatch(fetchFriend(res.data));
        })
    }

    const addFriend = async (userId) => {
        FriendApi.addFriend({ user: userId }).then(() => {
            if (status === 0) {
                socket.emit("notification", {
                    message: `${user.nickname} gửi lời mời kết bạn`,
                    sender: user.id,
                    smallAvatar: user.smallAvatar,
                    date: new Date(),
                    receiver: result.id
                })
                setStatus(1);
            }
            else if (status === 2) {
                socket.emit("notification", {
                    message: `${user.nickname} chấp nhận lời mời kết bạn`,
                    sender: user.id,
                    smallAvatar: user.smallAvatar,
                    date: new Date(),
                    receiver: result.id
                })
                setStatus(3);
            }
            getListFriends();
        }).catch(err => {
            console.log(err.message);
        });
    };

    return (
        <div className='w-full flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
                <img src={result.smallAvatar} className=' w-16 h-16 rounded-full object-cover cursor-pointer' onClick={() => navigate(`/${result.username}`)} />
                <div className=' flex flex-col justify-center'>
                    <h1 className=' font-semibold  cursor-pointer hover:underline' onClick={() => navigate(`/${result.username}`)}>{result.nickname}</h1>
                    {(result.address && result.address.length > 0) && (
                        <h1 className='text-gray-500 text-sm'>{result.address}</h1>
                    )}
                </div>
            </div>
            {(() => {
                if (user.id === result.id || status === 2 || status === 1) {
                    return (
                        <>
                            <button onClick={() => navigate(`/${result.username}`)} className=' text-sm font-medium text-blue-600 bg-blue-100 hover:text-blue-700 hover:bg-gray-300 p-2 rounded-lg'>
                                Trang cá nhân
                            </button>
                        </>
                    )
                } else if (status === 3) {
                    return (
                        <>
                            <button className=' text-sm font-medium text-blue-600 bg-blue-100 hover:text-blue-700 hover:bg-gray-300 p-2 rounded-lg'>
                                Nhắn tin
                            </button>
                        </>
                    )
                } else if (status === 0) {
                    return (
                        <>
                            <button onClick={() => addFriend(result.id).then(() => setStatus(1))} className=' text-sm font-medium text-blue-600 bg-blue-100 hover:text-blue-700 hover:bg-gray-300 p-2 rounded-lg'>
                                Thêm bạn bè
                            </button>
                        </>
                    )
                }
            })()}
        </div>
    )
}
