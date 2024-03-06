import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FriendApi } from '../../../Network/Friend';
import { useDispatch } from 'react-redux';
import { fetchFriend } from '../../../Redux/FriendSlice';

export default function FriendTag({ friend, status }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isConfirm, setIsConfirm] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const getListFriends = async () => {
        await FriendApi.getListFriend().then((res) => {
            dispatch(fetchFriend(res.data));
        })
    }

    const addFriend = (userId) => {
        FriendApi.addFriend({ user: userId }).then(() => {
            setIsConfirm(true);
            getListFriends();
        }).catch(err => {
            console.log(err.message);
        });
    };

    const deleteFriend = (id) => {
        FriendApi.deleteFriend(id).then(() => {
            setIsDelete(true);
            getListFriends();
        }).catch(err => {
            console.log(err.message);
        });
    };

    return (
        <div className=' cursor-pointer  w-52 h-[330px] max-[1000px]:w-44 max-[380px]:w-40 max-[340px]:w-[150px] max-[380px]:h-[250px] bg-white rounded-lg divide-y divide-gray-400' style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px" }}>
            <img onClick={() => navigate(`/${friend.username}`)} alt='avatar' className=' w-52 h-[200px] max-[1000px]:w-44 max-[380px]:w-40 max-[340px]:w-[150px] max-[380px]:h-[120px] object-cover rounded-t-lg' src={friend.smallAvatar} />
            <div className=' p-2'>
                <h1 className=' text-[16px] w-40 max-[340px]:w-36 break-all text-ellipsis overflow-hidden whitespace-nowrap font-semibold' onClick={() => navigate(`/${friend.username}`)}>{friend.nickname}</h1>
                {status === 2 && (
                    <>
                        {isConfirm && (
                            <div
                                className=' w-full bg-gray-200 text-base font-semibold text-black rounded-lg p-2 '
                            >
                                Xác nhận thành công
                            </div>
                        )}
                        {isDelete && (
                            <div
                                className=' w-full bg-gray-200 text-base font-semibold text-black rounded-lg p-2 '
                            >
                                Đã hủy lời mời
                            </div>
                        )}
                        {(!isConfirm && !isDelete) && (
                            <>
                                <button
                                    className=' w-full bg-blue-600 text-base font-semibold text-white rounded-lg p-2 mb-2 hover:bg-blue-700'
                                    onClick={() => addFriend(friend.id)}
                                >
                                    Xác nhận
                                </button>
                                <button
                                    className=' w-full bg-gray-200 text-base font-semibold text-black rounded-lg p-2 hover:bg-gray-300'
                                    onClick={() => deleteFriend(friend.id)}
                                >
                                    Xóa
                                </button>
                            </>
                        )}
                    </>
                )}

                {status === 1 && (
                    <>
                        {isDelete ? (
                            <>
                                <div
                                    className=' w-full bg-gray-200 text-base font-semibold text-black rounded-lg p-2 '
                                >
                                    Đã hủy lời mời
                                </div>
                            </>
                        ) : (
                            <button
                                className=' w-full bg-gray-200 text-base font-semibold text-black rounded-lg p-2 hover:bg-gray-300'
                                onClick={() => deleteFriend(friend.id)}
                            >
                                Hủy
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
