import { useCallback } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useGetAuthDataFromStorage(): () => void {
	const authClass = useAuthContext()
	const fortunaApiClient = useApiClientContext()

	return useCallback((): void => {
		const accessToken = authClass.getAuthDataFromStorage()
		fortunaApiClient.httpClient.accessToken = accessToken
	}, [authClass, fortunaApiClient.httpClient])
}
