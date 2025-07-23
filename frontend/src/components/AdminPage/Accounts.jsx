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
import { Eye, Trash2 } from 'lucide-react'
import { Card, CardHeader, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { DataTable } from '../data-table'
import { accountColumns } from '../columns'
import { getAccounts, updateAccountStatus } from '@/hooks/account-api'
import DetailsModal from '../modals/account/DetailsModal'
import { Switch } from '../ui/switch'

export default function Accounts() {
    const [data, setData] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
    
    useEffect(() => {
        getAccounts(setData);
    }, [])

    const handleSubmitSuccess = () => {
        getAccounts(setData);
    }

    const handleViewDetails = (product) => {
        setSelectedAccount(product);
        setIsDetailsModalOpen(true);
    }

    const handleDelete = (product) => {
        setSelectedAccount(product);
        setIsDeleteModalOpen(true);
    }

    const actionColumns = [
        ...accountColumns,
        {
            accessorKey: "is_active",
            header: "Hoạt động?",
            cell: ({ row }) => {
                const account = row.original;
                const [status, setStatus] = useState(account.is_active);

                const handleStatusChange = async (new_status) => {
                    setStatus(new_status);
                    await updateAccountStatus(account.account_id, new_status);
                };

                return (
                    <Switch
                        checked={status}
                        onCheckedChange={(value) => handleStatusChange(value)}
                    />
                );
            },
        },
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
                                <BreadcrumbPage>Tài khoản</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <Card className="mx-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-semibold text-3xl'>
                            Danh sách tài khoản
                        </div>

                        <div className='ml-auto'>
                            {/* <CreateModal onSubmitSuccess={handleSubmitSuccess} /> */}
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>
                    <DataTable 
                        columns={actionColumns}
                        data={data} 
                    />

                    <DetailsModal 
                        account={selectedAccount}
                        open={isDetailsModalOpen}
                        onClose={() => setIsDetailsModalOpen(false)}
                    />

                </CardContent>
            </Card>
        </SidebarInset>
    )
}
