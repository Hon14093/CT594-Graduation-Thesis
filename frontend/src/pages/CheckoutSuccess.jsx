import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function CheckoutSuccess() {
    const [searchParams] = useSearchParams();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const { clearCart } = useCart();

    const hasCleared = useRef(false);

    useEffect(() => {
        const sessionId = searchParams.get("session_id");
        if (!sessionId) return;

        const fetchSession = async () => {
            try {
                const res = await axios.get(`http://localhost:5004/payment/stripe/session/${sessionId}`);
                setSession(res.data);
                setSuccess(true);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    useEffect(() => {
        if (success && !hasCleared.current) {
            clearCart();
            console.log('is clearing cart')
            hasCleared.current = true;
        }
    }, [success]);

    if (loading) return <div className="text-center py-10">Đang xác nhận thanh toán...</div>;

    return (
        <div className="max-w-2xl mx-auto py-20 text-center h-screen">
            <CheckCircle2 size={64} className="text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Thanh toán thành công!</h1>
            <p>Cảm ơn bạn đã mua hàng. Mã đơn hàng: <strong>{session?.metadata?.order_id}</strong></p>
            <Button className='mt-10'>
                <Link to='/'>
                    Trở về
                </Link>
            </Button>
        </div>
    );
}
