import React from 'react'
import { Card, CardContent } from '../ui/card';

export default function ResultsBox({ laptop, results }) {
    if (!laptop) {
        return (
            <section className="max-w-[1280px] mx-auto pb-4">
                <Card>
                    <CardContent className="">Hãy chọn laptop.</CardContent>
                </Card>
            </section>
        );
    }

    const groupedResults = results.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <section className='max-w-[1280px] mx-auto pt-5 lg:pt-5 lg:px-2 sm:px-4 mb-5'>
            <Card>
                <CardContent>
                    <div className='text-left px-3 text-2xl font-semibold'>
                        Kết quả kiểm tra:
                    </div>

                    {/* <div className='px-3 mt-2 text-lg bg-gray-100 min-h-64 border-2 rounded-xl font-mono'>
                        <div className='py-3 grid gap-1'>
                            {results.map((item, index) => (
                                <div key={index} className={`p-3 rounded-md text-left ${
                                    item.status === 0 ? 'bg-red-100 text-red-900 border border-red-900' : 
                                    item.status === 1 ? 'bg-green-100 text-green-900 border border-green-900' :
                                    item.status === 2 ? 'bg-amber-100 text-amber-900 border border-amber-900' :
                                    item.status === 3 ? 'bg-amber-100 text-amber-900 border border-amber-900' :
                                    'bg-gray-100'
                                }`}>
                                    {item.message}
                                </div>
                            ))}
                        </div>
                    </div> */}

                    <div className="px-3 mt-2 text-lg bg-gray-100 border-2 rounded-xl font-mono min-h-64">
                        <div className="py-3 space-y-6">
                            {Object.entries(groupedResults).map(([category, items]) => (
                                <div key={category}>
                                    <h3 className="text-xl text-left font-bold mb-2">+ {category}:</h3>
                                    <div className="grid gap-2">
                                        {items.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`p-3 rounded-md text-left border ${
                                                    item.status === 0
                                                        ? 'bg-red-100 text-red-900 border-red-900'
                                                        : item.status === 1
                                                        ? 'bg-green-100 text-green-900 border-green-900'
                                                        : item.status === 2 || item.status === 3
                                                        ? 'bg-amber-100 text-amber-900 border-amber-900'
                                                        : 'bg-gray-100 border-gray-300'
                                                }`}
                                            >
                                                {item.message}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* <button onClick={() => console.log(results)}>
                        Console log
                    </button> */}
                </CardContent>
            </Card>
        </section>
    )
}
