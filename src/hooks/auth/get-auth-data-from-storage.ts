import { useCallback } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useGetAuthDataFromStorage(): () => void {
	const authClass = useAuthContext()
	const fastTalkApiClient = useApiClientContext()

	return useCallback((): void => {
		const accessToken = authClass.getAuthDataFromStorage()
		fastTalkApiClient.httpClient.accessToken = accessToken
	}, [authClass, fastTalkApiClient.httpClient])
}
