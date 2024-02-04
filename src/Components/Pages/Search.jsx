import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SearchAPI } from '../../Network/Search';
import '../../Assets/SCSS/Search.scss';

export default function Search() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const searchParams = queryParams.get('q');
    const { topResult } = location.state;

    const navigate = useNavigate();

    const friends = useSelector(state => state.friends.friends);
    const user = useSelector(state => state.authentication.user);

    const isFriend = (id) => {
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].id == id)
                return true;
        }
        return false;
    }

    useEffect(() => {

        // SearchAPI.updateHistory(searchParams);

    }, [searchParams]);

    if (!friends || !user) return null;

    return (
        <div className=' w-full p-3 bg-gray-100 h-full' data-mode="light">
            <div className='w-full relative top-10 flex items-start justify-start bg-gray-100 h-full'>
                <div className='filter p-4 divide-y divide-gray-300 h-screen shadow-md text-black '>
                    <div className=' fixed top-0 left-0'>
                        <h1 className=' mt-14 text-2xl font-bold'>Kết quả tìm kiếm</h1>
                        <div>
                            <h1>Bộ lọc</h1>
                            <div className=''>
                                <div>Tất cả</div>
                                <div>Bài viết</div>
                                <div>Mọi người</div>
                                <div>Ảnh</div>
                                <div>Video</div>
                                <div>Nhóm</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' w-full h-full bg-gray-100 flex flex-col items-center mt-10 justify-start '>
                    <div className='content space-y-4'>
                        {topResult.length !== 0 && (
                            <div className='w-full p-4 bg-white rounded-lg shadow-md space-y-3'>
                                <h1 className=' text-xl font-semibold'>Mọi người</h1>
                                {topResult.map((result, key) => (
                                    <div key={key} className='w-full flex justify-between items-center'>
                                        <div className='flex items-center space-x-2'>
                                            <img src={result.avatar} className=' w-16 h-16 rounded-full object-cover cursor-pointer' onClick={() => navigate(`/${result.username}`)} />
                                            <div className=' flex flex-col justify-center'>
                                                <h1 className=' font-semibold  cursor-pointer hover:underline' onClick={() => navigate(`/${result.username}`)}>{result.nickname}</h1>
                                                {result.address.trim().length > 0 && (
                                                    <h1 className='text-gray-500 text-sm'>{result.address}</h1>
                                                )}
                                            </div>
                                        </div>
                                        {(() => {
                                            if (isFriend(result.id)) {
                                                return (
                                                    <>
                                                        <button className=' text-sm font-medium text-blue-600 bg-blue-100 hover:text-blue-700 hover:bg-gray-300 p-2 rounded-lg'>
                                                            Nhắn tin
                                                        </button>
                                                    </>
                                                )
                                            } else if (user.id === result.id) {
                                                return (
                                                    <>
                                                        <button onClick={() => navigate(`/${result.username}`)} className=' text-sm font-medium text-blue-600 bg-blue-100 hover:text-blue-700 hover:bg-gray-300 p-2 rounded-lg'>
                                                            Trang cá nhân
                                                        </button>
                                                    </>
                                                )
                                            } else if (!isFriend(result.id)) {
                                                return (
                                                    <>
                                                        <button className=' text-sm font-medium text-blue-600 bg-blue-100 hover:text-blue-700 hover:bg-gray-300 p-2 rounded-lg'>
                                                            Thêm bạn bè
                                                        </button>
                                                    </>
                                                )
                                            }
                                        })()}
                                    </div>
                                ))}
                                <button className=' rounded-lg p-1.5 font-medium bg-gray-200 hover:bg-gray-300 w-full'>Xem tất cả</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
