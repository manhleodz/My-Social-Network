import React from 'react'

export default function CommentModal({ comment, setOption, reportCmt, deleteCmt, user }) {
    return (
        <div onClick={(e) => {
            if (e.target.id === `bg-${comment.id}`) {
                setOption(false);
            }
        }}
            className='fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center' style={{ backgroundColor: 'rgb(0,0,0,0.4)' }}
            id={`bg-${comment.id}`}>
            <div className=' p-2 bg-white divide-y divide-gray-300 w-[400px] max-[500px]:w-[300px] flex flex-col items-center justify-center rounded-xl'>
                <div className=' w-full cursor-pointer flex justify-center text-lg text-red-600 font-semibold py-1.5'
                    onClick={reportCmt}
                >Báo cáo</div>
                {user.id === comment.User.id && (<div className=' w-full cursor-pointer flex justify-center text-lg text-red-600 font-semibold py-1.5'
                    onClick={deleteCmt}
                >Xóa</div>)}
                <div className=' w-full cursor-pointer flex justify-center py-1.5' onClick={() => setOption(false)}>Hủy</div>
            </div>
        </div>
    )
}
