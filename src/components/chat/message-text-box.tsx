import { useCallback } from "react"
import { observer } from "mobx-react"
import ChatClass from "../../classes/chat-class"
import useSendMessage from "../../hooks/chat/send-message"

interface Props {
	chat: ChatClass
}

function MessageTextBox (props: Props) {
	const { chat } = props
	const sendMessage = useSendMessage()

	const handleKeyDown = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== "Enter") return
		await sendMessage(chat)
	}, [chat, sendMessage])

	return (
		<input
			type="text"
			value={chat.draftMessage}
			onChange={(e) => chat.setDraftMessage(e.target.value)}
			onKeyDown={handleKeyDown}
			placeholder="Type a message..."
			className="w-full p-2 border-gray-300 rounded focus:outline-none"
			maxLength={69}
		/>
	)
}

export default observer(MessageTextBox)

