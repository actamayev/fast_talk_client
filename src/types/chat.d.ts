declare global {
	interface SocialDetails {
		userId: number
		username: string
	}

	interface MessageData extends TimestampsInterface {
		chatId: number
		messageId: number
		text: string
		senderDetails: SocialDetails
	}

	interface ChatData extends TimestampsInterface {
		chatId: number
		lastMessage: LastMessageData
		friendDetails: SocialDetails
	}

	interface LastMessageData extends TimestampsInterface {
		text: string
		didUserSend: boolean
	}

	interface UsernameSearch {
		username: string
		user_id: number
	}
}

export {}
