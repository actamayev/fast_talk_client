import { Routes, Route } from "react-router-dom"
import Missing from "./pages/missing"

export default function App() {
	return (
		<Routes>
			{/* <Route path="/" element={<Home />} /> */}
			<Route path="*" element={<Missing />} />
		</Routes>
	)
}
