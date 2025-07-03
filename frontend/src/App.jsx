import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Cartpage from './pages/Cartpage'
import CompatibilityToolPage from './pages/CompatibilityToolPage'
import ShopPage from './pages/ShopPage'
import SignupPage from './pages/SignupPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import AdminPage from './pages/AdminPage'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignupPage />} />
					<Route path='/shopping-cart' element={<Cartpage />} />
					<Route path='/shop/:slug?' element={<ShopPage />} />
					<Route path='/product/:slug/:product_id' element={<ProductDetailsPage />} />
					<Route path='/tool' element={<CompatibilityToolPage />} />

					<Route path='/admin/*' element={<AdminPage />} />
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
