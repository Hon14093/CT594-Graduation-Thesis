import React from 'react'
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
import CreateModal from './modals/products/CreateModal'

export default function Products() {
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
                        <div className='font-bold text-2xl'>
                            Danh sách sản phẩm
                        </div>

                        <div className='ml-auto'>
                            <Link to='/admin/products/variations'>
                                <Button variant='outline' className='mr-3'>
                                    <PackagePlus />
                                    Biến thể
                                </Button>
                            </Link>

                            <CreateModal />
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>
                    {/* <DataTable 
                        columns={productColumns({
                            onViewDetails: handleViewDetails,
                            onEdit: handleEdit,
                            onDelete: handleDelete
                        })} 
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
                    />    */}

                </CardContent>
            </Card>
        </SidebarInset>
    )
}
