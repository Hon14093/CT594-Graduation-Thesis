import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { checkCompatibility } from '@/hooks/compatibility-api';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import SelectComponent from '../modals/tool/SelectComponent';

const categories = ['RAM', 'Lưu trữ', 'USB dock', 'Bộ chuyển đổi', 'Màn hình', 'Dây cáp'];

export default function ComponentTable({ laptop }) {
    const [items, setItems] = useState({});

    const handleAdd = (category) => {
        setItems((prev) => {
            if (prev[category]) return prev;
            return {
                ...prev,
                [category]: {
                    name: `SP mẫu`,
                    price: Math.floor(Math.random() * 1000000),
                    quantity: Math.floor(Math.random() * 100),
                },
            };
        });
        console.log(items)
    };

    const handleRemove = (category) => {
        setItems((prev) => {
            const updated = { ...prev };
            delete updated[category];
            return updated;
        });
    };

    if (!laptop) {
        return (
            <section className="max-w-[1280px] mx-auto pb-4">
                <Card>
                    <CardContent className="">Hãy chọn laptop.</CardContent>
                </Card>
            </section>
        );
    }

    return (
        // <section className="max-w-[1280px] mx-auto -mt-5 min-h-[60vh]">
        //     <Card>
        //         <CardContent className="">
        //             <div className="overflow-x-auto">
        //                 <table className="w-full border-collapse text-techBlue">
        //                     <thead>
        //                         <tr className="text-left border-y-2 border-techBlue">
        //                             <th className="h-14 px-3 w-[150px] text-center border-r-2 border-techBlue">Danh mục</th>
        //                             <th className="h-14 px-3 text-center">Tên sản phẩm</th>
        //                             <th className="h-14 px-3 w-[120px] text-center">Giá bán</th>
        //                             <th className="h-14 px-3 w-[180px] text-center">Số lượng trong kho</th>
        //                             <th className="h-14 px-3 w-[40px]"></th>
        //                         </tr>
        //                     </thead>

        //                     <tbody>
        //                         {categories.map((category) => {
        //                             const item = items[category];

        //                             return (
        //                                 <tr key={category} className="border-b border-techBlue">
        //                                     <td className="h-14 align-middle border-r-2 border-techBlue">{category}</td>
        //                                     {item ? (
        //                                     <>
        //                                         <td className="h-14 px-3">{item.name}</td>
        //                                         <td className="h-14 px-3 text-center">
        //                                             {item.price.toLocaleString()}₫
        //                                         </td>
        //                                         <td className="h-14 px-3 text-center">{item.quantity}</td>
        //                                         <td className="h-14 px-3">
        //                                             <button
        //                                                 className="text-red-600 hover:text-red-800 font-bold"
        //                                                 onClick={() => handleRemove(category)}
        //                                             >
        //                                                 ✕
        //                                             </button>
        //                                         </td>
        //                                     </>
        //                                     ) : (
        //                                     <>
        //                                         <td className="h-14 px-3">
        //                                             <Button
        //                                                 variant="secondary"
        //                                                 className="border rounded"
        //                                                 onClick={() => handleAdd(category)}
        //                                             >
        //                                                 <Plus color='#1E56A0' />
        //                                             </Button>
        //                                         </td>
        //                                         <td className="py-2 px-3 text-cetner italic text-gray-400">—</td>
        //                                         <td className="py-2 px-3 text-center italic text-gray-400">—</td>
        //                                         <td className="py-2 px-3" />
        //                                     </>
        //                                     )}
        //                                 </tr>
        //                             );
        //                         })}
        //                     </tbody>

        //                 </table>
        //             </div>

        //             <div className="flex justify-end mt-6">
        //                 <button 
        //                     className="bg-crimson text-white px-6 py-2 rounded-lg border-crimson border hover:bg-white hover:text-crimson"

        //                 >
        //                     Kiểm tra
        //                 </button>
        //             </div>
        //         </CardContent>
        //     </Card>
        // </section>

        <section className="max-w-[1280px] mx-auto pt-4 lg:pt-2 lg:px-2 sm:px-4 -mt-5 min-h-[60vh]">
            <Card>
                <CardContent className="">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className='h-14'>
                                    <TableHead className="w-[150px]">Danh mục</TableHead>
                                    <TableHead className="">Tên sản phẩm</TableHead>
                                    <TableHead className="w-[120px]">Giá bán</TableHead>
                                    <TableHead className="w-[150px]">Số lượng trong kho</TableHead>
                                    <TableHead className="w-[40px]" />
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {categories.map((category) => {
                                    const item = items[category];

                                    return (
                                        <TableRow key={category} className='h-14'>
                                            <TableCell className="font-medium">{category}</TableCell>

                                            {item ? (
                                                <>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell className="text-right">{item.price.toLocaleString()}₫</TableCell>
                                                <TableCell className="text-center">{item.quantity}</TableCell>
                                                <TableCell>
                                                    <button
                                                        className="text-red-600 hover:text-red-800 font-bold"
                                                        onClick={() => handleRemove(category)}
                                                    >
                                                        ✕
                                                    </button>
                                                </TableCell>
                                                </>
                                            ) : (
                                                <>
                                                <TableCell>

                                                    <Button
                                                        variant="secondary"
                                                        className="border p-1 rounded"
                                                        onClick={() => handleAdd(category)}
                                                    >
                                                        <Plus size={12} />
                                                    </Button>
                                                    {/* <SelectComponent category={category}/> */}
                                                </TableCell>
                                                <TableCell className="text-right italic text-muted-foreground">—</TableCell>
                                                <TableCell className="text-center italic text-muted-foreground">—</TableCell>
                                                <TableCell />
                                                </>
                                            )}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex justify-end mt-3 gap-4">
                        <Button variant='outline' className='py-5 text-md'>Xóa hết</Button>
                        <Button 
                            className="bg-techBlue py-5 px-6 text-white border border-techBlue text-md hover:text-techBlue hover:bg-white"
                        >
                            Kiểm tra
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}
