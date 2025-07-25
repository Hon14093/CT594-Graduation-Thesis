import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";


const statuses = [
    { status_id: 2, status_name: "Đang được xử lý" },
    { status_id: 3, status_name: "Đang đóng gói" },
    { status_id: 4, status_name: "Đang giao hàng" },
    { status_id: 5, status_name: "Giao hàng thành công" },
];

export default function OrderStatusComboBox({ value, onChange }) {
    const [open, setOpen] = useState(false);
    // const [statuses, setStatuses] = useState([]);

    // useEffect(() => {
    //     getAllOrderStatuses(setStatuses);
    // }, []);

    return (
        <article className="flex justify-center w-full items-center gap-1.5">

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[250px] justify-between text-lg">
                        {value ? statuses.find((status) => status.status_id === value)?.status_name : "Chọn trạng thái"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-2">
                    <Command>
                        <CommandInput placeholder="Tìm trạng thái..." />
                        <CommandList>
                            {statuses.map((status) => (
                                <CommandItem
                                    key={status.status_id}
                                    className={`!text-lg`}
                                    onSelect={() => {
                                        onChange(status.status_id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={`mr-2 h-4 w-4 ${value === status.status_id ? "opacity-100" : "opacity-0"}`} />
                                    {status.status_name}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </article>
    );
}