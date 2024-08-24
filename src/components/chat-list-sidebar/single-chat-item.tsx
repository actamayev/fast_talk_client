import _ from "lodash"
import { useMemo } from "react"
import { observer } from "mobx-react"
import { useLocation } from "react-router-dom"
import ChatClass from "../../classes/chat-class"
import useDateFormatter from "../../hooks/date-formatter"
import useNavigateToChat from "../../hooks/navigate/navigate-to-chat"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"

interface Props {
	chat: ChatClass
}

function SingleChatItem(props: Props) {
	const { chat } = props
	const dateFormatter = useDateFormatter()
	const location = useLocation()
	const navigateToChat = useNavigateToChat()

	const backgroundColor = useMemo(() => {
		if (location.pathname === `/c/${addDefiniteLeadingAt(chat.friendDetails.username)}`) {
			return "bg-zinc-200 dark:bg-zinc-800"
		}
		return "hover:bg-zinc-200 cursor-pointer dark:hover:bg-zinc-800"
	}, [chat.friendDetails.username, location.pathname])

	return (
		<div
			className={`flex items-start p-4 border-b border-zinc-300 dark:border-zinc-700 ${backgroundColor}`}
			onClick={() => navigateToChat(chat.friendDetails.username)}
		>
			<div className="flex flex-col w-full">
				<span className="font-semibold text-zinc-800 dark:text-zinc-200">
					@{chat.friendDetails.username}
				</span>
				<span className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
					{_.isNull(chat.lastMessage) ? (
						<>No Messages yet</>
					) : (
						<div className="flex flex-row justify-between w-full">
							<div>
								{chat.lastMessage.didUserSend && (<>You: </>)}
								{chat.lastMessage.text}
							</div>
							<div className="text-right">
								{dateFormatter(chat.lastMessage.updatedAt)}
							</div>
						</div>
					)}
				</span>
			</div>
		</div>
	)
}

export default observer(SingleChatItem)
