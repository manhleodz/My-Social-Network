import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Cropper from 'react-easy-crop'

export default function MakeStory() {

    const user = useSelector(state => state.authentication.user);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);


    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        // console.log(croppedArea, croppedAreaPixels)
    }

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
                <div className=' text-black space-y-3 relative h-full max-lg:hidden px-3 overflow-x-auto' style={{ backgroundColor: "white", width: "350px" }}>
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
                <div className=' w-full h-screen flex justify-center items-center mt-20'>
                    <div className=' p-5 rounded-xl bg-white shadow-2xl'>
                        <h1 className='font-semibold pb-3'>Xem trước</h1>
                        <div className=' bg-gray-900 rounded-xl flex items-center justify-center p-4 relative' style={{ width: '800px', height: '800px' }}>
                            <Cropper
                                image={'https://firebasestorage.googleapis.com/v0/b/my-social-network-815dc.appspot.com/o/posts%2F319355609_727881652003063_1832447285833706047_n.jpg_2024-2-16%2018%3A28%3A37_0d92495c-554f-4d57-b479-7df5b960e3fd?alt=media&token=2f436e5e-d831-4b6e-9a0e-075a7f7ea09e'}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={9 / 16}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                style={{ borderRadius: '0.75rem', margin: '1.25rem', backgroundColor: 'black', justifyContent: 'center' }}
                                zoomWithScroll={true}
                                minZoom={0.1}
                                maxZoom={1.5}
                            />
                            <div className=' absolute z-50 bottom-2 flex items-center bg-black'>
                                <button className=' p-2 bg-white rounded-lg' onClick={() => {
                                    setRotation(0);
                                    setZoom(1);
                                    setCrop({ x: 0, y: 0 });
                                }}>Ban đầu</button>
                                <h1 className='font-bold text-white'>+</h1>
                                <input type='range' className=' w-96' value={zoom * 100} onChange={(e) => {
                                    setZoom(e.target.value / 100);
                                }} />
                                <h1 className='font-bold text-white'>-</h1>
                                <button className=' p-2 bg-white rounded-lg' onClick={() => setRotation(prev => prev + 50)}>Xoay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
