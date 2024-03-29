import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import HomeRoutes from './HomeRoutes';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import ForgotPassword from '../Pages/ForgotPassword';
import ConfirmAccount from '../Pages/ConfirmAccount';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from '../../Network/Auth';
import { PostApi } from '../../Network/Post';
import { FriendApi } from '../../Network/Friend';
import { setStatus, setUser, signOut } from '../../Redux/UserSlice';
import { StoryApi } from '../../Network/Story';
import { fetchData } from '../../Redux/PostSlice';
import { fetchStory } from '../../Redux/StorySlice';
import { fetchFriend } from '../../Redux/FriendSlice';
import { LoadingPage } from '../Widgets/Loading/LoadingPage';
import socket from '../../Network/Socket';
import { ChatApi } from '../../Network/Chat';
import { addGroupChat, fetchAllChat } from '../../Redux/MessagerSlice';

export default function AppRoutes() {

    const user = useSelector(state => state.authentication.user);

    const dispatch = useDispatch();

    const success = (e) => {
        dispatch(setUser(e));
        socket.emit("online", e);
        getPosts();
        getStories();
        getGroups();
        getListFriends();
    }

    const unAuthorized = (e) => {
        dispatch(setUser(e));
    }

    const failure = () => {
        dispatch(signOut());
    }

    const getListFriends = async () => {
        await FriendApi.getListFriend().then((res) => {
            dispatch(fetchFriend(res.data.data));
            dispatch(fetchAllChat(res.data.data));
        })
    }

    const getGroups = async () => {
        await ChatApi.getGroupChat().then((res) => {     // group chat
            if (res.status === 200) {
                dispatch(addGroupChat(res.data.data));
                dispatch(fetchAllChat(res.data.data));
            }
        })
    }

    const getPosts = async () => {
        try {
            await PostApi.getPost(0).then(res => {
                if (res.status === 200)
                    dispatch(fetchData(res.data.data))
            })
        } catch (err) {
            console.log(err);
        }
    }

    const getStories = async () => {
        try {
            await StoryApi.getAll(0).then(res => {
                if (res.status === 200)
                    dispatch(fetchStory(res.data))
                else
                    dispatch(fetchData([]));
            })
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {

        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        Auth.refreshStateUser(success, unAuthorized, failure);

    }, []);

    // useEffect(() => {

    //     setTimeout(() => {
    //         socket.disconnect();
    //         Auth.refreshStateUser(success, unAuthorized, failure);
    //     }, 1800000)
    // });

    useEffect(() => {
        const unloadCallback = (event) => {
            if (user) {
                socket.disconnect();
                // event.preventDefault();
                // event.returnValue = "";
                // return "";
            }
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, [user]);

    if (user === null) {
        return (
            <>
                <Routes>
                    <Route path='/*' element={<Login />} />
                    <Route path='signup' element={<SignUp />} />
                    <Route path='forgotpassword' element={<ForgotPassword />} />
                </Routes>
            </>
        )
    } else {
        if (user.confirm === 0) {
            return (
                <>
                    <Routes>
                        <Route path='/*' element={<ConfirmAccount />} />
                        <Route path='signup' element={<SignUp />} />
                        <Route path='login' element={<Login />} />
                        <Route path='forgotpassword' element={<ForgotPassword />} />
                    </Routes>
                </>
            )
        } else {
            return (
                <>
                    <Routes>
                        <Route path='*' element={<HomeRoutes />} />
                    </Routes>
                </>
            )
        }
    }
}
