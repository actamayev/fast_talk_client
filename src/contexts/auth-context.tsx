import _ from "lodash"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class AuthClass {
	private _accessToken: string | null = null
	public socket: WebSocket | null = null

	constructor() {
		makeAutoObservable(this)
	}

	get isLoggedIn(): boolean {
		return !_.isNull(this._accessToken)
	}

	public getAuthDataFromStorage(): string | null {
		const storedAccessToken = localStorage.getItem("Access Token")
		if (!_.isNull(storedAccessToken)) this.setAccessToken(storedAccessToken)
		return this._accessToken
	}

	public setAccessToken = action((accessToken: string | null, saveToStorage = false): void => {
		this._accessToken = accessToken
		if (!_.isNull(accessToken) && saveToStorage === true) {
			localStorage.setItem("Access Token", accessToken as string)
		} else if (_.isNull(accessToken) && saveToStorage === true) {
			localStorage.removeItem("Access Token")
		}
	})

	public setSocket = action((): WebSocket | undefined => {
		if (this.isLoggedIn === false) return undefined
		this.socket = new WebSocket(`ws://localhost:8080/ws/?token=${this._accessToken}`)
		return this.socket
	})

	public logout() {
		this.setAccessToken(null, true)
		this.socket?.close()
		this.socket = null
	}
}

const AuthContext = createContext(new AuthClass())

export default function AuthProvider ({ children }: { children: React.ReactNode }) {
	const authClass = useMemo(() => new AuthClass(), [])

	return (
		<AuthContext.Provider value={authClass}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext)
