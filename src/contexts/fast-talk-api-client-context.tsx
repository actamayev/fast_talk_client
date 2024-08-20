import { createContext, useContext, useMemo } from "react"
import AuthDataService from "../services/auth-data-service"
import FastTalkHttpClient from "../classes/fast-talk-http-client"

class FastTalkApiClient {
	public httpClient: FastTalkHttpClient = new FastTalkHttpClient()
	public authDataService: AuthDataService = new AuthDataService(this.httpClient)

	constructor() {
	}

	private initializeServices() {
		this.httpClient = new FastTalkHttpClient()
		this.authDataService = new AuthDataService(this.httpClient)
	}

	public logout() {
		this.httpClient.accessToken = null
		this.initializeServices()
	}
}

const FastTalkApiClientContext = createContext(new FastTalkApiClient())

export default function FastTalkApiClientProvider ({ children }: { children: React.ReactNode }) {
	const apiClientClass = useMemo(() => new FastTalkApiClient(), [])

	return (
		<FastTalkApiClientContext.Provider value={apiClientClass}>
			{children}
		</FastTalkApiClientContext.Provider>
	)
}

export const useApiClientContext = () => useContext(FastTalkApiClientContext)
