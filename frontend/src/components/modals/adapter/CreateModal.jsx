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
import { createAdapter } from '@/hooks/variation-api';

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

export default function CreateModal({ onSubmitSuccess }) {
    const [open, setOpen] = useState(false);
    const [model, setModel] = useState('');
    const [ethernetSpeedGbps, setEthernetSpeedGbps] = useState(0);
    const [maxDataRateGbps, setMaxDataRateGbps] = useState(0);
    const [maxOutputWatt, setMaxOutputWatt] = useState(0);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const [product, setProduct] = useState('');

    const [inputPortId, setInputPortId] = useState("");
    const [outputPortId, setOutputPortId] = useState("");
    const [connectionPortBId, setConnectionPortBId] = useState(""); // not used
    const [hdmiVerId, setHdmiVerId] = useState("");
    const [dpVerId, SetDpVerId] = useState("");
    const [maxResId, setMaxResId] = useState("");

    const handleSelectProduct = (category, item) => { setProduct(item) }

    const handleSubmitSuccess = () => {
        onSubmitSuccess();
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const adapter = {
                product_id: product.product_id,
                adapter_model: model,
                adapter_name: product.product_name + model,
                input_port: connectionPorts.find((port) => port.id === inputPortId)?.label || null,
                output_port: connectionPorts.find((port) => port.id === outputPortId)?.label || null,
                hdmi_version: hdmiVersions.find((ver) => ver.id === hdmiVerId)?.label,
                dp_version: dpVersions.find((ver) => ver.id === dpVerId)?.label,
                max_resolution: resolutions.find((res) => res.id === maxResId)?.label || null,
                ethernet_speed_mbps: parseFloat(ethernetSpeedGbps),
                max_data_rate_gbps: parseFloat(maxDataRateGbps),
                max_output_watt: parseFloat(maxOutputWatt),
                price: parseFloat(price),
                qty_in_stock: parseInt(stock)                
            }

            console.log(adapter);
            const res = await createAdapter(adapter);
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
                    Thêm bộ chuyển đổi
                </Button>
            </DialogTrigger>

            <DialogContent className='!max-w-none lg:w-2/5 max-h-[80vh] flex flex-col'>
                <DialogHeader>
                    <DialogTitle>Thêm bộ chuyển đổi</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        Nhập chính xác các thông tin
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">

                        <article className="flex w-full items-center gap-1.5">
                            <p className='font-semibold'>Sản phẩm:</p>
                            {product === '' ? (
                                <SelectProduct onSelectItem={handleSelectProduct} category='bộ chuyển đổi' />
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
                            <p className='font-semibold'>Mã bộ chuyển đổi:</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Mã bộ chuyển đổi" 
                                onChange={(e) => setModel(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Cổng đầu vào:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={connectionPorts}
                                    placeholder="Chọn loại cổng kết nối..."
                                    value={inputPortId}
                                    onChange={setInputPortId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Cổng đầu ra:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={connectionPorts}
                                    placeholder="Chọn loại cổng kết nối..."
                                    value={outputPortId}
                                    onChange={setOutputPortId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Phiên bản HDMI (nếu có):</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={hdmiVersions}
                                    placeholder="Chọn phiên bản..."
                                    value={hdmiVerId}
                                    onChange={setHdmiVerId}
                                />
                            </div>
                            <Asterisk color='white' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Phiên bản DisplayPort (nếu có):</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={dpVersions}
                                    placeholder="Chọn phiên bản..."
                                    value={dpVerId}
                                    onChange={SetDpVerId}
                                />
                            </div>
                            <Asterisk color='white' size={20}/>
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
                            Thêm bộ chuyển đổi
                        </button>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
