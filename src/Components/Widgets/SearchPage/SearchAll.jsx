import React, { useContext, useEffect, useRef, useState } from 'react';
import Post from '../ProfilePosts/Post';
import { SearchAPI } from '../../../Network/Search';
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import UserTag from './UserTag/UserTag';

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


    async function fetchData() {

        await SearchAPI.topSearch(searchParams).then(res => {
            if (res.status === 204) {
                setUsers([]);
            } else
                setUsers(res.data.data);
        }).catch((err) => console.log(err.data))

        await SearchAPI.search(searchParams, 0).then((res) => {
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

    useEffect(() => {

        setPage(0);
        setHasMore(true);
        setPost(null);
        setUsers(null);

        fetchData();

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
                                    <UserTag key={key} result={result} user={user} />
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
