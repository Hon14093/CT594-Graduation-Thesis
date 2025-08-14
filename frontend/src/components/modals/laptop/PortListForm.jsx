import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

const PREDEFINED_PORTS = [
    "USB-A",
    "USB-C",
    "Thunderbolt 4",
    "Thunderbolt 5",
    "HDMI",
    "DisplayPort",
    "Mini DisplayPort",
    "Ethernet (RJ-45)",
    "SD Card Reader",
    "MicroSD Card Reader",
    "Audio Jack (3.5mm)",
];

export default function PortListForm({ defaultValue = [], onChange }) {
    const [ports, setPorts] = useState(defaultValue);
    const [openIndex, setOpenIndex] = useState(null); 

    useEffect(() => {
        setPorts(defaultValue);
        console.log('default', defaultValue)
    }, []);

    useEffect(() => {
        onChange?.(ports);
    }, [ports]);

    const handlePortChange = (index, key, value) => {
        const updatedPorts = [...ports];
        updatedPorts[index][key] = value;
        setPorts(updatedPorts);
    };

    const toggleSupport = (index, supportType, isOn) => {
        const updatedPorts = [...ports];
        let supports = updatedPorts[index].supports || [];

        if (isOn) {
            if (!supports.includes(supportType)) {
                supports.push(supportType);
            }
        } else {
            supports = supports.filter((s) => s !== supportType);
        }

        updatedPorts[index].supports = supports;
        setPorts(updatedPorts);
    };

    const addPort = () => {
        setPorts((prev) => [
            ...prev,
            { type: "", version: "", quantity: 1, supports: [] },
        ]);
    };
    
    // const addPort = () => {
    //     setPorts((prev) => [...prev, { type: "", version: "", quantity: 1 }]);
    // };

    const removePort = (index) => {
        setPorts((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <p className="text-lg font-semibold">Cổng kết nối:</p>
            {ports.map((port, index) => (
                <div key={index} className="flex flex-wrap items-end gap-4">

                    {/* <div className="flex flex-col gap-1 w-[180px]">
                        <p>Loại cổng</p>
                        
                        <Input
                            placeholder="USB-A / HDMI / SD Card"
                            value={port.type}
                            onChange={(e) => handlePortChange(index, "type", e.target.value)}
                        />
                    </div> */}

                    <div className="flex flex-col gap-1 w-[180px]">
                        <p>Loại cổng</p>
                        <Popover
                            open={openIndex === index}
                            onOpenChange={(open) => setOpenIndex(open ? index : null)}
                            modal={true}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className="justify-between !text-lg"
                                >
                                    {port.type || "Chọn loại cổng..."}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Tìm cổng..." />
                                    <CommandEmpty>Không tìm thấy.</CommandEmpty>
                                    <CommandGroup>
                                        {PREDEFINED_PORTS.map((p) => (
                                            <CommandItem
                                                key={p}
                                                className={`!text-lg`}
                                                onSelect={() => {
                                                    handlePortChange(index, "type", p);
                                                    setOpenIndex(null);
                                                }}
                                            >
                                                {p}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex flex-col gap-1 w-[150px]">
                        <p>Phiên bản</p>
                        <Input
                            placeholder="3.0 / 2.1 / UHS-II"
                            value={port.version}
                            onChange={(e) =>
                                handlePortChange(index, "version", e.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-[100px]">
                        <p>Số lượng</p>
                        <Input
                            type="number"
                            min={1}
                            value={port.quantity}
                            onChange={(e) =>
                                handlePortChange(index, "quantity", parseInt(e.target.value))
                            }
                        />
                    </div>

                    {["USB-C", "Thunderbolt 4", "Thunderbolt 5"].includes(port.type) && (
                        <div className="flex gap-6 mt-2">
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={port.supports?.includes("PD")}
                                    onCheckedChange={(checked) =>
                                        toggleSupport(index, "PD", checked)
                                    }
                                />
                                    <p>Hỗ trợ sạc (PD)</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={port.supports?.includes("DP")}
                                    onCheckedChange={(checked) =>
                                        toggleSupport(index, "DP", checked)
                                    }
                                />
                                    <p>DisplayPort (DP)</p>
                            </div>
                        </div>
                    )}

                    <Button
                        variant="ghost"
                        className="text-red-500"
                        onClick={() => removePort(index)}
                    >
                        <Trash2 size={25} />
                    </Button>
                </div>
            ))}

            <Button onClick={addPort} type="button" variant="outline" className={`!text-lg`}>
                <Plus className="w-4 h-4 mr-2" />
                Thêm cổng
            </Button>
        </div>
    );
}
