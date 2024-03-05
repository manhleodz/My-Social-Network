import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from "react-player";
import video from '../../../Assets/SVG icons/video-marketing-movie-camera-svgrepo-com.svg';
import Picker from 'emoji-picker-react';
import { useDropzone } from 'react-dropzone';
import addSvg from '../../../Assets/SVG icons/add.svg';
import './MakePost.scss';
import { PostApi } from '../../../Network/Post';
import { addPost } from '../../../Redux/PostSlice';

export default function MakePost() {

    const user = useSelector(state => state.authentication.user);
    const posts = useSelector(state => state.posts);

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [isPublic, setPublic] = useState(true);
    const [showPicker, setShowPicker] = useState(false);
    const [postText, setPostText] = useState("");
    const [fileUploads, setFileUploads] = useState(null);
    const [processing, setProcessing] = useState(false);

    if (open) {
        document.querySelector('body').style.overflow = 'hidden';
        if (document.querySelector('body').clientWidth > 500)
            document.querySelector('body').style.paddingRight = "9px"
    } else {
        document.querySelector('body').style.overflow = 'auto';
        document.querySelector('body').style.paddingRight = "0px"
    }

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map(file => {
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
            setFileUploads(prev => prev = [...prev, file]);
        })
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'video/mp4': [],
            'image/*': [],
        },
        onDrop
    })

    const onEmojiClick = (event) => {
        setPostText((prevInput) => prevInput + event.emoji);
        setShowPicker(false);
    };

    const newPost = async () => {

        const fd = new FormData();
        if (fileUploads && fileUploads.length > 0)
            await fileUploads.map((file) => {
                fd.append('files', file);
            })

        fd.append('postText', postText);
        fd.append('public', isPublic);
        setProcessing(true);
        await PostApi.create(fd).then(async (res) => {

            setProcessing(false);
            await PostApi.getPostById(res.data.newPost.id).then((post) => {
                dispatch(addPost({
                    Post: post.data.data
                }));
                setOpen(false);
                setPostText("");
                setFileUploads(null);
                setShowPicker(false);
            }).catch(() => {
                alert("Reload please wait...");
            });

        }).catch(err => {
            setProcessing(false);
            console.log(err.data);
        })
    };

    if (!user) return null;

    return (
        <>
            <div className=' flex items-center mb-2  space-x-3'>
                <img alt='avatar' src={user.smallAvatar} className=' w-12 h-12 rounded-full object-cover' />
                <div className=' w-full p-3 h-12 rounded-3xl bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center text-gray-600 text-lg max-md:text-base max-md:rounded-2xl' onClick={(e) => setOpen(true)}>{user.nickname}, bạn đang nghĩ gì thế?</div>
            </div>
            <div className='flex items-center justify-between'>
                {open && (
                    <div className='flex items-center justify-center fixed top-0 left-0 z-50 w-screen h-screen' style={{ backgroundColor: "rgb(0,0,0,0.3)" }}>
                        <div className='bg-white rounded-lg flex items-center overflow-hidden z-40 scroll-smooth' id='slide1'>
                            <div className=' flex items-center z-30 duration-1000 scroll-smooth' style={{ width: "1500px", backgroundColor: "rgb(0,0,0,0)", maxHeight: "100%" }}>
                                <div className={`flex flex-col p-1 h-auto justify-center items-center relative bg-white divide-y divide-gray-300 rounded-lg z-20`} id="window-1">
                                    <div className=' flex justify-center items-center text-xl font-bold w-full relative'>
                                        <h1 className=' py-3 max-md:text-lg'>Tạo bài viết</h1>
                                        <div
                                            className=' cursor-pointer absolute right-1 top-1 w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center'
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className=' p-3 w-full space-y-3 overflow-y-auto'>
                                        <div className='flex items-center space-x-2'>
                                            <img alt='avatar1' src={user.smallAvatar} className=' w-12 h-12 rounded-full object-cover' />
                                            <div className='flex flex-col items-start'>
                                                <h1 className=' font-semibold'>{user.nickname}</h1>
                                                <div
                                                    className='flex items-center space-x-1 p-1 px-1.5 bg-gray-200 rounded-lg cursor-pointer' title={`${isPublic ? "Công khai" : "Chỉ mình tôi"}`}
                                                    onClick={() => {
                                                        document.getElementById('slide1').scrollLeft += 500;
                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 640 512">
                                                        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                                                    </svg>
                                                    <h1 className='font-medium text-sm'>{isPublic ? "Công khai" : "Chỉ mình tôi"}</h1>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512">
                                                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='space-y-2 border-none outline-none'>
                                            <textarea
                                                onChange={(e) => {
                                                    setPostText(e.target.value);
                                                }}
                                                value={postText}
                                                className={` w-full ring-0 rounded-lg resize-none overflow-hidden border-none outline-none ${!fileUploads ? 'text-2xl' : 'text-xl'}`} style={{ height: `${!fileUploads ? '150px' : '60px'}` }} placeholder={`${user.nickname} ơi, bạn đang nghĩ gì thế?`}
                                            ></textarea>
                                            <div className=' flex items-center justify-end w-full z-50 border-none outline-none'>
                                                <div
                                                    className=' cursor-pointer'
                                                    onClick={() => setShowPicker(!showPicker)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512" fill='green'>
                                                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                                                    </svg>
                                                </div>
                                                {showPicker && (
                                                    <div className=' absolute bottom-40 right-0 z-50'>
                                                        <Picker width={300} height={280} onEmojiClick={onEmojiClick} />
                                                    </div>
                                                )}
                                            </div>
                                            {(fileUploads) && (
                                                <div
                                                    className=' cursor-pointer border border-gray-300 rounded-lg relative'
                                                    onMouseEnter={(e) => {
                                                        if (document.getElementById("list-image"))
                                                            document.getElementById("list-image").style.display = "block";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (document.getElementById("list-image"))
                                                            document.getElementById("list-image").style.display = "none";
                                                    }}
                                                >
                                                    <button
                                                        className=' absolute z-40 top-3 right-3 p-2 rounded-full bg-white hover:bg-gray-200'
                                                        onClick={() => {
                                                            setFileUploads(null)
                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512">
                                                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                                        </svg>
                                                    </button>
                                                    {(fileUploads && ((fileUploads.length > 0))) && (
                                                        <>
                                                            <div className=' absolute z-30 w-full h-full space-x-2 p-2' id='list-image' style={{ backgroundColor: "rgb(0,0,0,0.1)" }}>
                                                                <button className=' rounded-lg bg-white p-2 font-semibold text-sm'>
                                                                    <h1>Chỉnh sửa tất cả</h1>
                                                                </button>
                                                                <button className=' rounded-lg bg-white p-2 font-semibold text-sm' {...getRootProps()}>
                                                                    <h1>Thêm ảnh/videos</h1>
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                    <div {...getRootProps()} className='z-0'>
                                                        <input {...getInputProps()} className='z-0' />
                                                        {(fileUploads && fileUploads.length > 0) ? (
                                                            <div className={`w-full grid auto-cols-max ${fileUploads.length === 1 ? 'grid-cols-1' : ''} ${fileUploads.length >= 2 && 'grid-cols-2'} gap-2 overflow-y-auto`}>
                                                                {fileUploads.map((file, index) => (
                                                                    <>
                                                                        {file.type.includes('image') && (
                                                                            <div key={index} className={`w-full h-full ${(((fileUploads.length) % 2 === 1) && (index === fileUploads.length - 1)) ? ' col-span-full' : ''}`}><img src={file.preview} alt={`anh-${index}`} className=' object-cover z-0' /></div>
                                                                        )}
                                                                        {file.type.includes('mp4') && (
                                                                            <div className={`w-full h-full ${(((fileUploads.length) % 2 === 1) && (index === fileUploads.length - 1)) ? ' col-span-full' : ''}`}>
                                                                                <ReactPlayer
                                                                                    key={index}
                                                                                    className="react-player cursor-pointer"
                                                                                    playing={false}
                                                                                    controls={false}
                                                                                    url={file.preview}
                                                                                    width="100%"
                                                                                    height="100%"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className='w-full rounded-lg p-2 z-0 h-60'>
                                                                <div className='rounded-lg p-2 flex justify-center items-center relative bg-gray-100 hover:bg-gray-200 h-full'>
                                                                    <div className='flex flex-col items-center'>
                                                                        <div className='p-3 rounded-full bg-gray-300'>
                                                                            <img alt='add-btn' src={addSvg} className='w-9 h-9' />
                                                                        </div>
                                                                        <h1 className='text-lg font-semibold'>Thêm ảnh/videos</h1>
                                                                        <h1>hoặc kéo và thả</h1>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className='w-full space-y-3'>
                                            <div className='flex items-center justify-between border border-gray-300 rounded-lg p-3 shadow-md'>
                                                <h1 className='font-semibold'>Thêm vào bài viết của bạn</h1>
                                                <div className='flex items-center space-x-4'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512" className=' fill-green-500 cursor-pointer' onClick={() => {
                                                        setFileUploads([]);
                                                    }}>
                                                        <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512" className=' fill-yellow-400 cursor-pointer'>
                                                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm130.7 57.9c-4.2-13.6 7.1-25.9 21.3-25.9H364.5c14.2 0 25.5 12.4 21.3 25.9C369 368.4 318.2 408 258.2 408s-110.8-39.6-127.5-94.1zm86.9-85.1l0 0 0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0zm160 0l0 0-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2 0 0 0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8l0 0 0 0 0 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <button
                                                onClick={newPost}
                                                className={` w-full p-3 text-lg font-bold rounded-lg ${(fileUploads && fileUploads.length > 0) || postText.length > 0 ? 'bg-blue-500 text-white' : ' bg-gray-300 text-gray-400'}`}
                                            >Đăng</button>
                                        </div>
                                    </div>
                                    {processing && (
                                        <div
                                            className=' w-full h-full absolute flex flex-col justify-center items-center'
                                            style={{ backgroundColor: "rgb(220,220,220, 0.6)" }}
                                        >
                                            <span className="loader"></span>
                                            <h1 className='text-xl text-black'>Đang đăng</h1>
                                        </div>
                                    )}
                                </div>
                                <div className={`flex flex-col h-auto justify-center items-center bg-white divide-y divide-gray-300 rounded-lg z-0`} id='window-2'>
                                    <div className=' flex justify-center items-center text-xl font-bold w-full relative'>
                                        <div
                                            className=' cursor-pointer absolute left-5 w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center'
                                            onClick={() => {
                                                setPublic(true);
                                                document.getElementById('slide1').scrollLeft -= 500;
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                                                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                                            </svg>
                                        </div>
                                        <h1 className=' py-3'>Đối tượng của bài viết</h1>
                                    </div>
                                    <div className=' p-3 w-full space-y-1'>
                                        <h1 className='font-semibold text-lg'>Ai có thể xem bài viết của bạn?</h1>
                                        <h1 className=' text-gray-500 font-medium' style={{ fontSize: "14px" }}>Bài viết của bạn sẽ hiển thị ở Bảng feed, trang cá nhân và kết quả tìm kiếm.</h1>
                                        <h1 className=' text-gray-500 font-medium' style={{ fontSize: "14px" }}>Tuy đối tượng mặc định là Bạn bè, nhưng bạn có thể thay đổi đối tượng của riêng bài viết này.</h1>
                                        <div className="flex items-center justify-between w-full rounded-lg hover:bg-gray-100 p-2 cursor-pointer" onClick={() => setPublic(true)}>
                                            <div className='flex items-center'>
                                                <div className='rounded-full p-3 bg-gray-200'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 512 512">
                                                        <path d="M51.7 295.1l31.7 6.3c7.9 1.6 16-.9 21.7-6.6l15.4-15.4c11.6-11.6 31.1-8.4 38.4 6.2l9.3 18.5c4.8 9.6 14.6 15.7 25.4 15.7c15.2 0 26.1-14.6 21.7-29.2l-6-19.9c-4.6-15.4 6.9-30.9 23-30.9h2.3c13.4 0 25.9-6.7 33.3-17.8l10.7-16.1c5.6-8.5 5.3-19.6-.8-27.7l-16.1-21.5c-10.3-13.7-3.3-33.5 13.4-37.7l17-4.3c7.5-1.9 13.6-7.2 16.5-14.4l16.4-40.9C303.4 52.1 280.2 48 256 48C141.1 48 48 141.1 48 256c0 13.4 1.3 26.5 3.7 39.1zm407.7 4.6c-3-.3-6-.1-9 .8l-15.8 4.4c-6.7 1.9-13.8-.9-17.5-6.7l-2-3.1c-6-9.4-16.4-15.1-27.6-15.1s-21.6 5.7-27.6 15.1l-6.1 9.5c-1.4 2.2-3.4 4.1-5.7 5.3L312 330.1c-18.1 10.1-25.5 32.4-17 51.3l5.5 12.4c8.6 19.2 30.7 28.5 50.5 21.1l2.6-1c10-3.7 21.3-2.2 29.9 4.1l1.5 1.1c37.2-29.5 64.1-71.4 74.4-119.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm144.5 92.1c-2.1 8.6 3.1 17.3 11.6 19.4l32 8c8.6 2.1 17.3-3.1 19.4-11.6s-3.1-17.3-11.6-19.4l-32-8c-8.6-2.1-17.3 3.1-19.4 11.6zm92-20c-2.1 8.6 3.1 17.3 11.6 19.4s17.3-3.1 19.4-11.6l8-32c2.1-8.6-3.1-17.3-11.6-19.4s-17.3 3.1-19.4 11.6l-8 32zM343.2 113.7c-7.9-4-17.5-.7-21.5 7.2l-16 32c-4 7.9-.7 17.5 7.2 21.5s17.5 .7 21.5-7.2l16-32c4-7.9 .7-17.5-7.2-21.5z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h1 className='font-semibold text-lg'>Công khai</h1>
                                                    <h1 className=' text-gray-500 font-medium' style={{ fontSize: "15px" }}>Bất kỳ ai ở trong thế giới của chúng ta</h1>
                                                </div>
                                            </div>
                                            <input type='checkbox' className=' rounded-full p-2.5' checked={isPublic} onChange={() => { }} />
                                        </div>
                                        <div className="flex items-center justify-between w-full rounded-lg hover:bg-gray-100 p-2 cursor-pointer" onClick={() => setPublic(false)}>
                                            <div className='flex items-center'>
                                                <div className='rounded-full p-3 bg-gray-200'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 448 512">
                                                        <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h1 className='font-semibold text-lg'>Chỉ mình tôi</h1>
                                                </div>
                                            </div>
                                            <input type='checkbox' className=' rounded-full p-2.5' checked={!isPublic} onChange={() => { }} />
                                        </div>
                                        <div className="flex items-center justify-between"></div>
                                    </div>
                                    <div className='flex items-center justify-end w-full p-3 space-x-3'>
                                        <button className='p-2 rounded-lg hover:bg-gray-200 font-semibold text-blue-700'>Hủy</button>
                                        <button
                                            className='p-2 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold'
                                            onClick={() => {
                                                setPublic(isPublic)
                                                document.getElementById('slide1').scrollLeft -= 500;
                                            }}
                                        >
                                            Xong
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className=' flex items-center justify-center w-full text-center font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 h-10 py-7 rounded-lg mt-2'>
                    <img alt='video' src={video} className=' w-8 h-8 max-sm:w-5 max-sm:h-5' />
                    <h1 className='px-2 max-sm:hidden' style={{ fontSize: "15px" }}>Video trực tiếp</h1>
                </div>
                <div className=' flex items-center justify-center w-full text-center font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 h-10 py-7 rounded-lg mt-2'>
                    <svg className=' w-8 h-8 max-sm:w-5 max-sm:h-5' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M910.4 843.8H174.6c-27.4 0-49.7-22.3-49.7-49.7V298.2c0-27.4 22.3-49.7 49.7-49.7h735.8c27.4 0 49.7 22.3 49.7 49.7v495.9c0 27.4-22.3 49.7-49.7 49.7z" fill="#A7B8C6" />
                        <path d="M272.1 193.8H118.7c-22.8 0-41.2 18.5-41.2 41.2v512.7c0 22.8 18.5 41.2 41.2 41.2h752.7c22.8 0 41.2-18.5 41.2-41.2V235c0-22.8-18.5-41.2-41.2-41.2H272.1z" fill="#FFFFFF" />
                        <path d="M871.4 802.5H118.7c-30.2 0-54.8-24.6-54.8-54.8V235c0-30.2 24.6-54.8 54.8-54.8h752.7c30.2 0 54.8 24.6 54.8 54.8v512.7c0 30.3-24.6 54.8-54.8 54.8zM118.7 207.3c-15.3 0-27.7 12.4-27.7 27.7v512.7c0 15.3 12.4 27.7 27.7 27.7h752.7c15.3 0 27.7-12.4 27.7-27.7V235c0-15.3-12.4-27.7-27.7-27.7H118.7z" fill="#3E3A39" />
                        <path d="M302.8 246.7H170.5c-19.6 0-35.6 13.6-35.6 30.3v376.5c0 16.7 15.9 30.3 35.6 30.3h649.1c19.6 0 35.6-13.6 35.6-30.3V277c0-16.7-15.9-30.3-35.6-30.3H302.8z" fill="#95D4EB" />
                        <path d="M430.8 683.8L230.3 483.3 135 578.6v105.2z" fill="#75BFAB" /><path d="M374.4 394.3m-98.8 0a98.8 98.8 0 1 0 197.6 0 98.8 98.8 0 1 0-197.6 0Z" fill="#F9F5B1" />
                        <path d="M855.1 630L551.5 326.4 194.3 683.7h660.8z" fill="#57B79C" /><path d="M855.1 521.8l-83-83-245 245h328z" fill="#75BFAB" />
                        <path d="M709.9 743.8h-33.1c-0.8 0-1.5-0.7-1.5-1.5v-33.1c0-0.8 0.7-1.5 1.5-1.5h33.1c0.8 0 1.5 0.7 1.5 1.5v33.1c0 0.9-0.7 1.5-1.5 1.5zM774.2 743.8h-33.1c-0.8 0-1.5-0.7-1.5-1.5v-33.1c0-0.8 0.7-1.5 1.5-1.5h33.1c0.8 0 1.5 0.7 1.5 1.5v33.1c0 0.9-0.6 1.5-1.5 1.5zM838.6 743.8h-33.1c-0.8 0-1.5-0.7-1.5-1.5v-33.1c0-0.8 0.7-1.5 1.5-1.5h33.1c0.8 0 1.5 0.7 1.5 1.5v33.1c0 0.9-0.7 1.5-1.5 1.5z" fill="#3E3A39" />
                    </svg>
                    <h1 className='px-2 max-sm:hidden' style={{ fontSize: "15px" }}>Ảnh/Video</h1>
                </div>
                <div className=' flex items-center justify-center w-full text-center font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 h-10 py-7 rounded-lg mt-2'>
                    <svg className=' w-8 h-8 max-sm:w-5 max-sm:h-5' xmlns="http://www.w3.org/2000/svg" fill='#EAB026' viewBox="0 0 512 512">
                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                    </svg>
                    <h1 className='px-2 max-sm:hidden' style={{ fontSize: "15px" }}>Cảm xúc/hoạt động</h1>
                </div>
            </div>
        </>
    )
}
