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
import { Button } from '../ui/button.jsx'
import { DataTable } from '../data-table.jsx'
import { orderColumns } from '../columns.jsx'
import { DetailsModal } from '../modals/order/DetailsModal.jsx'
import { 
    getProcessedOrders,
    updateOrderStatus
} from '@/hooks/order-api.js'
import { Eye } from 'lucide-react'
import OrderStatusComboBox from '../combobox/OrderStatusCombobox.jsx'

function Orders() {
    const [data, setData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    // const [status, setStatus] = useState(2);

    useEffect(() => {
        getProcessedOrders(setData)
    }, []);

    const test = () => {
        console.log(data)
    }

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailsModalOpen(true);
    };

    const columnsWithActions = [
        ...orderColumns,
        { 
            header: "Trạng Thái",
            id: "status",
            cell: ({ row }) => {
                const order = row.original; 
                const [status, setStatus] = useState(order.status_id); 
    
                const handleStatusChange = async (newStatus) => {
                    setStatus(newStatus); 
                    await updateOrderStatus(order.order_id, newStatus); 
                };
    
                return (
                    <div className='flex justify-center align-middle'>
                        <OrderStatusComboBox 
                            value={status} 
                            onChange={handleStatusChange} 
                        />
                    </div>
                );
            }
        },
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
        <SidebarInset className='bg-mistGray'>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Quản lý
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator className="hidden md:block" />

                            <BreadcrumbItem>
                                <BreadcrumbPage>Đơn hàng</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            
            <Card className="mx-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-bold text-2xl'>
                            Danh sách đơn hàng
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>

                    <DataTable 
                        columns={columnsWithActions} 
                        data={data} 
                    />

                    <DetailsModal 
                        order={selectedOrder}
                        open={isDetailsModalOpen}
                        onClose={() => setIsDetailsModalOpen(false)}
                    />

                </CardContent>
            </Card>
        </SidebarInset>
    );
}

export default Orders