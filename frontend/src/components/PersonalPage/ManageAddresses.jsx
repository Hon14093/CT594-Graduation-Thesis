import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CreateModal from '../modals/address/CreateModal'
import EditModal from '../modals/address/EditModal'
import ConfirmDeleteModal from '../generic-delete-modal'
import { useAuth } from '@/context/AuthContext'
import { getAddressesByAccountId, deleteAddress } from '@/hooks/address-api'
import { PenBox, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'

export default function ManageAddresses({ onSelect }) {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        getAddressesByAccountId(user.account_id, setAddresses)
    }, [])

    const handleSubmitSuccess = () => {
        getAddressesByAccountId(user.account_id, setAddresses)
    }

    const handleDelete = async () => {
        if (!selectedAddress) return;

        try {
            await deleteAddress(selectedAddress.address_id);
            handleSubmitSuccess(); // Refresh or toast, etc.
            setDeleteOpen(false); // Close modal
            setSelectedAddress(null);  // Clear state
        } catch (error) {
            console.error("Failed to delete address:", error)
        }
    }

    return (
        <section className='max-w-[1280px] mx-auto text-lg '>
            <article className='text-left p-2'>
                {addresses.length > 0 ? (
                    <RadioGroup onValueChange={(value) => onSelect(value)}>
                        {addresses.map((address, index) => (
                            <div key={address.address_id} className="flex gap-1 items-center space-x-2">
                                <p className='font-mono'>{index+1}.</p>
                                <div htmlFor={`address-${address.address_id}`}>
                                    {address.last_name + ' ' + address.first_name} {' | '} 
                                    {address.address_line} {' | '}
                                    {address.ward} {' | '}
                                    {address.district} {' | '}
                                    {address.city} {' | '}
                                    {address.postal_code}
                                </div>

                                <EditModal
                                    address={address}
                                    onSubmitSuccess={handleSubmitSuccess} 
                                />

                                <Button size="sm" className='bg-red-500 border border-red-500 hover:bg-white hover:text-red-500'
                                    onClick={() => {
                                        setDeleteOpen(true)
                                        setSelectedAddress(address)
                                    }}
                                >
                                    <Trash2 />
                                </Button>
                            </div>
                        ))}
                    </RadioGroup>
                ) : (
                    <div>
                        <i>Không có địa chỉ.</i>
                    </div>
                )}

                <CreateModal account={user} onSubmitSuccess={handleSubmitSuccess} />
                <ConfirmDeleteModal 
                    open={deleteOpen}
                    onClose={() => {
                        setSelectedAddress(null)
                        setDeleteOpen(false)
                    }}
                    onConfirm={handleDelete}
                />
            </article>
        </section>
    )
}
