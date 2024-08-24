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
			if (
				!authClass.isLoggedIn ||
				_.isNull(authClass.username) ||
				_.isEmpty(chat.draftMessage.trim())
			) return

			const sendMessageResponse = await fastTalkApiClient.chatDataService.sendMessage(chat.chatId, chat.draftMessage)

			if (!_.isEqual(sendMessageResponse.status, 200) || isNonSuccessResponse(sendMessageResponse.data)) {
				return
			}
			const messageDataToAdd: MessageData = {
				chatId: chat.chatId,
				messageId: sendMessageResponse.data.message_id,
				text: chat.draftMessage,
				createdAt: ((new Date()).toString() as RustDate),
				updatedAt: ((new Date()).toString() as RustDate),
				senderDetails: {
					userId: 0,
					username: authClass.username
				}
			}
			chat.addMessageToChat(
				messageDataToAdd,
				true,
				true
			)
			chat.setDraftMessage("")
		} catch (error) {
			console.error(error)
		}
	}, [authClass.isLoggedIn, authClass.username, fastTalkApiClient.chatDataService])
}
