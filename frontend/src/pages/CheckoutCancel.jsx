import React from 'react';
import { XCircle } from 'lucide-react';

export default function CheckoutCancel() {
    return (
        <div className="max-w-2xl mx-auto py-20 text-center">
            <XCircle size={64} className="text-red-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Thanh toán thất bại</h1>
            <p>Đã có lỗi xảy ra hoặc bạn đã huỷ thanh toán. Vui lòng thử lại.</p>
        </div>
    );
}
