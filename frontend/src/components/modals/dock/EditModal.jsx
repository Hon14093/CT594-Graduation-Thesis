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
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GeneralCombobox } from '@/components/combobox/GeneralCombobox';
import { updateDock } from '@/hooks/variation-api';
import { PortInput } from '@/components/port-input';

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
const HDMI_VERSIONS = ["1.4", "2.0", "2.1"];
const DP_VERSIONS = ["1.2", "1.4", "1.4a", "2.0", "2.1"];

export default function EditModal({ dock, open, onClose, onSubmitSuccess }) {
    if (!dock) return null;

    useEffect(() => {
        if (dock.dimensions_mm) {
            const [l, w, h] = dock.dimensions_mm.split("x").map(Number);
            setLength(l || 0);
            setWidth(w || 0);
            setHeight(h || 0);
        }

        console.log(dock.usb_a_ports)
    }, [dock.dimensions_mm]);

    const [model, setModel] = useState(dock.dock_model);
    const [maxDataRateGbps, setMaxDataRateGbps] = useState(dock.max_data_rate_gbps);
    const [maxOutputWatt, setMaxOutputWatt] = useState(dock.max_output_watt);
    const [cableLengthCm, setCableLengthCm] = useState(dock.cable_length_cm);
    const [material, setMaterial] = useState(dock.material);    
    const [maxExternalMonitors, setMaxExternalMonitors] = useState(dock.max_external_monitors);
    const [usbAPorts, setUsbAPorts] = useState(dock?.usb_a_ports || []); // JSONB - adjust type as needed
    const [usbCPorts, setUsbCPorts] = useState(dock?.usb_c_ports || []); // JSONB - adjust type as needed
    const [hdmiPorts, setHdmiPorts] = useState(dock?.hdmi || []);
    const [dpPorts, setDpPorts] = useState(dock?.display_port || []);
    const [ethernetPortSpeed, setEthernetPortSpeed] = useState(dock.ethernet_speed_gbps);
    const [sdCardSlot, setSdCardSlot] = useState(dock.sd_card_slot);
    const [microsdCardSlot, setMicrosdCardSlot] = useState(dock.microsd_card_slot);
    const [price, setPrice] = useState(dock.price);
    const [stock, setStock] = useState(dock.qty_in_stock);
    const [product, setProduct] = useState(dock.product);

    const [length, setLength] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [connectionPortId, setConnectionPortId] = useState(
        connectionPorts.find((item) => item.label === dock.connection_port)?.id
    );
    const [audioJackTypeId, setAudioJackTypeId] = useState(
        audioJackTypes.find((item) => item.label === dock.audio_jack_type)?.id
    );
    const [maxResId, setMaxResId] = useState(
        supportedResolutions.find((item) => item.label === dock.max_resolution)?.id || 0
    );
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const edited = {
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
                max_resolution: supportedResolutions.find((res) => res.id === maxResId)?.label || 'Không hỗ trợ',
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

            const res = await updateDock(dock.dock_id, edited);
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
                    <DialogTitle className='pb-5'>Cập nhật thông tin dock</DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">

                        <article className="flex w-full items-center gap-1.5">
                            <p className='font-semibold'>Sản phẩm:</p>
                            <div className='mr-2 ml-auto'>{product.product_name}</div>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Mã USB dock:</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Mã USB dock" 
                                onChange={(e) => setModel(e.target.value)}
                                defaultValue={model}
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
                                defaultValue={maxDataRateGbps}
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
                                defaultValue={maxOutputWatt}
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
                                defaultValue={cableLengthCm}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Vật liệu:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Vật liệu" 
                                onChange={(e) => setMaterial(e.target.value)}
                                defaultValue={material}
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
                            <p className='font-semibold'>Số màn hình hỗ trợ:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Hỗ trợ tối đa bao nhiêu màn hình" 
                                onChange={(e) => setMaxExternalMonitors(e.target.value)}
                                type='number'
                                defaultValue={maxExternalMonitors}
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
                                defaultValue={ethernetPortSpeed}
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
                            Cập nhật dock
                        </button>
                        
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
