import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Bread_Crumb from '@/components/layout/Bread_Crumb'
import Sidebar from '@/components/PersonalPage/Sidebar'
import InfoCard from '@/components/PersonalPage/InfoCard'
import AccountAddress from '@/components/PersonalPage/AccountAddress'
import MyOrders from '@/components/PersonalPage/MyOrders'
import { getAccountInfoById } from '@/hooks/account-api'

export default function PersonalPage() {
    const { tab } = useParams();
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [account, setAccount] = useState();

    useEffect(() => {
        getAccountInfoById(user.account_id, setAccount);
    }, [user])

    const bread = [
        { link: '/', label: 'Trang chủ'},
        { link: `/personal`, label: `Cá nhân`}
    ]

    const tabName = (() => {
        switch (tab) {
            case ('info'):
                return 'Thông Tin Cá Nhân'
            case ('address'):
                return 'Địa Chỉ'
            case ('orders'):
                return 'Đơn Hàng'
        }
    })

    return (
        <div className='w-full min-h-screen flex flex-col'>
            <Header darkBG={false} />

            <Bread_Crumb data={bread} />

            <section className="flex-grow overflow-y-auto min-h-0 text-lg flex pt-3 max-w-[1280px] mx-auto w-full">
                <Sidebar account={account} />

                <article className="flex-1 p-8 max-w-4/5">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold capitalize">{tabName()}</h1>
                        <Button variant='destructive' className={`text-lg p-4`} onClick={() => {
                            navigate('/');
                            logout();
                        }}>
                            Đăng xuất
                        </Button>
                    </div>
                    
                    {tab === "info" && (
                        <>
                            <p className="text-muted-foreground mb-6 max-w-xl text-left">
                                Quản lý các thông tin cá nhân của bạn, bao gồm số điện thoại và địa chỉ email.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <InfoCard label="Tên người dùng" value={account?.username} />
                                <InfoCard label="Email" value={account?.email} />
                                <InfoCard label="Số điện thoại" value={account?.phone} />
                                <InfoCard label="Ngày tạo tài khoản" value={account?.date_created} />
                            </div>
                        </>
                    )}

                    {tab === "address" && <AccountAddress />}
                    {tab === "orders" && <MyOrders />}
                    {tab === "gifts" && <p>Gift cards content goes here.</p>}
                </article>
            </section>
{/* I want this section to fill the screen height wise */}
        </div>
    )
}
