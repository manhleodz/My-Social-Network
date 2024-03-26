import { useEffect, useState } from 'react';
import Styles from './CreateNewGroupChat.module.scss';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { SearchAPI } from '../../../Network/Search';
import { setCreateGroup } from '../../../Redux/MessagerSlice';
import CreateNewGroupChat from './CreateNewGroupChat';
import SendMessageToAnother from './SendMessageToAnother';

export default function CreateNewMessage() {

    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const [newUser, setNewUser] = useState([]);
    const [input, setInput] = useState("");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const search = async (e) => {

        const searchWord = e.target.value.trim();
        setInput(searchWord);
        if (searchWord === "") {
            setResult([]);
            setInput("");
        } else {
            setLoading(true);
            await SearchAPI.topSearch(searchWord).then((res) => {
                if (res.status === 200) {
                    setResult(res.data.data);
                    const myObj = {
                        [`${searchWord}`]: res.data.data
                    }
                }
                else {
                    setResult([]);
                }
                setLoading(false);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    useEffect(() => {

    }, []);

    return (
        <div className={`${Styles.box} ${isMobile ? 'w-[310px] h-[410px]' : 'w-[310px] h-[450px]'} overflow-y-hidden overflow-x-hidden rounded-xl divide-y-2 divide-gray-300 shadow-xl bg-white flex flex-col items-start relative`}>
            <div className=' w-full  p-2'>
                <div className=' flex items-center justify-between'>
                    <h1 className=' font-semibold'>Tin nhắn mới</h1>
                    <svg onClick={() => dispatch(setCreateGroup(false))} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className=' w-7 h-7 cursor-pointer fill-gray-400 hover:bg-gray-200 p-1 rounded-full'>
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                </div>
                <div className={`flex items-start space-x-2 overflow-x-auto w-full`}>
                    <h1>Đến: </h1>
                    <div className={` w-fit ${newUser.length > 1 ? 'flex flex-col' : ' flex items-center '}`}>
                        {newUser.length > 0 && newUser.map(user => (
                            <div key={user.id} className='flex items-center w-fit space-x-1 m-1 p-1.5 rounded-xl bg-blue-200 text-blue-700'>
                                <h1 className='text-[15px]'>{user.nickname}</h1>
                                <svg onClick={() => {
                                    const newList = newUser.filter(v => v.id !== user.id);
                                    setNewUser(newList);
                                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className=' w-6 h-6 cursor-pointer fill-blue-400 p-1 rounded-full'>
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            </div>
                        ))}
                        <input
                            className=' focus:outline-none w-full bg-gray-100 p-1 rounded-lg'
                            onChange={search}
                            value={input}
                            autoFocus
                        />
                    </div>
                </div>
            </div>

            {
                input.length > 0 ? (
                    <div className=' w-full p-2 space-y-1'>
                        {loading ? (
                            <>
                                <div className=' flex justify-center items-center'>
                                    <span className={`${Styles.loader}`}></span>
                                </div>
                            </>
                        ) : (
                            <>
                                {result.map((value, key) => (
                                    <>
                                        {(!newUser.some(user => user.id === value.id) && value.id !== user.id) && (
                                            <div
                                                onClick={() => {
                                                    setNewUser(prev => [...prev, value]);
                                                    setInput("");
                                                }}
                                                className=' flex items-center justify-start space-x-3 hover:bg-gray-200 cursor-pointer rounded-lg p-2'
                                                key={key}
                                            >
                                                <img alt='avatar' className=' w-10 h-10 rounded-full object-cover' src={value.smallAvatar} />
                                                <h1>{value.nickname}</h1>
                                            </div>
                                        )}
                                    </>
                                ))}
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        {newUser.length === 1 && (
                            <SendMessageToAnother newUser={newUser[0]} />
                        )}
                        {newUser.length > 1 && (
                            <CreateNewGroupChat user={user} newUser={newUser} setNewUser={setNewUser} />
                        )}
                    </>
                )
            }
        </div>
    )
}