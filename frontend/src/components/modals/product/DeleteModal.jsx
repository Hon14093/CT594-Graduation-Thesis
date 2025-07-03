import React from 'react';
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { CircleX, Trash2 } from 'lucide-react';
import { deleteProduct } from '@/hooks/product-api';

export default function DeleteModal({ product, open, onClose, onSubmitSuccess }) {
    if (!product) return null;

    const handleDelete = async () => {
        try {
            const res = await deleteProduct(product.product_id);
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
                        <CircleX color='red' size={120} className='mx-auto pb-4'/>
                        Bạn có chắc chắn muốn xóa sản phẩm này?
                    </DialogTitle>
                    
                    <section className='flex justify-center gap-3'>
                        <Button className='p-5' onClick={onClose}>
                            Hủy
                        </Button>

                        <Button 
                            onClick={handleDelete} 
                            className='p-5 bg-red-500 border border-red-500 hover:bg-white hover:text-red-500'
                        >
                            <Trash2 />
                            Xóa
                        </Button>
                    </section>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
