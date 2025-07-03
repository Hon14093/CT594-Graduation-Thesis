import React from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import EditForm from '@/components/forms/products/EditForm';

export default function EditModal({ product, open, onClose, onSubmitSuccess }) {
    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent className='w-[1000px] !max-w-none'>
                <DialogHeader>
                    <DialogTitle className='pb-5'>Cập nhật thông tin sản phẩm</DialogTitle>
                </DialogHeader>

                <div className='text-base'>
                    <EditForm product={product} onClose={onClose} onSubmitSuccess={onSubmitSuccess} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
