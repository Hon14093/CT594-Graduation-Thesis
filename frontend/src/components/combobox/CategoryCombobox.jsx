import React, { useEffect, useState } from 'react'
import { getCategories } from '@/hooks/product-api'
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Label } from "../ui/label";
import { Check } from "lucide-react";

export default function CategoryCombobox({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories(setCategories);
    }, [])

    return (
        <article className="grid w-full items-center gap-1.5">
            <Label htmlFor="category">Danh mục sản phẩm</Label>
            <Popover open={open} onOpenChange={setOpen} modal={true}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-between">
                        {categories.find((category) => category.category_id === value)?.category_name || "Chọn danh mục"}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-2">
                    <Command>
                        <CommandInput placeholder="Tìm kiếm danh mục..." />
                        <CommandList>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category.category_id}
                                    onSelect={() => {
                                        onChange(category.category_id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={`mr-2 h-4 w-4 ${value === category.category_id ? "opacity-100" : "opacity-0"}`} />
                                    {category.category_name}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </article>
    )
}
