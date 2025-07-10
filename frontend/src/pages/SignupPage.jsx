import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '@/components/layout/Header';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
    const [username, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        if (!username || !email || !phone || !password) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        axios.post('http://localhost:5002/auth/register', {username, email, phone, password})
        .then(result => {
            console.log(result);
            login(result.data.token);
            navigate('/');
        })
        .catch(result => console.log(result));
    }

    return (
        <div>
            <Header />

            <section id='loginBG'>
                <form className='mx-auto w-full lg:max-w-[600px] h-screen flex flex-col justify-center md:px-[40px] sm:px-[20px]' onSubmit={handleSubmitSignup}>
                    <article className='p-4 bg-techBlue/10 backdrop-blur-md min-h-1/2 flex flex-col gap-5 rounded-2xl border-2 border-white text-white'>
                        <div>
                            <h1 className='text-[40px] lg:text-[60px] font-semibold font-ibm-plex'>Đăng Ký</h1>
                        </div>

                        <div>
                            <input placeholder='Họ và Tên'
                                className='input-primary block w-3/4 mx-auto' 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input placeholder='Số Điện Thoại'
                                className='input-primary block w-3/4 mx-auto' 
                                onChange={(e) => setPhone(e.target.value)}
                            />
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
                            <p>
                                Đã có tài khoản?
                                <Link to="/login" className='underline hover:no-underline hover:text-bgColor pl-2'>Đăng nhập</Link>
                            </p>
                        </div>
                    </article>
                </form>
            </section>
        </div>
    )
}
