import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import OnlineBar from '../Widgets/OnlineBar/OnlineBar';
import Post from '../Widgets/Post/Post';
import { useLocation, useNavigate } from 'react-router-dom';
import Story from '../Widgets/Story/Story';
import MakePost from '../Widgets/MakePost/MakePost';
import friends from '../../Assets/SVG icons/friends.svg';
import messager from '../../Assets/SVG icons/messager.svg'
import group from '../../Assets/SVG icons/group.svg'
import video from '../../Assets/SVG icons/video.svg'
import music from '../../Assets/SVG icons/music.svg'
import save from '../../Assets/SVG icons/save.svg'

const Loading = () => (
  <div className="post loading">
    <h5>Loading...</h5>
  </div>
)

export default function Home() {

  const user = useSelector(state => state.authentication.user);
  const [scrollPosition, setScrollPosition] = useState();
  const scrollRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollTop)
    console.log(event);
  }

  useEffect(() => {

    if (location.state) {
      const { scrollPosition } = location.state;
      setTimeout(() => {
        scrollRef.current.scrollTop = scrollPosition
      }, (10));
    }
    document.title = "ML"

  }, []);

  if (!user) return null;

  return (
    <div className=' w-full p-3 bg-gray-100' ref={scrollRef} onScroll={handleScroll} data-mode="light">
      <div className=' relative top-16 flex justify-between'>
        <div className="h-full w-1/5 max-xl:w-1/6 px-3 overflow-y-hidden dark:bg-gray-800 max-lg:hidden">
          <ul className="space-y-2 font-medium fixed w-1/5">
            <li>
              <button
                onClick={() => {
                  navigate(`${user.username}`);
                }}
                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group cursor-pointer"
              >
                <img alt='avatar' src={`${user.avatar}`} className='w-10 h-10 rounded-full object-cover' />
                <span className="ml-3 text-lg">{user.nickname}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/friends", { state: { homePosition: scrollPosition } });
                }}
                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group cursor-pointer"
              >
                <img alt='friends' src={friends} className='w-10 h-10' />
                <span className="ml-3">Bạn bè</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/", { state: { homePosition: scrollPosition } });
                }}
                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group cursor-pointer"
              >
                <img alt='save' src={save} className='w-10 h-10' />
                <span className="ml-3">Lưu trữ</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/community", { state: { homePosition: scrollPosition } });
                }}
                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group cursor-pointer"
              >
                <img alt='group' src={group} className='w-10 h-10' />
                <span className="ml-3">Community</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/inbox", { state: { homePosition: scrollPosition } });
                }}
                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group cursor-pointer"
              >
                <img alt='messager' src={messager} className='w-10 h-10' />
                <span className="ml-3">Tin nhắn</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/watch", { state: { homePosition: scrollPosition } });
                }}
                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group cursor-pointer"
              >
                <img alt='video' src={video} className='w-10 h-10' />
                <span className="ml-3">
                  Video
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/music", { state: { homePosition: scrollPosition } });
                }}
                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group cursor-pointer"
              >
                <img alt='music' src={music} className='w-10 h-10' />
                <span className=" ml-3">Music</span>
              </button>
            </li>
          </ul>
        </div>
        <div className='w-3/5 px-24 max-2xl:px-5 max-xl:px-0 max-md:w-full max-xl:w-8/12 max-lg:w-4/5 flex flex-col justify-center items-center space-y-5'>
          <Story />
          <MakePost />
          <div className=' space-y-5 w-9/12 max-md:w-full' >
            <Post />
          </div>
        </div>
        <div className=' w-1/5 max-md:hidden flex justify-end'>
          <OnlineBar userId={user.id} />
        </div>
      </div>
    </div>
  )
}