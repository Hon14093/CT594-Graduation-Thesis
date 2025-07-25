import React, { use, useEffect, useState } from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Plus, Asterisk } from 'lucide-react';
import { Trash2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { createDiscount } from '@/hooks/discount-api';
import { PortInput } from '@/components/port-input';
import PortListForm from './PortListForm';
import { GeneralCombobox } from '@/components/combobox/GeneralCombobox';
import StorageSlotSelector from './StorageSlotsSelector';
import SelectProduct from '../SelectProduct';
import { createLaptop } from '@/hooks/variation-api';

const resolutions = [
    { id: "1080p", label: "FHD (1920x1080)" }, 
    { id: "2k", label: "QHD (2560x1440)" }, 
    { id: "4k", label: "UHD (3840x2160)" }, 
    { id: "8k", label: "FUHD (7680×4320)" }, 
];

const wifiVersions = [
    { id: "wifi5", label: "Wi-Fi 5 (802.11ac)" },
    { id: "wifi6", label: "Wi-Fi 6 (802.11ax)" },
    { id: "wifi6e", label: "Wi-Fi 6E (802.11ax + 6GHz)" },
    { id: "wifi7", label: "Wi-Fi 7 (802.11be)" },
];

const bluetoothVersions = [
    { id: "bt4", label: "Bluetooth 4.2" },
    { id: "bt5", label: "Bluetooth 5.0" },
    { id: "bt51", label: "Bluetooth 5.1" },
    { id: "bt52", label: "Bluetooth 5.2" },
    { id: "bt53", label: "Bluetooth 5.3" },
];

const storageTypes = [
    { id: "hdd", label: "HDD" },
    { id: "sata_ssd", label: "SATA SSD" },
    { id: "m2_sata", label: "M.2 SATA SSD" },
    { id: "m2_nvme", label: "M.2 NVMe SSD" },
    { id: "emmc", label: "eMMC" }
];

export default function CreateModal({ onSubmitSuccess }) {
    const [open, setOpen] = useState(false);
    const [model, setModel] = useState('');
    const [cpu, setCpu] = useState('');
    const [gpu, setGpu] = useState('');
    const [ramInstalled, setRamInstalled] = useState(0); // GB
    const [ramType, setRamType] = useState(''); // DDR4, DDR5
    const [ramSlots, setRamSlots] = useState(0);
    const [maxRam, setMaxRam] = useState(0);
    const [frequencyMhz, setFrequency] = useState(0); // this is ram speed
    const [refreshRate, setRefreshRate] = useState(0); // this is for laptop screen
    const [panel, setPanel] = useState('');
    const [screenSize, setScreenSize] = useState(0);
    const [resolution, setResolution] = useState('');
    const [monitorTech, setMonitorTech] = useState('');
    const [soundTech, setSoundTech] = useState('');
    const [os, setOs] = useState('');
    const [batteryWh, setBatteryWh] = useState(0);
    const [weightKg, setWeightKg] = useState(0);
    const [wifiVer, setWifiVer] = useState('');
    const [bluetoothVer, setBluetoothVer] = useState('');
    const [storageInstalled, setStorageInstalled] = useState(0);
    const [storageType, setStorageType] = useState(''); // this means storage type installed on laptop
    const [storageSlots, setStorageSlots] = useState(0);
    const [storageSlotTypes, setStorageSlotTypes] = useState([]);
    const [maxStorage, setMaxStorage] = useState(0); // GB

    const [portData, setPortData] = useState([]);

    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(1);
    const [product, setProduct] = useState('');

    const [resId, setResId] = useState("");
    const [wifiId, setWifiId] = useState('');
    const [btId, setBtId] = useState(''); // bluetooth
    const [storageId, setStorageId] = useState('');

    const handleSelectProduct = (category, item) => {
        setProduct(item)
    }

    const handleSubmitSuccess = () => {
        setOpen(false);
        onSubmitSuccess();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const laptop = {
                product_id: product.product_id,
                laptop_model: model,
                laptop_name: product.product_name + " " + model + " " + cpu + " " + gpu,
                cpu: cpu,
                gpu: gpu,
                ram_installed: parseInt(ramInstalled),
                ram_type: ramType,
                ram_slots: parseInt(ramSlots),
                frequency_mhz: parseInt(frequencyMhz),
                max_ram: parseInt(maxRam),
                refresh_rate: parseInt(refreshRate),
                panel: panel,
                screen_size: parseFloat(screenSize),
                resolution: resolutions.find((res) => res.id === resId).label,
                monitor_tech: monitorTech,
                sound_tech: soundTech,
                os: os,
                battery_wh: parseInt(batteryWh),
                weight_kg: parseFloat(weightKg),
                wifi_version: wifiVersions.find((wifi) => wifi.id === wifiId).label,
                bluetooth_version: bluetoothVersions.find((bt) => bt.id === btId).label,
                ports: portData,
                storage_installed_gbs: parseInt(storageInstalled),
                storage_slots: parseInt(storageSlots),
                storage_installed_type: storageTypes.find((type) => type.id === storageId).label,
                storage_slots_type: storageSlotTypes,
                max_storage_gb: parseInt(maxStorage),
                price: parseFloat(price),
                qty_in_stock: parseInt(stock)
            }

            console.log('laptop', laptop)

            const res = await createLaptop(laptop);
            if (res.data.success) handleSubmitSuccess();            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setOpen(true)}>
                    <Plus />
                    Thêm laptop
                </Button>
            </DialogTrigger>

            <DialogContent className='!max-w-none lg:w-2/5 max-h-[80vh] flex flex-col'>
                <DialogHeader>
                    <DialogTitle>Thêm laptop</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        Nhập chính xác các thông tin
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">

                        <article className="flex w-full items-center gap-1.5">
                            <p className='font-semibold'>Sản phẩm:</p>
                            {product === '' ? (
                                <SelectProduct onSelectItem={handleSelectProduct} category='laptop' />
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
                            <p className='font-semibold'>Mã laptop:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Mã laptop" 
                                onChange={(e) => setModel(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>CPU:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Intel core i5-13400F,..." 
                                onChange={(e) => setCpu(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>GPU:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Nvidia RTX 3050 6GB,..." 
                                onChange={(e) => setGpu(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>RAM có sẵn (GB):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Dung lượng có sẵn" 
                                onChange={(e) => setRamInstalled(e.target.value)}
                                type={`number`}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Loại RAM:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="DDR3, DDR4, DDR5" 
                                onChange={(e) => setRamType(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tốc độ RAM (MHz):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Tốc độ RAM" 
                                onChange={(e) => setFrequency(e.target.value)}
                                type={`number`}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Số khe RAM:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Số khe RAM" 
                                onChange={(e) => setRamSlots(e.target.value)}
                                type={`number`}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Dung lượng RAM tối đa (GB):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="RAM tối đa" 
                                onChange={(e) => setMaxRam(e.target.value)}
                                type={`number`}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tần số quét (Hz):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Tần số quét của màn hình" 
                                onChange={(e) => setRefreshRate(e.target.value)}
                                type={`number`}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tấm nền:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Tấm nền màn hình" 
                                onChange={(e) => setPanel(e.target.value)}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Kích thước màn hình (inch):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Kích thước màn hình" 
                                onChange={(e) => setScreenSize(e.target.value)}
                                type={`number`}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Độ phân giải:</p>
                            {/* <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Độ phân giải" 
                                onChange={(e) => setResolution(e.target.value)}
                            /> */}
                            <GeneralCombobox
                                data={resolutions}
                                placeholder="Chọn độ phân giải..."
                                value={resId}
                                onChange={setResId}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Công nghệ màn hình:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Công nghệ màn hình" 
                                onChange={(e) => setMonitorTech(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Công nghệ âm thanh:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Công nghệ âm thanh" 
                                onChange={(e) => setSoundTech(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Hệ điều hành:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Windows 11, MacOS,..." 
                                onChange={(e) => setOs(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Dung lượng pin (wh):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Dung lượng pin" 
                                onChange={(e) => setBatteryWh(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Cân nặng (Kg):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Cân nặng" 
                                onChange={(e) => setWeightKg(e.target.value)}
                                type={`number`}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Phiên bản wifi:</p>
                            <GeneralCombobox
                                data={wifiVersions}
                                placeholder="Chọn phiên bản..."
                                value={wifiId}
                                onChange={setWifiId}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Phiên bản bluetooth:</p>
                            <GeneralCombobox
                                data={bluetoothVersions}
                                placeholder="Chọn phiên bản..."
                                value={btId}
                                onChange={setBtId}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Dung lượng ổ cứng (GB):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Dung lượng ổ cứng" 
                                onChange={(e) => setStorageInstalled(e.target.value)}
                                type={`number`}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Loại ổ cứng:</p>
                            <GeneralCombobox
                                data={storageTypes}
                                placeholder="Chọn loại lưu trữ..."
                                value={storageId}
                                onChange={setStorageId}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Số khe ổ cứng:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Số khe SSD" 
                                onChange={(e) => setStorageSlots(e.target.value)}
                                type={`number`}
                            />
                            
                            <Asterisk color='red' size={20}/>
                        </article>

                        {/* This isn't done, need to implement array */}
                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Các loại lưu trữ:</p>
                            <StorageSlotSelector
                                value={storageSlotTypes}
                                onChange={setStorageSlotTypes}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Dung lượng tối đa (GB):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Dung lượng lưu trữ tối đa" 
                                onChange={(e) => setMaxStorage(e.target.value)}
                                type='number'
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                         {/* ports */}
                        <PortListForm onChange={setPortData}/>

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
                            Thêm laptop
                        </button>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
