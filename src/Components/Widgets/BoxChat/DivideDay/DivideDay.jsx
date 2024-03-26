import React from 'react'

export default function DivideDay({ date, firstMessage }) {

    var time = firstMessage.createdAt;
    time = new Date(time);

    var update = date;
    let splitDate = update.split("/");
    return (
        <h1 className=' text-center text-[12px] text-gray-600 mb-2'>
            {time.getHours() + ':' + time.getMinutes() + '  ' + splitDate[1] + ' tháng ' + splitDate[0] + ', ' + splitDate[2]}
        </h1>
    )
}
