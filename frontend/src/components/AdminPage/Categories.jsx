import React, { useEffect, useState } from 'react'
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
import CreateModal from '../modals/category/CreateModal'
import { DataTable } from '../data-table'
import { categoryColumns } from '../columns'
import { getCategories } from '@/hooks/product-api'

export default function Categories() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getCategories(setData);
    }, [])

    const handleSubmitSuccess = () => {
        getCategories(setData);
    }
    
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
                                <BreadcrumbPage>Danh mục</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <Card className="mx-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-semibold text-3xl'>
                            Danh sách danh mục
                        </div>

                        <div className='ml-auto'>
                            <CreateModal onSubmitSuccess={handleSubmitSuccess} />
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>
                    <DataTable 
                        columns={categoryColumns}
                        data={data} 
                    />

                </CardContent>
            </Card>
        </SidebarInset>
    )
}
