import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Rating } from 'react-simple-star-rating';
import { useAuth } from '@/context/AuthContext';
import { createReview } from '@/hooks/review-api';

export default function ReviewForm({ detail, open, onClose }) {
    const { user } = useAuth();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState(null);

    const handleRating = (rate) => {
        setRating(rate);
        console.log(rate)
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();

        try {
            const data = {
                star: rating,
                comment: comment,
                product_id: detail.product.product_id,
                account_id: user.account_id
            }

            console.log('review data: ', data)

            const res = await createReview(data);
            if (res.success) {
                onClose();
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (!detail) return null;
    
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Đánh giá và nhận xét</DialogTitle>
                </DialogHeader>
{/* 
                <div onClick={() => console.log(detail.product.product.product_name)}>
                    check
                </div> */}
                
                <form onSubmit={handleSubmit} className='text-base text-darkOlive'>
                    <div className='pb-5'>
                        <p className='font-bold text-lg'>Sản phẩm:  </p>

                        {/* This is the problem */}
                        {detail?.product?.product?.product_name || "Loading..."}

                    </div>
                    <div className='mx-auto pb-5'>
                        <Rating
                            onClick={handleRating}
                            transition
                            showTooltip
                            allowHover={false}
                            fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']} 
                            tooltipArray={['Kinh khủng', 'Tệ', 'Trung bình', 'Tốt', 'Tuyệt vời']}
                        />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <p className='text-lg font-semibold' htmlFor="feedback">Nhận xét:</p>
                        <Textarea 
                            id='feedback'
                            onChange={(e) => setComment(e.target.value)} 
                            placeholder='Hãy để lại cảm nhận của bạn về sản phẩm'
                        />
                    </div>

                    <button type='submit' className='big-action-button text-ivory w-full mt-5'>
                        Đánh giá
                    </button>
                </form>
                
            </DialogContent>
        </Dialog>
    )
}