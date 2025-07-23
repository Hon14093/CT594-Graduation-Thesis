import React, { useEffect, useState } from 'react'
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DetailsModal({ account, open, onClose }) {
    if (!account) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className=''>
                <DialogHeader>
                    <DialogTitle>Thông tin tài khoản</DialogTitle>
                </DialogHeader>

                <ScrollArea className='text-lg max-h-[330px]'>
                    <div className='grid gap-2'>
                        <div>
                            <strong>Tên đăng nhập:</strong> {account.username}
                        </div>
                        <div>
                            <strong>Email:</strong> {account.email}
                        </div>
                        <div>
                            <strong>Số điện thoại:</strong> {account.phone}
                        </div>
                        <div>
                            <strong>Trạng thái:</strong> {account.is_active ? 'Hoạt động' : 'Không hoạt động'}
                        </div>
                        <div>
                            <strong>Chức vụ:</strong> {account.role.role_name}
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
