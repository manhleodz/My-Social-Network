import React, { useContext, useEffect, useRef, useState } from 'react';
import Post from '../ProfilePosts/Post';
import { SearchAPI } from '../../../Network/Search';
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Loading() {
    return (
        <div className="w-full rounded-lg overflow-hidden shadow-lg my-5">
            <div className="w-full h-28 bg-white p-4 flex items-center space-x-2">
                <div className=" w-14 h-14 bg-gray-300 animate-pulse rounded-full"></div>
                <div className=" space-y-2">
                    <div className="w-20 h-3 bg-gray-300 animate-pulse rounded-lg"></div>
                    <div className=" w-28 h-3 bg-gray-300 animate-pulse rounded-lg"></div>
                </div>
            </div>
        </div>
    )
}

export default function SearchAll() {

    const navigate = useNavigate();
    const { searchParams } = useOutletContext();

    const friends = useSelector(state => state.friends.friends);
    const user = useSelector(state => state.authentication.user);

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [posts, setPost] = useState(null);
    const [users, setUsers] = useState(null);

    const isFriend = (id) => {
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].id == id)
                return true;
        }
        return false;
    }

    const fetchMoreData = () => {
        setTimeout(async () => {
            await SearchAPI.search(searchParams, page).then(res => {
                if (res.status === 204) {
                    setHasMore(false);
                } else {
                    setPost(prev => prev = [...prev, ...res.data.data]);
                    setPage(prev => prev + 1);
                }
            }).catch((error) => {
                console.log(error.message);
            });
        }, 1000);
    };

    useEffect(() => {

        async function fetchData() {

            await SearchAPI.topSearch(searchParams).then(res => {
                if (res.status === 204) {
                    setUsers([]);
                } else
                    setUsers(res.data.data);
            }).catch((err) => console.log(err.data))
            await SearchAPI.search(searchParams, page).then((res) => {
                if (res.status !== 204) {
                    setPost(res.data.data);
                    setPage(1);
                }
                else {
                    setPost([]);
                    setHasMore(false);
                }
            }).catch(err => {
                console.log(err);
            })
        }

        fetchData();

        return () => {
            setPage(0);
            setHasMore(true);
            setPost();
            setUsers(null);
        }

    }, [searchParams]);

    if (!friends || !user) return null;

    return (
        <>
            <div className='space-y-4 w-[750px]'>
                {!users ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <>
                        {users.length !== 0 && (
                            <div className='w-full p-4 bg-white rounded-lg shadow-md space-y-3'>
                                <h1 className=' text-xl font-semibold'>Mọi người</h1>
                                {users.map((result, key) => (
                                    <div key={key} className='w-full flex justify-between items-center'>
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
                                            if (isFriend(result.id)) {
                                                return (
                                                    <>
                                                        <button className=' text-sm font-medium text-blue-600 bg-blue-100 hover:text-blue-700 hover:bg-gray-300 p-2 rounded-lg'>
                                                            Nhắn tin
                                                        </button>
                                                    </>
                                                )
                                            } else if (user.id === result.id) {
                                                return (
                                                    <>
                                                        <button onClick={() => navigate(`/${result.username}`)} className=' text-sm font-medium text-blue-600 bg-blue-100 hover:text-blue-700 hover:bg-gray-300 p-2 rounded-lg'>
                                                            Trang cá nhân
                                                        </button>
                                                    </>
                                                )
                                            } else if (!isFriend(result.id)) {
                                                return (
                                                    <>
                                                        <button className=' text-sm font-medium text-blue-600 bg-blue-100 hover:text-blue-700 hover:bg-gray-300 p-2 rounded-lg'>
                                                            Thêm bạn bè
                                                        </button>
                                                    </>
                                                )
                                            }
                                        })()}
                                    </div>
                                ))}
                                <button className=' rounded-lg p-1.5 font-medium bg-gray-200 hover:bg-gray-300 w-full'>Xem tất cả</button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className='w-[750px] h-full flex-none'>
                {!posts ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <>
                        <Post posts={posts} setPost={setPost} page={page} hasMore={hasMore} owner={user} fetchMoreData={fetchMoreData} />
                    </>
                )}
            </div>
        </>
    )
}
