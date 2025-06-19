import React, { useEffect, useState } from 'react'
import laptopLogo from '@/assets/images/laptop.png'
import cableLogo from '@/assets/images/cable.png'
import ramLogo from '@/assets/images/ram.png'
import dockLogo from '@/assets/images/dock.png'
import ssdLogo from '@/assets/images/ssd.png'   
import adapterLogo from '@/assets/images/dongle.png'

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
import CreateModal from '../modals/product/CreateModal'
import { DataTable } from '../data-table'
import { productColumns } from '../columns'
import { getProducts } from '@/hooks/product-api'

export default function Products() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getProducts(setData);
    }, [])
    
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

            {/* <Card className="mx-5 mb-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-semibold text-3xl'>
                            Các danh mục sản phẩm
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <section className='flex gap-5'>
                        <Link className='px-4 pb-4 pt-3 border rounded-2xl hover:bg-gray-200 duration-200'>
                            <div className='text-2xl'>
                                <img src={laptopLogo} alt="" className='size-20 mx-auto' />
                                Laptop
                            </div>
                        </Link>

                        <Link className='px-4 pb-4 pt-3 border rounded-2xl hover:bg-gray-200 duration-200'>
                            <div className='text-2xl'>
                                <img src={cableLogo} alt="" className='size-20 mx-auto' />
                                Dây cáp
                            </div>
                        </Link>

                        <Link className='px-4 pb-4 pt-3 border rounded-2xl hover:bg-gray-200 duration-200'>
                            <div className='text-2xl'>
                                <img src={ramLogo} alt="" className='size-20 mx-auto' />
                                RAM
                            </div>
                        </Link>

                        <Link className='px-4 pb-4 pt-3 border rounded-2xl hover:bg-gray-200 duration-200'>
                            <div className='text-2xl'>
                                <img src={dockLogo} alt="" className='size-20 mx-auto' />
                                Bộ hub
                            </div>
                        </Link>

                        <Link className='px-4 pb-4 pt-3 border rounded-2xl hover:bg-gray-200 duration-200'>
                            <div className='text-2xl'>
                                <img src={ssdLogo} alt="" className='size-20 mx-auto' />
                                SSD
                            </div>
                        </Link>

                        <Link className='px-4 pb-4 pt-3 border rounded-2xl hover:bg-gray-200 duration-200'>
                            <div className='text-2xl'>
                                <img src={adapterLogo} alt="" className='size-20 mx-auto' />
                                Bộ chuyển đổi
                            </div>
                        </Link>
                    </section>
                </CardContent>
            </Card> */}

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

                            <CreateModal />
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>
                    <DataTable 
                        columns={productColumns}
                        data={data} 
                    />

                </CardContent>
            </Card>
        </SidebarInset>
    )
}
