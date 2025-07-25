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
import { updateCategory } from '@/hooks/product-api';

export default function EditModal({ category, open, onClose, onSubmitSuccess }) {
    if (!category) return null;

    const [name, setName] = useState(category.category_name);
    const [slug, setSlug] = useState(category.slug);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const edited= {
                category_name: name,
                slug: slug
            }

            const res = await updateCategory(category.category_id, edited);
            if (res.success) {
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
                    <DialogTitle className='pb-5'>Cập nhật thông tin danh mục</DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tên danh mục:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Tên danh mục" 
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={name}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Slug danh mục:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Slug" 
                                onChange={(e) => setSlug(e.target.value)}
                                defaultValue={slug}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <button type='submit' className='big-action-button mb-2'>
                            Cập nhật danh mục
                        </button>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
