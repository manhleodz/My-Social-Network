import React, { useEffect, useState } from 'react';
import { LoadingPosts } from '../LoadingPost/LoadingPosts';
import { PostApi } from '../../../Network/Post';
import SinglePost from './SinglePost';
import { useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";

export default function Post() {

    const [posts, setPost] = useState([]);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const user = useSelector(state => state.authentication.user);

    useEffect(() => {

        PostApi.getPost().then(res => {
            setPost(res.data);
            setData(res.data.slice(0, 4));
        }).catch(() => {
            alert('Lỗi server thông cảm');
        })
    }, []);

    if (posts.length === 0 || data.length === 0 || !user) return null;

    const fetchMoreData = () => {
        setTimeout(() => {
            if (page < Math.floor(posts.length / 4)) {
                setPage(prev => prev + 1);
                setData(data => data = [...data, ...posts.slice(0 + 4 * page, 4 * (page + 1))]);
            }
        }, 1000);
    };

    return (
        <div className=' space-y-5 w-9/12'>
            <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<LoadingPosts />}
            >
                {data.map((post, key) => (
                    <SinglePost key={key} post={post} setPost={setPost} user={user} authId={user.id} />
                ))}
            </InfiniteScroll>
        </div>
    )
}
