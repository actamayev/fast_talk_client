import { AxiosResponse } from "axios"
import FastTalkHttpClient from "../classes/fast-talk-http-client"

export default class ChatDataService {
	private readonly pathHeader: PathHeaders = "/chat"

	constructor(private readonly httpClient: FastTalkHttpClient) {
	}

	async retrieveChatsList(): Promise<AxiosResponse<RetrievedChatsList[] | NonSuccessResponse>> {
		return await this.httpClient.http.get<RetrievedChatsList[] | NonSuccessResponse>(
			`${this.pathHeader}/retrieve-chats-list`
		)
	}

	async sendMessage(chatId: number, message: string): Promise<AxiosResponse<SendMessageResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<SendMessageResponse | NonSuccessResponse>(
			`${this.pathHeader}/send-message/${chatId}`, { message }
		)
	}

	async createChat(friendId: number): Promise<AxiosResponse<CreateChatResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<CreateChatResponse | NonSuccessResponse>(
			`${this.pathHeader}/create-chat/${friendId}`
		)
	}

	async retrieveChatMessages(chatId: number): Promise<AxiosResponse<ChatMessage[] | NonSuccessResponse>> {
		return await this.httpClient.http.get<ChatMessage[] | NonSuccessResponse>(
			`${this.pathHeader}/retrieve-chat-messages/${chatId}`
		)
	}

	async searchForUsername(username: string): Promise<AxiosResponse<SearchForUsersResponse | ErrorResponses>> {
		return await this.httpClient.http.get<SearchForUsersResponse | ErrorResponses>(
			`${this.pathHeader}/search-for-usernames/${username}`
		)
	}
}
