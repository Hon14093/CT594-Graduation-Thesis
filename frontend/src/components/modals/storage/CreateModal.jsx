import React, { useState } from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Plus, Trash2, Asterisk } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GeneralCombobox } from '@/components/combobox/GeneralCombobox';
import SelectProduct from '../SelectProduct';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createStorage } from '@/hooks/variation-api';
import { PortInput } from '@/components/port-input';

const ssdInterfaces = [
    { id: "usb-a-2.0", label: "USB-A 2.0" }, { id: "usb-a-3.0", label: "USB-A 3.0" },
    { id: "usb-a-3.2-gen-2", label: "USB-A 3.2 Gen 2" }, { id: "usb-c-2.0", label: "USB-C 2.0" },
    { id: "usb-c-3.2-gen-1", label: "USB-C 3.2 Gen 1" }, { id: "usb-c-3.2-gen-2", label: "USB-C 3.2 Gen 2" },
    { id: "usb-c-3.2-gen-2x2", label: "USB-C 3.2 Gen 2x2" }, { id: "thunderbolt-3", label: "Thunderbolt 3" },
    { id: "thunderbolt-4", label: "Thunderbolt 4" }, { id: "sata-iii", label: "SATA III" },
    { id: "m2-sata", label: "M.2 SATA" },
    { id: "m2-nvme-gen3", label: "M.2 NVMe PCIe Gen 3" },
    { id: "m2-nvme-gen4", label: "M.2 NVMe PCIe Gen 4" },
    { id: "m2-nvme-gen5", label: "M.2 NVMe PCIe Gen 5" },
];

const ssdFormFactors = [
    { id: "25-inch", label: "2.5-inch" },            // SATA drives, common in older laptops
    { id: "m2-2242", label: "M.2 2242" },            // Very short, used in compact laptops or tablets
    { id: "m2-2260", label: "M.2 2260" },            // Rare, but seen in some ultrabooks
    { id: "m2-2280", label: "M.2 2280" },            // Most common for NVMe and M.2 SATA
    { id: "portable", label: "Di động"}
];

export default function CreateModal({ onSubmitSuccess }) {
    const [open, setOpen] = useState(false);
    const [model, setModel] = useState('');
    const [capacityGb, setCapacityGb] = useState(256);
    const [connector, setConnector] = useState('');
    const [formFactor, setFormFactor] = useState('');
    const [profile, setProfile] = useState('');
    const [weightG, setWeightG] = useState(10);
    const [readSpeed, setReadSpeed] = useState(0) // mbps
    const [writeSpeed, setWriteSpeed] = useState(0) // mbps
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const [product, setProduct] = useState('');    

    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [connectionPortId, setConnectionPortId] = useState("");
    const [ffId, setFfId] = useState("");
    
    const handleSelectProduct = (category, item) => { setProduct(item) }

    const handleSubmitSuccess = () => {
        onSubmitSuccess();
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const storage = {
                product_id: product.product_id,
                storage_model: model,
                storage_name: product.product_name + model + capacityGb,
                capacity_gb: capacityGb,
                interface: ssdInterfaces.find((con) => con.id === connectionPortId).label,
                form_factor: ssdFormFactors.find((factor) => factor.id === ffId).label,
                physical_profile: length + 'x' + width + 'x' + height,
                weight_g: weightG,
                read_speed_mbps: readSpeed,
                write_speed_mbps: writeSpeed,
                price: price,
                qty_in_stock: stock
            }

            console.log(storage);
            // const res = await createStorage(monitor);
            // if (res.status === 201) handleSubmitSuccess();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setOpen(true)}>
                    <Plus />
                    Thêm ổ cứng
                </Button>
            </DialogTrigger>

            <DialogContent className='!max-w-none lg:w-2/5 max-h-[80vh] flex flex-col'>
                <DialogHeader>
                    <DialogTitle>Thêm ổ cứng</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        Nhập chính xác các thông tin
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">

                        <article className="flex w-full items-center gap-1.5">
                            <p className='font-semibold'>Sản phẩm:</p>
                            {product === '' ? (
                                <SelectProduct onSelectItem={handleSelectProduct} category='Ổ cứng' />
                            ) : (
                                <>
                                    <div className='mr-2 ml-auto'>{product.product_name}</div>
                                    <Button variant='ghost' className='border'
                                        onClick={() => setProduct('')}
                                    >
                                        <Trash2 color='red' />
                                    </Button>
                                </>
                            )}
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Mã ổ cứng:</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Mã ổ cứng" 
                                onChange={(e) => setModel(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Dung lượng (GB):</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Dung lượng" 
                                onChange={(e) => setCapacityGb(e.target.value)}
                                type='number'
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Chuẩn giao tiếp:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={ssdInterfaces}
                                    placeholder="Chọn loại chuẩn giao tiếp..."
                                    value={connectionPortId}
                                    onChange={setConnectionPortId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Chuẩn kích thước:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={ssdFormFactors}
                                    placeholder="Chọn loại chuẩn kích thước..."
                                    value={ffId}
                                    onChange={setFfId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Kích thước vật lý:</p>
                            <div className='max-w-96 flex gap-2 ml-auto'>
                                <Input 
                                    className="ml-auto"
                                    placeholder="Dài" 
                                    onChange={(e) => setLength(e.target.value)}
                                    type='number'
                                />
                                <Input 
                                    className=""
                                    placeholder="Rộng" 
                                    onChange={(e) => setWidth(e.target.value)}
                                    type='number'
                                />
                                <Input 
                                    className=""
                                    placeholder="Cao" 
                                    onChange={(e) => setHeight(e.target.value)}
                                    type='number'
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Cân nặng (g):</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Cân nặng" 
                                onChange={(e) => setWeightG(e.target.value)}
                                type='number'
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tốc độ đọc (Mbps):</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Tốc độ đọc" 
                                onChange={(e) => setReadSpeed(e.target.value)}
                                type='number'
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tốc độ ghi (Mbps):</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Tốc độ ghi" 
                                onChange={(e) => setWriteSpeed(e.target.value)}
                                type='number'
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Giá bán (vnđ):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Giá bán" 
                                onChange={(e) => setPrice(e.target.value)}
                                type='number'
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Số lượng trong kho:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Số lượng trong kho" 
                                onChange={(e) => setStock(e.target.value)}
                                type='number'
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <button type='submit' className='big-action-button mb-2'>
                            Thêm ổ cứng
                        </button>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
