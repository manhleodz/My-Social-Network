import React, { memo, useRef, useState } from 'react';
import { LoadingPosts } from '../LoadingPost/LoadingPosts';
import { PostApi } from '../../../Network/Post';
import SinglePost from './SinglePost';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from 'react-router-dom';
import { fetchData, stopFetchData } from '../../../Redux/PostSlice';

function Post({ posts }) {

    const [scrollPosition, setScrollPosition] = useState();
    const scrollRef = useRef();
    const user = useSelector(state => state.authentication.user);

    const dispatch = useDispatch();
    const location = useLocation();

    const handleScroll = () => {
        setScrollPosition(scrollRef.current.lastScrollTop)
    }

    const fetchMoreData = () => {
        setTimeout(async () => {
            await PostApi.getPost(posts.page).then(res => {
                if (res.status === 204) {
                    dispatch(stopFetchData());
                } else {
                    dispatch(fetchData(res.data.data))
                }
            }).catch((error) => {
                console.log(error.message);
            });
        }, 1000);
    };

    if (posts.posts.length === 0 || !user) return null;

    return (
        <>
            <InfiniteScroll
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
                ref={scrollRef} onScroll={handleScroll}
                className='space-y-4'
            >
                {posts.posts.map((post) => (
                    <SinglePost key={post.id} post={post} />
                ))}
            </InfiniteScroll>
        </>
    )
}

export default memo(Post);