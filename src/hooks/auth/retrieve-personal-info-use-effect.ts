import _ from "lodash"
import { useCallback, useEffect, useRef } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useRetrievePersonalInfoUseEffect(): void {
	const authClass = useAuthContext()
	const fastTalkApiClient = useApiClientContext()
	const hasRetrievedRef = useRef(false)

	const retrievePersonalInfo = useCallback(async (): Promise<void> => {
		try {
			if (hasRetrievedRef.current || !authClass.isLoggedIn || !_.isEmpty(authClass.username)) return

			hasRetrievedRef.current = true
			const peronalInfoResponse = await fastTalkApiClient.authDataService.retrievePersonalInfo()

			if (!_.isEqual(peronalInfoResponse.status, 200) || isNonSuccessResponse(peronalInfoResponse.data)) {
				hasRetrievedRef.current = false
				return
			}

			authClass.setUsername(peronalInfoResponse.data.username)
		} catch (error) {
			console.error(error)
			hasRetrievedRef.current = false
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authClass.isLoggedIn, authClass.username, fastTalkApiClient.authDataService])

	useEffect(() => {
		void retrievePersonalInfo()
	}, [retrievePersonalInfo])
}
