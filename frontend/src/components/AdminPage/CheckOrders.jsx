import React, { useEffect, useState } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb.jsx"
import { Separator } from "../ui/separator.jsx"
import {
    SidebarInset,
    SidebarTrigger,
} from "../ui/sidebar"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Eye, Check } from 'lucide-react'
import { Button } from '../ui/button.jsx'
import { DataTable } from '../data-table.jsx'
import { checkOrdersColumns } from '../columns.jsx'
import { 
    getOrderData,
    getUnprocessedOrders, 
    getRejectedOrders,
    // updateOrderStatus
} from '@/hooks/order-api.js'
import { DetailsModal } from '../modals/order/DetailsModal.jsx'

export default function CheckOrders() {
    // const [data, setUnprocessedOrders] = useState([]);
    const [unprocessedOrders, setUnprocessedOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    useEffect(() => {
        getUnprocessedOrders(setUnprocessedOrders);
        // getRejectedOrders(setRejectedOrders);
    }, []);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailsModalOpen(true);
    };

    const handlePassOrder = async (order) => {
        const res = await updateOrderStatus(order.order_id, 2);
        if (res.status === 200) {
            getUnprocessedOrders(setUnprocessedOrders);
            getRejectedOrders(setRejectedOrders);
        }
    }

    const handleRejectOrder = async (order) => {
        const res = await updateOrderStatus(order.order_id, 6);
        if (res.status === 200) {
            getUnprocessedOrders(setUnprocessedOrders);
            getRejectedOrders(setRejectedOrders);
        }
    }

    const columnsWithActions = [
        ...checkOrdersColumns,
        {
            id: "actions",
            cell: ({ row }) => (
                <div className='flex gap-2 justify-center'>
                    <Button size="sm" className='bg-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500' 
                        onClick={() => handleViewDetails(row.original)}
                    >
                        <Eye />
                    </Button>
                    <Button size="sm" className="bg-green-500 border border-green-500 hover:bg-white hover:text-green-500" 
                        onClick={() => handlePassOrder(row.original)}
                    >
                        <Check />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <SidebarInset className='bg-mistGray'>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">Quản lý</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Duyệt đơn hàng</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            
            <Card className="mx-5 mb-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-bold text-2xl'>
                            Danh sách đơn hàng chưa duyệt
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>
                    <DataTable 
                        columns={columnsWithActions} 
                        data={unprocessedOrders} 
                    />
                </CardContent>
            </Card>

            <Card className="mx-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-bold text-2xl'>
                            Danh sách đơn hàng bị hủy
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>
                    <DataTable 
                        columns={columnsWithActions} 
                        data={rejectedOrders} 
                    />
                </CardContent>

                <DetailsModal 
                    order={selectedOrder}
                    open={isDetailsModalOpen}
                    onClose={() => {
                        setSelectedOrder(null)
                        setIsDetailsModalOpen(false)
                    }}
                />
            </Card>
        </SidebarInset>
    )
}