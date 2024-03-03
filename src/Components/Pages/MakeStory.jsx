import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../Helper/CropImage';
import { StoryApi } from '../../Network/Story';
import { addStory, deleteStory, replaceFirstStory } from '../../Redux/StorySlice';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';

export default function MakeStory() {

    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [options, setOption] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const upload = async () => {
        if (!loading && options !== 2) {
            setLoading(true);
            if (selectedFile.type.includes('image')) {
                const { file, url } = await getCroppedImg(
                    selectedFile,
                    croppedAreaPixels,
                    rotation
                ).catch((err) => console.log(err));

                const formData = new FormData();
                formData.append('files', file, selectedFile.name);
                formData.append('public', true);

                dispatch(addStory({
                    backgroundColor: "gray",
                    expires: false,
                    id: "loading",
                    link: url,
                    seen: `${user.id}`,
                    User: user
                }));

                StoryApi.post(formData).then((res) => {
                    if (res.data) {
                        dispatch(replaceFirstStory(res.data.data));
                    }
                }).catch(err => {
                    console.log(err);
                });
            } else {
                const formData = new FormData();
                formData.append('files', selectedFile, selectedFile.name);
                formData.append('public', true);

                dispatch(addStory({
                    backgroundColor: "gray",
                    expires: false,
                    id: "loading",
                    public: true,
                    link: selectedFile.preview,
                    seen: `${user.id}`,
                    User: user
                }));
                StoryApi.post(formData).then((res) => {
                    if (res.data) {
                        dispatch(replaceFirstStory(res.data.data));
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    }

    //Xử lý hình ảnh
    const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    useEffect(() => {
        document.title = "Tạo tin | ML";
    }, []);

    return (
        <>
            <div
                className='z-20 w-screen h-full relative top-0 left-0 flex justify-end items-center max-sm:flex-col max-sm:justify-center overflow-y-hidden'
                onClick={(e) => {

                }}
            >
                <div className=' text-black space-y-3 flex flex-col justify-between relative h-full max-sm:w-full max-sm:justify-start max-sm:h-1/2 px-3 overflow-x-auto bg-white w-[400px]'>
                    <div>
                        <h1 className=' text-3xl max-sm:text-xl font-semibold mt-20 max-sm:mt-16'>Tin của bạn</h1>
                        <div className=' flex items-center text-blue-500 space-x-3'>
                            <h1 className=' cursor-pointer'>Kho lưu trữ</h1>
                            <h1 className=' cursor-pointer'>Cài đặt</h1>
                        </div>
                        <div className='flex items-center space-x-4'>
                            <img alt='main-user' src={`${user.avatar}`} className=' w-16 h-16 max-sm:w-13 max-sm:h-13 rounded-full object-cover' />
                            <h1 className=' text-lg font-semibold'>{user.nickname}</h1>
                        </div>
                    </div>
                    {(options || selectedFile) && (
                        <div className=' flex items-center w-full space-x-3 p-4'>
                            <button
                                onClick={() => {
                                    setOption(null);
                                    setSelectedFile(null);
                                    setCrop({ x: 0, y: 0, width: 0, height: 0 });
                                    setRotation(0);
                                    setZoom(1);
                                }}
                                className=' p-2 rounded-lg w-1/3 bg-gray-200 text-black font-medium hover:bg-gray-300'
                            >
                                Bỏ
                            </button>
                            <button
                                onClick={() => {
                                    upload();
                                }}
                                className=' p-2 rounded-lg w-2/3 bg-blue-600 text-white font-medium hover:bg-blue-700'
                            >
                                Đăng lên tin
                            </button>
                        </div>
                    )}
                </div>
                <div className=' w-full h-full relative bg-gray-100 flex justify-center items-center max-sm:items-start mt-20'>
                    {loading && (
                        <>
                            <div
                                className=' w-full h-full z-50 absolute flex flex-col justify-center items-center'
                                style={{ backgroundColor: "rgb(220,220,220, 0.8)" }}
                            >
                                <span className="loader"></span>
                                <h1 className='text-xl text-black'>Đang đăng</h1>
                            </div>
                        </>
                    )}
                    <BrowserView className='z-40 w-full h-full bg-gray-100 flex justify-center items-center max-sm:items-start'>
                        {(() => {
                            if (selectedFile) {
                                return (
                                    <div className=' p-5 rounded-xl bg-white shadow-2xl max-sm:h-96'>
                                        <h1 className='font-semibold pb-3'>Xem trước</h1>
                                        <div className=' bg-gray-900 rounded-xl flex items-center justify-center p-4 relative w-[800px] h-[800px] max-md:w-[400px] max-md:h-[400px] max-lg:w-[500px] max-lg:h-[500px] max-[450px]:w-[300px] max-[450px]:h-[300px]'>
                                            {selectedFile.type.includes('image') ? (
                                                <>
                                                    <Cropper
                                                        image={selectedFile.preview}
                                                        crop={crop}
                                                        zoom={zoom}
                                                        rotation={rotation}
                                                        aspect={9 / 16}
                                                        showGrid={false}
                                                        onCropChange={setCrop}
                                                        onCropComplete={handleCropComplete}
                                                        onZoomChange={setZoom}
                                                        style={{ containerStyle: { borderRadius: '0.75rem', backgroundColor: 'black', justifyContent: 'center' } }} zoomWithScroll={true}
                                                        minZoom={0.1}
                                                        maxZoom={1.5}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <ReactPlayer
                                                        url={selectedFile.preview}
                                                        playing={true}
                                                        width="100%"
                                                        style={{ containerStyle: { borderRadius: '0.75rem', backgroundColor: 'black', justifyContent: 'center' } }}
                                                    />
                                                </>
                                            )}
                                            {selectedFile.type.includes('image') && (
                                                <div className=' absolute z-50 bottom-2 w-1/2 flex items-center justify-center bg-black rounded-xl p-1'>
                                                    <button className=' p-1 w-16 font-medium bg-white flex justify-center items-center rounded-lg text-sm' onClick={() => {
                                                        setRotation(0);
                                                        setZoom(1);
                                                        setCrop({ x: 0, y: 0 });
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-5 h-5'>
                                                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7
                                                            0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                                                        </svg>
                                                    </button>
                                                    <button className='font-bold text-white text-xl p-1 text-center'
                                                        onClick={() => {
                                                            if (zoom > 0.2)
                                                                setZoom(prev => prev - 0.1)
                                                        }}
                                                    >-</button>
                                                    <input type='range' className=' w-8/12' value={zoom * 100 / 1.5} onChange={(e) => {
                                                        if (e.target.value > 15) {
                                                            setZoom(e.target.value * 1.5 / 100);
                                                        }
                                                    }} />
                                                    <button className='font-bold text-white text-xl p-1 text-center'
                                                        onClick={() => {
                                                            if (zoom < 1.5)
                                                                setZoom(prev => prev + 0.1)
                                                        }}
                                                    >+</button>
                                                    <button className=' p-1 w-16 font-medium bg-white flex justify-center items-center rounded-lg text-sm' onClick={() => setRotation(prev => prev + 90)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-5 h-5'>
                                                            <path d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8
                                                            0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            } else if (options === 2) {
                                return (
                                    <>
                                        <h1>Coming soon</h1>
                                    </>
                                )
                            } else if (!options) {
                                return (
                                    <>
                                        <label
                                            className=' cursor-pointer flex justify-center items-center rounded-xl bg-violet-600 hover:bg-violet-500 mx-3 max-md:mx-1 w-52 h-72'
                                            htmlFor="select-file"
                                        >

                                            <div className=' p-3 rounded-full bg-white shadow-lg '>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='black' className='w-7 h-7'>
                                                    <path d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z" />
                                                </svg>
                                            </div>
                                        </label>
                                        <input
                                            className='hidden'
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                Object.assign(file, {
                                                    preview: URL.createObjectURL(file)
                                                })
                                                setSelectedFile(file);
                                            }}
                                            id='select-file' type='file' accept="image/png, image/jpeg, image/jpg, video/mp4"
                                        />
                                        <div
                                            onClick={() => {
                                                setOption(2);
                                            }}
                                            className=' cursor-pointer flex justify-center items-center rounded-xl bg-blue-600 hover:bg-blue-500 mx-3 max-md:mx-1 w-52 h-72'
                                        >
                                            <div className=' p-3 rounded-full bg-white shadow-lg '>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='black' className='w-7 h-7'>
                                                    <path d="M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32h-1.8l18-48H303.8l18 48H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H390.2L254 52.8zM279.8 304H168.2L224 155.1 279.8 304z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        })()}
                    </BrowserView>

                    <MobileView className='z-40 w-full bg-gray-100 flex justify-center items-start'>
                        {(() => {
                            if (selectedFile) {
                                return (
                                    <div className=' p-3 rounded-xl bg-white shadow-2xl max-sm:h-96'>
                                        <h1 className='font-semibold pb-3'>Xem trước</h1>
                                        <div className=' bg-gray-900 rounded-xl flex items-center justify-center p-4 relative max-md:w-[400px] max-md:h-[400px] max-lg:w-[500px] max-lg:h-[500px] max-[450px]:w-[300px] max-[450px]:h-[300px]'>
                                            {selectedFile.type.includes('image') ? (
                                                <>
                                                    <Cropper
                                                        image={selectedFile.preview}
                                                        crop={crop}
                                                        zoom={zoom}
                                                        rotation={rotation}
                                                        aspect={9 / 16}
                                                        showGrid={false}
                                                        onCropChange={setCrop}
                                                        onCropComplete={handleCropComplete}
                                                        onZoomChange={setZoom}
                                                        style={{ containerStyle: { borderRadius: '0.75rem', backgroundColor: 'black', justifyContent: 'center' } }}
                                                        zoomWithScroll={true}
                                                        minZoom={0.1}
                                                        maxZoom={1.5}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <ReactPlayer
                                                        url={selectedFile.preview}
                                                        playing={true}
                                                        width="100%"
                                                        style={{ containerStyle: { borderRadius: '0.75rem', backgroundColor: 'black', justifyContent: 'center' } }}
                                                    />
                                                </>
                                            )}
                                            {selectedFile.type.includes('image') && (
                                                <div className=' absolute z-50 bottom-2 w-1/2 flex items-center justify-center bg-black rounded-xl p-1'>
                                                    <button className=' p-1 w-10 font-medium bg-white flex items-center justify-center rounded-lg text-sm' onClick={() => {
                                                        setRotation(0);
                                                        setZoom(1);
                                                        setCrop({ x: 0, y: 0 });
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-5 h-5'>
                                                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7
                                                            0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                                                        </svg>
                                                    </button>
                                                    <button className='font-bold text-white text-xl p-1 text-center'
                                                        onClick={() => {
                                                            if (zoom > 0.2)
                                                                setZoom(prev => prev - 0.1)
                                                        }}
                                                    >-</button>
                                                    <div className=' w-10'></div>
                                                    <button className='font-bold text-white text-xl p-1 text-center'
                                                        onClick={() => {
                                                            if (zoom < 1.5)
                                                                setZoom(prev => prev + 0.1)
                                                        }}
                                                    >+</button>
                                                    <button className=' p-1 w-10 font-medium bg-white flex items-center justify-center rounded-lg text-sm' onClick={() => setRotation(prev => prev + 90)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-5 h-5'>
                                                            <path d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8
                                                            0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            } else if (options === 2) {
                                return (
                                    <>
                                        <h1>Coming soon</h1>
                                    </>
                                )
                            } else if (!options) {
                                return (
                                    <>
                                        <label
                                            className=' cursor-pointer flex justify-center items-center rounded-xl bg-violet-600 hover:bg-violet-500 mx-3 max-md:mx-1 w-52 h-72'
                                            htmlFor="select-file"
                                        >

                                            <div className=' p-3 rounded-full bg-white shadow-lg '>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill='black' className='w-7 h-7'>
                                                    <path d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z" />
                                                </svg>
                                            </div>
                                        </label>
                                        <input
                                            className='hidden'
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                Object.assign(file, {
                                                    preview: URL.createObjectURL(file)
                                                })
                                                setSelectedFile(file);
                                            }}
                                            id='select-file' type='file' accept="image/png, image/jpeg, image/jpg, video/mp4"
                                        />
                                        <div
                                            onClick={() => {
                                                setOption(2);
                                            }}
                                            className=' cursor-pointer flex justify-center items-center rounded-xl bg-blue-600 hover:bg-blue-500 mx-3 max-md:mx-1 w-52 h-72'
                                        >
                                            <div className=' p-3 rounded-full bg-white shadow-lg '>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill='black' className='w-7 h-7'>
                                                    <path d="M254 52.8C249.3 40.3 237.3 32 224 32s-25.3 8.3-30 20.8L57.8 416H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32h-1.8l18-48H303.8l18 48H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H390.2L254 52.8zM279.8 304H168.2L224 155.1 279.8 304z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        })()}
                    </MobileView>
                </div>
            </div>
        </>
    )
}
