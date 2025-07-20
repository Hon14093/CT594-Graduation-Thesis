import React, { useState }  from 'react'
import { updateAddress } from '@/hooks/address-api';
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { PenBox } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import CityCombobox from '@/components/combobox/CityCombobox';

export default function EditModal({ address, onSubmitSuccess }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState(address.first_name);
    const [lastName, setLastName] = useState(address.last_name);
    const [addressLine, setAddressLine] = useState(address.address_line);
    const [ward, setWard] = useState(address.ward); // phường
    const [district, setDistict] = useState(address.district); // quận or huyện
    const [postalCode, setPostalCode] = useState(address.postal_code);
    const [city, setCity] = useState(address.city); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                first_name: firstName,
                last_name: lastName,
                address_line: addressLine,
                ward: ward,
                district: district,
                postal_code: postalCode,
                city: city
            }

            const result = await updateAddress(address.address_id, data)
            if (result.success) {
                onSubmitSuccess();
                setOpen(false);
            }
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" 
                    className="bg-green-500 border border-green-500 hover:bg-white hover:text-green-500 ml-auto" 
                    onClick={() => setOpen(true)}
                >
                    <PenBox />
                </Button>
            </DialogTrigger>

            <DialogContent className='bg-white text-lg'>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa địa chỉ</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
                    <div className="space-y-4">
                        <article className='flex gap-4 w-full'>
                            <div className="grid gap-2 w-1/2">
                                <p htmlFor="lastName">Họ</p>
                                <Input 
                                    id="lastName" name="lastName" 
                                    onChange={(e) => setLastName(e.target.value)}
                                    defaultValue={lastName}
                                    required 
                                />
                            </div>

                            <div className="grid gap-2 w-1/2">
                                <p htmlFor="firstName">Tên</p>
                                <Input 
                                    id="firstName" name="firstName" 
                                    onChange={(e) => setFirstName(e.target.value)}
                                    defaultValue={firstName}
                                    required 
                                />
                            </div>
                        </article>

                        <div className="grid gap-2">
                            <p htmlFor="address">Tên đường, Tòa nhà, Số nhà</p>
                            <Input 
                                id="address" name="address" 
                                onChange={(e) => setAddressLine(e.target.value)}
                                defaultValue={addressLine}
                                required 
                            />
                        </div>
                        
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div>
                                <p htmlFor="ward">Phường</p>
                                <Input 
                                    id="ward" name="ward" 
                                    onChange={(e) => setWard(e.target.value)}
                                    defaultValue={ward}
                                    required 
                                />
                            </div>

                            <div>
                                <p htmlFor="district">Quận / Huyện</p>
                                <Input 
                                    id="district" name="district" 
                                    onChange={(e) => setDistict(e.target.value)}
                                    defaultValue={district}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                            <div>
                                <p htmlFor="zipCode">Mã bưu điện</p>
                                <Input 
                                    id="zipCode" name="zipCode" 
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    defaultValue={postalCode}
                                    required 
                                />
                            </div>

                            <div>
                                <CityCombobox value={city} onChange={setCity} />
                            </div>
                        </div>
                    </div>
                    {/* <Button type="submit" className="w-full bg-techBlue">
                        Cập nhật địa chỉ
                    </Button> */}

                    <button type='submit' disabled={loading} className='w-full big-action-button !py-1 !text-lg'>
                        {loading ? 'Đang xử lý...' : 'Cập nhật địa chỉ'}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
