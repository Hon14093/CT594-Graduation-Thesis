// StorageSlotSelector.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { X } from "lucide-react";

const storageTypes = [
    { id: "hdd", label: "HDD" },
    { id: "sata_ssd", label: "SATA SSD" },
    { id: "m2_sata", label: "M.2 SATA SSD" },
    { id: "m2_nvme", label: "M.2 NVMe SSD" },
];

export default function StorageSlotSelector({ value = [], onChange }) {
    const [selected, setSelected] = useState(value);

    useEffect(() => {
        onChange(selected);
    }, [selected]);

    const handleSelect = (id) => {
        if (!selected.includes(id)) {
        setSelected(prev => [...prev, id]);
        }
    };

    const handleRemove = (id) => {
        setSelected(prev => prev.filter(item => item !== id));
    };

    const getLabel = (id) =>
        storageTypes.find(item => item.id === id)?.label ?? id;

    return (
        <div className="flex flex-col gap-2 ml-auto text-lg">
            <Popover modal={true}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className={`!text-lg`}>Chọn loại lưu trữ</Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" modal={true}>
                    <Command>
                        <CommandGroup>
                            {storageTypes.map(item => (
                                <CommandItem
                                    className={`!text-lg`}
                                    key={item.id}
                                    onSelect={() => handleSelect(item.label)}
                                >
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

            <div className="flex flex-wrap gap-2 text-lg">
                {selected.map((id) => (
                    <div
                        key={id}
                        className="flex items-center px-3 py-1 border rounded-full text-sm bg-muted"
                    >
                        {getLabel(id)}
                        <button
                            onClick={() => handleRemove(id)}
                            className="ml-2 hover:text-red-500"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
