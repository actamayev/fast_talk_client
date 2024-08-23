import ChatClass from "../../classes/chat-class"

interface Props {
	chat: ChatClass
}

export default function SingleChatItem(props: Props) {
	const { chat } = props

	return (
		<div key={chat.chatId} className="flex items-start p-4 border-b border-gray-300 hover:bg-gray-200 cursor-pointer">
			<div className="flex flex-col">
				<span className="font-semibold text-gray-800">{chat.friendDetails.username}</span>
				<span className="text-sm text-gray-600 truncate">{chat.lastMessage?.text || "No messages yet"}</span>
			</div>
		</div>
	)
}
