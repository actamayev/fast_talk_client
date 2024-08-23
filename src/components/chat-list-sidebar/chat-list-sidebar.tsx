import { observer } from "mobx-react"
import SingleChatItem from "./single-chat-item"
import { useAuthContext } from "../../contexts/auth-context"
import { useChatsContext } from "../../contexts/chat-context"

function ChatListSidebar() {
	const authClass = useAuthContext()
	const chatsClass = useChatsContext()

	if (authClass.isLoggedIn === false) return null

	return (
		<div className="flex flex-col w-72 bg-gray-100 border-r border-gray-300 fixed left-0 h-full overflow-y-auto">
			<div className="pl-4 py-2 font-semibold border-b border-gray-300 hover:bg-gray-200">
				Chats
			</div>
			{chatsClass.chatsArray.map(chat => (
				<SingleChatItem key={chat.chatId} chat={chat} />
			))}
		</div>
	)
}

export default observer(ChatListSidebar)
