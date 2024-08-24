import _ from "lodash"
import { useCallback } from "react"
import ChatClass from "../../classes/chat-class"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useCreateNewChat(): (chat: ChatClass) => Promise<void>  {
	const fastTalkApiClient = useApiClientContext()

	return useCallback(async (chat: ChatClass) => {
		try {
			const newChatResponse = await fastTalkApiClient.chatDataService.createChat(chat.friendDetails.userId)

			if (!_.isEqual(newChatResponse.status, 200) || isNonSuccessResponse(newChatResponse.data)) {
				return
			}

			chat.chatId = newChatResponse.data.chat_id
			console.log(chat.chatId)
		} catch (error) {
			console.error(error)
		}
	}, [fastTalkApiClient.chatDataService])
}
