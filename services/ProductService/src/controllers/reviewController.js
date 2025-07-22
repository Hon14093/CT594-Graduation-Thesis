import { createReview, getReviewsByProductId } from "../model/Review.js";
import axios from 'axios'

export const addReview = async (req,res) => {
    try {
        const data = req.body;
        const newReview = await createReview(data);
        console.log(newReview)

        res.status(200).json({ 
            success: 1,
            newReview
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnReviewsByProductId = async (req, res) => {
    try {
        const { product_id } = req.params;
        const reviews = await getReviewsByProductId(product_id);

        // Extract unique account_ids
        const uniqueAccountIds = [...new Set(reviews.map(r => r.account_id))];

        // Fetch account names from Account Service
        const accountMap = {}; // account_id -> account_name

        // Batch call per account_id — in real world, replace with batched endpoint or Redis cache
        await Promise.all(
            uniqueAccountIds.map(async (accountId) => {
                try {
                    const response = await axios.get(`http://localhost:5002/account/find/${accountId}`);
                    accountMap[accountId] = response.data.account.username;
                } catch (error) {
                    console.error(`Error fetching account ${accountId}`, error.message);
                    accountMap[accountId] = "Unknown User"; // fallback
                }
            })
        );

        // Attach account name to review response
        const formattedReviews = reviews.map((review) => ({
            review_id: review.review_id,
            rating: review.star,
            comment: review.comment,
            date: new Date(review.review_date).toISOString().replace("T", " ").split(".")[0],
            user: accountMap[review.account_id] || "Unknown User"
        }));

        res.status(200).json({ formattedReviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};