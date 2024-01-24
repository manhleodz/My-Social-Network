import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Auth } from '../../Network/Auth';
import { useDispatch, useSelector } from 'react-redux';
import '../../Assets/SCSS/Profile.scss';
import { FriendApi } from '../../Network/Friend';
import { fetchFriend } from '../../Redux/FriendSlice';

export default function Profile() {

  const username = useParams().username;
  const user = useSelector(state => state.authentication.user);
  const frs = useSelector(state => state.friends.friends);
  const [profile, setProfile] = useState();

  const [scrollPosition, setScrollPosition] = useState();
  const scrollRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollTop)
  }

  const options = document.querySelectorAll('li');
  for (let i = 0; i < options.length; i++) {
    options[i].onclick = () => {
      document.activeElement.blur();
    };
  }

  const addFriend = (userId) => {
    FriendApi.addFriend({ user: userId }).then(() => {

    }).catch(err => {
      console.log(err.message);
    });
  };

  const deleteFriend = (id) => {
    FriendApi.deleteFriend(id).then(() => {
      const update = frs.filter(friend => friend.id !== id);
      dispatch(fetchFriend(update));
      isFriend = null;
    }).catch(err => {
      console.log(err.message);
    });
  };

  useEffect(() => {
    document.title = username;
    Auth.getProfile(username).then(res => {
      setProfile(res.data.profile);
    }).catch(err => {
      console.log(err.data.error);
    })
  }, [username])

  if (!profile) return null;

  var isFriend = frs.filter(friend => friend.id === profile.id);

  return (
    <div className=' w-full flex flex-col space-y-5 p-3 bg-white' ref={scrollRef} onScroll={handleScroll} data-mode="light">
      <div className='w-full relative top-14 flex flex-col items-center divide divide-gray-500'>
        <div className='header relative' >
          <img className='background-image w-full object-cover object-center rounded-lg' src={profile.background} />
          <div className='user-info absolute w-full h-36 bottom-6 px-16 flex items-center justify-between'>
            <div className='w-36 max-lg:w-28 max-xl:w-32 relative'>
              <div className=' w-36 max-lg:w-28 max-xl:w-32 p-1 bg-white rounded-full -bottom-16 left-0'>
                <img className='w-36 h-36 max-lg:w-28 max-lg:h-28 max-xl:w-32 max-xl:h-32 object-center object-cover rounded-full' src={profile.avatar} />
                <div className={` absolute bottom-4 right-2 max-lg:bottom-3 max-lg:right-3 w-6 h-6 max-lg:w-4 border-2 border-white max-lg:h-4 rounded-full ${profile.online ? 'bg-green-500' : 'hidden'} `}></div>
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
                    <h1 className='p-1' onClick={() => navigate(`about`)}>Chỉnh sửa trang cá nhân</h1>
                  </button>
                </>
              ) : (
                <>
                  {isFriend.length > 0 ? (
                    <>
                      <div tabIndex="0" className="group relative inline-block">
                        <button
                          onClick={() => {

                          }}
                          className=' w-28 p-2 bg-gray-300 rounded-lg text-base font-semibold text-black hover:bg-slate-300 flex items-center justify-center h-10'
                        >
                          <img className='w-6 h-6' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBI
                            WXMAAAsTAAALEwEAmpwYAAAC1klEQVR4nO2aPWgUURSFvyUrBhHFwtVSjSj4A1oGVAS1NYUKxo2xUSSKdcQi
                            RZJCRdAqqBgFtbGzEDGIjdkgLhELwUIQG//wF9xEUXRXHpyBYZhZZ3ffm1nDHHjszH3n3Xvu7p07kzeBDHML
                            OaAfmAJmNErAQc0FuYdCuP0h3MRxFahFjPEA91odrvGTGvokogIcBpYBy4Ejspm5Aw1wi2klMiUBAyFzA5or
                            NcFNHLMSsDRkrqC5mQC3EIObOBoR19aJlOqUyzHNTcYorSA3cRQDF/AiDf8F3NsA12sMqWC8Tku90kKrThw5
                            tdaH+mYrOi5G3BD7VEJh3LXAJeAT8BW4AMznP8IW4DbwJ+SXOk+bYx6wF3jkE/0DuAisAbbJ9sGliN3ANPCzT
                            s03Mj4Cw4HWvF1z710l0QNULYj/BZTVehf4/G8GbgG/xTvtKpGnCnAGWGjR7w5gIpDsOyCPA2xUgM+WuklB94
                            5pn/hvwDl1rppiWsdZOR9rcJ13V683zLVwCliiNWOym5hW0QG8lvPuBtdGiZ9VkkeBzsCabnHeKLY17JTjF74
                            b3WO1z7iJ/At+fznFMut2YRHX5XSoCYHN8oZ0bmJbwxc57bIgMC6vS+fmwreeyCoLAlNN5KacDlsQGJc3ovM
                            bWIT37PNWz0mtCIzDy6tjmfOtWMYzOd7TgsC4vH06fu5iz+uEnN9vQWBc3gMdH8cBFmuDoKpHbVeJrFaMim
                            I6wWUFu+cwkQl9mljOsFJ/htaaEBiXV1O7X4FjbADuRggshewYRvEmI3h3gHUkiDCBtm2JIEuE7Bdxg6y0yE
                            rLDbLSIistN8hKizYrraoCextonT4x3pZqh8+WD7EFedUU8uCVgg9qQ3vUJ3BEtpM+22CILch7mUYi3gtO//
                            D+x6QWY3wPsfWSEsxbpyfaxzXvOzbpHUfZZ+vRy6GyxJtNjP3Aem2TzsqHt6mRgbmAv4TW+V6Y44kmAAAAAE
                            lFTkSuQmCC"
                          />
                          <h1 className='p-1'>Bạn bè</h1>
                        </button>
                        <ul className="hidden group-focus-within:block list-none rounded-lg absolute bg-gray-50 w-64 z-1 animate-slideIn" style={{ boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>
                          <li className="py-3 px-4 cursor-pointer flex items-center justify-start hover:bg-gray-200 ">
                            <svg className='w-7 h-7' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            <span style={{ fontSize: "15px" }}>Chỉnh sửa danh sách bạn bè</span>
                          </li>
                          <li onClick={() => deleteFriend(profile.id)} className="py-3 px-4 flex items-center justify-start cursor-pointer hover:bg-gray-200 ">
                            <svg className='w-7 h-7' viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="3" stroke="#000000" fill="none">
                              <g id="SVGRepo_bgCarrier" strokeWidth="0">
                              </g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
                              </g><g id="SVGRepo_iconCarrier"><circle cx="29.22" cy="16.28" r="11.14"></circle>
                                <path d="M41.32,35.69c-2.69-1.95-8.34-3.25-12.1-3.25h0A22.55,22.55,0,0,0,6.67,55h29.9"></path>
                                <circle cx="45.38" cy="46.92" r="11.94"></circle><line x1="38.98" y1="46.8" x2="52.98" y2="46.8"></line></g>
                            </svg>
                            <span style={{ fontSize: "15px" }}>Hủy kết bạn</span>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => addFriend(profile.id)}
                        className=' w-28 p-2 bg-gray-300 rounded-lg text-base font-semibold text-black hover:bg-gray-400 flex items-center justify-center h-10'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-6 h-6' viewBox="0 0 640 512">
                          <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                        </svg>
                        <h1 className='p-1'>Kết bạn</h1>
                      </button>
                    </>
                  )}
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
          <Outlet context={{ owner: profile, params: username }} />
        </div>
      </div>
    </div>
  )
}
