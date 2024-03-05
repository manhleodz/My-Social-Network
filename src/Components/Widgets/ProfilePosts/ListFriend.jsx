import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';


export default function ListFriend({ friends, setProfile }) {

    const navigate = useNavigate();

    return (
        <div className=' w-full h-fit bg-white my-4 p-3  rounded-lg shadow-sm'>
            <div className=' w-full flex items-center justify-between'>
                <h1 className=' text-xl font-bold'>Bạn bè</h1>
                <h1 className=' text-base text-blue-500 cursor-pointer' onClick={() => {
                    
                    navigate("friends")
                }}>Xem tất cả bạn bè</h1>
            </div>
            {!friends ? (
                <div className=' flex items-center justify-between'>
                    <div className="w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] bg-gray-200 animate-pulse rounded-xl m-1"></div>
                    <div className="w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] bg-gray-200 animate-pulse rounded-xl m-1"></div>
                    <div className="w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] bg-gray-200 animate-pulse rounded-xl m-1"></div>
                </div>
            ) : (
                <>
                    <BrowserView>
                        <div className=' grid grid-cols-3 gap-3 h-fit w-full'>
                            {friends.map(friend => (
                                <div key={friend.id} title={friend.nickname} className=' cursor-pointer max-h-40 flex flex-col justify-center items-center'
                                    onClick={() => {
                                        setProfile(null);
                                        
                                        navigate(`/${friend.username}`)
                                    }}
                                >
                                    <img alt='anh thoi' src={friend.smallAvatar} className=' w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] object-cover rounded-xl m-1' />
                                    <h1 style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }} className='text-[15px] break-all font-semibold w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] '>{friend.nickname}</h1>
                                </div>
                            ))}
                        </div>
                    </BrowserView>

                    <MobileView>
                        <div className=' grid grid-cols-3 gap-3 h-fit w-full'>
                            {friends.slice(0, 3).map(friend => (
                                <div key={friend.id} title={friend.nickname} className=' cursor-pointer max-h-40 flex flex-col justify-center items-center'
                                    onClick={() => {
                                        setProfile(null);
                                        
                                        navigate(`/${friend.username}`)
                                    }}
                                >
                                    <img alt='anh thoi' src={friend.smallAvatar} className=' w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] object-cover rounded-xl m-1' />
                                    <h1 style={{ wordBreak: "break-all", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }} className='text-[15px] break-all font-semibold w-[120px] h-[120px] max-[1100px]:w-[100px] max-[1100px]:h-[100px] max-[770px]:w-[200px] max-[770px]:h-[200px] max-[600px]:w-[170px] max-[600px]:h-[170px] max-[500px]:w-[100px] max-[500px]:h-[100px] max-[400px]:w-[80px] max-[400px]:h-[80px] '>{friend.nickname}</h1>
                                </div>
                            ))}
                        </div>
                    </MobileView>
                </>
            )}
        </div>
    )
}
