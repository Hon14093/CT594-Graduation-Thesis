import React, { useState, useEffect } from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { DataTable } from '@/components/data-table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { orderDetailsColumns } from '@/components/columns';
import { getOrderDetailsData } from '@/hooks/order-api';
import ReviewForm from './ReviewForm';

export function DetailsModalWithReview({ order, open, onClose }) {
    if (!order) return null;

    const [data, setData] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState([]);
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

    useEffect(() => {
        getOrderDetailsData(order.order_id, setData);
    },[])

    const handleReviewForm = (detail) => {
        setSelectedDetail(detail);
        setIsReviewFormOpen(true);
    }

    const columnsWithActions = [
        ...orderDetailsColumns,
        {
            id: "actions",
            cell: ({ row }) => (
                <div className='flex gap-2'>
                    <Button size="sm" className='bg-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500' 
                        onClick={() => handleReviewForm(row.original)}
                    >
                        Đánh giá
                    </Button>
                    
                </div>
            )
        }
    ];

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

                                <article className='col-span-1'>
                                    <span className='flex gap-1'>
                                        <p className='font-bold'>Tài khoản:</p> 
                                        {order.account.account_name}
                                    </span>

                                    <span>
                                        <span className='flex gap-1'>
                                            <p className='font-bold'>Địa chỉ:</p> 
                                            <p>{order.address.last_name} {order.address.first_name}</p>
                                        </span>
                                        <p>{order.address.address_line}, {order.address.ward}, {order.address.district}, {order.address.city_name} </p>
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
                                columns={columnsWithActions}
                                data={data}
                            />

                            <ReviewForm 
                                detail={selectedDetail}
                                open={isReviewFormOpen}
                                onClose={() => setIsReviewFormOpen(false)}
                            />
                        </ScrollArea>

                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
