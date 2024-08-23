import _ from "lodash"
import { useObserver } from "mobx-react"
import ChatClass from "../../classes/chat-class"
import { useChatsContext } from "../../contexts/chat-context"

export default function useChatsListOrder(): ChatClass[] {
	const chatsClass = useChatsContext()

	return useObserver(() => {
		// Sort chats by lastMessage.updatedAt, placing the most recent at the top
		const chatsArray = chatsClass.chatsArray
		const sortedChatsOrder = _.orderBy(
			chatsArray,
			[chat => new Date(chat.lastMessage?.updatedAt || 0)], // If no lastMessage, consider it as oldest
			["desc"] // Sort in descending order
		)

		return sortedChatsOrder
	})
}
