import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LoadingPosts } from '../LoadingPost/LoadingPosts'
import SinglePost from '../Post/SinglePost'
import { useOutletContext } from 'react-router-dom'
import { PostApi } from '../../../Network/Post'
import '../../../Assets/SCSS/Profile.scss'
import { Auth } from '../../../Network/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../Redux/UserSlice';

export default function ProfilePosts() {

    const { owner } = useOutletContext();
    const [posts, setPost] = useState({
        posts: [],
        page: 0,
        hasMore: true
    });
    const [newStory, setNewStory] = useState(null);

    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);

    const fetchMoreData = () => {
        setTimeout(async () => {
            await PostApi.getPostByProfile(owner.id, posts.page).then(res => {
                if (res.status === 204) {
                    setPost({
                        posts: posts.posts,
                        page: posts.page,
                        hasMore: false
                    })
                } else {
                    setPost({
                        posts: [...posts.posts, ...res.data.data],
                        page: posts.page + 1,
                        hasMore: true
                    });
                }
            }).catch((error) => {
                console.log(error.message);
            });
        }, 1000);
    };

    const updateStory = async () => {
        Auth.changeInfo({ story: newStory.replace(/\n/g, '@@newline@@') }).then(res => {
            dispatch(setUser({ ...user, story: newStory }));
            setNewStory(null);
        }).catch((error) => {
            console.log(error.data);
        });
    }

    useEffect(() => {
        PostApi.getPostByProfile(owner.id, posts.page).then(res => {
            if (res.status !== 204)
                setPost({
                    posts: [...posts.posts, ...res.data.data],
                    page: posts.page + 1,
                    hasMore: true
                });
            else
                setPost({
                    posts: [],
                    page: posts.page,
                    hasMore: false
                });
        });
    }, [owner]);

    return (
        <div className='main-container md:space-x-4 bg-gray-100 flex items-start justify-between'>
            <div className='left-main  shrink flex-none'>
                <div className=' w-full bg-white  my-4 p-3  rounded-lg shadow-sm'>
                    <h1 className=' text-xl font-bold'>Giới thiệu</h1>
                    <div className=' w-full flex flex-col items-center justify-center'>
                        {newStory !== null ? (
                            <>
                                <textarea
                                    defaultValue={owner.story.replace(/@@newline@@/g, '\n')}
                                    className=' w-full resize-none m-1 rounded-lg bg-gray-200 focus:out-blue-400 overflow-auto text-center'
                                    onChange={(e) => setNewStory(e.target.value)}
                                    autoFocus
                                />
                            </>
                        ) : (
                            <>
                                <pre className=" text-base font-normal break-words font-noto text-center">{owner.story.replace(/@@newline@@/g, '\n')}</pre>
                            </>
                        )}
                        {(user.id === owner.id) && (
                            <>
                                {(newStory !== null) ? (
                                    <div className=' w-full flex justify-end items-center space-x-1'>
                                        <button className='p-1.5 bg-gray-200 hover:bg-gray-300 font-semibold rounded-md' onClick={() => setNewStory(null)}>Hủy</button>
                                        <button
                                            onClick={() => {
                                                if (newStory !== null) {
                                                    updateStory(newStory);
                                                }
                                            }}
                                            className={`p-1.5 bg-gray-200 font-semibold rounded-md ${newStory.length > 0 ? ' cursor-pointer' : ' cursor-not-allowed text-gray-500'}`}
                                        >Lưu</button>
                                    </div>
                                ) : (
                                    <>
                                        <button className=' bg-gray-200 rounded-lg text-center hover:bg-gray-300 w-full p-2 font-semibold' onClick={() => setNewStory("")}>Chỉnh sửa tiểu sử</button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className=' w-full bg-white my-4 p-3  rounded-lg shadow-sm'>
                    <h1 className=' text-xl font-bold'>Ảnh</h1>
                </div>
                <div className=' w-full bg-white my-4 p-3  rounded-lg shadow-sm'>
                    <h1 className=' text-xl font-bold'>Bạn bè</h1>
                </div>
            </div>
            <div className='right-main shrink flex-none'>
                <div className='my-4  w-full flex justify-between items-center bg-white p-3 rounded-lg shadow-sm'>
                    <h1 className=' text-xl font-bold'>Bài viết</h1>
                    <div className='flex items-center justify-center p-1 cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-md w-20'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className='w-5 h-5'>
                            <g id="Layer_23" data-name="Layer 23"><path d="M59.59,50.42H51c-2.28-10-16.45-10-18.73,0H4.41a2,2,0,1,0,0,4H32.3c2.29,10,16.46,10,18.73,0h8.56A2,2,0,0,0,59.59,50.42ZM41.67,58c-7.38-.26-7.38-10.9,0-11.16C49.05,47.1,49.05,57.74,41.67,58Z" />
                                <path d="M59.59,30H28.52C26.24,20,12.07,20,9.79,30H4.41a2,2,0,1,0,0,4H9.79c2.28,10,16.45,10,18.73,0H59.59A2,2,0,0,0,59.59,30ZM19.16,37.58c-7.38-.24-7.37-10.93,0-11.16C26.53,26.66,26.53,37.35,19.16,37.58Z" />
                                <path d="M4.41,13.58H22.63c2.29,10,16.46,10,18.74,0H59.59a2,2,0,0,0,0-4H41.37c-2.29-10-16.46-10-18.74,0H4.41A2,2,0,0,0,4.41,13.58ZM32,6c7.38.26,7.38,10.9,0,11.16C24.62,16.9,24.62,6.26,32,6Z" />
                            </g>
                        </svg>
                        <h1 className='font-semibold'>Bộ lọc</h1>
                    </div>
                </div>
                <InfiniteScroll
                    className='space-y-4'
                    dataLength={posts.posts.length}
                    next={fetchMoreData}
                    hasMore={posts.hasMore}
                    loader={<LoadingPosts />}
                    endMessage={
                        <div className="w-full rounded-lg overflow-hidden shadow-lg my-5">
                            <div className="w-full h-20 bg-white p-4 flex space-x-2">
                                <div className=" w-10 h-10 bg-gray-300 animate-pulse rounded-full"></div>
                                <div className=" space-y-2">
                                    <div className="w-20 h-3 bg-gray-300 animate-pulse"></div>
                                    <div className="w-20 h-3 bg-gray-300 animate-pulse"></div>
                                </div>
                            </div>
                            <div className="w-full h-64 bg-gray-300 animate-pulse"></div>
                            <div className="px-6 py-4 items-center">
                                <div className="font-regular text-xl mb-2 w-20 h-4 bg-gray-300 animate-pulse"></div>
                            </div>
                        </div>
                    }
                >
                    {posts.posts.map((post, key) => (
                        <SinglePost key={key} post={post} />
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}
