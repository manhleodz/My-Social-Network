import React, { useEffect, useRef, useState } from 'react'
import { Auth } from '../../../Network/Auth';
import { useNavigate } from 'react-router-dom';

export default function Search() {

    const [input, setInput] = useState("");
    const [result, setResult] = useState([]);
    const [data, setData] = useState();
    const searchRef = useRef();
    const navigate = useNavigate();

    function removeAccents(str) {
        var AccentsMap = [
            "aàảãáạăằẳẵắặâầẩẫấậ",
            "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
            "dđ", "DĐ",
            "eèẻẽéẹêềểễếệ",
            "EÈẺẼÉẸÊỀỂỄẾỆ",
            "iìỉĩíị",
            "IÌỈĨÍỊ",
            "oòỏõóọôồổỗốộơờởỡớợ",
            "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
            "uùủũúụưừửữứự",
            "UÙỦŨÚỤƯỪỬỮỨỰ",
            "yỳỷỹýỵ",
            "YỲỶỸÝỴ"
        ];
        for (var i = 0; i < AccentsMap.length; i++) {
            var re = new RegExp('[' + AccentsMap[i].substring(1) + ']', 'g');
            var char = AccentsMap[i][0];
            str = str.replace(re, char);
        }
        return str;
    }

    const handleFilter = (event) => {

        const searchWord = searchRef.current.value;

        setInput(removeAccents(searchWord)); 
        const newFilter = data.filter((value) => {
            return removeAccents(value.username).toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setResult([]);
        } else {
            setResult(newFilter);
        }
    };

    const clearInput = () => {
        setInput("");
        setResult([]);
    };

    useEffect(() => {
        Auth.getAllUsers().then(res => {
            setData(res.data);
        })
    }, []);

    return (
        <>
            <div>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className={`${input.length !== 0 ? 'absolute left-0 top-0 z-50 w-96 shadow-2xl bg-white outline-none space-y-3  p-3' : ''}`}>
                    <div className="relative z-50">
                        <div className="absolute z-50 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search" id="default-search"
                            className={`block w-full ${input.length !== 0 ? 'w-full' : ''} text-xl pl-10 text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                            placeholder="Tìm kiếm"
                            ref={searchRef}
                            onChange={handleFilter}
                            onKeyDownCapture={(e) => {
                                if (e.key === 'Enter' && input.length !== 0) {
                                    navigate(`search/${input}`);
                                }
                            }}
                        />
                    </div>
                    {input.length !== 0 && (
                        <>
                            {result.slice(0, 15).map((value, key) => {
                                return (
                                    <div
                                        key={key} className=' flex items-center z-50 cursor-pointer hover:bg-gray-200 p-1 rounded-md'
                                        onClick={() => {
                                            navigate(`/${value.username}`);
                                            clearInput();
                                        }}
                                    >
                                        <img alt='avatar' src={`${value.avatar}`} className=' w-10 h-10 rounded-full object-cover' />
                                        <p>{value.nickname}</p>
                                    </div>
                                )
                            })}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
