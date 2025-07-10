import React from 'react'
import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext'

export default function ProductList() {
    const { cart, removeItem } = useCart();
    const cartItems = cart.items;

    return (
        <section className='max-w-[1280px] mx-auto pt-4 lg:pt-2 lg:px-2 sm:px-4 min-h-[60vh]'>
            <h1 className='font-semibold text-left uppercase text-3xl text-techBlue'>Giỏ hàng của bạn</h1>
            
            {!cartItems || cartItems.length === 0 ? (
                <div className='text-2xl pt-20'>Không có sản phẩm trong giỏ hàng.</div>
            ) : (
                <>
                <article className='pt-4'>
                    <table className="w-full border text-sm">
                        <thead>
                            <tr className="border-b border-black">
                                <th className="p-2">Hình ảnh</th>
                                <th className="p-2">Sản phẩm</th>
                                <th className="p-2">Số lượng</th>
                                <th className="p-2">Giá bán</th>
                                <th className="p-2">Thành tiền</th>
                                <th className="p-2"></th>
                            </tr>
                        </thead>
                        <tbody>                    
                            {cartItems.map((item) => (
                                <tr key={item.item_ref_id} className="border-b border-black">
                                    <td className="p-2">
                                        <img src={item.image_url} className="size-24 object-cover rounded mx-auto" />
                                    </td>
                                    <td className="p-2">{item.item_name}</td>
                                    <td className="p-2">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.item_ref_id, +e.target.value)}
                                            className="w-16 border rounded px-2"
                                        />
                                    </td>
                                    <td className="p-2">{item.price.toLocaleString()}₫</td>
                                    <td className="p-2">{(item.price * item.quantity).toLocaleString()}₫</td>
                                    <td className="p-2">
                                        <button onClick={() => removeItem(item.item_ref_id)} className="text-red-600">
                                            <Trash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </article>

                <article className='pt-4 w-full flex'>
                    <div className='ml-auto w-1/2 md:w-1/4 flex'>
                        <div className='mr-auto font-semibold'>
                            Tổng tiền: 
                        </div>

                        <div className='ml-auto'>
                            {cart.total_price.toLocaleString()} vnđ
                        </div>
                        
                    </div>
                </article>

                <article className='flex pt-2'>
                    <button className='big-action-button !ml-auto w-1/4'>
                        <Link to='/checkout'>
                            Thanh toán
                        </Link>
                    </button>
                </article>

                </>
            )}
        </section>
    )
}
