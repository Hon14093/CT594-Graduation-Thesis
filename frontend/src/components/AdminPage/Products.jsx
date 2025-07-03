import React, { useEffect, useState } from 'react'
import laptopLogo from '@/assets/images/laptop.png'
import cableLogo from '@/assets/images/cable.png'
import ramLogo from '@/assets/images/ram.png'
import dockLogo from '@/assets/images/dock.png'
import ssdLogo from '@/assets/images/ssd.png'   
import adapterLogo from '@/assets/images/dongle.png'
import BrandCombobox from '../combobox/BrandCombobox'

import { Eye, PenBox, Trash2 } from 'lucide-react'
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
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { PackagePlus } from 'lucide-react'
import { DataTable } from '../data-table'
import { getProducts } from '@/hooks/product-api'
import { productColumns } from '../columns'
import CreateModal from '../modals/product/CreateModal'
import DetailsModal from '../modals/product/DetailsModal'
import EditModal from '../modals/product/EditModal'
import DeleteModal from '../modals/product/DeleteModal'

export default function Products() {
    const [data, setData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

    useEffect(() => {
        getProducts(setData);
    }, [])

    const handleSubmitSuccess = () => {
        getProducts(setData);
    }

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setIsDetailsModalOpen(true);
    }

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    }

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    }
    
    const actionColumns = [
        ...productColumns,
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
                    <Button size="sm" className="bg-green-500 border border-green-500 hover:bg-white hover:text-green-500"
                        onClick={() => handleEdit(row.original)}
                    >
                        <PenBox />
                    </Button>
                    <Button size="sm" className='bg-red-500 border border-red-500 hover:bg-white hover:text-red-500'
                        onClick={() => handleDelete(row.original)}
                    >
                        <Trash2 />
                    </Button>
                </div>
            )
        }
    ]

    return (
        <SidebarInset>
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
                                <BreadcrumbPage>Sản phẩm</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <Card className="mx-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-semibold text-3xl'>
                            Danh sách tất cả sản phẩm
                        </div>

                        <div className='ml-auto'>
                            <Link to='/admin/products/variations'>
                                <Button variant='outline' className='mr-3'>
                                    <PackagePlus />
                                    Biến thể
                                </Button>
                            </Link>

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
                        product={selectedProduct}
                        open={isDetailsModalOpen}
                        onClose={() => setIsDetailsModalOpen(false)}
                    />

                    <EditModal
                        product={selectedProduct}
                        open={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSubmitSuccess={handleSubmitSuccess}
                    />

                    <DeleteModal 
                        product={selectedProduct}
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        onSubmitSuccess={handleSubmitSuccess}
                    />
                </CardContent>
            </Card>
        </SidebarInset>
    )
}
