declare global {
	// Common Responses:
	type SuccessResponse = { success: string }
	type MessageResponse = { message: string }
	type ValidationErrorResponse = { validationError: string }
	type ErrorResponse = { error: string }
	type ErrorResponses = ValidationErrorResponse | ErrorResponse
	type NonSuccessResponse = MessageResponse | ErrorResponses

	//Auth Responses:
	type LoginOrRegisterSuccess = {
		access_token: string
		username: string
	}

	type PersonalInfoResponse = {
		username: string
		defaultSiteTheme: SiteThemes
	}

	//Chat Responses:
	type CreateChatResponse = {
		chat_id: number
	}

	type RetrievedChatsList = CreateChatResponse & {
		friend_username: string
		friend_user_id: number
		last_message: string
		last_message_time: RustDate
		was_last_message_sent_by_user: boolean
		chat_created_at: RustDate
	}

	type SendMessageResponse = {
		message_id: number
	}

	type ChatMessage = SendMessageResponse & {
		did_user_send: boolean
		sender_user_id: number
		message_text: string
		sent_time: RustDate
	}

	interface SocketMessage {
		chat_id: number
		message_sender_username: string
		message_sender_user_id: number
		message_text: string
		message_id: number
		sent_time: RustDate
	}

	type SearchForUsersResponse = {
		usernames: UsernameSearch[]
	}
}

export {}
