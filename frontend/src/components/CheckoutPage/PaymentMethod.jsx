import React from 'react'
import two from '../../assets/images/2.png'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PaymentMethod({ onSelect }) {
    return (
        <section className='max-w-[1280px] mx-auto text-lg px-6 mt-10'>
            <article className='flex text-xl text-techBlue font-bold items-center'>
                <div className='mr-4 size-6'>
                    <img src={two} alt="" />
                </div>
                <div>Chọn phương thức thanh toán (*)</div>
            </article>

            <article className='text-left p-2 ml-8 text-lg'>
                <RadioGroup defaultValue="option-one" onValueChange={(value) => onSelect(value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <div>Visa (Stripe)</div>
                    </div>
                </RadioGroup>
            </article>
        </section>
    )
}
