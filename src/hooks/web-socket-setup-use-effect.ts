import _ from "lodash"
import { useEffect } from "react"
import { useAuthContext } from "../contexts/auth-context"

export default function useWebSocketSetupUseEffect (): void  {
	const authClass = useAuthContext()

	useEffect(() => {
		const socket = authClass.setSocket()
		if (_.isUndefined(socket)) return

		// Handle incoming messages
		socket.onmessage = (event) => {
			const newMessage = event.data
			console.log(newMessage)
			// setMessages((prevMessages) => [...prevMessages, newMessage])
		}

		// Handle WebSocket close event
		socket.onclose = () => {
			console.log("WebSocket connection closed")
		}

		// Handle WebSocket errors
		socket.onerror = (error) => {
			console.error("WebSocket error:", error)
		}

		// Cleanup when the component is unmounted
		return () => {
			socket.close()
		}
	}, [authClass])
}
