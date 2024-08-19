import { useCallback } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useSetDataAfterLoginOrRegister(): (authData: LoginOrRegisterSuccess) => void {
	const authClass = useAuthContext()
	const fortunaApiClient = useApiClientContext()

	return useCallback((authData: LoginOrRegisterSuccess): void => {
		fortunaApiClient.httpClient.accessToken = authData.accessToken
		authClass.setAccessToken(authData.accessToken, true)
	}, [authClass, fortunaApiClient.httpClient])
}
