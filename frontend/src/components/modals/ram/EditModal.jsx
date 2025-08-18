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
import { GeneralCombobox } from '@/components/combobox/GeneralCombobox';
import { updateRam } from '@/hooks/variation-api';

const capacities = [
    { id: "4gb", label: "4" },
    { id: "8gb", label: "8" },
    { id: "12gb", label: "12" },
    { id: "16gb", label: "16" },
    { id: "32gb", label: "32" },
    { id: "64gb", label: "64" },
]

const types = [
    { id: "ddr3", label: "DDR3" }, { id: "ddr4", label: "DDR4" }, { id: "ddr5", label: "DDR5" },
]

const ramSpeeds = [
    { id: "1066mhz", label: "1066" },  // DDR3
    { id: "1333mhz", label: "1333" },
    { id: "1600mhz", label: "1600" },

    { id: "2133mhz", label: "2133" },  // DDR4
    { id: "2400mhz", label: "2400" },
    { id: "2666mhz", label: "2666" },
    { id: "2933mhz", label: "2933" },
    { id: "3200mhz", label: "3200" },

    { id: "4800mhz", label: "4800" },  // DDR5
    { id: "5200mhz", label: "5200" },
    { id: "5600mhz", label: "5600" },
    { id: "6000mhz", label: "6000" }
];

export default function EditModal({ ram, open, onClose, onSubmitSuccess }) {
    if (!ram) return null;

    const [model, setModel] = useState(ram.ram_model);
    const [voltage, setVoltage] = useState(ram.voltage);
    const [latency, setLatency] = useState(ram.latency);
    const [price, setPrice] = useState(ram.price);
    const [stock, setStock] = useState(ram.qty_in_stock);
    const [product, setProduct] = useState(ram.product);

    const [capacityId, setCapacityId] = useState(
        capacities.find((item) => parseInt(item.label) === ram.capacity_gb)?.id
    );
    const [typeId, setTypeId] = useState(
        types.find((item) => item.label === ram.ram_type)?.id
    );
    const [speedId, setSpeedId] = useState(
        ramSpeeds.find((item) => parseInt(item.label) === ram.frequency_mhz)?.id
    );
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const edited = {
                product_id: product.product_id,
                ram_model: model,
                ram_name: product.product_name + " " + model + " " + 
                    types.find((type) => type.id === typeId)?.label + " " +
                    capacities.find((cap) => cap.id === capacityId)?.label + "GB " +
                    ramSpeeds.find((speed) => speed.id === speedId)?.label + "MHz",
                capacity_gb: parseInt(capacities.find((cap) => cap.id === capacityId)?.label.replace("GB", "")),
                ram_type: types.find((type) => type.id === typeId)?.label,
                frequency_mhz: parseInt(ramSpeeds.find((speed) => speed.id === speedId)?.label.replace("MHz", "")),
                voltage: parseFloat(voltage),
                latency: latency,
                price: parseFloat(price),
                qty_in_stock: parseInt(stock)
            }

            // console.log(ramSpeeds.find((item) => item.label === ram.frequency_mhz)?.id)

            console.log(ram.frequency_mhz, ramSpeeds[7])

            const res = await updateRam(ram.ram_id, edited);
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
                    <DialogTitle className='pb-5'>Cập nhật thông tin RAM</DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">
                    
                        <article className="flex w-full items-center gap-1.5">
                            <p className='font-semibold'>Sản phẩm:</p>
                            <div className='mr-2 ml-auto'>{product.product_name}</div>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Mã RAM:</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Mã RAM" 
                                onChange={(e) => setModel(e.target.value)}
                                defaultValue={model}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Dung lượng RAM:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={capacities}
                                    placeholder="Chọn dung lượng RAM..."
                                    value={capacityId}
                                    onChange={setCapacityId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Loại RAM:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={types}
                                    placeholder="Chọn loại RAM..."
                                    value={typeId}
                                    onChange={setTypeId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tốc độ RAM:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={ramSpeeds}
                                    placeholder="Chọn tốc độ..."
                                    value={speedId}
                                    onChange={setSpeedId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Điện áp (V):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="1.1, 1.2,..." 
                                onChange={(e) => setVoltage(e.target.value)}
                                defaultValue={voltage}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Độ trễ:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="CL14, CL16,..." 
                                onChange={(e) => setLatency(e.target.value)}
                                defaultValue={latency}
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
                            Cập nhật RAM
                        </button>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
