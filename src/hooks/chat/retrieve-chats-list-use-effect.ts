import _ from "lodash"
import { useCallback, useEffect, useRef } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { useChatsContext } from "../../contexts/chat-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useRetrieveChatsListUseEffect(): void  {
	const authClass = useAuthContext()
	const fastTalkApiClient = useApiClientContext()
	const chatsClass = useChatsContext()
	const hasRetrievedRef = useRef(false)

	const retrieveChatsListCallback = useCallback(async () => {
		try {
			if (hasRetrievedRef.current || !authClass.isLoggedIn) return

			hasRetrievedRef.current = true
			const chatsListResponse = await fastTalkApiClient.chatDataService.retrieveChatsList()

			if (!_.isEqual(chatsListResponse.status, 200) || isNonSuccessResponse(chatsListResponse.data)) {
				hasRetrievedRef.current = false // Reset if the response is not successful
				return
			}
			chatsClass.setRetrievedChats(chatsListResponse.data)
		} catch (error) {
			console.error(error)
			hasRetrievedRef.current = false
		}
	}, [authClass.isLoggedIn, chatsClass, fastTalkApiClient.chatDataService])

	useEffect(() => {
		void retrieveChatsListCallback()
	}, [retrieveChatsListCallback])
}
