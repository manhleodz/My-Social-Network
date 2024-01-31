import React, { useState } from 'react';
import video from '../../Assets/Email Marketing.mp4';
import ReactPlayer from 'react-player';
import { Auth } from '../../Network/Auth';
import { useDispatch } from 'react-redux';
import { setUser, signOut } from '../../Redux/UserSlice';
import { useNavigate } from 'react-router-dom';

export default function ConfirmAccount() {

    const [page, setPage] = useState(1);
    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState("https://firebasestorage.googleapis.com/v0/b/my-social-network-815dc.appspot.com/o/images%2F326222515_693328639007006_6530226929641588503_n.jpg389d537c-04cc-4eb5-a050-a35a8520d3d6?alt=media&token=67b29c9d-4f8a-4909-8e52-3c302a719ee9");
    const [address, setAddress] = useState("");
    const [workAt, setWorkAt] = useState("");
    const [studyAt, setStudyAt] = useState("");
    const [favorites, setFavorites] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("male");

    const dispatch = useDispatch();

    const success = (e) => {
        localStorage.setItem("accessToken", e.data.token);
        sessionStorage.removeItem("accessToken");
        window.location.href("/");
    }

    const failure = (e) => {
        alert("Error: " + e.message);
        setPage(1);
    }

    const completeConfirm = () => {
        if (username.length > 0 && nickname.length > 0) {
            const data = {
                username,
                nickname,
                avatar,
                address,
                workAt,
                studyAt,
                favorites,
                birthday,
                gender
            }
            Auth.completeConfirm(data, success, failure);
        } else {
            alert('Vui lòng điền đủ thông tin bắt buộc!');
            setPage(1);
        }
    }

    return (
        <div className='w-full'>
            <div className=' bg-blue-500 p-2 text-white text-2xl font-semibold flex justify-center items-start mb-10'>
                Chào mừng bạn đến thế giới của tôi
            </div>

            <div className='flex flex-col justify-start items-center w-full h-2/3 relative'>
                <div className=' flex items-center justify-center w-7/12 max-md:w-10/12'>
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
                    {page === 3 ? (
                        <>
                            <button onClick={(e) => setPage(2)} className='p-5 flex justify-center items-center w-10 h-10 bg-blue-300 rounded-full'>2</button>
                        </>
                    ) : (
                        <>
                            <button onClick={(e) => setPage(2)} className='p-5 flex justify-center items-center w-10 h-10 bg-gray-300 rounded-full'>2</button>
                        </>
                    )}
                </div>
                <div className=' p-4 shadow-lg drop-shadow-sm shadow-blue-200 mt-10 w-7/12 z-50 max-lg:w-10/12'>
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
                                                <input
                                                    className=' rounded-full' type='checkbox' checked={gender === "Nam"}
                                                    onChange={(e) => {
                                                        setGender("Nam");
                                                        setAvatar("https://firebasestorage.googleapis.com/v0/b/my-social-network-815dc.appspot.com/o/images%2F326222515_693328639007006_6530226929641588503_n.jpg389d537c-04cc-4eb5-a050-a35a8520d3d6?alt=media&token=67b29c9d-4f8a-4909-8e52-3c302a719ee9");
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label>Nữ</label>
                                                <input
                                                    className=' rounded-full' type='checkbox' checked={gender === "Nữ"}
                                                    onChange={(e) => {
                                                        setGender("Nữ");
                                                        setAvatar("https://firebasestorage.googleapis.com/v0/b/my-social-network-815dc.appspot.com/o/images%2F319355609_727881652003063_1832447285833706047_n.jpg76f6f779-322b-49eb-b9d4-61366ff7441e?alt=media&token=e8b89a09-3706-4539-9163-2dd90c52c7c3")
                                                    }}
                                                />
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
                            <h1 className=' text-center text-2xl m-5 font-semibold'>Bắt đầu hành trình mới</h1>
                            <div className='w-full flex justify-center items-center'>
                                <div className='w-10/12 flex max-md:flex-col-reverse max-md:items-center justify-center items-start space-x-10'>
                                    <img alt='bomay' className=' w-4/12 max-md:w-10/12' src='https://firebasestorage.googleapis.com/v0/b/my-social-network-815dc.appspot.com/o/images%2Fhello.jpg?alt=media&token=52869f71-7077-4052-a06b-9b21372148d8' />
                                    <div className='w-5/12 max-md:w-10/12'>
                                        <h1 className=' text-2xl font-semibold mb-5'>Điều khoản bắt buộc</h1>
                                        <ul className=' list-disc space-y-2'>
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
                                <button onClick={() => setPage(1)} className=' p-2 bg-gray-500 rounded-lg text-white hover:bg-gray-600 active:outline outline-gray-300'>Quay lại</button>
                                <button onClick={completeConfirm} className=' p-2 bg-green-500 rounded-lg text-white hover:bg-green-600 active:outline outline-green-300'>Bắt đầu</button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* <div className=' h-1/6'>
                Footer
            </div> */}
        </div>
    )
}
