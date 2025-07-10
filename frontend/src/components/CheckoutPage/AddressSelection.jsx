import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import one from '../../assets/images/1.png'
import { Plus } from 'lucide-react'
import CreateModal from '../modals/address/CreateModal'
import { useAuth } from '@/context/AuthContext'
import { getAddressesByAccountId } from '@/hooks/address-api'

export default function AddressSelection({ onSelect }) {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        getAddressesByAccountId(user.account_id, setAddresses)
    }, [])

    const handleSubmitSuccess = () => {
        getAddressesByAccountId(user.account_id, setAddresses)
    }

    return (
        <section className='max-w-[1280px] mx-auto text-lg px-6 mt-5'>
            <article className='flex text-xl text-techBlue font-bold items-center'>
                <div className='mr-4 size-6'>
                    <img src={one} alt="" />
                </div>
                <div>Chọn địa chỉ của bạn (*)</div>
            </article>

            <article className='text-left p-2 ml-8'>
                {addresses.length > 0 ? (
                    <RadioGroup onValueChange={(value) => onSelect(value)}>
                        {addresses.map((address) => (
                            <div key={address.address_id} className="flex gap-1 items-center space-x-2">
                                <RadioGroupItem value={address.address_id} id={`address-${address.address_id}`} />
                                <div htmlFor={`address-${address.address_id}`}>
                                    {address.first_name + ' ' + address.last_name} {' | '} 
                                    {address.address_line} {' | '}
                                    {address.ward} {' | '}
                                    {address.district} {' | '}
                                    {address.city} {' | '}
                                    {address.postal_code}
                                </div>
                            </div>
                        ))}
                    </RadioGroup>
                ) : (
                    <div>
                        <i>Không có địa chỉ.</i>
                    </div>
                )}

                <CreateModal account={user} onSubmitSuccess={handleSubmitSuccess} />
            </article>
        </section>
        
    )
}
