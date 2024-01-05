import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PostApi } from '../../../Network/Post';

export default function LikeBox({ PostId, setOpenLike, user }) {

    const navigate = useNavigate();
    const [list, setList] = useState();

    useEffect(() => {

        PostApi.getLikeByPost(PostId).then((e) => {
            setList(e.data);
        }).catch((e) => {
            alert(e.responese);
        });
    }, []);

    if (!list) return null;

    return (
        <div
            onClick={(e) => {
                if (e.target.id === 'bg') {
                    setOpenLike(false);
                }
            }}
            className=' fixed top-0 left-0 z-40 w-screen h-screen flex justify-center items-center' style={{ backgroundColor: 'rgb(0,0,0,0.25)' }}
            id='bg'
        >
            <div className='bg-white z-50 p-2 rounded-lg divide-y divide-gray-300 max-w-sm w-1/3'>
                <div className=' flex justify-between'>
                    <div></div>
                    <h1 className=' font-semibold'>Likes</h1>
                    <button
                        onClick={() => setOpenLike(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className=' fill-gray-700'>
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </button>
                </div>
                <div className=' w-full'>
                    {list.length > 0 ? (
                        <>
                            {list.map(like => (
                                <div className=' flex justify-between full my-3'>
                                    <div className='flex items-center space-x-2'>
                                        <img alt='avatar' src={`${like.User.avatar}`} className='w-8 h-8 object-cover rounded-full cursor-pointer' onClick={() => navigate(`/${like.User.username}`)} />
                                        <h1 className=' text-base font-semibold cursor-pointer active:text-gray-500' onClick={() => navigate(`/${like.User.username}`)}>{like.User.nickname}</h1>
                                    </div>
                                    {user.id !== like.UserId && (
                                        <button className=' p-1 bg-blue-500 rounded-lg text-sm font-semibold text-white hover:bg-blue-600 active:bg-blue-700 active:ring-blue-300 active:ring'>
                                            Theo dõi
                                        </button>
                                    )}
                                </div>
                            ))}
                        </>
                    ) : (
                        <h1 className=' text-center'>
                            Hãy là người đầu tiên thích bài viết này
                        </h1>
                    )}
                </div>
            </div>
        </div>
    )
}
