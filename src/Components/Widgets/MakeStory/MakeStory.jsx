import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cropper from 'react-easy-crop'
import getCroppedImg from './CropImage';
import { StoryApi } from '../../../Network/Story';
import { addStory } from '../../../Redux/StorySlice';

export default function MakeStory() {

    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();
    const [options, setOption] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const upload = async () => {
        const { file, url } = await getCroppedImg(
            selectedFile,
            croppedAreaPixels,
            rotation
        );

        const formData = new FormData();
        formData.append('files', file, selectedFile.name);
        formData.append('public', true);

        StoryApi.post(formData).then((res) => {
            if (res.data) {
                StoryApi.getById(res.data.data.id).then((res) => {
                    dispatch(addStory(res.data.data));
                }).catch((err) => {
                    console.log(err.data);
                });
            }
        }).catch(err => {
            console.log(err);
        });
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
                className='z-20 w-screen h-full top-0 left-0 flex justify-end items-center max-lg:justify-center overflow-hidden'
                onClick={(e) => {

                }}
            >
                <div className=' text-black space-y-3 flex flex-col justify-between relative h-full w-full max-lg:hidden px-3 overflow-x-auto' style={{ backgroundColor: "white", width: "400px" }}>
                    <div>
                        <h1 className=' text-3xl font-semibold mt-20'>Tin của bạn</h1>
                        <div className=' flex items-center text-blue-500 space-x-3'>
                            <h1 className=' cursor-pointer'>Kho lưu trữ</h1>
                            <h1 className=' cursor-pointer'>Cài đặt</h1>
                        </div>
                        <div className='flex items-center space-x-4'>
                            <img alt='main-user' src={`${user.avatar}`} className=' w-16 h-16 rounded-full object-cover' />
                            <h1 className=' text-lg font-semibold'>{user.nickname}</h1>
                        </div>
                    </div>
                    {(options || selectedFile) && (
                        <div className=' flex items-center w-full space-x-3 p-4'>
                            <button
                                onClick={() => {
                                    setOption(null);
                                    setSelectedFile(null);
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
                <div className=' w-full h-screen flex justify-center items-center mt-20'>
                    {(() => {
                        if (selectedFile) {
                            return (
                                <div className=' p-5 rounded-xl bg-white shadow-2xl'>
                                    <h1 className='font-semibold pb-3'>Xem trước</h1>
                                    <div className=' bg-gray-900 rounded-xl flex items-center justify-center p-4 relative' style={{ width: '800px', height: '800px' }}>
                                        {selectedFile.type.includes('image') ? (
                                            <>
                                                <Cropper
                                                    image={selectedFile.preview}
                                                    crop={crop}
                                                    zoom={zoom}
                                                    rotation={rotation}
                                                    aspect={9 / 16}
                                                    onCropChange={setCrop}
                                                    onCropComplete={handleCropComplete}
                                                    onZoomChange={setZoom}
                                                    style={{ borderRadius: '0.75rem', margin: '1.25rem', backgroundColor: 'black', justifyContent: 'center' }}
                                                    zoomWithScroll={true}
                                                    minZoom={0.1}
                                                    maxZoom={1.5}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <Cropper
                                                    video={selectedFile.preview}
                                                    crop={crop}
                                                    zoom={zoom}
                                                    rotation={rotation}
                                                    aspect={9 / 16}
                                                    onCropChange={setCrop}
                                                    onCropComplete={handleCropComplete}
                                                    onZoomChange={setZoom}
                                                    style={{ borderRadius: '0.75rem', margin: '1.25rem', backgroundColor: 'black', justifyContent: 'center' }}
                                                    zoomWithScroll={true}
                                                    minZoom={0.1}
                                                    maxZoom={1.5}
                                                />
                                            </>
                                        )}
                                        <div className=' absolute z-50 bottom-2 flex items-center bg-black'>
                                            <button className=' p-2 bg-white rounded-lg' onClick={() => {
                                                setRotation(0);
                                                setZoom(1);
                                                setCrop({ x: 0, y: 0 });
                                            }}>Ban đầu</button>
                                            <h1 className='font-bold text-white'>+</h1>
                                            <input type='range' className=' w-96' value={zoom * 100 / 1.5} onChange={(e) => {
                                                if (e.target.value >= 15) {
                                                    setZoom(e.target.value * 1.5 / 100);
                                                }
                                            }} />
                                            <h1 className='font-bold text-white'>-</h1>
                                            <button className=' p-2 bg-white rounded-lg' onClick={() => setRotation(prev => prev + 90)}>Xoay</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else if (options === 2) {
                            return (
                                <>

                                </>
                            )
                        } else if (!options) {
                            return (
                                <>
                                    <label
                                        className=' cursor-pointer flex justify-center items-center rounded-xl bg-violet-600 hover:bg-violet-500 mx-3 w-52 h-72'
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
                                        className=' cursor-pointer flex justify-center items-center rounded-xl bg-blue-600 hover:bg-blue-500 mx-3 w-52 h-72'
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
                </div>
            </div>
        </>
    )
}
