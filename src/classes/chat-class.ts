import _ from "lodash"
import { action, makeObservable, observable } from "mobx"

export default class ChatClass {
	public messagesArray: MessageData[] = []

	constructor(chat: ChatData) {
		makeObservable(this, {
			messagesArray: observable,
			lastMessage: observable,
			friendDetails: observable,
			draftMessage: observable,
		})
		this.chatId = chat.chatId
		this.friendDetails = chat.friendDetails
		this.lastMessage = chat.lastMessage
	}

	public chatId: number = 0
	public lastMessage: LastMessageData | null = null
	public friendDetails: SocialDetails = { userId: 0, username: "" }
	public draftMessage: string = ""

	public contextForPrivateMessage = action((messageId: number): MessageData | undefined => {
		return this.messagesArray.find(message => message.messageId === messageId)
	})

	public addMessageToChat = action((
		messageData: MessageData,
		setLatestMessage: boolean,
		didUserSend: boolean
	): void => {
		if (!_.isUndefined(this.contextForPrivateMessage(messageData.messageId))) return

		this.messagesArray.push(messageData)

		this.messagesArray.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

		if (setLatestMessage === false) return
		this.setLastMessage(messageData, didUserSend)
	})

	private setLastMessage(
		messageData: MessageData,
		didUserSend: boolean
	): void {
		this.lastMessage = {
			...messageData,
			didUserSend
		}
	}

	public setDraftMessage = action((draftMessage: string): void => {
		this.draftMessage = draftMessage
	})
}
