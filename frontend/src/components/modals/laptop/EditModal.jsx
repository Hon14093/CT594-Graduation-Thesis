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
import StorageSlotSelector from './StorageSlotsSelector';
import PortListForm from './PortListForm';
import { updateLaptop } from '@/hooks/variation-api';

const resolutions = [
    { id: "1080p", label: "1920x1080" }, 
    { id: "2k", label: "2560x1440" }, 
    { id: "4k", label: "3840x2160" }, 
    { id: "8k", label: "7680×4320" }, 
];

const wifiVersions = [
    { id: "wifi5", label: "Wi-Fi 5" },
    { id: "wifi6", label: "Wi-Fi 6" },
    { id: "wifi6e", label: "Wi-Fi 6E" },
    { id: "wifi7", label: "Wi-Fi 7" },
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

export default function EditModal({ laptop, open, onClose, onSubmitSuccess }) {
    if (!laptop) return null;

    // const [open, setOpen] = useState(false);
    const [model, setModel] = useState(laptop.laptop_model);
    const [cpu, setCpu] = useState(laptop.cpu);
    const [gpu, setGpu] = useState(laptop.gpu);
    const [ramInstalled, setRamInstalled] = useState(laptop.ram_installed); // GB
    const [ramType, setRamType] = useState(laptop.ram_type); // DDR4, DDR5
    const [ramSlots, setRamSlots] = useState(laptop.ram_slots);
    const [maxRam, setMaxRam] = useState(laptop.max_ram);
    const [frequencyMhz, setFrequency] = useState(laptop.frequency_mhz); // this is ram speed
    const [refreshRate, setRefreshRate] = useState(laptop.refresh_rate); // this is for laptop screen
    const [panel, setPanel] = useState(laptop.panel);
    const [screenSize, setScreenSize] = useState(laptop.screen_size);
    const [monitorTech, setMonitorTech] = useState(laptop.monitor_tech);
    const [soundTech, setSoundTech] = useState(laptop.sound_tech);
    const [os, setOs] = useState(laptop.os);
    const [batteryWh, setBatteryWh] = useState(laptop.battery_wh);
    const [weightKg, setWeightKg] = useState(laptop.weight_kg);
    const [storageInstalled, setStorageInstalled] = useState(laptop.storage_installed_gbs);
    const [storageSlots, setStorageSlots] = useState(laptop.storage_slots);
    const [storageSlotTypes, setStorageSlotTypes] = useState(laptop.storageSlotTypes);
    const [maxStorage, setMaxStorage] = useState(laptop.max_storage_gb); // GB

    const [portData, setPortData] = useState(laptop.ports);

    const [price, setPrice] = useState(laptop.price);
    const [stock, setStock] = useState(laptop.qty_in_stock);
    const [product, setProduct] = useState(laptop.product);

    const [resId, setResId] = useState(resolutions.find((res) => res.label === laptop.resolution).id);
    const [wifiId, setWifiId] = useState(wifiVersions.find((item) => item.label === laptop.wifi_version).id);
    const [btId, setBtId] = useState(
        bluetoothVersions.find((item) => item.label == laptop.bluetooth_version)?.id
    ); // bluetooth
    const [storageId, setStorageId] = useState(
        storageTypes.find((item) => item.label === laptop.storage_installed_type).id
    );
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const edited = {
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

            const res = await updateLaptop(laptop.laptop_id, edited);
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
                    <DialogTitle className='pb-5'>Cập nhật thông tin laptop</DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-2 h-96">
                    <form onSubmit={(e) => handleSubmit(e)} className="text-lg text-black grid gap-4">
                    
                        <article className="flex w-full items-center gap-1.5">
                            <p className='font-semibold'>Sản phẩm:</p>
                            <div className='mr-2 ml-auto'>{product.product_name}</div>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Mã laptop:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Mã laptop" 
                                defaultValue={model}
                                onChange={(e) => setModel(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>CPU:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Intel core i5-13400F,..." 
                                defaultValue={cpu}
                                onChange={(e) => setCpu(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>GPU:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Nvidia RTX 3050 6GB,..." 
                                defaultValue={gpu}
                                onChange={(e) => setGpu(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>RAM có sẵn (GB):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Dung lượng có sẵn" 
                                defaultValue={ramInstalled}
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
                                defaultValue={ramType}
                                onChange={(e) => setRamType(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tốc độ RAM (MHz):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Tốc độ RAM" 
                                defaultValue={frequencyMhz}
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
                                defaultValue={laptop.ram_slots}
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
                                defaultValue={maxRam}
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
                                defaultValue={refreshRate}
                                onChange={(e) => setRefreshRate(e.target.value)}
                                type={`number`}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Tấm nền:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                defaultValue={panel}
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
                                defaultValue={screenSize}
                                onChange={(e) => setScreenSize(e.target.value)}
                                type={`number`}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Độ phân giải:</p>
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
                                defaultValue={monitorTech}
                                onChange={(e) => setMonitorTech(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Công nghệ âm thanh:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Công nghệ âm thanh" 
                                defaultValue={soundTech}
                                onChange={(e) => setSoundTech(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Hệ điều hành:</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Windows 11, MacOS,..." 
                                defaultValue={os}
                                onChange={(e) => setOs(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Dung lượng pin (wh):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Dung lượng pin" 
                                defaultValue={batteryWh}
                                onChange={(e) => setBatteryWh(e.target.value)}
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Cân nặng (Kg):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Cân nặng" 
                                defaultValue={weightKg}
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
                                defaultValue={storageInstalled}
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
                                defaultValue={storageSlots}
                                onChange={(e) => setStorageSlots(e.target.value)}
                                type={`number`}
                            />
                            
                            <Asterisk color='red' size={20}/>
                        </article>

                        {/* This isn't done, need to implement array */}
                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Các loại lưu trữ:</p>
                            <StorageSlotSelector
                                value={laptop.storage_slots_type}
                                onChange={setStorageSlotTypes}
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Dung lượng tối đa (GB):</p>
                            <Input 
                                className="max-w-96 ml-auto"  
                                placeholder="Dung lượng lưu trữ tối đa" 
                                defaultValue={maxStorage}
                                onChange={(e) => setMaxStorage(e.target.value)}
                                type='number'
                            />
                            <Asterisk color='red' size={20}/>
                        </article>

                        {/* gonna to re-structure the JSONB */}
                        <PortListForm defaultValue={portData} onChange={setPortData}/>

                        <article className="flex items-center gap-1.5">
                            <p className='font-semibold'>Giá bán (vnđ):</p>
                            <Input 
                                className="max-w-96 ml-auto"
                                defaultValue={price}
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
                                defaultValue={stock}
                                onChange={(e) => setStock(e.target.value)}
                                type='number'
                                
                            />
                            <Asterisk color='red' size={20}/>
                        </article>
                        
                        <button type='submit' className='big-action-button mb-2'>
                            Cập nhật laptop
                        </button>
                    </form>

                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
