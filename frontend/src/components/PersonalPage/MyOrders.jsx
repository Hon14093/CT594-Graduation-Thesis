import React, { useEffect, useState } from 'react'
import { DataTable } from '../data-table';
import { getOrdersByAccountId } from '@/hooks/order-api';
import { useAuth } from '../../context/AuthContext';
import { orderColumns } from '../columns';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs'
import { Card, CardContent } from '../ui/card';
import { DetailsModal } from '../modals/order/DetailsModal';
import DetailsModalWithReview from '../modals/order/DetailsModalWithReview';
import { Eye } from 'lucide-react';

export default function MyOrders() {
    const { user } = useAuth();
    const [processingOrders, setProcessingOrders] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    useEffect(() => {
        getOrdersByAccountId(user.account_id, setProcessingOrders, setDeliveredOrders);
    }, []);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailsModalOpen(true);
    };

    const columnsWithActions = [
        ...orderColumns,
        { accessorKey: "order_status.status_name", header: "Trạng Thái" },
        {
            id: "actions",
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
    ];

    return (
        <Card className='min-h-40'>
            <CardContent>
                <Tabs defaultValue="processing">
                <TabsList className='w-full mx-auto bg-ivory'>
                    <TabsTrigger 
                        value="processing" 
                        className='!text-lg !py-5'
                    >
                        Đơn hàng đang xử lý
                    </TabsTrigger>
                    <TabsTrigger 
                        value="delivered"
                        className='!text-lg !py-5'
                    >
                        Đơn hàng đã giao
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="processing">
                    <DataTable data={processingOrders} columns={columnsWithActions} />

                    <DetailsModal 
                        order={selectedOrder}
                        open={isDetailsModalOpen}
                        onClose={() => setIsDetailsModalOpen(false)}
                    />
                </TabsContent>

                <TabsContent value="delivered">
                    {/* <DataTable data={deliveredOrders} columns={columnsWithActions} />

                    <DetailsModalWithReview 
                        order={selectedOrder}
                        open={isDetailsModalOpen}
                        onClose={() => setIsDetailsModalOpen(false)}
                    /> */}
                </TabsContent>

            </Tabs>
            </CardContent>
        </Card>
    )
}
