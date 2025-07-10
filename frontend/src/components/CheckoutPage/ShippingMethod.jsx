import React from 'react'
import three from '../../assets/images/3.png'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ShippingMethod({ onSelect, setPrice }) {
    return (
        <section className='max-w-[1280px] mx-auto text-lg px-6 mt-10'>
            <article className='flex text-xl text-techBlue font-bold items-center'>
                <div className='mr-4 size-6'>
                    <img src={three} alt="" />
                </div>
                <div>Chọn phương thức thanh toán (*)</div>
            </article>

            <article className='text-left p-2 ml-8 text-lg'>
                <RadioGroup defaultValue="1">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="option-one" 
                            onClick={() => {
                                onSelect(1);
                                setPrice(20000);
                            }}
                        />
                        <div>Tiết kiệm - 20,000 vnđ</div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="option-one" 
                            onClick={() => {
                                onSelect(2);
                                setPrice(40000);
                            }}
                        />
                        <div>Hỏa tốc - 40,000 vnđ</div>
                    </div>
                </RadioGroup>
            </article>
        </section>
    )
}
