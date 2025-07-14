import { useState } from "react";
import { Button } from "./ui/button";
import { Combobox } from "./combobox/Combobox";
import { Input } from "./ui/input";
import { Trash2 } from "lucide-react";
import { Switch } from "./ui/switch";

export function PortInput({ 
    ports, 
    setPorts, 
    versionOptions, 
    portTypeLabel 
}) {
    const isUSBC = portTypeLabel.includes('USB-C');

    const handlePortChange = (index, field, value) => {
        const updatedPorts = [...ports];
        updatedPorts[index][field] = value;
        setPorts(updatedPorts);
    };

    const addNewPort = () => {
        setPorts([
            ...ports, 
            isUSBC 
                ? { version: "", quantity: 1, supportsDP: false, supportsPD: false }
                : { version: "", quantity: 1 }
        ]);
    };

    return (
        <div className="space-y-3 border p-4 rounded-lg">
            <h3 className="font-medium">{portTypeLabel}</h3>
            {ports.map((port, index) => (
                <div key={index} className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                        <Combobox
                            options={versionOptions}
                            value={port.version}
                            onChange={(value) => handlePortChange(index, 'version', value)}
                            placeholder={`Chọn phiên bản ${portTypeLabel}...`}
                        />
                        <Input
                            type="number"
                            value={port.quantity}
                            onChange={(e) => handlePortChange(index, 'quantity', e.target.value)}
                            min="0"
                            className="w-20"
                        />
                        <Button
                            variant="ghost"
                            onClick={() => setPorts(ports.filter((_, i) => i !== index))}
                        >
                            <Trash2 color="red" size={20} />
                        </Button>
                    </div>

                    {isUSBC && (
                        <div className="flex gap-4 items-center pl-2">
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={port.supportsDP || false}
                                    onCheckedChange={(checked) => 
                                        handlePortChange(index, 'supportsDP', checked)
                                    }
                                />
                                <span>DisplayPort</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={port.supportsPD || false}
                                    onCheckedChange={(checked) => 
                                        handlePortChange(index, 'supportsPD', checked)
                                    }
                                />
                                <span>Hỗ trợ sạc</span>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <Button variant="outline" onClick={addNewPort}>
                + Thêm {portTypeLabel}
            </Button>
        </div>
    );

    // return (
    //     <div className="space-y-3 border p-4 rounded-lg">
    //         <h3 className="font-medium">{portTypeLabel}</h3>
    //         {ports.map((port, index) => (
    //             <div key={index} className="flex gap-2 items-center">
    //                 <Combobox
    //                     options={versionOptions}
    //                     value={port.version}
    //                     onChange={(value) => handleVersionChange(index, value)}
    //                     placeholder={`Chọn phiên bản ${portTypeLabel}...`}
    //                 />
    //                 <Input
    //                     type="number"
    //                     value={port.quantity}
    //                     onChange={(e) => handleQuantityChange(index, e.target.value)}
    //                     min="0"
    //                     className="w-20"
    //                 />
    //                 {portTypeLabel.includes('USB-C') && (
                        
    //                     <div className="flex gap-4 items-center">
    //                         <p>DisplayPort</p>
    //                         <Switch 
    //                             checked={DP}
    //                             onCheckedChange={setDP}
    //                         />

    //                         <p>Hỗ trợ sạc</p>
    //                         <Switch 
    //                             checked={PD}
    //                             onCheckedChange={setPD}
    //                         />
    //                     </div>
    //                 )}
    //                 <Button
    //                     variant="ghost"
    //                     onClick={() => setPorts(ports.filter((_, i) => i !== index))}
    //                 >
    //                     <Trash2 color="red" size={30}/>
    //                 </Button>
    //             </div>
    //         ))}

    //         {portTypeLabel.includes('USB-C') ? (
    //             <Button
    //                 variant="outline"
    //                 onClick={() => 
    //                     setPorts([
    //                         ...ports, 
    //                         { version: "", quantity: 0 }])
    //                 }
    //             >
    //                 + Thêm {portTypeLabel}
    //             </Button>
    //         ): (
    //             <Button
    //                 variant="outline"
    //                 onClick={() => setPorts([...ports, { version: "", quantity: 0 }])}
    //             >
    //                 + Thêm {portTypeLabel}
    //             </Button>
    //         )}
    //     </div>
    // );
}