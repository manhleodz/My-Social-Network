import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import OnlineBar from '../Widgets/OnlineBar/OnlineBar';
import Post from '../Widgets/Post/Post';
import { useNavigate } from 'react-router-dom';
import Story from '../Widgets/Story/Story';
import MakePost from '../Widgets/MakePost/MakePost';
import friends from '../../Assets/Địt mẹ thằng lồn Tiến/friends.svg';
import messager from '../../Assets/Địt mẹ thằng lồn Tiến/messager.svg'
import group from '../../Assets/Địt mẹ thằng lồn Tiến/group.svg'
import video from '../../Assets/Địt mẹ thằng lồn Tiến/video.svg'
import music from '../../Assets/Địt mẹ thằng lồn Tiến/music.svg'
import save from '../../Assets/Địt mẹ thằng lồn Tiến/save.svg'

const Loading = () => (
  <div className="post loading">
    <h5>Loading...</h5>
  </div>
)

export default function Home() {

  const user = useSelector(state => state.authentication.user);
  const navigate = useNavigate();

  useEffect(() => {

    document.title = "ML"

  }, []);

  if (!user) return null;

  return (
    <div className=' w-full p-3 bg-gray-100' >
      <div className=' relative top-16 flex justify-between'>
        <div className="h-full w-1/5 max-2xl:w-1/6 px-3 overflow-y-hidden dark:bg-gray-800 max-xl:hidden">
          <ul className="space-y-2 font-medium fixed w-1/5">
            <li>
              <button
                onClick={() => {
                  navigate(`${user.username}`);
                }}
                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group cursor-pointer"
              >
                <img alt='avatar' src={`${user.avatar}`} className='w-10 h-10 rounded-full object-cover' />
                <span className="ml-3 text-xl">{user.nickname}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/friends");
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
                  navigate("/");
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
                  navigate("/community");
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
                  navigate("/inbox");
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
                  navigate("/watch");
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
                  navigate("/music");
                }}
                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group cursor-pointer"
              >
                <img alt='music' src={music} className='w-10 h-10' />
                <span className=" ml-3">Music</span>
              </button>
            </li>
          </ul>
        </div>
        <div className='w-3/5 px-24 max-2xl:px-16 max-xl:px-0 max-md:w-full max-xl:w-4/5 flex flex-col justify-center items-center space-y-5'>
          <Story />
          <MakePost />
          <Post />
        </div>
        <div className=' w-1/5 max-md:hidden flex justify-end'>
          <OnlineBar userId={user.id} />
        </div>
      </div>
    </div>
  )
}