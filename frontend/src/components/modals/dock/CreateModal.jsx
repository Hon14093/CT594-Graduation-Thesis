import React, { useState } from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Asterisk } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GeneralCombobox } from '@/components/combobox/GeneralCombobox';
import { PortInput } from '@/components/port-input';
import SelectComponent from '../tool/SelectComponent';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const connectionPorts = [
    { id: "usb-a-2.0", label: "USB-A 2.0" },
    { id: "usb-a-3.0", label: "USB-A 3.0" },
    { id: "usb-a-3.2-gen-2", label: "USB-A 3.2 Gen 2" },
    { id: "usb-c-2.0", label: "USB-C 2.0" },
    { id: "usb-c-3.2-gen-1", label: "USB-C 3.2 Gen 1" },
    { id: "usb-c-3.2-gen-2", label: "USB-C 3.2 Gen 2" },
    { id: "usb-c-3.2-gen-2x2", label: "USB-C 3.2 Gen 2x2" },
    { id: "thunderbolt-3", label: "Thunderbolt 3" },
    { id: "thunderbolt-4", label: "Thunderbolt 4" },
];

const USB_A_VERSIONS = ["2.0", "3.0", "3.1", "3.2"];
const USB_C_VERSIONS = ["3.0", "3.1", "3.2", "Thunderbolt 3", "Thunderbolt 4"];

export default function CreateModal({ onSubmitSuccess }) {
    const [open, setOpen] = useState(false);
    const [model, setModel] = useState('');
    const [connectionPort, setConnectionPort] = useState('');
    const [maxDataRateGbps, setMaxDataRateGbps] = useState(0);
    const [maxOutputWatt, setMaxOutputWatt] = useState(0);
    const [cableLengthCm, setCableLengthCm] = useState(0);
    const [material, setMaterial] = useState('');
    const [dimensionsMm, setDimensionsMm] = useState('');
    const [maxExternalMonitors, setMaxExternalMonitors] = useState(0);
    const [maxResolution, setMaxResolution] = useState('');
    const [displayOutputPorts, setDisplayOutputPorts] = useState([]); // JSONB - adjust type as needed
    const [usbAPorts, setUsbAPorts] = useState([]); // JSONB - adjust type as needed
    const [usbCPorts, setUsbCPorts] = useState([]); // JSONB - adjust type as needed
    const [ethernetPortSpeed, setEthernetPortSpeed] = useState('');
    const [sdCardSlot, setSdCardSlot] = useState(false);
    const [microsdCardSlot, setMicrosdCardSlot] = useState(false);
    const [audioJackType, setAudioJackType] = useState('');
    const [price, setPrice] = useState(0);
    const [product, setProduct] = useState('');

    const [connectionPortId, setConnectionPortId] = useState("");
    const [audioJackTypeId, setAudioJackTypeId] = useState("");

    const handleSubmitSuccess = () => {
        onSubmitSuccess();
        setOpen(false);
    }

    const handleSelectProduct = (category, item) => {
        setProduct(item)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setOpen(true)}>
                    <Plus />
                    Thêm dock
                </Button>
            </DialogTrigger>

            <DialogContent className='!max-w-none lg:w-2/5 max-h-[80vh] flex flex-col'>
                <DialogHeader>
                    <DialogTitle>Thêm dock</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        Nhập chính xác các thông tin
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <div className="text-lg text-black grid gap-4">

                        <article className="flex w-full items-center gap-1.5">
                            <p className='font-semibold'>Sản phẩm:</p>
                            {product === '' ? (
                                <SelectComponent onSelectItem={handleSelectProduct} category='usb dock' />
                            ) : (
                                <>
                                    <div className='mr-2'>{product.name}</div>
                                    <Button variant='ghost' className='border'
                                        onClick={() => setProduct('')}
                                    >
                                        <Trash2 color='red' />
                                    </Button>
                                </>
                            )}
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Mã USB dock:</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Mã USB dock" 
                                onChange={(e) => setModel(e.target.value)}
                                required
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Cổng kết nối:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={connectionPorts}
                                    placeholder="Chọn loại cổng kết nối..."
                                    value={connectionPortId}
                                    onChange={setConnectionPortId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tốc độ truyền dữ liệu tối đa (Gbps):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Tốc độ truyền tối đa" 
                                onChange={(e) => setMaxDataRateGbps(e.target.value)}
                                type='number'
                                required
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Công xuất tối đa (W):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Công xuất tối đa" 
                                onChange={(e) => setMaxOutputWatt(e.target.value)}
                                type='number'
                                required
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Độ dài dây cáp (cm):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Độ dài dây cáp" 
                                onChange={(e) => setCableLengthCm(e.target.value)}
                                type='number'
                                required
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Vật liệu:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Vật liệu" 
                                onChange={(e) => setMaterial(e.target.value)}
                                required
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Kích thước:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Kích thước" 
                                onChange={(e) => setDimensionsMm(e.target.value)}
                                type='number'
                                required
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Số màn hình hỗ trợ:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Hỗ trợ tối đa bao nhiêu màn hình" 
                                onChange={(e) => setMaxExternalMonitors(e.target.value)}
                                type='number'
                                required
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Độ phân giải tối đa:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={connectionPorts}
                                    placeholder="Chọn độ phân giải..."
                                    value={connectionPortId}
                                    onChange={setConnectionPortId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <PortInput
                            ports={usbAPorts}
                            setPorts={setUsbAPorts}
                            versionOptions={USB_A_VERSIONS}
                            portTypeLabel="USB-A"
                        />

                        <PortInput
                            ports={usbCPorts}
                            setPorts={setUsbCPorts}
                            versionOptions={USB_C_VERSIONS}
                            portTypeLabel="USB-C"
                        />

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tốc độ Ethernet (Gbps):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Tốc độ của cổng Ethernet" 
                                onChange={(e) => setEthernetPortSpeed(e.target.value)}
                                type='number'
                                required
                            />
                            <Asterisk color='white' size={20}/>
                        </article>

                        <div className='grid grid-cols-2 items-center gap-4'>
                            <article className="flex items-center gap-3">
                                <p className='font-semibold'>Cổng Micro SD?</p>
                                <Switch />
                                <Asterisk color='white' size={20}/>
                            </article>

                            <article className="flex items-center gap-3">
                                <p className='font-semibold'>Cổng SD?</p>
                                <Switch />
                                <Asterisk color='white' size={20}/>
                            </article>
                        </div>

                        Audio jack

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Giá bán (vnđ):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Giá bán" 
                                onChange={(e) => setPrice(e.target.value)}
                                type='number'
                                required
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <button className='big-action-button mb-2'>
                            Thêm Dock
                        </button>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
