import { useEffect } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"

export default function useRedirectKnownUser (): void  {
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()

	useEffect(() => {
		if (authClass.isLoggedIn === false) return
		navigate("/")
	}, [authClass.isLoggedIn, navigate])
}
