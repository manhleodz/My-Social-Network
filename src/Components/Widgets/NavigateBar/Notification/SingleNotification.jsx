import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SingleNotification({ notification }) {

    const navigate = useNavigate();

    let createdAt = new Date(notification.date);
    const now = new Date();

    if (now - createdAt < 3600000) {
        if (Math.round((now - createdAt) / 60000) === 0) {
            createdAt = "Vừa xong";
        } else
            createdAt = Math.round((now - createdAt) / 60000) + " phút trước";
    } else if (now - createdAt < 86400000) {
        createdAt = Math.round((now - createdAt) / 3600000) + " giờ trước";
    } else if (now - createdAt < 604800000) {
        createdAt = Math.round((now - createdAt) / 86400000) + " ngày trước";
    } else {
        createdAt = createdAt.getDate() + " tháng " + createdAt.getMonth() + " lúc " + createdAt.getHours() + ":" + createdAt.getMinutes();
    }

    return (
        <div onClick={() => navigate(`/friends`)} className=' space-x-1 flex items-center justify-between rounded-lg p-2 w-full cursor-pointer hover:bg-gray-100'>
            <img alt='avatar' src={notification.smallAvatar} className=' w-14 h-14 rounded-full object-cover' />
            <div className=' w-9/12'>
                <h1 className=' w-full break-words text-[15px] font-semibold'>{notification.message}</h1>
                <h1 className=' text-[13px] font-semibold'>{createdAt}</h1>
            </div>
            <div className=' cursor-pointer w-7 h-7 flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className=' w-full h-full p-1'>
                    <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                </svg>
            </div>
        </div>
    )
}
