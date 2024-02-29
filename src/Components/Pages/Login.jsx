import React, { memo, useEffect, useState } from 'react';
import { Auth } from '../../Network/Auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../Redux/UserSlice';
import { StoryApi } from '../../Network/Story';
import { PostApi } from '../../Network/Post';
import { FriendApi } from '../../Network/Friend';
import { fetchData } from '../../Redux/PostSlice';
import { fetchStory } from '../../Redux/StorySlice';
import { fetchFriend } from '../../Redux/FriendSlice';
import LoginStyle from '../../Assets/SCSS/Login.module.scss';
import backgroundImage from '../../Assets/login bg.jpg';

const Login = () => {

  const navigate = useNavigate();
  const [information, setInformation] = useState("");
  const [password, setPassword] = useState("");
  const [excuting, setExcuting] = useState(true);
  const [alert, setAlert] = useState(null);

  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();

  const unAuthorized = (e) => {
    dispatch(setUser(e));
  }

  const success = (e) => {
    dispatch(setUser(e));
    getPosts();
    getListFriends();
    getStories();
    navigate('/')
  }

  const failure = (error) => {
    setAlert(error);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (information.length >= 6 && password.length >= 3) {
      Auth.login(
        {
          information: information,
          password: password,
        },
        (user) => {
          const timeOut = setTimeout(() => {
            success(user);
          }, 100);
        },
        (user) => {
          const timeOut = setTimeout(() => {
            unAuthorized(user);
          }, 100);
        },
        (error) => {
          failure(error);
        }
      )
    } else {
      setAlert("Nhập đầy đủ thông tin");
    }
  }

  useEffect(() => {
    document.title = "ML-Log in";
  }, [])

  const getListFriends = async () => {
    await FriendApi.getListFriend().then((res) => {
      dispatch(fetchFriend(res.data));
    })
  }

  const getPosts = async () => {
    try {
      await PostApi.getPost(posts.page).then(res => {
        if (res.status === 200)
          dispatch(fetchData(res.data.data))
      })
    } catch (err) {
      console.log(err);
    }
  }

  const getStories = async () => {
    try {
      await StoryApi.getAll().then(res => {
        if (res.status === 200)
          dispatch(fetchStory(res.data))
      })
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <>
      <section
        className="flex flex-row items-center justify-center w-screen h-screen"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center'
        }}
      >
        <form
          className="min-h-screen max-[500px]:w-[350px] max-[400px]:w-[350px] max-[350px]:w-[300px] py-6 flex flex-col justify-center sm:py-12"
          onSubmit={onSubmit}
        >
          <div>
            <div className="relative py-3 sm:mx-auto" >
              <div
                className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 -rotate-6 max-sm:-rotate-3 rounded-3xl">
              </div>
              <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                  <div>
                    <h1 className="text-2xl max-sm:text-lg font-semibold font-mono">Hi! Chúc một ngày tốt lành</h1>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="py-4 text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative">
                        <input autoComplete="off" id="username" name="username" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-md"
                          placeholder="Thông tin"
                          onChange={(event) => {
                            setInformation(event.target.value);
                            if (event.target.value.length < 6) {
                              setAlert("Nhiều hơn 6 kí tự")
                              setExcuting(false);
                            } else {
                              setAlert();
                            }
                          }}
                          value={information}
                          autoCorrect="false"
                          required={true}
                        />
                        <label htmlFor='information' className={` absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm`}>Tên tài khoản/Email</label>
                        {(alert === "Tên người dùng hoặc email không tồn tại" || alert === "Nhiều hơn 6 kí tự") && (
                          <h1 className=" text-red-600 font-semibold text-base break-words">
                            {alert}
                          </h1>
                        )}
                      </div>
                      <div className="relative">
                        <input autoComplete="new-password" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-md"
                          placeholder="Password"
                          onChange={(event) => {
                            setPassword(event.target.value);
                            if (event.target.value.length < 3) {
                              setAlert("Mật khẩu phải nhiều hơn 7 kí tự");
                            } else {
                              setAlert();
                            }
                          }}
                          autoCorrect="false"
                          required={true}
                        />
                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                        {(alert === "Mật khẩu phải nhiều hơn 7 kí tự" || alert === "Sai mật khẩu") && (
                          <h1 className=" text-red-600 font-semibold text-base break-words">
                            {alert}
                          </h1>
                        )}
                      </div>
                      <div className="relative">
                        <div className=' w-full flex justify-between items-center'>
                          <button
                            type="submit"
                            onDoubleClick={(e) => e.preventDefault()}
                            onClick={onSubmit}
                            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 active:ring-blue-400 ring-3 text-white rounded-md px-2 py-1"
                          >
                            Đăng nhập
                          </button>
                          <label htmlFor="myCheckbox01" className={LoginStyle.checkbox}>
                            <input className={LoginStyle.checkbox__input} type="checkbox" id="myCheckbox01" />
                            <svg className={LoginStyle.checkbox__icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                              <rect width="21" height="21" x=".5" y=".5" fill="#FFF" stroke="#006F94" rx="3" />
                              <path className={LoginStyle.tick} stroke="#6EA340" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
                            </svg>
                            <span className={LoginStyle.checkbox__label}>Lưu thông tin</span>
                          </label>
                        </div>
                        <div className="flex m-1">
                          <p className="text-m">Bạn chưa có tài khoản seo?</p>
                          <a href="/signup" className="text-sky-600 underline underline-offset-8 font-bold">Đăng ký</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default memo(Login);

