import React, { useState } from "react";
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
import CityCombobox from "@/components/combobox/CityCombobox";
import { createAddress } from "@/hooks/address-api";

export default function CreateModal({ account, onSubmitSuccess }) {
    const [open, setOpen] = useState();
    const [fisrtName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [addressLine, setAddressLine] = useState();
    const [ward, setWard] = useState();
    const [district, setDistrict] = useState();
    const [city, setCity] = useState();
    const [postalCode, setPostalCode] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                account_id: account.account_id,
                first_name: fisrtName,
                last_name: lastName,
                address_line: addressLine,
                ward: ward,
                district: district,
                city: city,
                postal_code: postalCode
            }

            const res = await createAddress(data);

            if (res.status === 201) {
                setOpen(false);
                onSubmitSuccess();
            }
        } catch (error) {
            console.log('Internal Server Error', error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setOpen(true)} className='text-lg mt-3'>
                    <Plus />
                    Thêm địa chỉ mới
                </Button>
            </DialogTrigger>

            <DialogContent className='!max-w-none md:w-2/5'>
                <DialogHeader>
                    <DialogTitle>Tạo địa chỉ</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        Nhập chính xác các thông tin
                    </DialogDescription>
                </DialogHeader>

                <div className='!text-lg text-black'>
                    <form onSubmit={handleSubmit}>
                        <section>
                            <div className="flex justify-between gap-5">
                                <article className="grid w-full items-center gap-1.5 pb-4">
                                    <Label htmlFor="first_name">Tên</Label>
                                    <Input 
                                        id="first_name" 
                                        placeholder="Tên" 
                                        className='!text-lg'
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </article>

                                <article className="grid w-full items-center gap-1.5 pb-4">
                                    <Label htmlFor="last_name">Họ</Label>
                                    <Input 
                                        id="last_name" 
                                        placeholder="Họ" 
                                        className='!text-lg'
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </article>
                            </div>

                            <article className="grid w-full items-center gap-1.5 pb-4">
                                <Label htmlFor="address_line">Địa chỉ cụ thể</Label>
                                <Input 
                                    id="address_line" 
                                    placeholder="Số nhà, tên đường,..." 
                                    className='!text-lg'
                                    onChange={(e) => setAddressLine(e.target.value)}
                                    required
                                />
                            </article>

                            <div className="flex justify-between gap-5">
                                <article className="grid w-full items-center gap-1.5 pb-4">
                                    <Label htmlFor="ward">Phường</Label>
                                    <Input 
                                        id="ward" 
                                        placeholder="Phường" 
                                        className='!text-lg'
                                        onChange={(e) => setWard(e.target.value)}
                                        required
                                    />
                                </article>

                                <article className="grid w-full items-center gap-1.5 pb-4">
                                    <Label htmlFor="district">Quận/Huyện</Label>
                                    <Input 
                                        id="district" 
                                        placeholder="Quận/Huyện" 
                                        className='!text-lg'
                                        onChange={(e) => setDistrict(e.target.value)}
                                        required
                                    />
                                </article>
                            </div>

                            <div className="flex justify-between gap-5">
                                <article className="grid w-full items-center gap-1.5 pb-4">
                                    <CityCombobox value={city} onChange={setCity} />
                                </article>

                                <article className="grid w-full items-center gap-1.5 pb-4">
                                    <Label htmlFor="postal">Mã bưu điện</Label>
                                    <Input 
                                        id="postal" 
                                        placeholder="Mã bưu điện" 
                                        className='!text-lg'
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        required
                                    />
                                </article>
                            </div>

                            <button type='submit' disabled={loading} className='w-full big-action-button !py-1 !text-lg'>
                                {loading ? 'Đang xử lý...' : 'Thêm địa chỉ'}
                            </button>
                        </section>
                        
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}