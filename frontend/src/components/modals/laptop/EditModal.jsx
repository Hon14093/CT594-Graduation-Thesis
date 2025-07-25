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
import { updateBrand } from '@/hooks/product-api';

export default function EditModal({ laptop, open, onClose, onSubmitSuccess }) {
    if (!laptop) return null;

    const [name, setName] = useState(brand.brand_name);
    const [slug, setSlug] = useState(brand.slug);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const edited= {
                laptop_name: name,
                slug: slug
            }

            const res = await updateBrand(laptop.laptop_id, edited);
            if (res.data.success) {
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
                    <DialogTitle className='pb-5'>Cập nhật thông tin thương hiệu</DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tên thương hiệu:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Tên thương hiệu" 
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={name}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Slug thương hiệu:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Slug" 
                                onChange={(e) => setSlug(e.target.value)}
                                defaultValue={slug}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <button type='submit' className='big-action-button mb-2'>
                            Cập nhật thương hiệu
                        </button>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
