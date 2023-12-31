import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostApi } from "../../../Network/Post";
import LikeBox from "../CheckLikes/LikeBox";
import CommentBox from "../CommentBox/CommentBox";
import ReactPlayer from "react-player";
import { FastAverageColor } from 'fast-average-color';


export default function SinglePost({ post, setPost, user, authId }) {

    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const [videos, setVideos] = useState(post.Videos);
    const [images, setImages] = useState(post.Images);
    const [likeNum, setLikeNum] = useState(post.likeNumber);
    const [isSaved, setIsSaved] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [openLike, setOpenLike] = useState(false);
    const [openComment, setOpenComment] = useState(false);

    const getBackgroundColor = async (link) => {
        fac.getColorAsync(link)
            .then(color => {
                return color.rgb;
            })
            .catch(e => {
                console.log(e);
            });
    }

    const likeAPost = () => {
        PostApi.like({
            PostId: post.id,
            UserId: authId,
        }).then((response) => {
            setIsClicked(response.data);
            if (isClicked === false) {
                setLikeNum((likeNum) => (likeNum = likeNum + 1));
            } else {
                setLikeNum((likeNum) => (likeNum = likeNum - 1));
            }
            PostApi.updateLikeNum(post.id);
        });
    };

    const save = () => {
        setIsSaved(!isSaved);
    };

    if (openComment || openLike) {
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector('body').style.paddingRight = "12px"
    } else {
        document.querySelector('body').style.overflow = 'auto';
        document.querySelector('body').style.paddingRight = "0px"
    }

    useEffect(() => {
        PostApi.getOwnerLike(post.id, authId).then((res) => {
            setIsClicked(res.data);
        });
    }, [post, user, authId]);

    return (
        <div className=" rounded-lg shadow-md bg-white my-5">
            <div className=" p-4 space-y-3 ">
                <div className=" flex justify-between">
                    <div className=" flex space-x-2">
                        <img
                            onClick={() => navigate(`/${post.User.username}`)}
                            alt="avatar"
                            src={`${post.User.avatar}`}
                            className=" w-10 h-10 object-cover rounded-full cursor-pointer"
                        />
                        <div className="">
                            <h1
                                onClick={() => navigate(`/${post.User.username}`)}
                                className=" font-semibold hover:underline cursor-pointer"
                            >
                                {post.User.nickname}
                            </h1>
                            <h1
                                className=" text-sm text-gray-500 cursor-pointer"
                                title={`Ngày ${post.createdAt.slice(
                                    8,
                                    10
                                )} tháng ${post.createdAt.slice(
                                    5,
                                    7
                                )} năm ${post.createdAt.slice(
                                    0,
                                    4
                                )}, lúc ${post.createdAt.slice(11, 16)}`}
                            >
                                {post.createdAt.slice(0, 10)}
                            </h1>
                        </div>
                    </div>
                    <div className=" flex items-center">
                        <div className=" flex justify-center items-center cursor-pointer w-9 h-9 active:bg-gray-300 hover:bg-gray-200 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 448 512"
                                className=" fill-gray-700"
                            >
                                <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                            </svg>
                        </div>
                        <div className=" flex justify-center items-center cursor-pointer w-9 h-9 active:bg-gray-300 hover:bg-gray-200 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 384 512"
                                className=" fill-gray-700"
                            >
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <h1 className=" text-base font-normal">{post.postText}</h1>
            </div>
            <div className=" flex justify-center items-center max-h-md bg-black">
                {images.length + videos.length == 0 && (
                    <>

                    </>
                )}

                {images.length + videos.length == 1 && (
                    <>
                        {images.length == 1 ? (
                            <>
                                <img
                                    alt="image"
                                    src={`${images[0].link}`}
                                    className=" object-contain max-h-sm cursor-pointer"
                                />
                            </>
                        ) : (
                            <>
                                <ReactPlayer
                                    className="react-player cursor-pointer"
                                    playing={false}
                                    url={videos[0].link}
                                    width="100%"
                                    controls={true}
                                    style={{ minHeight: '480px' }}
                                />
                            </>
                        )}
                    </>
                )}

                {images.length + videos.length == 2 && (
                    <>
                        {images.length == 2 && (
                            <div className=" flex items-center w-full bg-gray-100 max-h-sm relative">
                                <div className="w-1/2 h-full">
                                    <img
                                        alt="image"
                                        src={`${images[0].link}`}
                                        className=" object-cover h-full w-full cursor-pointer p-0.5"
                                        style={{ minHeight: '480px' }}
                                    />
                                </div>
                                <div className="w-1/2 h-full">
                                    <img
                                        alt="image"
                                        src={`${images[1].link}`}
                                        className="object-cover h-full w-full cursor-pointer p-0.5"
                                        style={{ minHeight: '480px' }}
                                    />
                                </div>
                            </div>
                        )}

                        {videos.length == 2 && (
                            <div className=" flex items-center w-full bg-gray-100 max-h-sm relative">
                                <ReactPlayer
                                    className="react-player cursor-pointer"
                                    url={videos[0].link}
                                    playing={false}
                                    controls={true}
                                    width="100%"
                                    style={{ minHeight: '480px' }}
                                />
                                <ReactPlayer
                                    className="react-player cursor-pointer"
                                    url={videos[1].link}
                                    playing={false}
                                    controls={true}
                                    width="100%"
                                    style={{ minHeight: '480px' }}
                                />
                            </div>
                        )}

                        {videos.length == 1 && (
                            <div className=" flex items-center w-full bg-gray-100 max-h-sm relative" style={{ height: '480px' }}>
                                <div className="w-1/2 h-full max-h-sm flex justify-center items-center" style={{ minHeight: '480px' }}>
                                    <img
                                        alt="image"
                                        src={`${images[0].link}`}
                                        className=" object-cover h-full w-full cursor-pointer p-0.5"
                                        style={{ minHeight: '480px' }}
                                    />
                                </div>
                                <div className="w-1/2 h-full max-h-sm flex justify-center items-center" style={{ height: '480px' }}>
                                    <ReactPlayer
                                        className="react-player cursor-pointer"
                                        playing={false}
                                        controls={true}
                                        url={videos[0].link}
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                            </div>
                        )}
                    </>
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
                            {post.likeNumber} {post.likeNumber < 2 ? "comment" : "comments"}
                        </h1>
                    </div>
                </div>
            </div>
            {openLike && (
                <LikeBox PostId={post.id} setOpenLike={setOpenLike} user={user} />
            )}
            {openComment && (
                <CommentBox
                    setPost={setPost}
                    post={post}
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
