import React, { useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function GeneralCombobox({ 
    data, 
    placeholder = "Select...", 
    value, 
    onChange 
}) {
    const [open, setOpen] = useState(false);

    const selectedItem = data.find((item) => item.id === value);

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-96 justify-between !text-lg font-normal"
                >
                    {selectedItem ? selectedItem.label : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandEmpty>No items found.</CommandEmpty>
                    <CommandGroup>
                        {data.map((item) => (
                            <CommandItem
                                key={item.id}
                                value={item.id}
                                className='!text-lg'
                                onSelect={() => {
                                    onChange(item.id); // Pass ID back to parent
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === item.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}