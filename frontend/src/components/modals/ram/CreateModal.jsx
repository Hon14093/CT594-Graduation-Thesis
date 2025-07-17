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
import SelectComponent from '../tool/SelectComponent';
import SelectProduct from '../SelectProduct';
import { Input } from '@/components/ui/input';
import { createRam } from '@/hooks/variation-api';

const capacities = [
    { id: "4gb", label: "4 GB" },
    { id: "8gb", label: "8 GB" },
    { id: "12gb", label: "12 GB" },
    { id: "16gb", label: "16 GB" },
    { id: "32gb", label: "32 GB" },
    { id: "64gb", label: "64 GB" },
]

const types = [
    { id: "ddr3", label: "DDR 3" }, { id: "ddr4", label: "DDR 4" }, { id: "ddr5", label: "DDR 5" },
]

const ramSpeeds = [
    { id: "1066mhz", label: "1066 MHz" },  // DDR3
    { id: "1333mhz", label: "1333 MHz" },
    { id: "1600mhz", label: "1600 MHz" },

    { id: "2133mhz", label: "2133 MHz" },  // DDR4
    { id: "2400mhz", label: "2400 MHz" },
    { id: "2666mhz", label: "2666 MHz" },
    { id: "2933mhz", label: "2933 MHz" },
    { id: "3200mhz", label: "3200 MHz" },

    { id: "4800mhz", label: "4800 MHz" },  // DDR5
    { id: "5200mhz", label: "5200 MHz" },
    { id: "5600mhz", label: "5600 MHz" },
    { id: "6000mhz", label: "6000 MHz" }
];

export default function CreateModal({ onSubmitSuccess }) {
    const [open, setOpen] = useState(false);
    const [model, setModel] = useState('');
    const [voltage, setVoltage] = useState(1.2);
    const [latency, setLatency] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const [product, setProduct] = useState('');

    const [capacityId, setCapacityId] = useState(4);
    const [typeId, setTypeId] = useState("");
    const [speedId, setSpeedId] = useState(0);
    
    const handleSelectProduct = (category, item) => { setProduct(item) }

    const handleSubmitSuccess = () => {
        onSubmitSuccess();
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const ram = {
                product_id: product.product_id,
                ram_model: model,
                ram_name: product.product_name + model + 
                    types.find((type) => type.id === typeId)?.label +  
                    capacities.find((cap) => cap.id === capacityId)?.label +
                    ramSpeeds.find((speed) => speed.id === speedId)?.label,
                capacity_gb: capacities.find((cap) => cap.id === capacityId)?.label,
                ram_type: types.find((type) => type.id === typeId)?.label,
                frequency_mhz: ramSpeeds.find((speed) => speed.id === speedId)?.label,
                voltage: voltage,
                latency: latency,
                price: price,
                qty_in_stock: stock
            }

            console.log(ram);
            const res = await createRam(ram);
            if (res.status === 201) handleSubmitSuccess();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setOpen(true)}>
                    <Plus />
                    Thêm RAM
                </Button>
            </DialogTrigger>

            <DialogContent className='!max-w-none lg:w-2/5 max-h-[80vh] flex flex-col'>
                <DialogHeader>
                    <DialogTitle>Thêm RAM</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        Nhập chính xác các thông tin
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">

                        <article className="flex w-full items-center gap-1.5">
                            <p className='font-semibold'>Sản phẩm:</p>
                            {product === '' ? (
                                <SelectProduct onSelectItem={handleSelectProduct} category='ram' />
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
                            <p className='font-semibold'>Mã RAM:</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Mã RAM" 
                                onChange={(e) => setModel(e.target.value)}
                                
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
                            <Asterisk color='white' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Điện áp (V):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="1.1, 1.2,..." 
                                onChange={(e) => setVoltage(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Độ trễ:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="CL14, CL16,..." 
                                onChange={(e) => setLatency(e.target.value)}
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
                            Thêm RAM
                        </button>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
