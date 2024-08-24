import { observer } from "mobx-react"
import SiteTheme from "../site-theme"
import SingleChatItem from "./single-chat-item"
import LogoutButton from "../auth/logout-button"
import UsernameSearchButton from "./username-search-button"
import { useAuthContext } from "../../contexts/auth-context"
import useChatsListOrder from "../../hooks/chat/chats-list-order"
import useRetrieveChatsListUseEffect from "../../hooks/chat/retrieve-chats-list-use-effect"
import useRetrievePersonalInfoUseEffect from "../../hooks/auth/retrieve-personal-info-use-effect"

function ChatListSidebar() {
	const authClass = useAuthContext()
	const chatsListOrder = useChatsListOrder()
	useRetrieveChatsListUseEffect()
	useRetrievePersonalInfoUseEffect()

	return (
		<div
			className="flex flex-col w-72 bg-zinc-100 border-r border-zinc-300 fixed left-0 h-full overflow-y-auto
			dark:bg-zinc-900 dark:border-zinc-700"
		>
			<div className="flex justify-between border-b border-zinc-300 dark:border-zinc-700">
				<div className="pl-4 py-2 font-semibold dark:text-white">
					Chats
				</div>
				<div className="flex items-center justify-center mr-2">
					<UsernameSearchButton />
				</div>
			</div>
			<div className="flex-1 overflow-y-auto">
				{chatsListOrder.map(chat => (
					<SingleChatItem key={chat.chatId} chat={chat} />
				))}
			</div>
			<div className="flex items-center justify-between p-2 border-t border-zinc-300 dark:border-zinc-700">
				<span className="text-zinc-800 dark:text-zinc-200">{authClass.username}</span>
				<SiteTheme />
				<LogoutButton />
			</div>
		</div>
	)
}

export default observer(ChatListSidebar)
