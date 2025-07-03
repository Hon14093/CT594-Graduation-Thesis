import React, { useState } from 'react'
import { X } from 'lucide-react';
import { uploadImage } from '@/hooks/cloudinary';
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import BrandCombobox from '@/components/combobox/BrandCombobox';
import CategoryCombobox from '@/components/combobox/CategoryCombobox';
import { createProduct } from '@/hooks/product-api';

export default function CreateForm({ onSubmitSuccess }) {
    const placeholderImage = "https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg";
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [brandValue, setBrandValue] = useState('');
    const [catValue, setCatValue] = useState('');

    const handleRemoveImage = (index) => {
        const updatedFiles = [...imageFiles];
        const updatedPreviews = [...imagePreviews];
        updatedFiles.splice(index, 1);
        updatedPreviews.splice(index, 1);
        setImageFiles(updatedFiles);
        setImagePreviews(updatedPreviews);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));

        setImageFiles(prev => [...prev, ...files]);
        setImagePreviews(prev => [...prev, ...previews]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (productName === '' || description === '' || brandValue === '' || catValue === '') {
            alert("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            // const image = await uploadImage(imageFile);
            const imageUrls = await Promise.all(imageFiles.map(file => uploadImage(file)));
            console.log(imageUrls)

            const product = {
                product_name: productName,
                description: description,
                category_id: catValue,
                brand_id: brandValue,
                image_url: imageUrls
            }

            const res = await createProduct(product);
            console.log(res);

            if (res.status === 201) {
                onSubmitSuccess();
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="mx-auto gap-5 grid" onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-6 items-start'>
                <section className='grid gap-5'>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="product_name">Tên sản phẩm</Label>
                        <Input 
                            id="product_name" 
                            placeholder="Tên sản phẩm" 
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="product_des">Miêu tả</Label>
                        <Textarea 
                            id="product_des" 
                            placeholder="Miêu tả" 
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </article>

                    <BrandCombobox value={brandValue} onChange={setBrandValue} />
                    <CategoryCombobox value={catValue} onChange={setCatValue} />
                </section>

                <section>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="picture">Hình ảnh sản phẩm</Label>
                        <Input 
                            id="picture" 
                            type="file" 
                            multiple
                            accept="image/*"
                            onChange={handleImageChange} 
                        />

                        <div className="flex gap-3 flex-wrap mt-3">
                            {imagePreviews.length === 0 && (
                                <img
                                    src={placeholderImage}
                                    alt="placeholder"
                                    className="w-32 h-32 object-cover border rounded"
                                />
                            )}
                            {imagePreviews.map((src, idx) => (
                                <div key={idx} className="relative group">
                                    <img 
                                        src={src} 
                                        alt={`Ảnh ${idx + 1}`} 
                                        className="w-32 h-32 object-cover border rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(idx)}
                                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow group-hover:opacity-100 opacity-80 transition"
                                    >
                                        <X size={14} className="text-black" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <Button type="Submit" disabled={loading} className='form-button mt-auto'>
                {loading ? "Đang xử lý..." : "Thêm sản phẩm"}
            </Button>
        </form>
    )
}
