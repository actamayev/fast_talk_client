import { useCallback } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useSetDataAfterLoginOrRegister(): (authData: LoginOrRegisterSuccess) => void {
	const authClass = useAuthContext()
	const fastTalkApiClient = useApiClientContext()

	return useCallback((authData: LoginOrRegisterSuccess): void => {
		fastTalkApiClient.httpClient.accessToken = authData.access_token
		authClass.setAccessToken(authData.access_token, true)
		authClass.username = authData.username
	}, [authClass, fastTalkApiClient.httpClient])
}
