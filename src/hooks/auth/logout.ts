import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const fastTalkApiClient = useApiClientContext()
	const navigate = useTypedNavigate()

	return useCallback((): void => {
		authClass.logout()
		fastTalkApiClient.logout()
		navigate("/")
	}, [authClass, fastTalkApiClient, navigate])
}
