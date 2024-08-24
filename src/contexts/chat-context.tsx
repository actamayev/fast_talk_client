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

	get areChatsEmpty(): boolean {
		return _.isEmpty(this.chatsArray)
	}

	public contextForChat = action((chatId: number): ChatClass | undefined => {
		return this.chatsArray.find(chat => chat.chatId === chatId)
	})

	public contextForChatByFriendUsername = action((friendUsername: string | undefined): ChatClass | undefined => {
		if (_.isUndefined(friendUsername)) return undefined
		for (const chat of this.chatsArray) {
			if (chat.friendDetails.username === friendUsername) return chat
		}

		return undefined
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
					createdAt: chat.last_message_time,
					updatedAt: chat.last_message_time,
				},
				createdAt: chat.last_message_time,
				updatedAt: chat.last_message_time
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
			// Use a default date in case lastMessage?.updatedAt is undefined
			const dateA = new Date(a.lastMessage?.updatedAt || 0)
			const dateB = new Date(b.lastMessage?.updatedAt || 0)
			return dateA.getTime() - dateB.getTime()
		})

		return chatClass
	})

	private clearChatsArray = action(() => {
		this.chatsArray = []
	})

	public logout() {
		this.clearChatsArray()
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
