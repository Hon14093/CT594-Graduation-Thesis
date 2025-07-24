import React, { useEffect, useState } from 'react'
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { orderColumns } from '@/components/columns';
import { OrderDetailsModal } from './OrderDetailsModal';
import { getAllOrdersByAccountId } from '@/hooks/order-api';

export default function DetailsModal({ account, open, onClose }) {
    if (!account) return null;

    const [data, setData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    useEffect(() => {
        getAllOrdersByAccountId(account.account_id, setData);
    }, [account])

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailsModalOpen(true);
    }

    const actionColumns = [
        ...orderColumns,
        { accessorKey: "order_status.status_name", header: "Trạng Thái" },
        {
            id: 'actions',
            // size: 10000,
            cell: ({ row }) => (
                <div className='flex gap-2 justify-center'>
                    <Button size="sm" className='bg-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500'
                        onClick={() => handleViewDetails(row.original)}
                    >
                        <Eye />
                    </Button>
                </div>
            )
        }
    ]

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='w-[1200px] !max-w-none'>
                <DialogHeader>
                    <DialogTitle>Thông tin tài khoản</DialogTitle>
                </DialogHeader>

                <ScrollArea className='text-lg max-h-[330px]'>
                    <section className='grid grid-cols-2 pb-2'>
                        <article className='grid col-span-1 self-start'>
                            <span className='flex gap-2'>
                                <p className='font-bold'>ID tài khoản: </p> 
                                {account.account_id}
                            </span>

                            <span className='flex gap-2'>
                                <p className='font-bold'>Tên đăng nhập: </p> 
                                {account.username}
                            </span>

                            <span className='flex gap-2'>
                                <p className='font-bold'>Email: </p>
                                {account.email}
                            </span>
                        </article>

                        <article className='col-span-1'>
                            <span className='flex gap-1'>
                                <p className='font-bold'>Số điện thoại:</p> 
                                {account.email}
                            </span>

                            <span className='flex gap-1'>
                                <p className='font-bold'>Trạng thái:</p> 
                                {account.is_active ? 'Hoạt động' : 'Không hoạt động'}
                            </span>

                            <span className='flex gap-1'>
                                <p className='font-bold'>Chức vụ:</p> 
                                {account.role.role_name}
                            </span>

                        </article>
                    </section>

                    <DataTable 
                        columns={actionColumns}
                        data={data}
                    />

                    <OrderDetailsModal
                        order={selectedOrder}
                        open={isDetailsModalOpen}
                        onClose={() => setIsDetailsModalOpen(false)}
                    />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
