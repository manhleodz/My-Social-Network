import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import HomeRoutes from './HomeRoutes';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import ForgotPassword from '../Pages/ForgotPassword';
import NotFound from '../Pages/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from '../../Network/Auth';
import { setUser, signOut } from '../../Redux/UserSlice';
import ConfirmAccount from '../Pages/ConfirmAccount';

export default function AppRoutes() {

    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const success = (e) => {
        dispatch(setUser(e));
    }

    const failure = () => {
        dispatch(setUser(null));
        dispatch(signOut());
    }

    useEffect(() => {

        Auth.refreshStateUser(success, failure);

    }, []);

    if (user === "") return null;

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
        if (user.confirm === null) {
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
