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
    const [brandName, setBrandName] = useState('');

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setOpen(true)}>
                    <Plus />
                    Thêm thương hiệu
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm thương hiệu</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        Nhập chính xác các thông tin
                    </DialogDescription>
                </DialogHeader>

                <div className='text-base text-black'>
                    <form>
                        <section>
                            <article className="grid w-full items-center gap-1.5 pb-4">
                                <Label htmlFor="brand_name">Tên thương hiệu</Label>
                                <Input 
                                    id="brand_name" 
                                    placeholder="Tên thương hiệu" 
                                    onChange={(e) => setBrandName(e.target.value)}
                                />
                            </article>

                            <Button type='submit'>
                                Thêm thương hiệu
                            </Button>
                        </section>
                        
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
