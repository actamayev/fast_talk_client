import _ from "lodash"
import { useCallback } from "react"
import { useChatsContext } from "../../contexts/chat-context"

export default function useAddSocketMessage(): (event: string) => void  {
	const chatsClass = useChatsContext()

	return useCallback((newMessageRaw: string) => {
		try {
			const newMessage = JSON.parse(newMessageRaw) as SocketMessage
			let existingChat = chatsClass.contextForChat(newMessage.chat_id)

			if (_.isUndefined(existingChat)) {
				const chatData: ChatData = {
					chatId: newMessage.chat_id,
					friendDetails: {
						userId: newMessage.message_sender_user_id,
						username: newMessage.message_sender_username
					},
					createdAt: newMessage.sent_time,
					updatedAt: newMessage.sent_time,
					lastMessage: {
						text: newMessage.message_text,
						didUserSend: false,
						createdAt: newMessage.sent_time,
						updatedAt: newMessage.sent_time,
					}
				}
				existingChat = chatsClass.setSingleChat(chatData)
			}

			const messageDataToAdd: MessageData = {
				chatId: newMessage.chat_id,
				messageId: newMessage.message_id,
				text: newMessage.message_text,
				senderDetails: {
					userId: newMessage.message_sender_user_id,
					username: newMessage.message_sender_username
				},
				createdAt: newMessage.sent_time,
				updatedAt: newMessage.sent_time
			}

			existingChat.addMessageToChat(messageDataToAdd, true, false)
		} catch (error) {
			console.error(error)
		}
	}, [chatsClass])
}
