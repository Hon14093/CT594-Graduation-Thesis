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
import { createMonitor } from '@/hooks/variation-api';
import { PortInput } from '@/components/port-input';

const resolutions = [
    { id: "1080p", label: "FHD (1920x1080)" }, 
    { id: "2k", label: "QHD (2560x1440)" }, 
    { id: "4k", label: "UHD (3840x2160)" }, 
    { id: "8k", label: "FUHD (7680×4320)" }, 
];

const panelTypes = [
    { id: "ips", label: "IPS" }, { id: "va", label: "VA" },
    { id: "tn", label: "TN" }, { id: "oled", label: "OLED" },
    { id: "qled", label: "QLED" }, { id: "mini-led", label: "Mini-LED" },
    { id: "micro-led", label: "Micro-LED" },
];

const bitDepths = [
    { id: "6bit", label: "6 bit" }, { id: "6bit-frc", label: "8 bit (6 bit + FRC)" },
    { id: "8bit", label: "8 bit" }, { id: "8bit-frc", label: "10 bit (8 bit + FRC)" },
    { id: "10bit", label: "10 bit" }
];

const refreshRates= [
    { id: "60", label: "60" }, { id: "75", label: "75" }, { id: "120", label: "120" },
    { id: "144", label: "144" }, { id: "165", label: "165" }, { id: "240", label: "240" },
    { id: "360", label: "360" }
];

const HDMI_VERSIONS = ["1.4", "2.0", "2.1"];
const DP_VERSIONS = ["1.2", "1.4", "1.4a", "2.0", "2.1"];

export default function CreateModal({ onSubmitSuccess }) {
    const [open, setOpen] = useState(false);
    const [model, setModel] = useState('');
    const [panel, setPanel] = useState('');
    const [brightness, setBrightness] = useState(200);
    const [responseTime, setResponseTime] = useState(5);
    const [bitDepth, setBitDepth] = useState('');
    const [colorRange, setColorRange] = useState('');
    const [res, setRes] = useState('');
    const [screenSize, setScreenSize] = useState(0);
    const [refreshRate, setRefreshRate] = useState(60);
    const [ports, setPorts] = useState([]);
    const [vesa, setVesa] = useState('');
    const [tech, setTech] = useState('');
    const [inbox, setInbox] = useState('');
    const [powerConsume, setPowerConsume] = useState(0);
    const [weightKg, setWeightKg] = useState(0);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const [product, setProduct] = useState('');

    const [panelId, setPanelId] = useState('');
    const [depthId, setDepthId] = useState('');
    const [resId, setResId] = useState("");
    const [refreshId, setRefreshId] = useState('');
    const [hdmiPorts, setHdmiPorts] = useState([]);
    const [dpPorts, setDpPorts] = useState([]);

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
            const monitor = {
                product_id: product.product_id,
                monitor_model: model,
                monitor_name: product.product_name + model + 
                    refreshRates.find((rate) => rate.id === refreshId).label + 'Hz',
                panel: panelTypes.find((type) => type.id === panelId).label,
                brightness_nits: parseInt(brightness),
                response_time_ms: parseInt(responseTime),
                bit_depth: bitDepths.find((depth) => depth.id === depthId).label,
                color_range: colorRange,
                resolution: resolutions.find((res) => res.id === resId).label,
                screen_size_inches: parseInt(screenSize),
                refresh_rate_hz: parseInt(refreshRates.find((rate) => rate.id === refreshId).label),
                vesa_mount: vesa,
                power_w: parseInt(powerConsume),
                weight_kg: parseFloat(weightKg),
                ports: {
                    hdmi: hdmiPorts,
                    display_port: dpPorts
                },
                monitor_tech: tech,
                in_box_component: inbox,
                price: parseFloat(price),
                qty_in_stock: parseInt(stock)
            }

            console.log(monitor);
            const res = await createMonitor(monitor);
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
                    Thêm màn hình
                </Button>
            </DialogTrigger>

            <DialogContent className='!max-w-none lg:w-2/5 max-h-[80vh] flex flex-col'>
                <DialogHeader>
                    <DialogTitle>Thêm màn hình</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        Nhập chính xác các thông tin
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">

                        <article className="flex w-full items-center gap-1.5">
                            <p className='font-semibold'>Sản phẩm:</p>
                            {product === '' ? (
                                <SelectProduct onSelectItem={handleSelectProduct} category='Màn hình' />
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
                            <p className='font-semibold'>Mã màn hình:</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                placeholder="Mã màn hình" 
                                onChange={(e) => setModel(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tấm nền màn hình:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={panelTypes}
                                    placeholder="Chọn tấm nền..."
                                    value={panelId}
                                    onChange={setPanelId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Độ sáng tối đa (nits):</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Độ sáng tối đa" 
                                onChange={(e) => setBrightness(e.target.value)}
                                defaultValue={brightness}
                                type='number'
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tốc độ phản hồi (ms):</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Tốc độ phản hồi" 
                                onChange={(e) => setResponseTime(e.target.value)}
                                defaultValue={responseTime}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Độ sâu bit:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={bitDepths}
                                    placeholder="Chọn độ sâu..."
                                    value={depthId}
                                    onChange={setDepthId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Độ phủ màu:</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="125% sRGB, 90% DCI-P3,..." 
                                onChange={(e) => setColorRange(e.target.value)}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Độ phân giải:</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={resolutions}
                                    placeholder="Chọn độ phân giải..."
                                    value={resId}
                                    onChange={setResId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Kích thước màn hình (inch):</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Kích thước" 
                                onChange={(e) => setScreenSize(e.target.value)}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tần số quét (Hz):</p>
                            <div className='ml-auto'>
                                <GeneralCombobox
                                    data={refreshRates}
                                    placeholder="Chọn tần số quét..."
                                    value={refreshId}
                                    onChange={setRefreshId}
                                />
                            </div>
                            <Asterisk color='red' size={20}/>
                        </article>

                        {/* ports */}
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
                            <p className='font-semibold'>Hỗ trợ VESA:</p>
                            <RadioGroup 
                                defaultValue="option-one" 
                                className='ml-auto flex gap-5'
                                value={vesa} onValueChange={setVesa}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Không" id="option-one" />
                                    <p htmlFor="option-one">Không</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="75x75mm" id="option-two" />
                                    <p htmlFor="option-two">75x75mm</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="100x100mm" id="option-three" />
                                    <p htmlFor="option-three">100x100mm</p>
                                </div>
                            </RadioGroup>
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Công nghệ màn hình:</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="ELMB Sync, Shadow Boost,..." 
                                onChange={(e) => setTech(e.target.value)}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Công xuất tiêu thụ (W):</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Công xuất" 
                                onChange={(e) => setPowerConsume(e.target.value)}
                                type={`number`}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Cân nặng (Kg):</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Cân nặng kg" 
                                onChange={(e) => setWeightKg(e.target.value)}
                                type={`number`}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Thiết bị trong hộp:</p>
                            <Input 
                                className="max-w-96 ml-auto"  // or w-48, or any fixed width you want
                                placeholder="Thiết bị trong hộp" 
                                onChange={(e) => setInbox(e.target.value)}
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
                            Thêm màn hình
                        </button>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
