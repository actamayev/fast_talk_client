import { observer } from "mobx-react"
import SingleChatItem from "./single-chat-item"
import LogoutButton from "../auth/logout-button"
import { useAuthContext } from "../../contexts/auth-context"
import { useChatsContext } from "../../contexts/chat-context"
import useRetrieveChatsListUseEffect from "../../hooks/chat/retrieve-chats-list-use-effect"
import useRetrievePersonalInfoUseEffect from "../../hooks/auth/retrieve-personal-info-use-effect"

function ChatListSidebar() {
	const authClass = useAuthContext()
	const chatsClass = useChatsContext()
	useRetrieveChatsListUseEffect()
	useRetrievePersonalInfoUseEffect()

	return (
		<div className="flex flex-col w-72 bg-gray-100 border-r border-gray-300 fixed left-0 h-full overflow-y-auto">
			<div className="pl-4 py-2 font-semibold border-b border-gray-300">
				Chats
			</div>
			<div className="flex-1 overflow-y-auto">
				{chatsClass.chatsArray.map(chat => (
					<SingleChatItem key={chat.chatId} chat={chat} />
				))}
			</div>
			<div className="flex items-center justify-between p-4 border-t border-gray-300">
				<span className="text-gray-800">{authClass.username}</span>
				<LogoutButton />
			</div>
		</div>
	)
}

export default observer(ChatListSidebar)
