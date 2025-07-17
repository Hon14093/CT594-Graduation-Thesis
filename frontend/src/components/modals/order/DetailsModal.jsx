import React, { useEffect, useState } from 'react'
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { DataTable } from '@/components/data-table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { orderDetailsColumns } from '@/components/columns';
import { getOrderDetailsData } from '@/hooks/order-api';

export function DetailsModal({ order, open, onClose }) {
    if (!order) return null;
    const [data, setData] = useState([]);

    useEffect(() => {
        getOrderDetailsData(order.order_id, setData);
        console.log(data)
    },[])

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='w-[1200px] !max-w-none'>
                <DialogHeader>
                    <DialogTitle>Thông tin đơn hàng</DialogTitle>
                </DialogHeader>

                <ScrollArea className='text-lg'>
                    <div className='grid gap-2'>
                        <ScrollArea className='max-h-[330px]'>
                            <section className='grid grid-cols-2 pb-2'>
                                <article className='grid col-span-1 self-start'>
                                    <span className='flex gap-2'>
                                        <p className='font-bold'>ID đơn hàng: </p> 
                                        {order.order_id}
                                    </span>

                                    <span className='flex gap-2'>
                                        <p className='font-bold'>Ngày đặt: </p> 
                                        {order.order_date}
                                    </span>

                                    <span className='flex gap-2'>
                                        <p className='font-bold'>Tổng tiền: </p>
                                        {order.order_total}
                                    </span>

                                    <span className='flex gap-2'>
                                        <p className='font-bold'>Trạng thái: </p>
                                        {order.order_status.status_name}
                                    </span>

                                    <span className='flex gap-2'>
                                        <p className='font-bold'>Phương thức vận chuyển: </p>
                                        {order.shipping_method.sm_name}
                                    </span>
                                </article>

                                <article className='col-span-1 pb-2'>
                                    <span className='flex gap-2'>
                                        <p className='font-bold'>Tài khoản:</p> 
                                        {order.account.username}
                                    </span>

                                    <span>
                                        <span className='flex gap-2'>
                                            <p className='font-bold'>Địa chỉ:</p> 
                                            <p>{order.address.last_name} {order.address.first_name}</p>
                                        </span>
                                        <p>{order.address.address_line}, {order.address.ward}, {order.address.district}, {order.address.city} </p>
                                    </span>

                                    <span className='flex gap-2'>
                                        <p className='font-bold'>Voucher:</p> 
                                        {order.discount ? (
                                            order.discount.discount_code ? (
                                                order.discount.discount_code
                                            ) : (
                                                <p>Không có</p>
                                            )
                                        ) : (
                                            <p>Không có</p>
                                        )}
                                    </span>

                                    <span className=''>
                                        <p className='font-bold'>Ghi chú:</p> 
                                        <Textarea defaultValue={order.note} placeholder='Không có ghi chú' disabled />
                                    </span>
                                </article>
                            </section>

                            <DataTable 
                                columns={orderDetailsColumns}
                                data={data}
                            />
                        </ScrollArea>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
