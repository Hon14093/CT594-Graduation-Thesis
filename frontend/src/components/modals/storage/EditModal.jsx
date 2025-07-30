import React, { useState, useEffect } from 'react'
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
import { GeneralCombobox } from '@/components/combobox/GeneralCombobox';
import { updateStorage } from '@/hooks/variation-api';

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

export default function EditModal({ storage, open, onClose, onSubmitSuccess }) {
    if (!storage) return null;

    useEffect(() => {
        if (storage.physical_profile) {
            const [l, w, h] = storage.physical_profile.split("x").map(Number);
            setLength(l || 0);
            setWidth(w || 0);
            setHeight(h || 0);
        }
    }, [storage.physical_profile]);

    const [model, setModel] = useState(storage.storage_model);
    const [capacityGb, setCapacityGb] = useState(storage.capacity_gb);
    const [weightG, setWeightG] = useState(storage.weight_g);
    const [readSpeed, setReadSpeed] = useState(storage.read_speed_mbps) // mbps
    const [writeSpeed, setWriteSpeed] = useState(storage.write_speed_mbps) // mbps
    const [price, setPrice] = useState(storage.price);
    const [stock, setStock] = useState(storage.qty_in_stock);
    const [product, setProduct] = useState(storage.product);    

    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [connectionPortId, setConnectionPortId] = useState(
        ssdInterfaces.find((item) => item.label === storage.interface)?.id
    );
    const [ffId, setFfId] = useState(
        ssdFormFactors.find((item) => item.label === storage.form_factor)?.id
    );
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const edited = {
                product_id: product.product_id,
                storage_model: model,
                storage_name: product.product_name + " " + model + " " + capacityGb + "GB",
                capacity_gb: parseInt(capacityGb),
                interface: ssdInterfaces.find((con) => con.id === connectionPortId).label,
                form_factor: ssdFormFactors.find((factor) => factor.id === ffId).label,
                physical_profile: length + 'x' + width + 'x' + height,
                weight_g: parseInt(weightG),
                read_speed_mbps: parseInt(readSpeed),
                write_speed_mbps:parseInt( writeSpeed),
                price: parseInt(price),
                qty_in_stock: parseInt(stock)
            }

            const res = await updateStorage(storage.storage_id, edited);
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
                    <DialogTitle className='pb-5'>Cập nhật thông tin ổ cứng</DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">
                    
                        <article className="flex w-full items-center gap-1.5">
                            <p className='font-semibold'>Sản phẩm:</p>
                            <div className='mr-2 ml-auto'>{product.product_name}</div>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Mã ổ cứng:</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Mã ổ cứng" 
                                onChange={(e) => setModel(e.target.value)}
                                defaultValue={model}
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
                                defaultValue={capacityGb}
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
                                    defaultValue={length}
                                />
                                <Input 
                                    className=""
                                    placeholder="Rộng" 
                                    onChange={(e) => setWidth(e.target.value)}
                                    type='number'
                                    defaultValue={width}
                                />
                                <Input 
                                    className=""
                                    placeholder="Cao" 
                                    onChange={(e) => setHeight(e.target.value)}
                                    type='number'
                                    defaultValue={height}
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
                                defaultValue={weightG}
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
                                defaultValue={readSpeed}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tốc độ ghi (Mbps):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Tốc độ ghi" 
                                onChange={(e) => setWriteSpeed(e.target.value)}
                                type='number'
                                defaultValue={writeSpeed}
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
                                defaultValue={price}
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
                                defaultValue={stock}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <button type='submit' className='big-action-button mb-2'>
                            Cập nhật ổ cứng
                        </button>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
