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
import { PortInput } from '@/components/port-input';
import SelectComponent from '../tool/SelectComponent';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { createDock } from '@/hooks/variation-api';
import SelectProduct from '../SelectProduct';

const connectionPorts = [
    { id: "usb-a-2.0", label: "USB-A 2.0" }, { id: "usb-a-3.0", label: "USB-A 3.0" },
    { id: "usb-a-3.2-gen-2", label: "USB-A 3.2 Gen 2" }, { id: "usb-c-2.0", label: "USB-C 2.0" },
    { id: "usb-c-3.2-gen-1", label: "USB-C 3.2 Gen 1" }, { id: "usb-c-3.2-gen-2", label: "USB-C 3.2 Gen 2" },
    { id: "usb-c-3.2-gen-2x2", label: "USB-C 3.2 Gen 2x2" }, { id: "thunderbolt-3", label: "Thunderbolt 3" },
    { id: "thunderbolt-4", label: "Thunderbolt 4" },
];

const audioJackTypes = [
    { id: "3.5mm-combo", label: "Jack 3.5mm (Tai nghe + Mic)" },
    { id: "3.5mm-headphone", label: "Jack 3.5mm (Chỉ tai nghe)" },
    { id: "3.5mm-mic", label: "Jack 3.5mm (Chỉ micro)" },
];

const supportedResolutions = [
    { id: "1080p-60", label: "1920x1080@60Hz" }, { id: "1080p-144", label: "1920x1080@144Hz" },
    { id: "2k-60", label: "2560x1440@60Hz" }, { id: "2k-144", label: "2560x1440@144Hz" },
    { id: "4k-30", label: "3840x2160@30Hz" }, { id: "4k-60", label: "3840x2160@60Hz" },
];

const USB_A_VERSIONS = ["2.0", "3.0", "3.1", "3.2"];
const USB_C_VERSIONS = ["3.0", "3.1", "3.2", "Thunderbolt 3", "Thunderbolt 4"];
const HDMI_VERSIONS = ["1.2", "1.4", "2.0", "2.1"];
const DP_VERSIONS = ["1.2", "1.4", "1.4a", "2.0", "2.1"];

export default function CreateModal({ onSubmitSuccess }) {
    const [open, setOpen] = useState(false);
    const [model, setModel] = useState('');
    const [maxDataRateGbps, setMaxDataRateGbps] = useState(0);
    const [maxOutputWatt, setMaxOutputWatt] = useState(0);
    const [cableLengthCm, setCableLengthCm] = useState(0);
    const [material, setMaterial] = useState('');    
    const [maxExternalMonitors, setMaxExternalMonitors] = useState(0);
    const [usbAPorts, setUsbAPorts] = useState([]); // JSONB - adjust type as needed
    const [usbCPorts, setUsbCPorts] = useState([]); // JSONB - adjust type as needed
    const [hdmiPorts, setHdmiPorts] = useState([]);
    const [dpPorts, setDpPorts] = useState([]);
    const [ethernetPortSpeed, setEthernetPortSpeed] = useState('');
    const [sdCardSlot, setSdCardSlot] = useState(false);
    const [microsdCardSlot, setMicrosdCardSlot] = useState(false);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const [product, setProduct] = useState('');

    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [connectionPortId, setConnectionPortId] = useState("");
    const [audioJackTypeId, setAudioJackTypeId] = useState("");
    const [maxResId, setMaxResId] = useState("");

    const handleSubmitSuccess = () => {
        onSubmitSuccess();
        setOpen(false);
    }

    const handleSelectProduct = (category, item) => {
        setProduct(item)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dock = {
                product_id: product.product_id,
                dock_model: model,
                dock_name: product.product_name + " " + model,
                connection_port: connectionPorts.find((port) => port.id === connectionPortId)?.label || null,
                max_data_rate_gbps: parseFloat(maxDataRateGbps),
                max_output_watt: parseFloat(maxOutputWatt),
                cable_length_cm: parseInt(cableLengthCm),
                material: material,
                dimensions_mm: length + 'x' + width + 'x' + height,
                max_external_monitors: parseInt(maxExternalMonitors),
                max_resolution: supportedResolutions.find((res) => res.id === maxResId)?.label || null,
                usb_a_ports: usbAPorts,
                usb_c_ports: usbCPorts,
                hdmi: hdmiPorts,
                display_port: dpPorts,
                ethernet_speed_gbps: parseFloat(ethernetPortSpeed),
                sd_card_slot: sdCardSlot,
                microsd_card_slot: microsdCardSlot,
                audio_jack_type: audioJackTypes.find((jack) => jack.id === audioJackTypeId)?.label || '',
                price: parseFloat(price),
                qty_in_stock: parseInt(stock)
            }

            console.log(dock)

            const res = await createDock(dock);
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
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">

                        <article className="flex w-full items-center gap-1.5">
                            <p className='font-semibold'>Sản phẩm:</p>
                            {product === '' ? (
                                <SelectProduct onSelectItem={handleSelectProduct} category='usb dock' />
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
                            <p className='font-semibold'>Mã USB dock:</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Mã USB dock" 
                                onChange={(e) => setModel(e.target.value)}
                                
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
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Vật liệu:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Vật liệu" 
                                onChange={(e) => setMaterial(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Kích thước:</p>
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
                            <p className='font-semibold'>Số màn hình hỗ trợ:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Hỗ trợ tối đa bao nhiêu màn hình" 
                                onChange={(e) => setMaxExternalMonitors(e.target.value)}
                                type='number'
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Độ phân giải tối đa:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={supportedResolutions}
                                    placeholder="Chọn độ phân giải..."
                                    value={maxResId}
                                    onChange={setMaxResId}
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

                        <PortInput
                            ports={hdmiPorts}
                            setPorts={setHdmiPorts}
                            versionOptions={HDMI_VERSIONS}
                            portTypeLabel="HDMI"
                        />

                        <PortInput
                            ports={dpPorts}
                            setPorts={setDpPorts}
                            versionOptions={DP_VERSIONS}
                            portTypeLabel="DisplayPort"
                        />

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tốc độ Ethernet (Gbps):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Tốc độ của cổng Ethernet" 
                                onChange={(e) => setEthernetPortSpeed(e.target.value)}
                                type='number'
                                
                            />
                            <Asterisk color='white' size={20}/>
                        </article>

                        <div className='grid grid-cols-2 items-center gap-4'>
                            <article className="flex items-center gap-3">
                                <p className='font-semibold'>Cổng Micro SD?</p>
                                <Switch
                                    checked={microsdCardSlot}
                                    onCheckedChange={setMicrosdCardSlot}
                                />
                                <Asterisk color='white' size={20}/>
                            </article>

                            <article className="flex items-center gap-3">
                                <p className='font-semibold'>Cổng SD?</p>
                                <Switch
                                    checked={sdCardSlot}
                                    onCheckedChange={setSdCardSlot}
                                />
                                <Asterisk color='white' size={20}/>
                            </article>
                        </div>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Cổng âm thanh:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={audioJackTypes}
                                    placeholder="Chọn cổng âm thanh..."
                                    value={audioJackTypeId}
                                    onChange={setAudioJackTypeId}
                                />
                            </div>
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
                            Thêm dock
                        </button>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
