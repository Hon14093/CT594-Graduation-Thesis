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
import { createBrand } from '@/hooks/product-api';

export default function CreateModal({ onSubmitSuccess }) {
    const [open, setOpen] = useState(false);
    const [brandName, setBrandName] = useState('');
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(false);

    const slugify = (text) => {
        return text
            .toLowerCase()
            .replace(/đ/g, 'd') 
            .replace(/Đ/g, 'd')
            .normalize("NFD") // Handle viet chars (mostly)
            .replace(/[\u0300-\u036f]/g, "") 
            .replace(/\s+/g, "-") 
            .replace(/[^\w\-]+/g, "") 
            .replace(/\-\-+/g, "-") 
            .replace(/^-+|-+$/g, ""); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                brand_name: brandName,
                slug: slug
            }
            const res = await createBrand(data);
            console.log(res);
            
            if (res.status === 201) {
                setOpen(false);
                onSubmitSuccess();
            }
        } catch (error) {
            console.log('Internal Server Error', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setOpen(true)}>
                    <Plus />
                    Thêm thương hiệu
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tạo thương hiệu</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        Nhập chính xác các thông tin
                    </DialogDescription>
                </DialogHeader>

                <div className='text-base text-black'>
                    <form onSubmit={handleSubmit}>
                        <section>
                            <article className="grid w-full items-center gap-1.5 pb-4">
                                <Label htmlFor="brand_name">Tên thương hiệu</Label>
                                <Input 
                                    id="brand_name" 
                                    placeholder="Tên thương hiệu" 
                                    onChange={(e) => {
                                        setBrandName(e.target.value)
                                        setSlug(slugify(e.target.value))
                                    }}
                                    required
                                />
                            </article>

                            <Button type='submit' disabled={loading} className='w-full'>
                                {loading ? 'Đang xử lý...' : 'Thêm danh mục'}
                            </Button>
                        </section>
                        
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
