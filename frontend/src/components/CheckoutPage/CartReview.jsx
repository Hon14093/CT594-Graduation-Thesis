import React, { useEffect, useState } from 'react'
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'
import { Banknote } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

export default function CartReview({ cartItems, currentData }) {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(false);
    let orderData = {
        ...currentData,
        note: note,
        items: cartItems
    }

    const handlePayment = async () => {
        setLoading(true)
        try { 
            const stripe = await loadStripe('pk_test_51RC0uAP2tCpSt8NrqLBhlp1RYdeEEetUWHrtYCjH8vAkOT3h4ZPZ1wr6lk79d4vFYzHqOhAmq727SxPHCziITbZo00ofyPJrwg');
            console.log('Processing payment...');
            console.log(stripe)
            if (!stripe) {
                throw new Error("Stripe.js failed to load.");
            }

            const response = await axios.post('http://localhost:5004/payment/stripe/create-checkout-session',
                orderData,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            console.log("SESSION RESPONSE:", response.data); 

            const sessionId = response?.data?.id;
            if (!sessionId) {
                throw new Error("Stripe session ID not returned from backend.");
            }

            const result = await stripe.redirectToCheckout({
                // sessionId,
                sessionId: response.data.id
            });

            if (result.error) {
                console.error("Stripe redirect error:", result.error.message);
                alert("Có lỗi xảy ra khi chuyển hướng đến trang thanh toán.");
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    
    return (
        <section className='py-6 text-lg'>
            <h1 className='text-5xl'>GIỎ HÀNG</h1>

            <div className='mt-6 mx-5'>
                <Separator className='my-3' />
                {cartItems.map((item) => (
                    <div key={item.item_ref_id}>
                        <article className='grid grid-cols-9 py-4 gap-3'>
                            <div className='bg-white p-2 rounded col-span-2 flex'>
                                <img src={item.image_url} alt="" className='size-[85px] mx-auto align-middle' />
                            </div>

                            <div className='col-span-7 text-left'>
                                <div className='font-semibold'>
                                    {item.item_name}
                                </div>

                                <div className='flex mt-4'>
                                    <div>
                                        Số lượng: {item.quantity}
                                    </div>
                                    <div className='ml-auto'>
                                        {item.sub_total.toLocaleString()} vnđ
                                    </div>
                                </div>

                                
                            </div>                        
                        </article>
                        <Separator className='my-3' />
                    </div>
                ))}
            </div>

            <article className='mt-4 text-left grid gap-1 pb-2 mx-5'>
                <b>Ghi chú:</b>
                <Textarea 
                    className='text-white !text-lg !placeholder-white'
                    placeholder='Nhập ghi chú (nếu có)...'
                    onChange={(e) => setNote(e.target.value)}
                />
            </article>

            <div className=' px-5'>
                <Separator className='my-3' />
            </div>

            <article className='text-left mt-4 grid gap-3 mx-5'>
                <div className='flex'>
                    <b>Phí vận chuyển:</b>
                    <div className='ml-auto'>
                        {currentData.sm_id === 1 ? (
                            <p>20,000 vnđ</p>
                        ) : (
                            <p>40,000 vnđ</p>
                        )}
                    </div>
                </div>

                <div className='flex'>
                    <b>Khuyến mãi:</b>
                    <div className='ml-auto'>
                        -0 vnđ
                    </div>
                </div>

                <div className='flex'>
                    <b>Tổng tiền:</b>
                    <div className='ml-auto'>
                        {currentData.order_total.toLocaleString()} vnđ
                    </div>
                </div>
            </article>

            <div className=' px-5'>
                <Separator className='my-3' />
            </div>

            <button onClick={() => console.log(orderData)}>
                Check
            </button>
            
            <article className='mt-4'>
                <button 
                    className='bg-white text-techBlue border-2 border-white w-3/4 py-2 rounded-xl hover:bg-techBlue hover:text-white duration-300'
                    onClick={() => handlePayment()}
                    disabled={loading}
                >
                    {loading ? (
                        <p>Đang xử lý...</p>
                    ) : (
                        <div className='flex gap-2 items-center justify-center'>
                            <Banknote size={30} />
                            <b>Thanh toán</b>
                        </div>
                    )}
                </button>
            </article>
        </section>
    )
}
