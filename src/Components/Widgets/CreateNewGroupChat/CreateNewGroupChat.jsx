import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import md5 from "md5";
import { ChatApi } from '../../../Network/Chat';
import { addBoxChat, addGroupChat, fetchAllChat, openOneBox, setCreateGroup } from '../../../Redux/MessagerSlice';

export default function CreateNewGroupChat({ user, newUser }) {

    const [excuting, setExcuting] = useState(false);
    const dispatch = useDispatch();

    var name = user.nickname + ", ";
    for (let i = 0; i < newUser.length; i++) {
        if (i === newUser.length - 1) {
            name += newUser[i].nickname;
            break;
        }
        name += newUser[i].nickname + ", ";
    }

    const avatar = `https://www.gravatar.com/avatar/${md5(name)}?d=identicon&f=y`;

    const createGroupChat = async () => {
        setExcuting(true);
        const data = {
            nickname: user.nickname,
            name: name,
            avatar: avatar,
            public: true
        }

        let newGroup;
        await ChatApi.createNewGroupChat(data).then(res => {
            newGroup = res.data.data;
        }).catch(() => {
            setExcuting(false);
            alert("Couldn't create a new group");
            return;
        });

        await ChatApi.addUserIntoGroup({
            ListUser: newUser,
            ChannelId: newGroup.id
        }).then(() => {
            setExcuting(false);
            dispatch(addGroupChat([newGroup]));
            dispatch(fetchAllChat([newGroup]));
            setTimeout(() => {
                dispatch(setCreateGroup(false));
                dispatch(addBoxChat(newGroup));
                dispatch(openOneBox(newGroup));
            }, 500)
        })
    }

    useEffect(() => {
        setExcuting(false);
    }, [newUser]);

    return (

        <>
            <div className=' w-full h-full flex flex-col items-center'>
                <div className=' w-full h-1/2 p-2 space-y-1 flex flex-col items-center justify-center'>
                    <h1 className=' text-lg font-semibold'>Tạo nhóm chat mới </h1>
                    <img
                        alt="Avatar"
                        src={avatar}
                        className="w-12 h-12 rounded-full shadow-sm drop-shadow-sm ring-2 ring-rose-100"
                    />
                    <h1 className=' font-semibold'>{name}</h1>
                </div>
                <div className=' h-1/2 flex items-center justify-center'>
                    {excuting ? (
                        <button className=' flex items-center justify-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg
                     dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-7 py-2.5 text-center me-2 mb-2'>
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        </button>
                    ) : (
                        <button onClick={() => createGroupChat()} className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg
                     dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                            Xác nhận
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}