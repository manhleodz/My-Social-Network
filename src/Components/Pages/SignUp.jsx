import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../../Network/Auth';
import bgsvg from '../../Assets/undraw_Connection_re_lcud.png';
import Generate from '../../Helper/GenerateOTP';
import OtpInput from "otp-input-react";
import ConfirmOTP from '../../Helper/ConfirmOTP';
import Decode from '../../Helper/Encode';
import backgroundImage from '../../Assets/login bg.jpg';

function SignUp() {

    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [OTP, setOTP] = useState(Generate(6))
    const [inputOTP, setInputOTP] = useState('');
    const [excuting, setExcuting] = useState(false);
    const [alert, setAlert] = useState(null);

    const success = () => {
        window.location.href("/");
    }

    const signUp = () => {
        Auth.signUp(
            {
                password: password,
                email: email
            },
            (user) => {
                navigate("/");
            },
            (error) => {
                setExcuting(false);
                setAlert(error);
            }
        )
    }

    const verify = () => {
        setLoading(true);
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            Auth.vefify(
                {
                    password: password,
                    email: email,
                    OTP: OTP
                },
                (user) => {
                    setExcuting(true);
                    setLoading(false);
                },
                (error) => {
                    setExcuting(false);
                    setAlert(error);
                    setLoading(false);
                }
            )
        } else {
            setAlert("Sai email");
            setLoading(false);
        }
    }

    useEffect(() => {

        document.title = 'Sign Up';
    })

    return (
        <>
            <section className="flex flex-row items-center justify-center" style={{
                backgroundImage: `url("${backgroundImage}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center'
            }}>
                {excuting === false ? (
                    <form
                        className="min-h-screen flex flex-col justify-center sm:py-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (alert === undefined) {
                                verify();
                            }
                        }}
                    >
                        <div>
                            <div className="relative py-3 sm:mx-auto" >
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 -rotate-6 max-sm:-rotate-3 rounded-3xl">
                                </div>
                                <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
                                    <div className="max-w-md mx-auto">
                                        <div>
                                            <h1 className="text-2xl max-sm:text-lg font-semibold font-mono">Hi! Chúc một ngày tốt lành</h1>
                                        </div>
                                        <div className="divide-y divide-gray-200 mt-3">
                                            <div className="text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
                                                <div className="relative">
                                                    <input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-md"
                                                        placeholder="email"
                                                        onChange={(event) => {
                                                            setEmail(event.target.value);
                                                            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(event.target.value)) {
                                                                setAlert("Sai email");
                                                            } else {
                                                                setAlert();
                                                            }
                                                        }}
                                                        value={email}
                                                        autoFocus={false}
                                                        autoCorrect="false"
                                                        required
                                                    />
                                                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                                                    {(alert === "Sai email" || alert === "Email đã được sử dụng") && (
                                                        <h1 className=" text-red-600 font-semibold text-base break-words">
                                                            {alert}
                                                        </h1>
                                                    )}
                                                </div>
                                                <div className="relative">
                                                    <input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-md"
                                                        placeholder="Password"
                                                        onChange={(event) => {
                                                            setPassword(event.target.value);
                                                            if (event.target.value.length < 8) {
                                                                setAlert("Mật khẩu phải nhiều hơn 7 kí tự");
                                                            } else {
                                                                setAlert();
                                                            }
                                                        }}
                                                        value={password}
                                                        autoFocus={false}
                                                        autoCorrect="false"
                                                        required
                                                    />
                                                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Mật khẩu</label>
                                                    {(alert === "Mật khẩu phải nhiều hơn 7 kí tự") && (
                                                        <h1 className=" text-red-600 font-semibold text-base break-words">
                                                            {alert}
                                                        </h1>
                                                    )}
                                                </div>
                                                <div className="relative">
                                                    <input autoComplete="off" id="repassword" name="repassword" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-md"
                                                        placeholder="repassword"
                                                        onChange={(event) => {
                                                            setRepassword(event.target.value);
                                                            if (event.target.value !== password) {
                                                                setAlert("Mật khẩu chưa chính xác");
                                                            } else {
                                                                setAlert();
                                                            }
                                                        }}
                                                        value={repassword}
                                                        autoFocus={false}
                                                        autoCorrect="false"
                                                        required
                                                    />
                                                    <label htmlFor="repassword" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Xác nhận mật khẩu</label>
                                                    {(alert === "Mật khẩu chưa chính xác") && (
                                                        <h1 className=" text-red-600 font-semibold text-base break-words">
                                                            {alert}
                                                        </h1>
                                                    )}
                                                </div>
                                                <div className="relative">
                                                    <button
                                                        className="bg-blue-500 text-white rounded-md px-2 py-1"
                                                        type="submit"
                                                    >
                                                        Đăng ký
                                                    </button>
                                                    <div className="flex m-1">
                                                        <p className="text-m">Bạn đã có tài khoản rồi?</p>
                                                        <a href="/login" className="text-sky-600 underline underline-offset-8 font-bold">Đăng nhập</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div
                        className="min-h-screen flex flex-col justify-center items-center sm:py-6"
                    >
                        <div>
                            <div className="relative py-3 sm:mx-auto" >
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 -rotate-6 max-sm:-rotate-3 rounded-3xl">
                                </div>
                                <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
                                    <div className="max-w-md mx-auto">
                                        <div>
                                            <h1 className="text-2xl max-sm:text-lg font-semibold font-mono">Hi! Chúc một ngày tốt lành</h1>
                                        </div>
                                        <div className="divide-y divide-gray-200">
                                            <div className="py-4 text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
                                                <div className="relative flex flex-col justify-center items-center">
                                                    <OtpInput
                                                        value={inputOTP}
                                                        onChange={setInputOTP}
                                                        OTPLength={6}
                                                        inputStyles = {{width: "40px", height: "40px", padding: "0px", margin: "1px"}}
                                                        otpType="number"
                                                        disabled={false}
                                                        autoFocus
                                                    >
                                                    </OtpInput>
                                                    {alert === "Sai mã OTP vui lòng kiểm tra lại" && (
                                                        <h1 className=' text-red-500 underline font-semibold'>Sai mã OTP vui lòng kiểm tra lại</h1>
                                                    )}
                                                </div>
                                                <div className="relative flex items-center justify-between">
                                                    <button
                                                        className=" text-blue-500 text-xl border border-blue-500 font-bold rounded-md px-2 py-3"
                                                        onClick={() => {
                                                            setExcuting(false);
                                                        }}
                                                    >
                                                        Quay lại
                                                    </button>
                                                    <button
                                                        className="bg-blue-500 text-xl text-white font-bold rounded-md px-2 py-3"
                                                        onClick={() => {
                                                            if (Decode(inputOTP) === OTP) {
                                                                signUp();
                                                            } else {
                                                                setAlert("Sai mã OTP vui lòng kiểm tra lại");
                                                            }
                                                        }}
                                                    >
                                                        Đăng ký
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {loading && (
                <div className=' fixed z-50 w-screen h-screen top-0 left-0 flex justify-center items-center'
                    style={{ backgroundColor: 'rgb(0,0,0,0.4)' }}>
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default memo(SignUp);