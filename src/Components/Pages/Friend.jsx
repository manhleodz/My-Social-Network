import React, { useEffect, useState } from 'react'
import { Auth } from '../../Network/Auth';
import FriendTag from '../Widgets/FriendTag/FriendTag';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';

export default function Friend() {

    const [requests, setRequest] = useState(null);
    const [unconfirmedRequests, setUnconfirmedRequests] = useState(null);

    useEffect(() => {
        document.title = "Bạn bè | ML";

        Auth.getFriendRequests().then(res => {
            setRequest(res.data.data)
        }).catch(err => {
            console.error(err);
        });

        Auth.getUnconfirmedRequest().then(res => {
            setUnconfirmedRequests(res.data.data)
        }).catch(err => {
            console.error(err);
        });
    }, []);

    if (!requests || !unconfirmedRequests) return null;

    return (
        <div
            className='z-20 w-screen h-full relative top-0 left-0 flex justify-center'
        >
            <div className={`${isMobile ? 'px-2 mt-16' : 'px-10 mt-16'} w-full h-full relative z-0 bg-gray-100`}>
                {requests.length > 0 && (
                    <>
                        <h1 className=' text-2xl font-bold mb-3'>Lời mời kết bạn</h1>
                        <div className=' w-full grid grid-cols-8 justify-center gap-8 max-[1600px]:grid-cols-6 max-[1600px]:gap-6
                            max-[1400px]:grid-cols-5 max-[1400px]:gap-5 max-[1200px]:grid-cols-4 max-[1200px]:gap-4
                            max-[850px]:grid-cols-3 max-[850px]:gap-3
                            max-[650px]:grid-cols-2 max-[650px]:gap-2'
                        >
                            {requests.length > 0 && requests.map(request => (
                                <>
                                    <FriendTag key={request.id} friend={request.Sender} status={2} />
                                </>
                            ))}
                        </div>
                    </>
                )}

                <h1 className=' text-2xl font-bold my-3'>Lời mời đã gửi</h1>
                <div className=' w-full grid grid-cols-8 justify-center gap-8 max-[1600px]:grid-cols-6 max-[1600px]:gap-6
                    max-[1400px]:grid-cols-5 max-[1400px]:gap-5 max-[1200px]:grid-cols-4 max-[1200px]:gap-4
                    max-[850px]:grid-cols-3 max-[850px]:gap-3
                    max-[650px]:grid-cols-2 max-[650px]:gap-2'
                >
                    {unconfirmedRequests.length > 0 && unconfirmedRequests.map(request => (
                        <>
                            <FriendTag key={request.id} friend={request.Receiver} status={1} />
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}
