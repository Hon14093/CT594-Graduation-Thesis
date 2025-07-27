import React, { useEffect, useState } from 'react'
import { SidebarInset, SidebarTrigger } from '../../ui/sidebar'
import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbPage, 
    BreadcrumbSeparator 
} from '../../ui/breadcrumb';
import { Eye, PenBox, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { storageColumns } from '@/components/columns';
import { deleteStorage, getStorages } from '@/hooks/variation-api';
import { DetailsModal } from '@/components/modals/storage/DetailsModal';
import CreateModal from '@/components/modals/storage/CreateModal';
import EditModal from '@/components/modals/storage/EditModal';
import ConfirmDeleteModal from '@/components/generic-delete-modal';

export default function Storage() {
    const [data, setData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

    useEffect(() => {
        getStorages(setData);
    }, [])

    const handleSubmitSuccess = () => {
        getStorages(setData);
    }

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setIsDetailsModalOpen(true);
    }

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    }

    const handleDelete = async () => {
        if (!selectedProduct) return;
        
        try {
            await deleteStorage(selectedProduct.storage_id);
            handleSubmitSuccess(); // Refresh or toast, etc.
            setIsDeleteModalOpen(false); // Close modal
            setSelectedProduct(null);  // Clear state
        } catch (error) {
            console.error("Failed to delete address:", error)
        }
    }
        
    const actionColumns = [
        ...storageColumns,
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
                            setSelectedProduct(row.original);
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
                                <BreadcrumbLink href="/admin/products">Sản phẩm</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Ổ cứng</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <Card className="mx-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-semibold text-3xl'>
                            Danh sách ổ cứng
                        </div>

                        <div className='ml-auto'>
                            <CreateModal onSubmitSuccess={handleSubmitSuccess} />
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>
                    <DataTable 
                        columns={actionColumns}
                        data={data} 
                    />

                    <DetailsModal
                        storage={selectedProduct}
                        open={isDetailsModalOpen}
                        onClose={() => setIsDetailsModalOpen(false)}
                    />

                    <EditModal
                        storage={selectedProduct}
                        open={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSubmitSuccess={handleSubmitSuccess}
                    />

                    <ConfirmDeleteModal 
                        open={isDeleteModalOpen}
                        onClose={() => {
                            setIsDeleteModalOpen(false)
                            setSelectedProduct(null);
                        }}
                        onConfirm={handleDelete}
                    />

                </CardContent>
            </Card>
        </SidebarInset>
    )
}
