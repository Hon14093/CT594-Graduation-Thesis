import React, { useState } from 'react'
import ManageAddresses from './ManageAddresses'
import { Card, CardContent } from '../ui/card';

export default function AccountAddress() {
    const [addressId, setAddressId] = useState();

    return (
        <div>
            <p className="text-muted-foreground mb-6 max-w-xl text-left">
                Quản lý các địa chỉ giao hàng.
            </p>

            <Card>
                <CardContent>
                    <ManageAddresses onSelect={setAddressId} />
                </CardContent>
            </Card>

        </div>
    )
}
