import React, { memo } from 'react';
import { LoadingPosts } from '../LoadingPost/LoadingPosts';
import SinglePost from './SinglePost';
import InfiniteScroll from "react-infinite-scroll-component";

function Post({ posts, setPost, hasMore, fetchMoreData }) {

    return (
        <>
            <InfiniteScroll
                className='space-y-4'
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<LoadingPosts />}
                endMessage={
                    <div className="w-full rounded-lg overflow-hidden shadow-lg my-5">
                        <h1 className='text-center font-semibold'>Không còn bài viết nào!</h1>
                    </div>
                }
            >
                {posts.map((post, key) => (
                    <SinglePost key={key} post={post} posts={posts} setPost={setPost} />
                ))}
            </InfiniteScroll>
        </>
    )
}

export default memo(Post); 