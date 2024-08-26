import { useCallback } from "react"
import useNavigateToChat from "../navigate/navigate-to-chat"
import { useChatsContext } from "../../contexts/chat-context"

export default function useCreateTemporaryChat(): (singleUsername: UsernameSearch) => void  {
	const navigateToChat = useNavigateToChat()
	const chatsClass = useChatsContext()

	return useCallback((singleUsername: UsernameSearch) => {
		try {
			const newChatData: ChatData = {
				chatId: 0,
				lastMessage: {
					text: "",
					didUserSend: true,
					createdAt: ((new Date()).toString() as RustDate),
					updatedAt: ((new Date()).toString() as RustDate)
				},
				createdAt: ((new Date()).toString() as RustDate),
				updatedAt: ((new Date()).toString() as RustDate),
				friendDetails: {
					userId: singleUsername.user_id,
					username: singleUsername.username
				}
			}

			chatsClass.setSingleChat(newChatData)
			navigateToChat(singleUsername.username)
		} catch (error) {
			console.error(error)
		}
	}, [chatsClass, navigateToChat])
}
