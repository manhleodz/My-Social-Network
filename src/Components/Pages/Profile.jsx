import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import { Auth } from '../../Network/Auth';
import { useSelector } from 'react-redux';
import '../../Assets/SCSS/Profile.scss';

export default function Profile() {

  const username = useParams().username;
  const user = useSelector(state => state.authentication.user);
  const [profile, setProfile] = useState();

  const [scrollPosition, setScrollPosition] = useState();
  const scrollRef = useRef();

  const location = useLocation();

  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollTop)
  }

  useEffect(() => {
    document.title = username;
    Auth.getProfile(username).then(res => {
      setProfile(res.data.profile);
    }).catch(err => {
      console.log(err.data.error);
    })
  }, [username])

  if (!profile) return null;

  return (
    <div className=' w-full flex flex-col space-y-5 p-3 bg-white' ref={scrollRef} onScroll={handleScroll} data-mode="light">
      <div className='w-full relative top-14 flex flex-col items-center divide divide-gray-500'>
        <div className='header relative' >
          <img className='background-image w-full object-cover object-center rounded-lg' src={profile.background} />
          <div className='user-info absolute w-full h-36 bottom-6 px-16 flex items-center justify-between'>
            <div className='w-36 max-lg:w-28 max-xl:w-32 relative'>
              <div className=' w-36 max-lg:w-28 max-xl:w-32 p-1 bg-white rounded-full -bottom-16 left-0'>
                <img className='w-36 h-36 max-lg:w-28 max-lg:h-28 max-xl:w-32 max-xl:h-32 object-center object-cover rounded-full' src={profile.avatar} />
                <div className={` absolute bottom-4 right-2 max-lg:bottom-3 max-lg:right-3 w-6 h-6 max-lg:w-4 max-lg:h-4 rounded-full ${profile.online ? 'bg-green-500' : 'hidden'} `}></div>
              </div>
            </div>
            <div className='avatar-container w-2/3 h-full flex flex-col justify-end items-start max-lg:items-center'>
              <h1 className=' text-3xl max-lg:text-xl font-semibold text-start'>{profile.nickname}</h1>
              <h1 className=' text-base max-lg:text-sm text-gray-500 font-mono'>8 bạn chung</h1>
            </div>
            <div className='h-full grid sm:grid-flow-col max-sm:grid-flow-dense max-sm:grid-rows-2 max-sm:content-center items-end justify-end space-x-3 max-sm:space-x-0 max-sm:space-y-2'>
              {profile.id === user.id ? (
                <>
                  <button className=' w-36 max-sm:w-56 p-2 bg-gray-300 rounded-lg text-base font-semibold text-black hover:bg-gray-400 flex items-center justify-center h-10'>
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
            </div>
          </div>
        </div>
        <div className=' w-full flex justify-center' style={{ boxShadow: 'box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px' }}>
          <div className=' navigate-bar flex items-center space-x-5 max-md:space-x-3 max-sm:space-x-1 border-t-2 border-gray-300 p-1'>
            <Link to={``}>
              <div className=' p-3 max-md:p-2 max-sm:p-1.5 font-semibold text-gray-500  cursor-pointer hover:bg-gray-200 rounded-lg'>
                Bài viết
              </div>
            </Link>
            <Link to={`about`}>
              <div className=' p-3 max-md:p-2 max-sm:p-1.5 font-semibold text-gray-500  cursor-pointer hover:bg-gray-200 rounded-lg'>
                Giới thiệu
              </div>
            </Link>
            <Link to={`friends`}>
              <div className=' p-3 max-md:p-2 max-sm:p-1.5 font-semibold text-gray-500  cursor-pointer hover:bg-gray-200 rounded-lg'>
                Bạn bè
              </div>
            </Link>
            <Link to={`images`}>
              <div className=' p-3 max-md:p-2 max-sm:p-1.5 font-semibold text-gray-500  cursor-pointer hover:bg-gray-200 rounded-lg'>
                Ảnh
              </div>
            </Link>
            <Link to={`videos`}>
              <div className=' p-3 max-md:p-2 max-sm:p-1.5 font-semibold text-gray-500  cursor-pointer hover:bg-gray-200 rounded-lg'>
                Video
              </div>
            </Link>
          </div>
        </div>
        <div className=' w-full bg-gray-100 flex flex-col p-3 justify-center items-center'>
          <Outlet context={{ owner: profile }} />
        </div>
      </div>
    </div>
  )
}
