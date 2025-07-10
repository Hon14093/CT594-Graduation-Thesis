import redis from './redis/client.js';

// GET CART
export const getCart = async (req, res) => {
    const { userId } = req.params;
    const data = await redis.get(`cart:${userId}`);
    res.json(JSON.parse(data || JSON.stringify({
        account_id: userId,
        items: [],
        total_price: 0
    })));
};

// ADD TO CART (now uses item_ref_id)
export const addToCart = async (req, res) => {
    const { userId } = req.params;
    const newItem = req.body;

    const raw = await redis.get(`cart:${userId}`);
    let cart = raw ? JSON.parse(raw) : {
        account_id: userId,
        items: [],
        total_price: 0
    };

    const existing = cart.items.find(item => item.item_ref_id === newItem.item_ref_id);

    if (existing) {
        existing.quantity += newItem.quantity;
        existing.sub_total = existing.quantity * existing.price;
    } else {
        newItem.sub_total = newItem.price * newItem.quantity;
        cart.items.push(newItem);
    }

    cart.total_price = cart.items.reduce((sum, item) => sum + item.sub_total, 0);

    await redis.set(`cart:${userId}`, JSON.stringify(cart));
    res.json(cart);
};

// REMOVE ITEM (now removes by item_ref_id)
export const removeFromCart = async (req, res) => {
    const { userId, itemRefId } = req.params;

    const raw = await redis.get(`cart:${userId}`);
    let cart = raw ? JSON.parse(raw) : {
        account_id: userId,
        items: [],
        total_price: 0
    };

    cart.items = cart.items.filter(item => item.item_ref_id !== itemRefId);
    cart.total_price = cart.items.reduce((sum, item) => sum + item.sub_total, 0);

    await redis.set(`cart:${userId}`, JSON.stringify(cart));
    res.json(cart);
};

// CLEAR CART
export const clearCart = async (req, res) => {
    const { userId } = req.params;
    await redis.del(`cart:${userId}`);
    res.json({ message: 'Cart cleared' });
};
