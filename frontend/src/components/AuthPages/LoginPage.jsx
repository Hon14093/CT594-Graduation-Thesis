import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Header from '../layout/Header';

export default function LoginPage() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    const handleSubmitLogin = () => {}

    return (
        <div>
            <Header />

            <section id='loginBG'>
                <form className='mx-auto w-full lg:max-w-[600px] h-screen flex flex-col justify-center md:px-[40px] sm:px-[20px]'>
                    <article className='p-4 bg-techBlue/10 backdrop-blur-md h-1/2 flex flex-col gap-5 rounded-2xl border-2 border-white text-white'>
                        <div>
                            <h1 className='text-[40px] lg:text-[60px] font-semibold font-ibm-plex'>Đăng Nhập</h1>
                        </div>

                        <div>
                            <input type="email" placeholder='Email' 
                                className='input-primary block w-3/4 mx-auto' 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <input type="password" placeholder='Mật Khẩu' 
                                className='input-primary block w-3/4 mx-auto' 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type='submit' className='block w-3/4 mx-auto !text-lg button text-techBlue hover:text-white bg-white'>
                            Đăng Nhập
                        </button>

                        <div className='font-mono mt-4 text-[14px] flex flex-col text-center gap-2'>
                            <p className=''>
                                <a href="" className='underline hover:no-underline hover:text-bgColor'>
                                    Quên mật khẩu?
                                </a>
                            </p>
                            <p>
                                Chưa có tài khoản? 
                                <Link to="/signup" className='underline hover:no-underline hover:text-bgColor pl-2'>
                                    Đăng ký ngay!
                                </Link>
                            </p>
                        </div>
                    </article>
                </form>
            </section>
        </div>
    )
}
