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
import { updateCable } from '@/hooks/variation-api';

const connectionPorts = [
    // USB-A ports
    { id: "usb-a-2.0", label: "USB-A 2.0" },
    { id: "usb-a-3.0", label: "USB-A 3.0" },
    { id: "usb-a-3.2-gen-1", label: "USB-A 3.2 Gen 1" },
    { id: "usb-a-3.2-gen-2", label: "USB-A 3.2 Gen 2" },

    // USB-C ports
    { id: "usb-c-2.0", label: "USB-C 2.0" },
    { id: "usb-c-3.1-gen-1", label: "USB-C 3.1 Gen 1" },
    { id: "usb-c-3.1-gen-2", label: "USB-C 3.1 Gen 2" },
    { id: "usb-c-3.2-gen-1", label: "USB-C 3.2 Gen 1" },
    { id: "usb-c-3.2-gen-2", label: "USB-C 3.2 Gen 2" },
    { id: "usb-c-3.2-gen-2x2", label: "USB-C 3.2 Gen 2x2" },

    // Thunderbolt (uses USB-C shape)
    { id: "thunderbolt-3", label: "Thunderbolt 3" },
    { id: "thunderbolt-4", label: "Thunderbolt 4" },

    // Video ports
    { id: "hdmi-1.4", label: "HDMI 1.4" },
    { id: "hdmi-2.0", label: "HDMI 2.0" },
    { id: "hdmi-2.1", label: "HDMI 2.1" },
    { id: "displayport-1.2", label: "DisplayPort 1.2" },
    { id: "displayport-1.4", label: "DisplayPort 1.4" },
    { id: "mini-displayport", label: "Mini DisplayPort" },

    // Networking
    { id: "ethernet-rj45", label: "Ethernet (RJ-45)" },
];

const hdmiVersions = [
    { id: "hdmi-1.4", label: "HDMI 1.4" },
    { id: "hdmi-2.0", label: "HDMI 2.0" },
    { id: "hdmi-2.1", label: "HDMI 2.1" },
]

const dpVersions = [
    { id: "displayport-1.2", label: "DisplayPort 1.2" },
    { id: "displayport-1.4", label: "DisplayPort 1.4" },
    { id: "displayport-2.0", label: "DisplayPort 2.0" },
    { id: "displayport-2.1", label: "DisplayPort 2.1" },
]

const resolutions = [
    { id: "1080p-60", label: "1920x1080@60Hz" }, { id: "1080p-144", label: "1920x1080@144Hz" },
    { id: "2k-60", label: "2560x1440@60Hz" }, { id: "2k-144", label: "2560x1440@144Hz" },
    { id: "4k-30", label: "3840x2160@30Hz" }, { id: "4k-60", label: "3840x2160@60Hz" },
];

export default function EditModal({ cable, open, onClose, onSubmitSuccess }) {
    if (!cable) return null;

    const [model, setModel] = useState(cable.cable_model);
    const [cableLengthCm, setCableLengthCm] = useState(cable.cable_length_cm);
    const [material, setMaterial] = useState(cable.material);
    const [weightG, setWeightG] = useState(cable.weight_g);
    const [ethernetSpeedGbps, setEthernetSpeedGbps] = useState(cable.ethernet_speed_mbps);
    const [maxDataRateGbps, setMaxDataRateGbps] = useState(cable.max_data_rate_gbps);
    const [maxOutputWatt, setMaxOutputWatt] = useState(cable.max_output_watt);
    const [price, setPrice] = useState(cable.price);
    const [stock, setStock] = useState(cable.qty_in_stock);
    const [product, setProduct] = useState(cable.product);

    const [connectionPortAId, setConnectionPortAId] = useState(
        connectionPorts.find((item) => item.label === cable.connector_a)?.id
    );
    const [connectionPortBId, setConnectionPortBId] = useState(
        connectionPorts.find((item) => item.label === cable.connector_a)?.id
    );

    const [hdmiVerId, setHdmiVerId] = useState(hdmiVersions.find((item) => item.label === cable.hdmi_version)?.id);
    const [dpVerId, SetDpVerId] = useState(dpVersions.find((item) => item.label === cable.dp_version)?.id);
    const [maxResId, setMaxResId] = useState(resolutions.find((item) => item.label === cable.max_resolution)?.id);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const edited = {
                product_id: product.product_id,
                cable_model: model,
                cable_name: product.product_name + " " + model,
                connector_a: connectionPorts.find((port) => port.id === connectionPortAId)?.label || null,
                connector_b: connectionPorts.find((port) => port.id === connectionPortBId)?.label || null,
                cable_length_cm: parseInt(cableLengthCm),
                material: material,
                weight_g: parseInt(weightG),
                hdmi_version: hdmiVersions.find((ver) => ver.id === hdmiVerId)?.label,
                dp_version: dpVersions.find((ver) => ver.id === dpVerId)?.label,
                max_resolution: resolutions.find((res) => res.id === maxResId)?.label || null,
                ethernet_speed_mbps: parseFloat(ethernetSpeedGbps),
                max_data_rate_gbps: parseFloat(maxDataRateGbps),
                max_output_watt: parseFloat(maxOutputWatt),
                price: parseFloat(price),
                qty_in_stock: parseInt(stock)               
            }

            const res = await updateCable(cable.cable_id, edited);
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
                    <DialogTitle className='pb-5'>Cập nhật thông tin bộ chuyển đổi</DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">

                        <article className="flex w-full items-center gap-1.5">
                            <p className='font-semibold'>Sản phẩm:</p>
                            <div className='mr-2 ml-auto'>{product.product_name}</div>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Mã dây cáp:</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Mã dây cáp" 
                                onChange={(e) => setModel(e.target.value)}
                                defaultValue={model}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Đầu kết nối A:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={connectionPorts}
                                    placeholder="Chọn loại cổng kết nối..."
                                    value={connectionPortAId}
                                    onChange={setConnectionPortAId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Đầu kết nối B:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={connectionPorts}
                                    placeholder="Chọn loại cổng kết nối..."
                                    value={connectionPortBId}
                                    onChange={setConnectionPortBId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Độ dài dây cáp (cm):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Độ dài dây cáp" 
                                onChange={(e) => setCableLengthCm(e.target.value)}
                                type='number'
                                // defaultValue={}
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
                            <p className='font-semibold'>Trọng lượng:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Trọng lượng" 
                                onChange={(e) => setWeightG(e.target.value)}
                                type='number'
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Độ phân giải tối đa:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={resolutions}
                                    placeholder="Chọn độ phân giải..."
                                    value={maxResId}
                                    onChange={setMaxResId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tốc độ Ethernet (Mbps):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Tốc độ của cổng Ethernet" 
                                onChange={(e) => setEthernetSpeedGbps(e.target.value)}
                                type='number'
                                
                            />
                            <Asterisk color='white' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tốc độ truyền dữ liệu tối đa (Gbps):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Tốc độ truyền tối đa" 
                                onChange={(e) => setMaxDataRateGbps(e.target.value)}
                                type='number'
                                
                            />
                            <Asterisk color='white' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Công xuất tối đa (W):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Công xuất tối đa" 
                                onChange={(e) => setMaxOutputWatt(e.target.value)}
                                type='number'
                                
                            />
                            <Asterisk color='white' size={20}/>
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
                            Thêm dây cáp
                        </button>
                        
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
