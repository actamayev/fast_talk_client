import _ from "lodash"
import { useCallback, useEffect } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { useChatsContext } from "../../contexts/chat-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useRetrieveChatsListUseEffect(): void  {
	const authClass = useAuthContext()
	const fastTalkApiClient = useApiClientContext()
	const chatsClass = useChatsContext()

	const retrieveChatsListCallback = useCallback(async () => {
		try {
			const chatsListResponse = await fastTalkApiClient.chatDataService.retrieveChatsList()
			if (!_.isEqual(chatsListResponse.status, 200) || isNonSuccessResponse(chatsListResponse.data)) {
				throw Error("Unable to retrieve chats list")
			}
			chatsClass.setRetrievedChats(chatsListResponse.data)
		} catch (error) {
			console.error(error)
		}
	}, [chatsClass, fastTalkApiClient.chatDataService])

	useEffect(() => {
		if (authClass.isLoggedIn === false) return
		void retrieveChatsListCallback()
	}, [authClass.isLoggedIn, retrieveChatsListCallback])
}
