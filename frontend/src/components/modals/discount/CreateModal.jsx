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
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { createDiscount } from '@/hooks/discount-api';

export default function CreateModal({ onSubmitSuccess }) {
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');
    const [discountValue, setDiscountValue] = useState(0);
    const [minTotal, setMinTotal] = useState(0);    

    const handleSubmitSuccess = () => {
        setOpen(false);
        onSubmitSuccess();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dicount = {
                discount_code: code,
                discount_value: parseInt(discountValue),
                min_order_total: parseInt(minTotal)
            }

            console.log(dicount)

            const res = await createDiscount(dicount);
            if (res.success) handleSubmitSuccess();            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setOpen(true)}>
                    <Plus />
                    Thêm khuyến mãi
                </Button>
            </DialogTrigger>

            <DialogContent className='!max-w-none lg:w-2/5 max-h-[80vh] flex flex-col'>
                <DialogHeader>
                    <DialogTitle>Thêm khuyến mãi</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        Nhập chính xác các thông tin
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Mã khuyến mãi:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Mã khuyến mãi" 
                                onChange={(e) => setCode(e.target.value)}
                                
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
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <button type='submit' className='big-action-button mb-2'>
                            Thêm khuyến mãi
                        </button>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
