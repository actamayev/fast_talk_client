import { useCallback } from "react"
import { observer } from "mobx-react"
import { FaArrowUp } from "react-icons/fa"
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
	},[chat, sendMessage])

	const handleSendClick = useCallback(async () => {
		await sendMessage(chat)
	}, [chat, sendMessage])

	return (
		<div className="flex items-center space-x-2 pr-1">
			<input
				type="text"
				value={chat.draftMessage}
				onChange={(e) => chat.setDraftMessage(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Type a message..."
				className="flex-1 p-2 focus:outline-none"
				maxLength={69}
			/>
			{chat.draftMessage && (
				<div className="flex items-center h-full border-l border-gray-300 pl-1">
					<button
						onClick={handleSendClick}
						className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white"
					>
						<FaArrowUp size={22} />
					</button>
				</div>
			)}
		</div>
	)
}

export default observer(MessageTextBox)

