import _ from "lodash"
import { useCallback, useEffect, useRef } from "react"
import { useAuthContext } from "../../contexts/auth-context"
import { useChatsContext } from "../../contexts/chat-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { removeLeadingAt } from "../../utils/leading-at-operations"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useRetrieveMessagesFromChatUseEffect(friendUsername: AtPrefixedString | undefined): void  {
	const authClass = useAuthContext()
	const fastTalkApiClient = useApiClientContext()
	const chatsClass = useChatsContext()
	const hasRetrievedRef = useRef(false)

	// eslint-disable-next-line complexity
	const retrieveMessagesFromChat =  useCallback(async () => {
		try {
			if (
				_.isUndefined(friendUsername) ||
				hasRetrievedRef.current ||
				authClass.isLoggedIn === false ||
				_.isNull(authClass.username) ||
				chatsClass.areChatsEmpty === true
			) return

			const existingChat = chatsClass.contextForChatByFriendUsername(removeLeadingAt(friendUsername))
			if (_.isUndefined(existingChat) || !_.isEmpty(existingChat.messagesArray)) return

			hasRetrievedRef.current = true
			const chatsListResponse = await fastTalkApiClient.chatDataService.retrieveChatMessages(existingChat.chatId)
			if (!_.isEqual(chatsListResponse.status, 200) || isNonSuccessResponse(chatsListResponse.data)) {
				hasRetrievedRef.current = false
				return
			}

			for (const message of chatsListResponse.data) {
				const senderDetails: SocialDetails = {
					userId: message.sender_user_id,
					username: existingChat.friendDetails.username
				}
				if (message.did_user_send === true) {
					senderDetails.username = authClass.username
				}
				const messageData: MessageData = {
					chatId: existingChat.chatId,
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
			hasRetrievedRef.current = false
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authClass.isLoggedIn, authClass.username, chatsClass, chatsClass.areChatsEmpty, fastTalkApiClient.chatDataService, friendUsername])

	useEffect(() => {
		void retrieveMessagesFromChat()
	}, [retrieveMessagesFromChat])
}
