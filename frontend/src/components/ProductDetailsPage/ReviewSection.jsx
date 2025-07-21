import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '../ui/card';
import RatingSummary from '@keyvaluesystems/react-star-rating-summary'
import ReviewCard from './ReviewCard';
import { Separator } from '../ui/separator';
import { getReviewsByProductId } from '@/hooks/review-api';

export default function ReviewSection({ productId }) {
    const [data, setData] = useState([]);
    const [ratingValues, setRatingValues] = useState({
        5: 0, 4: 0, 3: 0, 2: 0, 1: 0
    });

    useEffect(() => {
        getReviewsByProductId(productId, setData, setRatingValues);
    }, [productId])
    
    return (
        <Card className='max-w-[1280px] mx-auto gap-5 pb-4 mb-4'>
            <CardContent>
                <span className='text-3xl font-bold'>Đánh giá và nhận xét</span>

                <article className='max-w-[1280px] mx-auto mt-2'>
                    <RatingSummary
                        ratingAverageIconProps={{
                            fillColor: '#E6B800'
                        }}
                        ratings={ratingValues}
                        styles={{
                            AverageContainer: {
                                width: '800px',
                            },
                        }}
                        barColors={{
                            5: '#E6B800',
                            4: '#E6B800',
                            3: '#E6B800',
                            2: '#E6B800',
                            1: '#E6B800'
                        }}
                    />
                </article>

                <Separator className='bg-techBlue my-4 mx-auto max-w-[80%]'/>

                <article id='reviewSection'>
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((review, index) => (
                            <ReviewCard key={index} review={review} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-lg">Không có đánh giá.</p>
                    )}
                </article>
            </CardContent>
        </Card>
    )
}