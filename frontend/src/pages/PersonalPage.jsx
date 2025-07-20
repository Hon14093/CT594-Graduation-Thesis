import React from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Bread_Crumb from '@/components/layout/Bread_Crumb'
import Sidebar from '@/components/PersonalPage/Sidebar'
import InfoCard from '@/components/PersonalPage/InfoCard'
import AccountAddress from '@/components/PersonalPage/AccountAddress'

export default function PersonalPage() {
    const { tab } = useParams();
    const { logout, user } = useAuth();
    const navigate = useNavigate();

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
        <div className='w-full'>
            <Header darkBG={false} />

            <Bread_Crumb data={bread} />

            <section className="min-h-screen bg-mistGray text-lg flex pt-3 max-w-[1280px] mx-auto">
                <Sidebar account={user} />

                <article className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold capitalize">{tabName()}</h1>
                        <Button variant="destructive" className='text-lg p-4'>Đăng xuất</Button>
                    </div>
                    
                    {tab === "info" && (
                        <>
                            <p className="text-muted-foreground mb-6 max-w-xl text-left">
                                Manage your personal information, including phone numbers and email address where you can be contacted.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <InfoCard label="Name" value="Irakli talavadze" />
                                <InfoCard label="Date of Birth" value="07 July 1993" />
                                <InfoCard label="Country Region" value="Georgia, Tbilisi" />
                                <InfoCard label="Language" value="English (UK) - English" />
                                <InfoCard label="Contactable at" value="ikakodesign@gmail.com" />
                            </div>
                        </>
                    )}

                    {tab === "address" && <AccountAddress />}
                    {tab === "orders" && <p>Order history content goes here.</p>}
                    {tab === "gifts" && <p>Gift cards content goes here.</p>}
                </article>
            </section>





            {/* <Button variant='destructive' onClick={() => {
                logout();
                navigate('/');
            }}>
                Log out
            </Button> */}
        </div>
    )
}
