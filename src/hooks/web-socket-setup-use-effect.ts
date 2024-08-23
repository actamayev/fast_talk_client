import _ from "lodash"
import { useEffect } from "react"
import { useAuthContext } from "../contexts/auth-context"
import useAddSocketMessage from "./chat/add-socket-message"

export default function useWebSocketSetupUseEffect (): void  {
	const authClass = useAuthContext()
	const addSocketMessage = useAddSocketMessage()

	useEffect(() => {
		const socket = authClass.setSocket()
		if (_.isUndefined(socket)) return

		// Handle incoming messages
		socket.onmessage = (event: MessageEvent<SocketMessage>): void => {
			addSocketMessage(event.data)
		}

		// Handle WebSocket close event
		socket.onclose = (): void => {
			console.log("WebSocket connection closed")
		}

		// Handle WebSocket errors
		socket.onerror = (error): void => {
			console.error("WebSocket error:", error)
		}

		// Cleanup when the component is unmounted
		return (): void => {
			socket.close()
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authClass.isLoggedIn])
}
