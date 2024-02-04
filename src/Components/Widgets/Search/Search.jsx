import React, { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SearchAPI } from '../../../Network/Search';
import './Search.scss';

export default function Search() {

    const [cache, setCache] = useState([]);
    const [input, setInput] = useState("");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef();
    const navigate = useNavigate();

    function pushOrNot(name) {
        for (let i = 0; i < cache.length; i++) {
            if (cache[i][name])
                return { push: false, index: `${i}` };
        }
        return { push: true };
    }

    const search = async () => {

        const searchWord = searchRef.current.value.trim();

        if (searchWord === "") {
            setResult([]);
            setInput("");
        } else {
            setLoading(true);
            setInput(searchWord);
            const checker = pushOrNot(searchWord);
            if (checker.push) {
                setTimeout(async () => {
                    await SearchAPI.topSearch(searchWord).then((res) => {
                        if (res.status === 200) {
                            setResult(res.data.data);
                            const myObj = {
                                [searchWord]: res.data.data
                            }
                            setCache([...cache, myObj]);
                        }
                        else {
                            setResult([]);
                        }
                        setLoading(false);
                    }).catch((error) => {
                        console.log(error);
                    })
                }, 300);
            } else {
                setResult(cache[checker.index][searchWord]);
                setLoading(false);
            }
        }
    };

    const clearInput = () => {
        setInput("");
        setResult([]);
    };

    return (
        <>
            <div>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className={`${input.length !== 0 ? 'absolute left-0 top-0 z-50 w-96 shadow-2xl rounded-lg bg-white outline-none space-y-3  p-2.5' : ''}`}>
                    <div className="relative z-50">
                        <div className="absolute z-50 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search" id="default-search"
                            className={`block ${input.length !== 0 ? 'w-full' : ''} text-xl pl-10 text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            placeholder="Tìm kiếm"
                            ref={searchRef}
                            onChange={search}
                            onKeyDownCapture={(e) => {
                                if (e.key === 'Enter' && input.length !== 0) {
                                    setInput("");
                                    navigate(`search?q=${input}`, {
                                        state: {
                                            topResult: result
                                        }
                                    });
                                }
                            }}
                        />
                    </div>
                    {input.length !== 0 && (
                        <>
                            {loading ? (
                                <>
                                    <div className=' flex justify-center items-center'>
                                        <span className='loader1'></span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {result.map((value, key) => (
                                        <div
                                            key={key} className=' flex items-center z-50 cursor-pointer hover:bg-gray-200 p-1 rounded-md space-x-1'
                                            onClick={() => {
                                                navigate(`/${value.username}`);
                                                clearInput();
                                            }}
                                        >
                                            <img alt='avatar' src={`${value.avatar}`} className=' w-10 h-10 rounded-full object-cover' />
                                            <p className=' font-semibold'>{value.nickname}</p>
                                        </div>
                                    ))}
                                    <div
                                        onClick={() => {
                                            setInput("");
                                            navigate(`search?q=${input}`, {
                                                state: {
                                                    topResult: result
                                                }
                                            });
                                        }}
                                        className=' flex items-center z-50 cursor-pointer hover:bg-gray-200 p-1 rounded-md space-x-1'
                                    >
                                        <div className=' w-10 h-10 rounded-full bg-blue-500 flex justify-center items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 fill-white' viewBox="0 0 512 512">
                                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                            </svg>
                                        </div>
                                        <h1 className=' font-semibold'>Tìm kiếm {input}</h1>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
