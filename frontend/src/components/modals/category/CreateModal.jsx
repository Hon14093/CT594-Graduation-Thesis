import React, { useState } from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function CreateModal() {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('');

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setOpen(true)}>
                    <Plus />
                    Thêm danh mục
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm danh mục</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        Nhập chính xác các thông tin
                    </DialogDescription>
                </DialogHeader>

                <div className='text-base text-black'>
                    <form>
                        <section>
                            <article className="grid w-full items-center gap-1.5 pb-4">
                                <Label htmlFor="cat_name">Tên danh mục</Label>
                                <Input 
                                    id="cat_name" 
                                    placeholder="Tên danh mục" 
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </article>

                            <Button type='submit'>
                                Thêm danh mục
                            </Button>
                        </section>
                        
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
