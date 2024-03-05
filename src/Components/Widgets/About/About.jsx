import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Styles from './About.module.scss';
import { Auth } from '../../../Network/Auth';

export default function About() {

    const { owner, setProfile } = useOutletContext();
    const navigate = useNavigate();

    const [story, setStory] = useState(owner.story);
    const [nickname, setNickname] = useState(owner.nickname);
    const [address, setAddress] = useState(owner.address);
    const [workAt, setWorkAt] = useState(owner.workAt);
    const [studyAt, setStudyAt] = useState(owner.studyAt);
    const [favorites, setFavorites] = useState(owner.favorites);
    const [birthday, setBirthday] = useState(owner.birthday);
    const [gender, setGender] = useState(owner.gender);

    const update = () => {
        const data = {
            story,
            nickname,
            address,
            workAt,
            studyAt,
            favorites,
            birthday,
            gender
        }

        Auth.changeInfo(data).then(() => {
            alert("Cập nhật thành công");
        }).catch(err => {
            alert(err.response);
        });
    }

    return (
        <div className={`${Styles.container} h-full bg-gray-100 flex flex-col justify-center`}>
            <div className=' w-full h-full p-5 bg-white rounded-xl'>
                <div className=' w-full'>
                    <h1 className=' text-2xl font-bold'>Tiểu sử</h1>
                    <textarea
                        id='story'
                        className=' w-1/2 resize-none m-1 outline-none ring-0 border-0 rounded-lg bg-gray-200 focus:out-blue-400 overflow-auto text-center'
                        onChange={(e) => setStory(e.target.value)}
                        defaultValue={story && story.replace(/@@newline@@/g, '\n')}
                    />
                </div>
                <div className=' w-full'>
                    <h1 className=' text-2xl font-bold'>Nickname</h1>
                    <textarea
                        id='story'
                        className=' w-1/2 h-16 resize-none m-1 outline-none ring-0 border-0 rounded-lg bg-gray-200 focus:out-blue-400 overflow-auto text-center'
                        onChange={(e) => setNickname(e.target.value)}
                        defaultValue={nickname}
                    />
                </div>
                <div className=' w-full'>
                    <h1 className=' text-2xl font-bold'>Địa chỉ</h1>
                    <textarea
                        id='story'
                        className=' w-1/2 resize-none m-1 outline-none ring-0 border-0 rounded-lg bg-gray-200 focus:out-blue-400 overflow-auto text-center'
                        onChange={(e) => setAddress(e.target.value)}
                        defaultValue={address}
                    />
                </div>
                <div className=' w-full'>
                    <h1 className=' text-2xl font-bold'>Sinh nhật</h1>
                    <textarea
                        id='story'
                        className=' w-1/2 resize-none m-1 outline-none ring-0 border-0 rounded-lg bg-gray-200 focus:out-blue-400 overflow-auto text-center'
                        onChange={(e) => setBirthday(e.target.value)}
                        defaultValue={birthday}
                    />
                </div>
                <div className=' w-full'>
                    <h1 className=' text-2xl font-bold'>Học vấn</h1>
                    <textarea
                        id='story'
                        className=' w-1/2 resize-none m-1 outline-none ring-0 border-0 rounded-lg bg-gray-200 focus:out-blue-400 overflow-auto text-center'
                        onChange={(e) => setStudyAt(e.target.value)}
                        defaultValue={studyAt}
                    />
                </div>
                <div className=' w-full'>
                    <h1 className=' text-2xl font-bold'>Công việc</h1>
                    <textarea
                        id='story'
                        className=' w-1/2 resize-none m-1 outline-none ring-0 border-0 rounded-lg bg-gray-200 focus:out-blue-400 overflow-auto text-center'
                        onChange={(e) => setWorkAt(e.target.value)}
                        defaultValue={workAt}
                    />
                </div>
                <div className=' w-full'>
                    <h1 className=' text-2xl font-bold'>Sở thích</h1>
                    <textarea
                        id='story'
                        className=' w-1/2 resize-none m-1 outline-none ring-0 border-0 rounded-lg bg-gray-200 focus:out-blue-400 overflow-auto text-center'
                        onChange={(e) => setFavorites(e.target.value)}
                        defaultValue={favorites}
                    />
                </div>
                <div className=' w-full'>
                    <h1 className=' text-2xl font-bold'>Giới tính</h1>
                    <textarea
                        id='story'
                        className=' w-1/2 resize-none m-1 outline-none ring-0 border-0 rounded-lg bg-gray-200 focus:out-blue-400 overflow-auto text-center'
                        onChange={(e) => setGender(e.target.value)}
                        defaultValue={gender}
                    />
                </div>
                <button onClick={update} className=' bg-blue-600 p-3 text-white rounded-md'>
                    Cập nhật
                </button>
            </div>
        </div>
    )
}
