import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './components/AuthPages/LoginPage'
import SignupPage from './components/AuthPages/SignupPage'
import AdminPage from './pages/AdminPage'
import './App.css'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignupPage />} />

				<Route path='/admin/*' element={<AdminPage />} />
			</Routes>
		</Router>
	)
}

export default App
