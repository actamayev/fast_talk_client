import { AxiosResponse } from "axios"
import FastTalkHttpClient from "../classes/fast-talk-http-client"

export default class AuthDataService {
	private readonly pathHeader: PathHeaders = "/auth"

	constructor(private readonly httpClient: FastTalkHttpClient) {
	}

	async login(loginInformation: LoginCredentials): Promise<AxiosResponse<LoginOrRegisterSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<LoginOrRegisterSuccess | NonSuccessResponse>(
			`${this.pathHeader}/login`, { ...loginInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async register(registerInformation: RegisterCredentialsToSend): Promise<AxiosResponse<LoginOrRegisterSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<LoginOrRegisterSuccess | NonSuccessResponse>(
			`${this.pathHeader}/register`, { ...registerInformation }, { headers: { "No-Auth-Required": "true" }}
		)
	}

	async retrievePersonalInfo(): Promise<AxiosResponse<PersonalInfoResponse | NonSuccessResponse>> {
		return await this.httpClient.http.get<PersonalInfoResponse | NonSuccessResponse>(
			`${this.pathHeader}/retrieve-personal-info`
		)
	}
}
