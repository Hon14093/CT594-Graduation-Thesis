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

    return (
        <section className='max-w-[1280px] mx-auto pt-4 lg:pt-2 lg:px-2 sm:px-4 -mt-5 mb-5'>
            <Card>
                <CardContent>
                    <div className='text-left px-3 text-2xl font-semibold'>
                        Kết quả kiểm tra:
                    </div>

                    <div className='px-3 mt-2 text-lg bg-gray-100 min-h-40 border-2 rounded-xl'>
                        <div className='py-3'>
                            {/* {Object.keys(results).map === 0 ? (
                                <div>Waiting for result...</div>
                            ) : (
                                results.map((result) => (
                                    <div>{result}</div>
                                ))
                            )} */}

                            {results.map((item, index) => (
                                <div key={index} className={`p-3 rounded-md text-left ${
                                    item.status === 0 ? 'bg-red-100 text-red-800' : 
                                    item.status === 1 ? 'bg-green-100 text-green-800' :
                                    item.status === 2 ? 'bg-amber-100 text-amber-900' :
                                    'bg-gray-100'
                                }`}>
                                    {item.message}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button onClick={() => console.log(results)}>
                        Console log
                    </button>
                </CardContent>
            </Card>
        </section>
    )
}
