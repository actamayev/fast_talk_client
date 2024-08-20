import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"

export default function useRedirectUnknownUser (): void  {
	const location = useLocation()
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()

	useEffect(() => {
		if (authClass.isLoggedIn === true) return
		navigate("/login")
	}, [authClass.isLoggedIn, location.pathname, navigate])
}
