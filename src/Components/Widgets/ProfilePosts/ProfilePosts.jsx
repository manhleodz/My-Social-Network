import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { PostApi } from '../../../Network/Post';
import Styles from '../../../Assets/SCSS/Profile.module.scss';
import { Auth } from '../../../Network/Auth';
import { useSelector } from 'react-redux';
import Post from './Post';
import { FriendApi } from '../../../Network/Friend';
import { BrowserView, MobileView } from 'react-device-detect';
import MakePost from '../MakePost/MakePost';


export default function ProfilePosts() {

    const page = useRef(0);
    const hasMore = useRef(true);

    const navigate = useNavigate();

    const { owner } = useOutletContext();
    const [posts, setPost] = useState();
    const [friends, setFriend] = useState(null);

    var story = owner.story || "";
    const [changeStory, setChangeStory] = useState(false);
    const [newStory, setNewStory] = useState("");

    const user = useSelector(state => state.authentication.user);

    const fetchMoreData = () => {
        setTimeout(async () => {
            await PostApi.getPostByProfile(owner.id, page.current).then(res => {
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

    const updateStory = async () => {
        Auth.changeInfo({ story: newStory.replace(/\n/g, '@@newline@@') }).then(res => {
            setChangeStory(false)
        }).catch((error) => {
            console.log(error.data);
        });
    }

    useEffect(() => {

        FriendApi.getFriendOfProfile(owner.id).then((res) => {
            setFriend(res.data.data);
        })

        PostApi.getPostByProfile(owner.id, page.current).then(res => {
            if (res.status !== 204) {
                setPost(res.data.data);
                page.current = 1;
            }
            else {
                setPost([]);
                hasMore.current = false;
            }
        });

        return () => {
            page.current = 0;
            hasMore.current = true;
        }
    }, [owner.id]);

    return (
        <div className={`${Styles.container} md:space-x-4 bg-gray-100 flex items-start justify-between`}>
            <div className={`${Styles.container_left} shrink flex-none`}>
                <div className={` w-full bg-white  my-4 p-3  rounded-lg shadow-sm`}>
                    <h1 className=' text-xl font-bold'>Giới thiệu</h1>
                    <div className=' w-full flex flex-col items-center justify-center'>
                        {changeStory ? (
                            <>
                                <textarea
                                    id='story'
                                    className=' w-full resize-none m-1 rounded-lg bg-gray-200 focus:out-blue-400 overflow-auto text-center'
                                    onChange={(e) => setNewStory(e.target.value)}
                                    defaultValue={story.replace(/@@newline@@/g, '\n')}
                                    autoFocus
                                />
                            </>
                        ) : (
                            <>
                                <pre className=" text-base font-normal break-words font-noto text-center">{newStory.length === 0 ? story.replace(/@@newline@@/g, '\n') : newStory.replace(/@@newline@@/g, '\n')}</pre>
                            </>
                        )}
                        {(user.id === owner.id) && (
                            <>
                                {changeStory ? (
                                    <div className=' w-full flex justify-end items-center space-x-1'>
                                        <button
                                            className='p-1.5 bg-gray-200 hover:bg-gray-300 font-semibold rounded-md'
                                            onClick={() => {
                                                setNewStory("");
                                                setChangeStory(false)
                                            }}
                                        >Hủy</button>
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
                                        <button className=' bg-gray-200 rounded-lg text-center hover:bg-gray-300 w-full p-2 font-semibold' onClick={() => setChangeStory(true)}>Chỉnh sửa tiểu sử</button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className=' w-full h-fit bg-white my-4 p-3  rounded-lg shadow-sm'>
                    <div className=' w-full flex items-center justify-between'>
                        <h1 className=' text-xl font-bold'>Bạn bè</h1>
                        <h1 className=' text-base text-blue-500 cursor-pointer' onClick={() => navigate("friends")}>Xem tất cả bạn bè</h1>
                    </div>
                    {!friends ? (
                        <div className=' flex items-center justify-between'>
                            <div className="w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] bg-gray-200 animate-pulse rounded-xl m-1"></div>
                            <div className="w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] bg-gray-200 animate-pulse rounded-xl m-1"></div>
                            <div className="w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] bg-gray-200 animate-pulse rounded-xl m-1"></div>
                        </div>
                    ) : (
                        <>
                            <BrowserView>
                                <div className=' grid grid-cols-3 gap-3 h-fit w-full'>
                                    {friends.map(friend => (
                                        <div key={friend.id} title={friend.nickname} className=' cursor-pointer max-h-40 flex flex-col justify-center items-center' onClick={() => navigate(`/${friend.username}`)}>
                                            <img alt='anh thoi' src={friend.avatar} className=' w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] object-cover rounded-xl m-1' />
                                            <h1 style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }} className='text-[15px] break-all font-semibold w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] '>{friend.nickname}</h1>
                                        </div>
                                    ))}
                                </div>
                            </BrowserView>

                            <MobileView>
                                <div className=' grid grid-cols-3 gap-3 h-fit w-full'>
                                    {friends.slice(0, 3).map(friend => (
                                        <div key={friend.id} title={friend.nickname} className=' cursor-pointer max-h-40 flex flex-col justify-center items-center' onClick={() => navigate(`/${friend.username}`)}>
                                            <img alt='anh thoi' src={friend.avatar} className=' w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] object-cover rounded-xl m-1' />
                                            <h1 style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }} className='text-[15px] break-all font-semibold w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] '>{friend.nickname}</h1>
                                        </div>
                                    ))}
                                </div>
                            </MobileView>
                        </>
                    )}
                </div>
            </div>
            <div className={`${Styles.container_right} w-full shrink flex-none`}>
                <div className='w-full p-4 my-4 rounded-lg flex flex-col justify-center space-y-1 bg-white divide-y divide-gray-300 shadow-md'>
                    <MakePost />
                </div>
                <div className='my-4  w-full flex justify-between items-center bg-white p-3 rounded-lg shadow-md'>
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
                {!posts ? (
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
                ) : (
                    <>
                        <Post posts={posts} setPost={setPost} page={page.current} hasMore={hasMore.current} owner={owner} fetchMoreData={fetchMoreData} />
                    </>
                )}
            </div>
        </div>
    )
}
