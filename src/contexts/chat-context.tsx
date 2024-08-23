import _ from "lodash"
import { action, makeObservable, observable } from "mobx"
import { createContext, useContext, useMemo } from "react"
import ChatClass from "../classes/chat-class"

class ChatsClass {
	public chatsArray: ChatClass[] = []

	constructor() {
		makeObservable(this, {
			chatsArray: observable
		})
	}

	public contextForChat = action((chatId: number): ChatClass | undefined => {
		return this.chatsArray.find(chat => chat.chatId === chatId)
	})

	public checkIfChatWithFriendExists = action((friendId: number): number | null => {
		for (const chat of this.chatsArray) {
			if (chat.friendDetails.userId === friendId) return chat.chatId
		}

		return null
	})

	public setRetrievedChats = action((chats: RetrievedChatsList[]): void => {
		for (const chat of chats) {
			const chatData: ChatData = {
				chatId: chat.chat_id,
				friendDetails: {
					userId: chat.friend_user_id,
					username: chat.friend_username,
				},
				lastMessage: {
					text: chat.last_message,
					didUserSend: chat.was_last_message_sent_by_user,
					createdAt: new Date(chat.last_message_time),
					updatedAt: new Date(chat.last_message_time),
				},
				createdAt: new Date(chat.chat_created_at),
				updatedAt: new Date(chat.last_message_time),
			}
			this.setSingleChat(chatData)
		}
	})

	public setSingleChat = action((chatData: ChatData): ChatClass => {
		const existingChat = this.contextForChat(chatData.chatId)
		if (!_.isUndefined(existingChat)) return existingChat

		const chatClass = new ChatClass(chatData)
		this.chatsArray.push(chatClass)

		// Sort the array by lastMessage.updatedAt
		this.chatsArray.sort((a, b) => {
			const dateA = a.lastMessage?.updatedAt || new Date(0)
			const dateB = b.lastMessage?.updatedAt || new Date(0)
			return dateA.getTime() - dateB.getTime()
		})

		return chatClass
	})

	public logout() {
		this.chatsArray = []
	}
}

const ChatsContext = createContext(new ChatsClass())

export default function ChatProvider ({ children }: { children: React.ReactNode }) {
	const chatsClass = useMemo(() => new ChatsClass(), [])

	return (
		<ChatsContext.Provider value={chatsClass}>
			{children}
		</ChatsContext.Provider>
	)
}

export const useChatsContext = () => useContext(ChatsContext)
