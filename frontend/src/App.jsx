import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Cartpage from './pages/Cartpage'
import CheckoutPage from './pages/CheckoutPage'
import CheckoutSuccess from './pages/CheckoutSuccess'
import CheckoutCancel from './pages/CheckoutCancel'
import CompatibilityToolPage from './pages/CompatibilityToolPage'
import ShopPage from './pages/ShopPage'
import SignupPage from './pages/SignupPage'
import PersonalPage from './pages/PersonalPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import AdminPage from './pages/AdminPage'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import './App.css'

function App() {
	return (
		<AuthProvider>
			<CartProvider>
				<Router>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/checkout' element={<CheckoutPage />} />
						<Route path='/checkout-success' element={<CheckoutSuccess />} />
						<Route path='/checkout-cancel' element={<CheckoutCancel />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/signup' element={<SignupPage />} />
						<Route path='/personal' element={<PersonalPage />} />
						<Route path='/shopping-cart' element={<Cartpage />} />
						<Route path='/shop/:slug?' element={<ShopPage />} />
						<Route path='/product/:slug/:product_id' element={<ProductDetailsPage />} />
						<Route path='/tool' element={<CompatibilityToolPage />} />

						<Route path='/admin/*' element={<AdminPage />} />
					</Routes>
				</Router>
			</CartProvider>
		</AuthProvider>
	)
}

export default App
