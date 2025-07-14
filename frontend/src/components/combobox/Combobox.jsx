import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";

export function Combobox({ options, value, onChange, placeholder = "Select..." }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-56 justify-between"
                onClick={() => setOpen(!open)}
            >
                {value || placeholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
            
            {open && (
                <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-10">
                    {options.map((option) => (
                        <div
                            key={option}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                        >
                        <Check
                            className={`mr-2 h-4 w-4 ${
                                value === option ? "opacity-100" : "opacity-0"
                            }`}
                        />
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}