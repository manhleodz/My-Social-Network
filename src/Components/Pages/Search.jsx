import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SearchAPI } from '../../Network/Search';
import SearchStyle from '../../Assets/SCSS/Search.module.scss';
import Post from '../Widgets/ProfilePosts/Post';

export default function Search() {

    const page = useRef(0);
    const hasMore = useRef(true);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const searchParams = queryParams.get('q');
    const { topResult } = location.state;

    const navigate = useNavigate();

    const friends = useSelector(state => state.friends.friends);
    const user = useSelector(state => state.authentication.user);

    const [posts, setPost] = useState();

    const isFriend = (id) => {
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].id == id)
                return true;
        }
        return false;
    }

    const fetchMoreData = () => {
        setTimeout(async () => {
            await SearchAPI.search(searchParams, page.current).then(res => {
                if (res.status === 204) {
                    hasMore.current = false;
                } else {
                    setPost(prev => prev = [...prev, ...res.data.data]);
                    page.current = page.current + 1;
                    hasMore.current = true;
                }
            }).catch((error) => {
                console.log(error.message);
            });
        }, 1000);
    };

    useEffect(() => {

        SearchAPI.updateHistory(searchParams);

        SearchAPI.search(searchParams, page.current).then((res) => {
            if (res.status !== 204) {
                setPost(res.data.data);
                page.current = 1;
            }
            else {
                setPost([]);
                hasMore.current = false;
            }
        }).catch(err => {
            console.log(err);
        })

    }, [searchParams]);

    if (!friends || !user || !posts) return null;

    return (
        <div className=' w-full bg-gray-100 h-full'>
            <div className='w-full relative top-10 flex items-start justify-start bg-gray-100 h-full'>
                <div className={`${SearchStyle.filter} left-0 divide-y divide-gray-300 h-screen shadow-md text-black `}>
                    <div className={`${SearchStyle.filter_content} fixed top-0 left-0 bg-white h-screen p-4`}>
                        <h1 className=' mt-14 text-2xl font-bold'>Kết quả tìm kiếm</h1>
                        <div>
                            <h1>Bộ lọc</h1>
                            <div className=''>
                                <div>Tất cả</div>
                                <div>Bài viết</div>
                                <div>Mọi người</div>
                                <div>Ảnh</div>
                                <div>Video</div>
                                <div>Nhóm</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' w-full bg-gray-100 space-y-4 flex flex-col items-center mt-10 justify-start '>
                    <div className='space-y-4 w-[750px]'>
                        {topResult.length !== 0 && (
                            <div className='w-full p-4 bg-white rounded-lg shadow-md space-y-3'>
                                <h1 className=' text-xl font-semibold'>Mọi người</h1>
                                {topResult.map((result, key) => (
                                    <div key={key} className='w-full flex justify-between items-center'>
                                        <div className='flex items-center space-x-2'>
                                            <img src={result.avatar} className=' w-16 h-16 rounded-full object-cover cursor-pointer' onClick={() => navigate(`/${result.username}`)} />
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
                    </div>
                    <div className='w-[750px] h-full flex-none'>
                        <Post posts={posts} setPost={setPost} page={page} hasMore={hasMore} owner={user} fetchMoreData={fetchMoreData} />
                    </div>
                </div>
            </div>
        </div>
    )
}
