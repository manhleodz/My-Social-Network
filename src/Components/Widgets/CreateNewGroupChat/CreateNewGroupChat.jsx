import { useEffect } from 'react';

export default function CreateNewGroupChat({ newUser, setNewUser }) {


    useEffect(() => {

    }, []);

    return (

        <div className=' w-full p-2 space-y-1'>
            <h1>Nhóm mới có </h1>
            {newUser.map((value, key) => (
                <div
                    className=' w-full flex items-center justify-between space-x-3 cursor-pointer rounded-lg p-2'
                    key={value.id}
                >
                    <div className=' flex items-center w-10/12'>
                        <img alt='avatar' className=' w-10 h-10 rounded-full object-cover' src={value.smallAvatar} />
                        <h1>{value.nickname}</h1>
                    </div>
                    <svg
                        onClick={() => {
                            const newList = newUser.filter(user => user.id !== value.id);
                            setNewUser(newList);
                        }}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=' w-5 h-5 fill-red-500 hover:fill-red-600'
                    >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                    </svg>
                </div>
            ))}
        </div>

    )
}