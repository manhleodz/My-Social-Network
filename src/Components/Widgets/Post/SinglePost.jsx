import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostApi } from "../../../Network/Post";
import LikeBox from "../CheckLikes/LikeBox";
import CommentBox from "../CommentBox/CommentBox";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from '../../../Redux/PostSlice';

export default function SinglePost({ post }) {

    const navigate = useNavigate();
    const user = useSelector(state => state.authentication.user);
    const [isClicked, setIsClicked] = useState(post.Likes.length === 1);
    const [likeNum, setLikeNum] = useState(post.likeNumber);
    const [commentNumber, setCommentNumber] = useState(post.commentNumber);
    const [isSaved, setIsSaved] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [openLike, setOpenLike] = useState(false);
    const [openComment, setOpenComment] = useState(false);

    const posts = useSelector(state => state.posts.posts);
    const dispatch = useDispatch();
    const media = post.Media;
    let createdAt = new Date(post.createdAt);
    const now = new Date();

    if (now - createdAt < 3600000) {
        if (Math.round((now - createdAt) / 60000) === 0) {
            createdAt = "Vừa xong";
        } else
            createdAt = Math.round((now - createdAt) / 60000) + " phút";
    } else if (now - createdAt < 86400000) {
        createdAt = Math.round((now - createdAt) / 3600000) + " giờ";
    } else if (now - createdAt < 604800000) {
        createdAt = Math.round((now - createdAt) / 86400000) + " ngày";
    } else {
        createdAt = createdAt.getDate() + " tháng " + createdAt.getMonth() + " lúc " + createdAt.getHours() + ":" + createdAt.getMinutes();
    }

    const likeAPost = () => {
        setIsClicked(!isClicked);
        if (isClicked)
            setLikeNum((likeNum) => (likeNum = likeNum - 1));
        else
            setLikeNum((likeNum) => (likeNum = likeNum + 1));

        PostApi.like({
            PostId: post.id,
            UserId: user.id,
        })
            .then((response) => {
                // PostApi.updateLikeNum(post.id).catch(() => {
                // });
            }).catch(() => {
                setIsClicked(!isClicked);
                setLikeNum((likeNum) => (likeNum = likeNum - 1));
            });
    };

    const deletePost = async (id) => {
        await PostApi.delete(id).then((res) => {
            const newLists = posts.filter(post => post.id !== id);
            dispatch(setPosts(newLists));
        }).catch((err) => {
            console.log(err);
        });
    }

    const hidePost = (id) => {
        const newLists = posts.filter(post => post.id !== id);
        dispatch(setPosts(newLists));
    }

    const save = () => {
        setIsSaved(!isSaved);
    };

    if (openComment || openLike) {
        document.querySelector('body').style.overflow = 'hidden';
        if (document.querySelector('body').clientWidth > 500)
            document.querySelector('body').style.paddingRight = "9px"
    } else {
        document.querySelector('body').style.overflow = 'auto';
        document.querySelector('body').style.paddingRight = "0px"
    }

    function myFunction() {
        var more = document.getElementById(`more-btn-${post.id}`);
        var less = document.getElementById(`less-btn-${post.id}`);
        var moreText = document.getElementById(`more-${post.id}`);

        if (more.style.display === "none") {
            more.style.display = "inline";
            less.style.display = "none";
            moreText.style.display = "none";
        } else {
            less.style.display = "block";
            more.style.display = "none";
            moreText.style.display = "block";
        }
    }

    return (
        <div className=" rounded-lg shadow-md bg-white">
            <div className=" p-4 space-y-3 ">
                <div className=" flex justify-between">
                    <div className=" flex space-x-2">
                        <img
                            onClick={() => navigate(`/${post.User.username}`)}
                            alt="avatar"
                            src={`${post.User.smallAvatar}`}
                            className=" w-10 h-10 object-cover rounded-full cursor-pointer"
                        />
                        <div className="">
                            <h1
                                onClick={() => navigate(`/${post.User.username}`)}
                                className=" break-words font-semibold hover:underline cursor-pointer"
                            >
                                {post.User.nickname}
                            </h1>
                            <div className="flex items-center space-x-2">
                                <h1
                                    className=" text-xs text-gray-500 cursor-pointer font-semibold "
                                    title={`${createdAt}`}
                                >
                                    {createdAt}
                                </h1>
                                {post.public == 0 ?
                                    <svg className=" cursor-pointer" title="Công khai" xmlns="http://www.w3.org/2000/svg" fill='#A8A59C' height="14" width="14" viewBox="0 0 448 512">
                                        <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                                    </svg>
                                    :
                                    <svg className=" cursor-pointer" title="Công khai" xmlns="http://www.w3.org/2000/svg" fill='#A8A59C' height="14" width="14" viewBox="0 0 512 512">
                                        <path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5v39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9v39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7v-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1H257c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                                    </svg>
                                }
                            </div>
                        </div>
                    </div>
                    <div className=" flex items-center relative">
                        {user.username === post.User.username && (
                            <>
                                {dropdown && (
                                    <div className=" bg-white p-2 rounded-lg shadow-lg">
                                        <div className=" w-full" onClick={() => deletePost(post.id)}>
                                            Chuyển vào thùng rác
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                        <div
                            onClick={() => setDropdown(!dropdown)}
                            className=" flex justify-center items-center cursor-pointer w-9 h-9 active:bg-gray-300 hover:bg-gray-200 rounded-full"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 448 512"
                                className=" fill-gray-700"
                            >
                                <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                            </svg>
                        </div>
                        {user.username !== post.User.username && (
                            <div onClick={() => hidePost(post.id)} className=" flex justify-center items-center cursor-pointer w-9 h-9 active:bg-gray-300 hover:bg-gray-200 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 384 512"
                                    className=" fill-gray-700"
                                >
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
                <pre className=" text-base font-normal break-words whitespace-pre-wrap font-noto">
                    {post.postText && (post.postText.replace(/@@newline@@/g, '\n').slice(0, 200))}
                    {post.postText.length > 200 && (
                        <>
                            <span id={`more-btn-${post.id}`} className=" font-semibold text-sm cursor-pointer hover:underline-offset-1" onClick={myFunction}>...Xem thêm</span>
                            <pre id={`more-${post.id}`} className="hidden text-base font-normal break-words whitespace-pre-wrap font-noto">{post.postText && (post.postText.replace(/@@newline@@/g, '\n').slice(200))}</pre>
                            <span id={`less-btn-${post.id}`} className="hidden font-semibold text-sm cursor-pointer hover:underline-offset-1" onClick={myFunction}>...Bớt đi</span>
                        </>
                    )}
                </pre>
            </div>
            <div className=" flex justify-center items-center max-h-md bg-black">
                {media.length == 0 && (
                    <>

                    </>
                )}

                {media.length == 1 && (
                    <div className=" flex items-center justify-center w-full h-full" style={{ backgroundColor: `${media[0].backgroundColor} || gray` }}>
                        {media[0].type === 1 ? (
                            <>
                                <img
                                    alt="image"
                                    src={`${media[0].link}`}
                                    className=" object-contain max-h-sm cursor-pointer"
                                />
                            </>
                        ) : (
                            <>
                                <ReactPlayer
                                    className="react-player cursor-pointer"
                                    playing={false}
                                    url={media[0].link}
                                    width="100%"
                                    controls={true}
                                    style={{ minHeight: '480px' }}
                                />
                            </>
                        )}
                    </div>
                )}

                {media.length == 2 && (
                    <div className=" flex items-center w-full bg-gray-100 max-h-sm relative" key={post.id}>
                        {media.map((value, index) => (
                            <>
                                {value.type === 1 ? (
                                    <div className="w-1/2 h-full" key={value.id}>
                                        <img
                                            alt="image"
                                            src={`${value.link}`}
                                            className="object-cover h-full w-full cursor-pointer p-0.5"
                                            style={{ minHeight: '480px' }}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <ReactPlayer
                                            className="react-player cursor-pointer"
                                            url={value.link}
                                            playing={false}
                                            controls={true}
                                            width="100%"
                                            style={{ minHeight: '480px' }}
                                            key={value.id}
                                        />
                                    </>
                                )}
                            </>
                        ))}
                    </div>
                )}
            </div>
            <div className=" flex justify-between p-3">
                <div>
                    <div className=" flex justify-center space-x-5">
                        {isClicked === true ? (
                            <svg
                                onClick={() => likeAPost()}
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.7em"
                                viewBox="0 0 512 512"
                                className="fill-red-600 cursor-pointer"
                            >
                                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                            </svg>
                        ) : (
                            <svg
                                onClick={() => likeAPost()}
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.7em"
                                viewBox="0 0 512 512"
                                className=" hover:scale-90 cursor-pointer active:scale-110 active:fill-red-700 "
                            >
                                <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                            </svg>
                        )}
                        <svg
                            onClick={() => setOpenComment(true)}
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.7em"
                            viewBox="0 0 512 512"
                            className=" hover:fill-gray-500  hover:scale-90 cursor-pointer"
                        >
                            <path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.5em"
                            viewBox="0 0 512 512"
                            className=" hover:fill-gray-500  hover:scale-90 cursor-pointer"
                        >
                            <path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z" />
                        </svg>
                    </div>
                    <h1
                        onClick={() => {
                            setOpenLike(true);
                        }}
                        className=" text-sm font-bold cursor-pointer active:text-gray-500"
                    >
                        {likeNum} {likeNum < 2 ? "like" : "likes"}
                    </h1>
                </div>
                <div className=" flex flex-col items-end space-y-2">
                    {isSaved ? (
                        <svg
                            onClick={save}
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.5em"
                            viewBox="0 0 384 512"
                            className=" fill-yellow-400 cursor-pointer"
                        >
                            <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                        </svg>
                    ) : (
                        <svg
                            onClick={save}
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.5em"
                            viewBox="0 0 384 512"
                            className="hover:fill-gray-500 cursor-pointer"
                        >
                            <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                        </svg>
                    )}
                    <div className="flex items-center space-x-3">
                        <h1 className=" cursor-pointer hover:underline">
                            {commentNumber} {post.commentNumber < 2 ? "comment" : "comments"}
                        </h1>
                    </div>
                </div>
            </div>
            {openLike && (
                <LikeBox PostId={post.id} setOpenLike={setOpenLike} user={user} />
            )}
            {openComment && (
                <CommentBox
                    post={post}
                    commentNumber={commentNumber}
                    setCommentNumber={setCommentNumber}
                    setOpenComment={setOpenComment}
                    likeAPost={likeAPost}
                    likeNum={likeNum}
                    isClicked={isClicked}
                    save={save}
                    isSaved={isSaved}
                    setIsSaved={setIsSaved}
                />
            )}
        </div>
    );
}
