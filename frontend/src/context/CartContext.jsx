import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState({ items: [], total_price: 0 });
    const [loading, setLoading] = useState(false);

    const API_URL = 'http://localhost:5003/cart';

    useEffect(() => {
        if (user?.account_id) {
            getCart(user.account_id);
        } else {
            // Reset cart on logout
            setCart({ items: [], total_price: 0 });
        }
    }, [user]);

    const getCart = async (userId) => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/${userId}`);
            setCart(res.data);
        } catch (err) {
            console.error('Failed to fetch cart:', err);
        } finally {
            setLoading(false);
        }
    };

    const getTotalQuantity = () => {
        return cart.items.reduce((sum, item) => sum + item.quantity, 0);
    };

    const addItem = async (item) => {
        try {
            if (!user?.account_id) throw new Error('Not authenticated');
            setLoading(true);
            const res = await axios.post(`${API_URL}/${user.account_id}`, item);
            setCart(res.data);
        } catch (err) {
            console.error('Failed to add item:', err);
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (itemRefId) => {
        try {
            if (!user?.account_id) throw new Error('Not authenticated');
            setLoading(true);
            const res = await axios.delete(`${API_URL}/${user.account_id}/${itemRefId}`);
            setCart(res.data);
        } catch (err) {
            console.error('Failed to remove item:', err);
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            if (!user?.account_id) throw new Error('Not authenticated');
            console.log('clearing cart');
            setLoading(true);
            await axios.delete(`${API_URL}/${user.account_id}`);
            setCart({ items: [], total_price: 0 });
        } catch (err) {
            console.error('Failed to clear cart:', err);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        cart,
        loading,
        getCart,
        getTotalQuantity,
        addItem,
        removeItem,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
            {/* {!loading && children} */}
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used inside a CartProvider");
    }
    return context;
};
