import React from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Lock } from 'lucide-react';
import { updateAccountStatus } from '@/hooks/account-api';

export default function DeactivateWarning({ account, open, onClose, onSubmitSuccess }) {
    if (!account) return null;

    const handleDeactivate = async () => {
        try {
            const res = await updateAccountStatus(product.product_id);
            if (res.status === 200) {
                onSubmitSuccess();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='mx-auto text-lg'>
                        <Lock color='red' size={120} className='mx-auto pb-4'/>
                        Vô hiệu hóa tài khoản?
                    </DialogTitle>
                    
                    <section className='flex justify-center gap-3'>
                        <Button className='p-5' onClick={onClose}>
                            Hủy
                        </Button>

                        <Button 
                            onClick={handleDeactivate} 
                            className='p-5 bg-red-500 border border-red-500 hover:bg-white hover:text-red-500'
                        >
                            {/* <Trash2 /> */}
                            Xác nhận
                        </Button>
                    </section>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
