import React, { useState, useEffect } from 'react'
import { Separator } from '../ui/separator'
import { SidebarInset, SidebarTrigger } from '../ui/sidebar'
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from '../ui/breadcrumb'
import { Eye, PenBox, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardHeader, CardContent } from '../ui/card'
import { DataTable } from '../data-table'
import { deleteDiscount, getAllDiscounts } from '@/hooks/discount-api'
import { discountColumns } from '../columns'
import CreateModal from '../modals/discount/CreateModal'
import { DetailsModal } from '../modals/discount/DetailsModal'
import EditModal from '../modals/discount/EditModal'
import ConfirmDeleteModal from '../generic-delete-modal'

export default function Discounts() {
    const [data, setData] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

    useEffect(() => {
        getAllDiscounts(setData);
    }, [])

    const handleSubmitSuccess = () => {
        getAllDiscounts(setData);
    }

    const handleViewDetails = (discount) => {
        setSelectedDiscount(discount);
        setIsDetailsModalOpen(true);
    }

    const handleEdit = (discount) => {
        setSelectedDiscount(discount);
        setIsEditModalOpen(true);
    }

    const handleDelete = async () => {
        if (!selectedDiscount) return;
        
        try {
            await deleteDiscount(selectedDiscount.discount_id);
            handleSubmitSuccess(); // Refresh or toast, etc.
            setIsDeleteModalOpen(false); // Close modal
            setSelectedDiscount(null);  // Clear state
        } catch (error) {
            console.error("Failed to delete address:", error)
        }
    }

    const columnsWithActions = [
        ...discountColumns,
        {
            id: 'actions',
            cell: ({ row }) => (
                <div className='flex gap-2 justify-center'>
                    <Button size="sm" className='bg-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500'
                        onClick={() => handleViewDetails(row.original)}
                    >
                        <Eye />
                    </Button>
                    <Button size="sm" className="bg-green-500 border border-green-500 hover:bg-white hover:text-green-500"
                        onClick={() => handleEdit(row.original)}
                    >
                        <PenBox />
                    </Button>
                    <Button size="sm" className='bg-red-500 border border-red-500 hover:bg-white hover:text-red-500'
                        onClick={() => {
                            setSelectedDiscount(row.original);
                            setIsDeleteModalOpen(true);
                        }}
                    >
                        <Trash2 />
                    </Button>
                </div>
            )
        }
    ]

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
                                <BreadcrumbPage>Khuyến mãi</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <Card className="mx-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-bold text-2xl'>
                            Danh sách khuyến mãi
                        </div>

                        <div className='ml-auto'>
                            <CreateModal onSubmitSuccess={handleSubmitSuccess} />
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>
                    <DataTable 
                        columns={columnsWithActions} 
                        data={data} 
                    />

                    <DetailsModal 
                        discount={selectedDiscount}
                        open={isDetailsModalOpen}
                        onClose={() => setIsDetailsModalOpen(false)}
                    />

                    <EditModal
                        discount={selectedDiscount}
                        open={isEditModalOpen}
                        onClose={() => {
                            setSelectedDiscount(null)
                            setIsEditModalOpen(false)
                        }}
                        onSubmitSuccess={() => handleSubmitSuccess()}
                    />

                    <ConfirmDeleteModal 
                        open={isDeleteModalOpen}
                        onClose={() => {
                            setSelectedDiscount(null)
                            setIsDeleteModalOpen(false)
                        }}
                        onConfirm={handleDelete}
                    />

                </CardContent>
            </Card>
        </SidebarInset>
    )
}
