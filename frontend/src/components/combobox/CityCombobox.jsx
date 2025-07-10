import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Label } from "../ui/label";
import { Check } from "lucide-react";

const vietnamCities = [
    { city_id: 1, city_name: "Hà Nội" }, { city_id: 2, city_name: "Hồ Chí Minh" }, { city_id: 3, city_name: "Hải Phòng" }, { city_id: 4, city_name: "Đà Nẵng" }, { city_id: 5, city_name: "Cần Thơ" }, { city_id: 6, city_name: "An Giang" }, { city_id: 7, city_name: "Bà Rịa - Vũng Tàu" }, { city_id: 8, city_name: "Bạc Liêu" }, { city_id: 9, city_name: "Bắc Giang" }, { city_id: 10, city_name: "Bắc Kạn" }, { city_id: 11, city_name: "Bắc Ninh" }, { city_id: 12, city_name: "Bến Tre" }, { city_id: 13, city_name: "Bình Dương" }, { city_id: 14, city_name: "Bình Định" },  { city_id: 15, city_name: "Bình Phước" }, { city_id: 16, city_name: "Bình Thuận" }, { city_id: 17, city_name: "Cà Mau" }, { city_id: 18, city_name: "Cao Bằng" }, { city_id: 19, city_name: "Đắk Lắk" }, { city_id: 20, city_name: "Đắk Nông" }, { city_id: 21, city_name: "Điện Biên" }, { city_id: 22, city_name: "Đồng Nai" }, { city_id: 23, city_name: "Đồng Tháp" }, { city_id: 24, city_name: "Gia Lai" }, { city_id: 25, city_name: "Hà Giang" }, { city_id: 26, city_name: "Hà Nam" }, { city_id: 27, city_name: "Hà Tĩnh" }, { city_id: 28, city_name: "Hải Dương" }, { city_id: 29, city_name: "Hậu Giang" }, { city_id: 30, city_name: "Hòa Bình" }, { city_id: 31, city_name: "Hưng Yên" }, { city_id: 32, city_name: "Khánh Hòa" }, { city_id: 33, city_name: "Kiên Giang" }, { city_id: 34, city_name: "Kon Tum" }, { city_id: 35, city_name: "Lai Châu" }, { city_id: 36, city_name: "Lâm Đồng" }, { city_id: 37, city_name: "Lạng Sơn" }, { city_id: 38, city_name: "Lào Cai" }, { city_id: 39, city_name: "Long An" }, { city_id: 40, city_name: "Nam Định" }, { city_id: 41, city_name: "Nghệ An" }, { city_id: 42, city_name: "Ninh Bình" }, { city_id: 43, city_name: "Ninh Thuận" }, { city_id: 44, city_name: "Phú Thọ" }, { city_id: 45, city_name: "Phú Yên" }, { city_id: 46, city_name: "Quảng Bình" }, { city_id: 47, city_name: "Quảng Nam" }, { city_id: 48, city_name: "Quảng Ngãi" }, { city_id: 49, city_name: "Quảng Ninh" }, { city_id: 50, city_name: "Quảng Trị" }, { city_id: 51, city_name: "Sóc Trăng" }, { city_id: 52, city_name: "Sơn La" }, { city_id: 53, city_name: "Tây Ninh" }, { city_id: 54, city_name: "Thái Bình" }, { city_id: 55, city_name: "Thái Nguyên" }, { city_id: 56, city_name: "Thanh Hóa" }, { city_id: 57, city_name: "Thừa Thiên Huế" }, { city_id: 58, city_name: "Tiền Giang" }, { city_id: 59, city_name: "Trà Vinh" }, { city_id: 60, city_name: "Tuyên Quang" }, { city_id: 61, city_name: "Vĩnh Long" }, { city_id: 62, city_name: "Vĩnh Phúc" }, { city_id: 63, city_name: "Yên Bái" }
];


export default function CityCombobox({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        setCities(vietnamCities);
    }, []);

    return (
        <article className="grid w-full items-center gap-1.5">
            <Label htmlFor="city">Thành phố</Label>
            <Popover open={open} onOpenChange={setOpen} modal={true}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-between">
                        {cities.find((city) => city.city_name === value)?.city_name || "Chọn thành phố"}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[200px] p-2">
                    <Command>
                        <CommandInput placeholder="Tìm kiếm thành phố..." />
                        <CommandList>
                            {cities.map((city) => (
                                <CommandItem
                                    key={city.city_id}
                                    onSelect={() => {
                                        onChange(city.city_name);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={`mr-2 h-4 w-4 ${value === city.city_id ? "opacity-100" : "opacity-0"}`} />
                                    {city.city_name}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </article>
    )
}
