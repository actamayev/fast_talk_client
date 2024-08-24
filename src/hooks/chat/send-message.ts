import _ from "lodash"
import { useCallback } from "react"
import ChatClass from "../../classes/chat-class"
import { useAuthContext } from "../../contexts/auth-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useSendMessage(): (chat: ChatClass) => Promise<void>  {
	const authClass = useAuthContext()
	const fastTalkApiClient = useApiClientContext()

	return useCallback(async (chat: ChatClass) => {
		try {
			if (!authClass.isLoggedIn || _.isEmpty(chat.draftMessage.trim())) return

			const chatsListResponse = await fastTalkApiClient.chatDataService.sendMessage(chat.chatId, chat.draftMessage)

			if (!_.isEqual(chatsListResponse.status, 200) || isNonSuccessResponse(chatsListResponse.data)) {
				return
			}
			chat.setDraftMessage("")
		} catch (error) {
			console.error(error)
		}
	}, [authClass.isLoggedIn, fastTalkApiClient.chatDataService])
}
