import React, { useEffect, useRef, useState, useTransition } from 'react';
import { StoryApi } from '../../Network/Story';
import Styles from '../../Assets/SCSS/StoryPage.module.scss';
import angryGif from '../../Assets/React Icons/angry.gif';
import angrySvg from '../../Assets/React Icons/angry.svg';
import careGif from '../../Assets/React Icons/care.gif';
import careSvg from '../../Assets/React Icons/care.svg';
import hahaGif from '../../Assets/React Icons/haha.gif';
import hahaSvg from '../../Assets/React Icons/haha.svg';
import likeGif from '../../Assets/React Icons/like.gif';
import likeSvg from '../../Assets/React Icons/like.svg';
import loveGif from '../../Assets/React Icons/love.gif';
import loveSvg from '../../Assets/React Icons/love.svg';
import sadGif from '../../Assets/React Icons/sad.gif';
import sadSvg from '../../Assets/React Icons/sad.svg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStory } from '../../Redux/StorySlice';
import ReactPlayer from 'react-player';

export default function Story() {

    const user = useSelector(state => state.authentication.user);
    const id = useParams().id || 1;
    const [isPending, startTransition] = useTransition();
    const [seen, setSeen] = useState(id);
    const stories = useSelector(state => state.stories.stories);
    const [playing, setPlaying] = useState();
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [hoverIcon, setHoverIcon] = useState();
    const [now, setNow] = useState(0);
    const [icons, setIcon] = useState([
        { svg: likeSvg, gif: likeGif },
        { svg: loveSvg, gif: loveGif },
        { svg: careSvg, gif: careGif },
        { svg: hahaSvg, gif: hahaGif },
        { svg: sadSvg, gif: sadGif },
        { svg: angrySvg, gif: angryGif },
    ])
    const [index, setIndex] = useState();
    const [answer, setAnswer] = useState(null);
    const length = useRef();

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (stories.length !== 0) {
            for (let i = 0; i < stories.length; i++) {
                if (stories[i].seen.includes(user.id)) {
                    setSeen(seen => seen = seen + "," + stories[i].id);
                }
            }
            let playing = stories.filter((story, idx) => {
                if (story.id == id) {
                    setIndex(idx);
                    return story;
                }
            })
            setPlaying(playing[0]);
        } else {
            getStory();
        }
    }, []);

    const getStory = async () => {
        startTransition(() => {
            if (user) {
                StoryApi.getAll().then(res => {
                    dispatch(fetchStory(res.data))

                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].seen.includes(user.id)) {
                            setSeen(seen => seen = seen + "," + res.data[i].id);
                        }
                    }
                    let playing = res.data.filter((story, idx) => {
                        if (story.id == id) {
                            setIndex(idx);
                            return story;
                        }
                    })
                    setPlaying(playing[0]);
                }).catch((err) => {
                    alert(err);
                });
            }
        })
    }

    if (!user || !stories || isPending || !playing) return null;

    if (!playing.link.includes("mp4")) {
        length.current = 15;
        if (Math.round(now) < 15 && isPlaying) {
            setTimeout(() => setNow(now => now = (now) + 1), 1000)
        }
    }

    if (Math.round(now / length.current) === 1 && index < stories.length - 1) {
        setNow(0)
        setPlaying(stories[index + 1]);
        setIndex(index + 1);
    }

    return (
        <>
            <div
                className='z-20 w-screen h-full top-0 left-0 flex justify-end items-center max-lg:justify-center overflow-hidden'
                style={{ backgroundColor: 'rgb(0,0,0,1)' }}
                onClick={(e) => {
                    if (e.target.id !== "input") {
                        setAnswer(null);
                    }
                }}
            >
                <div className=' text-white space-y-3 relative h-full max-lg:hidden px-3 overflow-x-auto' style={{ backgroundColor: "#242526", width: "350px" }}>
                    <h1 className=' text-3xl font-semibold mt-20'>Tin</h1>
                    <div className=' flex items-center text-blue-500 space-x-3'>
                        <h1 className=' cursor-pointer'>Kho lưu trữ</h1>
                        <h1 className=' cursor-pointer'>Cài đặt</h1>
                    </div>
                    <h1>Tin của bạn</h1>
                    <button
                        onClick={() => {
                            navigate('/', { state: location.state })
                        }}
                    >
                        Go back to Home
                    </button>
                    <div className=' flex items-center text-sm space-x-1'>
                        <div className=' w-16 h-16 flex justify-center items-center cursor-pointer bg-slate-700 rounded-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 448 512" fill='blue'>
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className=' font-bold text-base'>Tạo tin</h1>
                            <h1 className='text-slate-400 text-xs'>Bạn có thể chia sẻ ảnh hoặc viết gì đó</h1>
                        </div>
                    </div>
                    <h1 className=' font-semibold'>Tất cả các tin</h1>
                    {stories.map((reel, idx) => (
                        <div
                            key={idx} className={` flex items-center cursor-pointer ${reel.id === (Number)(stories[index].id) ? 'bg-gray-600' : '  hover:bg-gray-700'} rounded-lg p-2 space-x-3`}
                            onClick={() => {
                                setPlaying(reel)
                                setIndex(idx);
                                setSeen(seen => seen = seen + "," + reel.id);
                                setAnswer(null);
                                setNow(0);
                            }}
                        >
                            <div className={`rounded-full ${seen.includes(reel.id) ? '' : 'border-blue-500 border-4 '}  p-0.5`} style={{ width: "60px", height: "60px" }}>
                                <img
                                    alt='avatar' src={reel.User.avatar}
                                    className=' w-full h-full rounded-full object-cover'
                                />
                            </div>
                            <div>
                                <h1 className=' font-semibold'>{reel.User.nickname}</h1>
                                <h1 className=' text-sm text-blue-500'>Một thẻ mới</h1>
                            </div>
                        </div>
                    ))}
                </div>
                <div className=' flex justify-center items-center w-5/6 h-full max-lg:w-full relative'>
                    {index !== 0 ? (
                        <div onClick={() => {
                            setPlaying(stories[index - 1]);
                            setIndex(index - 1);
                            setNow(0);
                        }} className=' w-16 h-16 cursor-pointer rounded-full flex justify-center items-center bg-gray-700 max-sm:hidden'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.6em" viewBox="0 0 320 512" fill='white'>
                                <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                            </svg>
                        </div>
                    ) : (
                        <div className=' w-16 h-16 max-sm:hidden'></div>
                    )}
                    <div className='flex flex-col justify-start items-center h-screen pt-20 w-72' style={{ width: "520px" }} >
                        <div className={`${Styles.content} !relative mb-5 h-full flex items-center justify-center rounded-lg`}>
                            <div className=' absolute w-full p-3 top-0 z-50'>
                                <div className=' w-full bg-gray-50 h-1 rounded-xl mb-2' style={{ backgroundColor: "#A7A3A4" }}>
                                    <div
                                        className='h-1 bg-white rounded-xl'
                                        style={{ width: `${playing.link.includes("mp4") ? `${now * 100 / length.current}%` : `${Math.round(now) * 100 / 7}%`}`, transitionDuration: `${now !== 0 ? '3000ms' : '0ms'}` }}
                                    ></div>
                                </div>
                                <div className='text-white flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <img onClick={() => navigate(`/${playing.User.username}`)} alt='avtar' src={playing.User.avatar} className=' cursor-pointer w-10 h-10 mx-3 object-cover rounded-full' />
                                        <h1 onClick={() => navigate(`/${playing.User.username}`)} className=' cursor-pointer font-semibold'>{playing.User.nickname}</h1>
                                    </div>
                                    <div className='flex item space-x-3'>
                                        {isPlaying ? (
                                            <svg className=' cursor-pointer' onClick={() => {
                                                setIsPlaying(false);
                                            }} xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 320 512" fill='white'>
                                                <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
                                            </svg>
                                        ) : (
                                            <svg className=' cursor-pointer' onClick={() => {
                                                setIsPlaying(true);
                                            }} xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 384 512" fill='white'>
                                                <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                                            </svg>
                                        )}
                                        {isMuted ? (
                                            <svg className=' cursor-pointer' onClick={() => {
                                                setIsMuted(false);
                                            }} fill='white' xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 576 512">
                                                <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
                                            </svg>
                                        ) : (
                                            <svg className=' cursor-pointer' onClick={() => {
                                                setIsMuted(true);
                                            }} fill='white' xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 640 512">
                                                <path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" />
                                            </svg>
                                        )}
                                        <svg className=' cursor-pointer' onClick={() => {
                                        }} fill='white' xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512">
                                            <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {playing.link && (
                                <>
                                    {playing.link.includes("mp4") ? (
                                        <div className=' w-full h-full flex justify-center items-center rounded-lg' style={{ backgroundColor: `${playing.backgroundColor}` }}>
                                            <ReactPlayer
                                                fallback={<>Hello</>}
                                                url={playing.link}
                                                playing={isPlaying}
                                                controls={false}
                                                onDuration={(e) => length.current = e}
                                                onProgress={(e) => setNow(e.playedSeconds)}
                                                style={{ "borderRadius": "0.5rem", "maxHeight": "780px", maxWidth: '90%' }}
                                                muted={isMuted}
                                            />
                                        </div>
                                    ) : (
                                        <div className='story w-full h-full flex justify-center items-center rounded-lg' style={{ backgroundColor: `${playing.backgroundColor}` }}>
                                            <img
                                                alt='playing'
                                                src={playing.link}
                                                className={`${Styles.content_playing} object-contain`}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div className='flex items-center mb-3 justify-center w-full space-x-3 h-10'>
                            <input
                                className=' rounded-3xl p-3 border max-sm:hidden border-white bg-black w-full text-white outline-none duration-700 transition-all'
                                placeholder='Trả lời anh đi'
                                id='input'
                                onClick={() => setAnswer("")}
                            />
                            {answer !== null ? (
                                <></>
                            ) : (
                                <>
                                    {icons.map((icon, id) => (
                                        <>
                                            {hoverIcon === id ? (
                                                <img
                                                    src={icon.gif} className=' w-10 h-10 object-contain cursor-pointer'
                                                    onMouseEnter={(e) => setHoverIcon(id)}
                                                    onMouseLeave={(e) => setHoverIcon()}
                                                />
                                            ) : (
                                                <img
                                                    src={icon.svg} className=' w-10 h-10 object-contain cursor-pointer'
                                                    onMouseEnter={(e) => setHoverIcon(id)}
                                                    onMouseLeave={(e) => setHoverIcon()}
                                                />
                                            )}
                                        </>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                    {index !== stories.length - 1 ? (
                        <div onClick={() => {
                            setPlaying(stories[index + 1]);
                            setIndex(index + 1);
                            setNow(0);
                        }} className=' w-16 h-16 cursor-pointer rounded-full flex justify-center items-center bg-gray-700 max-sm:hidden'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.6em" viewBox="0 0 320 512" fill='white'>
                                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                            </svg>
                        </div>
                    ) : (
                        <div className=' w-16 h-16 max-sm:hidden'></div>
                    )}
                </div>
            </div>
        </>
    )
}
