import React, { useState } from 'react'

export default function LoadingStory() {

    return (
        <>
            <div
                style={{ backgroundColor: "gray" }}
                className=' w-40 h-64 hover:p-0 flex justify-center items-center relative rounded-lg shadow-lg border-slate-300 border cursor-pointer'
            >

                <div className=' w-full h-full object-cover rounded-lg '></div>

                <div className='absolute top-1 left-1 p-1 bg-blue-600 rounded-full'>
                    <div className=' w-10 h-10 object-cover rounded-full'></div>
                </div>
                <div className='absolute w-40 h-64 rounded-lg hidden' style={{ backgroundColor: 'rgb(0,0,0,0.1)' }}>
                </div>
                <h1 className=' absolute text-white text-xs bottom-3 left-2 font-bold'>àdsafadsfdsa</h1>
            </div>
        </>
    )
}
