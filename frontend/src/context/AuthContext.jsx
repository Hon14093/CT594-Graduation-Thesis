import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("jwtToken");
        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);
                setUser(decodedToken);
                console.log('user', user)
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Error decoding token:", error);
                localStorage.removeItem("jwtToken");
            }
        } else {
            setIsLoggedIn(false);
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        console.log("Login with token:", token);
        localStorage.setItem("jwtToken", token);
        try {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Error decoding token:", error);
            localStorage.removeItem("jwtToken");
        }
    };

    const logout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("cart");
        setUser(null);
        setIsLoggedIn(false);
        location.reload();
    };

    const value = {
        user, isLoggedIn, login, logout, loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);