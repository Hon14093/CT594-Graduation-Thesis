import React, { useEffect, useState } from 'react'
import { getBrands } from '@/hooks/product-api'
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Label } from "../ui/label";
import { Check } from "lucide-react";

export default function BrandCombobox({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        getBrands(setBrands);
    }, [])

    return (
        <article className="grid w-full items-center gap-1.5">
            <Label htmlFor="brand">Thương hiệu sản phẩm</Label>
            <Popover open={open} onOpenChange={setOpen} modal={true}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-between">
                        {brands.find((brand) => brand.brand_id === value)?.brand_name || "Chọn thương hiệu"}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-2">
                    <Command>
                        <CommandInput placeholder="Tìm kiếm thương hiệu..." />
                        <CommandList>
                            {brands.map((brand) => (
                                <CommandItem
                                    key={brand.brand_id}
                                    onSelect={() => {
                                        onChange(brand.brand_id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={`mr-2 h-4 w-4 ${value === brand.brand_id ? "opacity-100" : "opacity-0"}`} />
                                    {brand.brand_name}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </article>
    )
}
