import React, { useEffect, useState } from 'react';
import video from '../../Assets/Email Marketing.mp4';
import ReactPlayer from 'react-player';
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";
import { storage } from '../../Firebase/Firebase';
import { Auth } from '../../Network/Auth';
import { useDispatch } from 'react-redux';
import { setUser, signOut } from '../../Redux/UserSlice';
import { useNavigate } from 'react-router-dom';

export default function ConfirmAccount() {

    const [page, setPage] = useState(1);
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState("");
    const [background, setBackground] = useState('https://png.pngtree.com/thumb_back/fh260/background/20211212/pngtree-christmas-tree-plant-elk-leaf-snowflake-ribbon-image_919263.png');
    const [address, setAddress] = useState("");
    const [story, setStory] = useState("");
    const [workAt, setWorkAt] = useState("");
    const [studyAt, setStudyAt] = useState("");
    const [favorites, setFavorites] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("male");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [beforeUpload, setBeforeUpload] = useState("");
    const [backgroundUrl, setBackgroundUrl] = useState("");
    const [bgBeforeUpload, setBgBeforeUpload] = useState("");

    const navigate = useNavigate();

    const success = (e) =>{
        localStorage.setItem("accessToken", e.data.token);
        window.location.reload();
    }

    const failure = (e) => {

    }

    const completeConfirm = () => {
        if (username.length > 0 && nickname.length > 0) {
            if (gender === 'Nam' && avatar.length === 0) {
                const data = {
                    username,
                    nickname,
                    avatar: 'https://cdn.create.vista.com/api/media/small/246499746/stock-vector-abstract-sign-avatar-men-icon-male-profile-white-symbol-gray',
                    background,
                    address,
                    story,
                    workAt,
                    studyAt,
                    favorites,
                    birthday,
                    gender
                }
                Auth.completeConfirm(data, success, failure);
            } else if (gender !== 'Nam' && avatar.length === 0) {
                const data = {
                    username,
                    nickname,
                    avatar: 'https://delmarbehavioralhealth.com/wp-content/uploads/2017/09/Female-Avatar.png',
                    background,
                    address,
                    story,
                    workAt,
                    studyAt,
                    favorites,
                    birthday,
                    gender
                }
                Auth.completeConfirm(data, success, failure);
            } else {
                const data = {
                    username,
                    nickname,
                    avatar,
                    background,
                    address,
                    story,
                    workAt,
                    studyAt,
                    favorites,
                    birthday,
                    gender
                }
                Auth.completeConfirm(data, success, failure);
            }
        } else {
            alert('Vui lòng điền đủ thông tin bắt buộc!');
        }
    }

    const uploadAvatar = () => {
        if (avatar == null) return;
        const imageRef = ref(storage, `images/${avatar.name + v4()}`);
        uploadBytes(imageRef, avatar).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                if (url !== undefined) {
                    setAvatarUrl(url);
                    const data = {
                        avatar: url,
                        id: userId,
                    }

                }
            });
        });
    }

    const uploadBg = (e) => {
        if (background == null) return;
        const imageRef = ref(storage, `images/${background.name + v4()}`);
        uploadBytes(imageRef, background).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                if (url !== undefined) {
                    setBackgroundUrl(url);
                    const data = {
                        background: url,
                        id: userId,
                    }

                }
            });
        });
    }

    const changeAvatar = (e) => {
        const file = (e.target.files[0]);
        file.preview = URL.createObjectURL(file);
        setBeforeUpload(file.preview);
    };

    const changeBackground = (e) => {
        const file = (e.target.files[0]);
        file.preview = URL.createObjectURL(file);
        setBgBeforeUpload(file.preview);
    }

    return (
        <div className='w-full h-screen'>
            <div className=' bg-blue-500 p-2 text-white text-2xl font-semibold flex justify-center items-start mb-10'>
                Chào mừng bạn đến thế giới của tôi
            </div>

            <div className='flex flex-col justify-start items-center w-full h-2/3 relative'>
                <div className=' flex items-center justify-center w-7/12 '>
                    {page === 1 ? (
                        <>
                            <button onClick={(e) => setPage(1)} className='p-5 flex justify-center items-center w-10 h-10 bg-blue-300 rounded-full'>1</button>
                        </>
                    ) : (
                        <>
                            <button onClick={(e) => setPage(1)} className='p-5 flex justify-center items-center w-10 h-10 bg-gray-300 rounded-full'>1</button>
                        </>
                    )}
                    <hr className='w-full' />
                    {page === 2 ? (
                        <>
                            <button onClick={(e) => setPage(2)} className='p-5 flex justify-center items-center w-10 h-10 bg-blue-300 rounded-full'>2</button>
                        </>
                    ) : (
                        <>
                            <button onClick={(e) => setPage(2)} className='p-5 flex justify-center items-center w-10 h-10 bg-gray-300 rounded-full'>2</button>
                        </>
                    )}
                    <hr className='w-full' />
                    {page === 3 ? (
                        <>
                            <button onClick={(e) => setPage(3)} className='p-5 flex justify-center items-center w-10 h-10 bg-blue-300 rounded-full'>3</button>
                        </>
                    ) : (
                        <>
                            <button onClick={(e) => setPage(3)} className='p-5 flex justify-center items-center w-10 h-10 bg-gray-300 rounded-full'>3</button>
                        </>
                    )}
                </div>
                <div className=' p-4 shadow-lg drop-shadow-sm shadow-blue-200 mt-10 w-7/12 z-50'>
                    {page === 1 && (
                        <>
                            <h1 className=' text-center text-2xl m-5 font-semibold'>Xác nhận thông tin</h1>
                            <div className='flex max-xl:flex-wrap justify-between w-full'>
                                <div className=' w-full'>
                                    <ReactPlayer
                                        url={video}
                                        width="full"
                                        height="360px"
                                        loop={true}
                                        playing={true}
                                        controls={false}
                                    />
                                </div>
                                <div className=' flex flex-col items-end w-full space-y-4'>
                                    <div className='flex items-center justify-end w-full space-x-3'>
                                        <div className=' w-full'>
                                            <label htmlFor="nickname" className=' hidden'>Tên người dùng:</label>
                                            <input
                                                placeholder='Tên người dùng' className=' w-full p-2 text-lg border border-gray-300 rounded-lg active:outline outline-blue-300'
                                                onChange={(e) => {
                                                    setNickname(e.target.value);
                                                }}
                                                value={nickname}
                                            />
                                        </div>
                                        <div className=' w-full'>
                                            <label htmlFor="username" className=' hidden'>Tên đăng nhập:</label>
                                            <input
                                                placeholder='Tên đăng nhập: abcd123' className=' w-full p-2 text-lg border border-gray-300 rounded-lg active:outline outline-blue-300'
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                }}
                                                value={username}
                                            />
                                        </div>
                                    </div>
                                    <div className=' flex flex-col items-end w-full space-y-4'>
                                        <input
                                            placeholder='Địa chỉ' className=' w-full p-2 text-lg border border-gray-300 rounded-lg active:outline outline-blue-300'
                                            onChange={(e) => setAddress(e.target.value)}
                                            value={address}
                                        />
                                        <input
                                            placeholder='Nơi làm việc' className=' w-full p-2 text-lg border border-gray-300 rounded-lg active:outline outline-blue-300'
                                            onChange={(e) => setWorkAt(e.target.value)}
                                            value={workAt}
                                        />
                                        <input
                                            placeholder='Từng học tập tại' className=' w-full p-2 text-lg border border-gray-300 rounded-lg active:outline outline-blue-300'
                                            onChange={(e) => setStudyAt(e.target.value)}
                                            value={studyAt}
                                        />
                                        <input
                                            placeholder='Sở thích' className=' w-full p-2 text-lg border border-gray-300 rounded-lg active:outline outline-blue-300'
                                            onChange={(e) => setFavorites(e.target.value)}
                                            value={favorites}
                                        />
                                        <div className='w-full'>
                                            <label htmlFor="birthday">Ngày sinh:</label>
                                            <input
                                                type="date" id="birthday" name="birthday" className=' w-full p-2 text-lg border border-gray-300 rounded-lg active:outline outline-blue-300'
                                                onChange={(e) => setBirthday(e.target.value)}
                                            />
                                        </div>
                                        <div className='w-full flex items-center justify-start space-x-5'>
                                            <div>
                                                <label>Nam</label>
                                                <input className=' rounded-full' type='checkbox' checked={gender === "Nam"} onChange={(e) => setGender("Nam")} />
                                            </div>

                                            <div>
                                                <label>Nữ</label>
                                                <input className=' rounded-full' type='checkbox' checked={gender === "Nữ"} onChange={(e) => setGender("Nữ")} />
                                            </div>

                                            <div>
                                                <label>Khác</label>
                                                <input className=' rounded-full' type='checkbox' checked={gender === "khác"} onChange={(e) => setGender("khác")} />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setPage(2)
                                        }}
                                        className=' p-2 bg-green-500 rounded-lg text-white hover:bg-green-600 active:outline outline-green-300'
                                    >Tiếp tục</button>
                                </div>
                            </div>
                        </>
                    )}
                    {page === 2 && (
                        <>
                            <h1 className=' text-center text-2xl m-5 font-semibold'>Kiểm tra trang cá nhân</h1>
                            <div className='w-full flex flex-col justify-start items-center relative'>
                                <div className='w-10/12 flex flex-col justify-start items-center relative'>
                                    <img alt='bg' className='w-full object-cover rounded-md max-h-96' src={bgBeforeUpload.length > 0 ? bgBeforeUpload : background} />
                                    {gender === 'Nam' ? (
                                        <div className='w-full absolute left-0 -bottom-16 flex justify-between items-center'>
                                            <div className='flex justify-start items-center mt-20'>
                                                <img alt='avatar' className=' ml-10 w-32 h-32 object-cover rounded-full border-gray-900 border' src={beforeUpload.length > 0 ? beforeUpload : 'https://cdn.create.vista.com/api/media/small/246499746/stock-vector-abstract-sign-avatar-men-icon-male-profile-white-symbol-gray'} />
                                                <h1 className='mt-10 p-4 text-2xl font-semibold'>{nickname}</h1>
                                            </div>
                                            <div className=' space-x-3 mt-16 flex flex-wrap items-center'>
                                                <input className='hidden' type='file' onChange={changeBackground} id='background' />
                                                {bgBeforeUpload.length > 0 ? (
                                                    <h1
                                                        className='mt-16 w-40 p-2 text-lg bg-gray-500 font-semibold rounded-lg text-white cursor-pointer hover:bg-gray-600'
                                                        onClick={(e) => {
                                                            setBgBeforeUpload('');
                                                        }}
                                                    >Gỡ ảnh</h1>
                                                ) : (
                                                    <label className='mt-16 w-40 p-2 text-lg bg-blue-500 font-semibold rounded-lg text-white cursor-pointer hover:bg-blue-600' htmlFor='background'>Thay đổi ảnh bìa</label>
                                                )}
                                                <input className='hidden' type='file' onChange={changeAvatar} id='avatar' />
                                                {beforeUpload.length > 0 ? (
                                                    <h1
                                                        className='mt-16 w-40 p-2 text-lg bg-gray-500 font-semibold rounded-lg text-white cursor-pointer hover:bg-gray-600' htmlFor='avatar'
                                                        onClick={() => {
                                                            setBeforeUpload('');
                                                        }}
                                                    >Gỡ ảnh</h1>
                                                ) : (
                                                    <label className='mt-16 w-40 p-2 text-lg bg-blue-500 font-semibold rounded-lg text-white cursor-pointer hover:bg-blue-600' htmlFor='avatar'>Thay đổi avatar</label>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='w-full absolute left-0 -bottom-16 flex justify-between items-center'>
                                            <div className='flex justify-start items-center'>
                                                <img alt='avatar' className=' ml-10 w-32 h-32 object-cover rounded-full border-gray-900 border' src='https://delmarbehavioralhealth.com/wp-content/uploads/2017/09/Female-Avatar.png' />
                                                <h1 className='mt-10 p-4 text-2xl font-semibold'>{username}</h1>
                                            </div>
                                            <div className=' space-x-3 mt-16 flex flex-wrap max-xl:flex-col'>
                                                <input className='hidden' type='file' onChange={changeBackground} id='background' />
                                                {bgBeforeUpload.length > 0 ? (
                                                    <h1
                                                        className='mt-16 w-40 p-2 text-lg bg-gray-500 font-semibold rounded-lg text-white cursor-pointer hover:bg-gray-600'
                                                        onClick={(e) => {
                                                            setBgBeforeUpload('');
                                                        }}
                                                    >Gỡ ảnh</h1>
                                                ) : (
                                                    <label className='mt-16 w-40 p-2 text-lg bg-blue-500 font-semibold rounded-lg text-white cursor-pointer hover:bg-blue-600' htmlFor='background'>Thay đổi ảnh bìa</label>
                                                )}
                                                <input className='hidden' type='file' onChange={changeAvatar} id='avatar' />
                                                {beforeUpload.length > 0 ? (
                                                    <h1
                                                        className='mt-16 w-40 p-2 text-lg bg-gray-500 font-semibold rounded-lg text-white cursor-pointer hover:bg-gray-600' htmlFor='avatar'
                                                        onClick={() => {
                                                            setBeforeUpload('');
                                                        }}
                                                    >Gỡ ảnh</h1>
                                                ) : (
                                                    <label className='mt-16 w-40 p-2 text-lg bg-blue-500 font-semibold rounded-lg text-white cursor-pointer hover:bg-blue-600' htmlFor='avatar'>Thay đổi avatar</label>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex justify-between  w-full mt-20'>
                                <button onClick={() => setPage(1)} className=' p-2 bg-gray-500 rounded-lg text-white hover:bg-gray-600 active:outline outline-gray-300'>Quay lại</button>
                                <button onClick={() => setPage(3)} className=' p-2 bg-green-500 rounded-lg text-white hover:bg-green-600 active:outline outline-green-300'>Tiếp tục</button>
                            </div>
                        </>
                    )}
                    {page === 3 && (
                        <>
                            <h1 className=' text-center text-2xl m-5 font-semibold'>Bắt đầu hành trình mới</h1>
                            <div className='w-full flex justify-center items-center'>
                                <div className='w-10/12 flex justify-center items-start space-x-10'>
                                    <img alt='bomay' className=' w-4/12' src='https://firebasestorage.googleapis.com/v0/b/my-social-network-1fc04.appspot.com/o/images%2Fhello.jpg?alt=media&token=be9db469-62fd-4e49-9053-feb30e03c722' />
                                    <div className='w-5/12'>
                                        <h1 className=' text-2xl font-semibold mb-5'>Điều khoản bắt buộc</h1>
                                        <ul className=' list-disc space-y-10'>
                                            <li>Cấm bình luận khiếm nhã, chửi tục</li>
                                            <li>Cấm buôn bán ma tóe online</li>
                                            <li>Cùng nhau xây dựng thế giới tốt đẹp hơn</li>
                                            <li>Chung tay cho tương lai con em chúng ta</li>
                                            <li>Địt con mẹ thằng nào dùng được trang này</li>
                                            <li>Vi phạm là bắn bỏ mẹ</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between w-full'>
                                <button onClick={() => setPage(2)} className=' p-2 bg-gray-500 rounded-lg text-white hover:bg-gray-600 active:outline outline-gray-300'>Quay lại</button>
                                <button onClick={completeConfirm} className=' p-2 bg-green-500 rounded-lg text-white hover:bg-green-600 active:outline outline-green-300'>Bắt đầu</button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className=' h-1/6'>
                Footer
            </div>
        </div>
    )
}
