import React, { useState } from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Plus, Asterisk } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { updateDiscount } from '@/hooks/discount-api';

export default function EditModal({ discount, open, onClose, onSubmitSuccess }) {
    if (!discount) return null;
    
    const [code, setCode] = useState(discount.discount_code);
    const [discountValue, setDiscountValue] = useState(discount.discount_value);
    const [minTotal, setMinTotal] = useState(discount.min_order_total);  
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const editedProduct = {
                discount_code: code,
                discount_value: parseInt(discountValue),
                min_order_total: parseInt(minTotal)
            }

            const res = await updateDiscount(discount.discount_id, editedProduct);
            if (res.status === 200) {
                onSubmitSuccess();
                onClose();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent className='!max-w-none lg:w-2/5 max-h-[80vh] flex flex-col'>
                <DialogHeader>
                    <DialogTitle className='pb-5'>Cập nhật thông tin khuyến mãi</DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Mã khuyến mãi:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Mã khuyến mãi" 
                                onChange={(e) => setCode(e.target.value)}
                                defaultValue={code}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Giá trị khuyến mãi (vnđ):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Giá trị khuyến mãi" 
                                onChange={(e) => setDiscountValue(e.target.value)}
                                type={`number`}
                                defaultValue={discountValue}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Giá trị đơn hàng tối thiểu (vnđ):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Giá trị đơn hàng tối thiểu" 
                                onChange={(e) => setMinTotal(e.target.value)}
                                type={`number`}
                                defaultValue={minTotal}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <button type='submit' className='big-action-button mb-2'>
                            Cập nhật khuyến mãi
                        </button>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
