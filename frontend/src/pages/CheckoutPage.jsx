import React, { useState } from 'react'
import logoBlue from '../assets/Logo.png'
import { Link } from 'react-router-dom'
import AddressSelection from '@/components/CheckoutPage/AddressSelection'
import PaymentMethod from '@/components/CheckoutPage/PaymentMethod'
import ShippingMethod from '@/components/CheckoutPage/ShippingMethod'
import CartReview from '@/components/CheckoutPage/CartReview'
import { Separator } from '@/components/ui/separator'
import { getDiscountByCode } from '@/hooks/discount-api'
import { useCart } from '@/context/CartContext'
import { toast } from 'sonner'
import four from '../assets/images/4.png'

export default function CheckoutPage() {
    const { cart } = useCart();
    const cartItems = cart.items;
    const [addressId, setAddressId] = useState();
    const [pm, setPM] = useState(1); // payment method id
    const [sm, setSM] = useState(1); // shipping method id
    const [shippingPrice, setShippingPrice] = useState(20000);
    const [discount_id, setDiscount_id] = useState(null);
    const [discountCode, setDiscountCode] = useState();
    const [discountAmount, setDiscountAmount] = useState(0);

    let tempOrder = {
        order_total: cart.total_price + shippingPrice - discountAmount,
        account_id: cart.account_id,
        sm_id: sm,
        discount_id: discount_id,
        address_id: addressId,
        pm_id: pm,
        discount_id: discount_id
    }

    const calculateDiscount = (minOrder, value) => {
        const totalPrice = cart.total_price
        if (totalPrice >= minOrder) {
            
            setDiscountAmount(value)

            toast("Mã giảm giá đã được áp dụng");
        } else {
            toast("Đơn hàng của bạn không đủ điều kiện để sử dụng mã giảm giá này");
        }
    }

    const handleApplyDiscount = async () => {
        const discount = await getDiscountByCode(discountCode);

        if (discount) {
            setDiscount_id(discount.discount_id);
            tempOrder.discount_id = discount.discount_id;

            calculateDiscount(discount.min_order_total, discount.discount_value);
        } else {
            toast('Mã giảm giá không hợp lệ');
        }
    }

    return (
        <div className='w-full'>
            <div className='max-w-[1280px] mx-auto grid grid-cols-12 min-h-screen'>

                <div className='col-span-7 bg-white'>
                    <section className='py-4 px-3'>
                        <Link to="/">
                            <img src={logoBlue} className='w-60' />
                        </Link>
                    </section> 

                    {/* <button onClick={() => console.log(cart)}>
                        Check
                    </button> */}

                    <Separator className='mt-4 mb-8' />
                    
                    <AddressSelection onSelect={setAddressId} />

                    <Separator className='mt-8' />

                    <PaymentMethod onSelect={setPM} />

                    <Separator className='mt-8' />
                    
                    <ShippingMethod onSelect={setSM} setPrice={setShippingPrice} />

                    <Separator className='mt-8' />

                    <section className='max-w-[1280px] mx-auto text-lg px-6 mt-10'>
                        <article className='flex text-xl text-techBlue font-bold items-center'>
                            <div className='mr-4 size-6'>
                                <img src={four} alt="" />
                            </div>
                            <div>Nhập khuyến mãi</div>
                        </article>

                        <article className='text-left p-2 ml-8 text-lg flex'>
                            <input 
                                className='!text-lg border-2 border-crimson w-1/2 py-2 px-3 rounded-l-lg'
                                placeholder='Nhập khuyến mãi (nếu có)...'
                                onChange={(e) => setDiscountCode(e.target.value)}
                            />
                            <button 
                                className='bg-crimson text-lg py-2 px-4 text-white rounded-r-lg hover:text-crimson hover:bg-white border-r-2 border-y-2 border-crimson'
                                onClick={() => handleApplyDiscount()}
                            >
                                Áp dụng
                            </button>
                        </article>
                    </section>

                    <Separator className='mt-8' />
                </div>

                <div className='col-span-5 bg-techBlue text-white'>
                    <CartReview cartItems={cartItems} currentData={tempOrder} discount={discountAmount} />
                </div>
            </div>
        </div>
    )
}
