import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Auth } from '../../Network/Auth';
import { PostApi } from '../../Network/Post';
import Post from '../Widgets/Post/Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingPosts } from '../Widgets/LoadingPost/LoadingPosts';
import SinglePost from '../Widgets/Post/SinglePost';
import { useSelector } from 'react-redux';

export default function Profile() {

  const username = useParams().username;
  const user = useSelector(state => state.authentication.user);
  const [profile, setProfile] = useState();
  const [posts, setPost] = useState({
    posts: [],
    page: 0,
    hasMore: true
  });
  const [scrollPosition, setScrollPosition] = useState();
  const scrollRef = useRef();

  const location = useLocation();

  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollTop)
  }
  const page = 0;

  const fetchMoreData = () => {
    setTimeout(async () => {
      await PostApi.getPostByProfile(profile.id, posts.page).then(res => {
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

  useEffect(() => {
    document.title = username;
    Auth.getProfile(username).then(res => {
      setProfile(res.data.profile);
      PostApi.getPostByProfile(res.data.profile.id, page).then(res => {
        if (res.status !== 204)
          setPost({
            posts: [...posts.posts, ...newPosts],
            page: posts.page + 1,
            hasMore: true
          });
        else
          setPost({
            posts: posts.posts,
            page: posts.page,
            hasMore: false
          });
      });
    }).catch(err => {
      console.log(err.data.error);
    })
  }, [username])

  if (!profile || !posts) return null;

  return (
    <div className=' w-full flex flex-col space-y-5 p-3 bg-white' ref={scrollRef} onScroll={handleScroll} data-mode="light">
      <div className='w-full relative top-14 flex flex-col items-center divide divide-gray-500'>
        <div className='header relative w-9/12' style={{ height: '550px' }}>
          <img className=' w-full object-cover object-center rounded-lg' src={profile.background} style={{ height: '450px' }} />
          <div className=' absolute w-full h-36 bottom-6 px-16 flex max-lg:flex-col items-center justify-between'>
            <div className='w-36'>
              <div className=' w-36 p-1 bg-white rounded-full -bottom-16 left-0'>
                <img className='w-36 h-36 object-center object-cover rounded-full' src={profile.avatar} />
                <div className={` absolute bottom-4 right-4 w-6 h-6 rounded-full ${profile.online === 0 ? 'bg-green-500' : 'hidden'} `}></div>
              </div>
            </div>
            <div className=' w-2/3 max-lg:w-full max-lg:items-center h-full flex flex-col justify-end'>
              <h1 className=' text-3xl font-semibold text-start'>{profile.nickname}</h1>
              <h1 className=' text-base text-gray-500 font-mono'>8 bạn chung</h1>
            </div>
            <div className=' h-full flex items-end justify-end space-x-3'>
              {profile.id === user.id ? (
                <>
                  <button className=' w-36 p-2 bg-gray-300 rounded-lg text-base font-semibold text-black hover:bg-gray-400 flex items-center justify-center h-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                    <h1 className='p-1'>Thêm vào tin</h1>
                  </button>
                  <button className=' w-56 p-2 bg-blue-600 rounded-lg text-base font-semibold text-white hover:bg-blue-700 flex items-center justify-center h-10'>
                    <svg fill='white' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                      <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                    </svg>
                    <h1 className='p-1'>Chỉnh sửa trang cá nhân</h1>
                  </button>
                </>
              ) : (
                <>
                  <button className=' w-28 p-2 bg-gray-300 rounded-lg text-base font-semibold text-black hover:bg-gray-400 flex items-center justify-center h-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                      <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                    </svg>
                    <h1 className='p-1'>Kết bạn</h1>
                  </button>
                  <button className=' w-28 p-2 bg-blue-600 rounded-lg text-base font-semibold text-white hover:bg-blue-700 flex items-center justify-center h-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" fill='white'>
                      <path d="M256.6 8C116.5 8 8 110.3 8 248.6c0 72.3 29.7 134.8 78.1 177.9 8.4 7.5 6.6 11.9 8.1 58.2A19.9 19.9 0 0 0 122 502.3c52.9-23.3 53.6-25.1 62.6-22.7C337.9 521.8 504 423.7 504 248.6 504 110.3 396.6 8 256.6 8zm149.2 185.1l-73 115.6a37.4 37.4 0 0 1 -53.9 9.9l-58.1-43.5a15 15 0 0 0 -18 0l-78.4 59.4c-10.5 7.9-24.2-4.6-17.1-15.7l73-115.6a37.4 37.4 0 0 1 53.9-9.9l58.1 43.5a15 15 0 0 0 18 0l78.4-59.4c10.4-8 24.1 4.5 17.1 15.6z" />
                    </svg>
                    <h1 className='p-1'>Nhắn tin</h1>
                  </button>
                </>
              )}
              <button className=' p-2 bg-gray-300 rounded-lg text-base font-semibold text-black hover:bg-gray-400 flex items-center justify-center h-10 px-4'>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                  <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className=' w-full flex justify-center shadow-lg'>
          <div className='flex items-center w-9/12 space-x-5 border-t-2 border-gray-300 p-1'>
            <div className=' p-3 font-semibold text-gray-500  cursor-pointer hover:bg-gray-200 rounded-lg'>
              Bài viết
            </div>
            <div className=' p-3 font-semibold text-gray-500  cursor-pointer hover:bg-gray-200 rounded-lg'>
              Giới thiệu
            </div>
            <div className=' p-3 font-semibold text-gray-500  cursor-pointer hover:bg-gray-200 rounded-lg'>
              Bạn bè
            </div>
            <div className=' p-3 font-semibold text-gray-500  cursor-pointer hover:bg-gray-200 rounded-lg'>
              Ảnh
            </div>
            <div className=' p-3 font-semibold text-gray-500  cursor-pointer hover:bg-gray-200 rounded-lg'>
              Video
            </div>
            <div className=' p-3 font-semibold text-gray-500  cursor-pointer hover:bg-gray-200 rounded-lg'>
              Check in
            </div>
          </div>
        </div>
        <div className=' w-full bg-gray-100 flex flex-col justify-center items-center'>
          <div className='w-9/12 bg-gray-100 flex items-start justify-between'>
            <div className=' w-5/12 mx-4'>
              <div className=' w-full bg-white m-4 p-2  rounded-lg shadow-sm'>
                <h1 className=' text-xl font-bold'>Giới thiệu</h1>
              </div>
              <div className=' w-full bg-white m-4 p-2  rounded-lg shadow-sm'>
                <h1 className=' text-xl font-bold'>Ảnh</h1>
              </div>
              <div className=' w-full bg-white m-4 p-2  rounded-lg shadow-sm'>
                <h1 className=' text-xl font-bold'>Bạn bè</h1>
              </div>
            </div>
            <div className='w-7/12 mx-4'>
              <div className=' w-full flex justify-between items-center bg-white m-4 p-3 rounded-lg shadow-sm'>
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
                className='w-full mx-4'
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
              >
                {posts.posts.map((post, key) => (
                  <SinglePost key={key} post={post} />
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
