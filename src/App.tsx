import { observer } from "mobx-react"
import { Routes, Route } from "react-router-dom"

import Home from "./pages/home"
import Missing from "./pages/missing"
import LoginPage from "./pages/auth/login"
import RegisterPage from "./pages/auth/register"
import useGetAuthDataFromStorage from "./hooks/auth/get-auth-data-from-storage"

function App() {
	const getAuthDataFromStorage = useGetAuthDataFromStorage()
	getAuthDataFromStorage()

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="*" element={<Missing />} />
		</Routes>
	)
}

export default observer(App)
