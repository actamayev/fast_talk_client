import _ from "lodash"
import { useCallback } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { useChatsContext } from "../../contexts/chat-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useRetrieveMessagesFromChatUseEffect(): (chatId: number) => Promise<void>  {
	const authClass = useAuthContext()
	const fastTalkApiClient = useApiClientContext()
	const chatsClass = useChatsContext()

	return useCallback(async (chatId: number) => {
		try {
			const chatsListResponse = await fastTalkApiClient.chatDataService.retrieveChatMessages(chatId)
			if (!_.isEqual(chatsListResponse.status, 200) || isNonSuccessResponse(chatsListResponse.data)) {
				throw Error("Unable to retrieve chats list")
			}
			const existingChat = chatsClass.contextForChat(chatId)
			if (
				_.isUndefined(existingChat) ||
				_.isNull(existingChat.friendDetails) ||
				!_.isEmpty(existingChat.messagesArray)
			) return

			for (const message of chatsListResponse.data) {
				const senderDetails: SocialDetails = {
					userId: message.sender_user_id,
					username: existingChat.friendDetails.username
				}
				if (message.did_user_send === true) {
					senderDetails.username = authClass.username
				}
				const messageData: MessageData = {
					chatId,
					messageId: message.message_id,
					text: message.message_text,
					createdAt: message.sent_time,
					updatedAt: message.sent_time,
					senderDetails
				}
				existingChat.addMessageToChat(messageData, false, message.did_user_send)
			}
		} catch (error) {
			console.error(error)
		}
	}, [authClass.username, chatsClass, fastTalkApiClient.chatDataService])
}
