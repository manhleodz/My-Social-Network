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
import Intro from './Intro';
import ListFriend from './ListFriend';


export default function ProfilePosts() {

    const page = useRef(0);
    const hasMore = useRef(true);

    const navigate = useNavigate();

    const { owner, setProfile } = useOutletContext();
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

        async function fetchData() {

            await PostApi.getPostByProfile(owner.id, page.current).then(res => {
                if (res.status !== 204) {
                    setPost(res.data.data);
                    page.current = 1;
                }
                else {
                    setPost([]);
                    hasMore.current = false;
                }
            });

            await FriendApi.getFriendOfProfile(owner.id).then((res) => {
                setFriend(res.data.data);
            })
        }

        fetchData();

        return () => {
            page.current = 0;
            hasMore.current = true;
        }
    }, [owner.id]);

    return (
        <div className={`${Styles.container} md:space-x-4 bg-gray-100 flex items-start justify-between`}>
            <div className={`${Styles.container_left} shrink flex-none`}>

                <Intro
                    owner={owner} user={user}
                    setNewStory={setNewStory}
                    setChangeStory={setChangeStory}
                    newStory={newStory}
                    updateStory={updateStory}
                    changeStory={changeStory}
                    story={story}
                />

                <ListFriend
                    friends={friends}
                    setProfile={setProfile}
                />
            </div>
            <div className={`${Styles.container_right} w-full shrink flex-none`}>
                {user.id === owner.id && (
                    <div className='w-full p-4 my-4 rounded-lg flex flex-col justify-center space-y-1 bg-white divide-y divide-gray-300 shadow-md'>
                        <MakePost />
                    </div>
                )}
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
