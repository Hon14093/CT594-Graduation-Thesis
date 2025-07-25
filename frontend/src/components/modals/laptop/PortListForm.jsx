import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

export default function PortListForm({ defaultValue = [], onChange }) {
    const [ports, setPorts] = useState(defaultValue);

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

    const addPort = () => {
        setPorts((prev) => [...prev, { type: "", version: "", quantity: 1 }]);
    };

    const removePort = (index) => {
        setPorts((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <p className="text-lg font-semibold">Cổng kết nối:</p>
            {ports.map((port, index) => (
                <div key={index} className="flex flex-wrap items-end gap-4">
                    <div className="flex flex-col gap-1 w-[180px]">
                        <p>Loại cổng</p>
                        <Input
                            placeholder="USB-A / HDMI / SD Card"
                            value={port.type}
                            onChange={(e) => handlePortChange(index, "type", e.target.value)}
                        />
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
