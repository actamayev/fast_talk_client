import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { useLocation } from "react-router-dom"
import ChatClass from "../../classes/chat-class"
import useDateFormatter from "../../hooks/date-formatter"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"

interface Props {
	chat: ChatClass
}

function SingleChatItem(props: Props) {
	const { chat } = props
	const dateFormatter = useDateFormatter()
	const navigate = useTypedNavigate()
	const location = useLocation()

	const navigateToChat = useCallback(() => {
		navigate(`/c/${addDefiniteLeadingAt(chat.friendDetails.username)}`)
	}, [chat.friendDetails.username, navigate])

	const backgroundColor = useMemo(() => {
		if (location.pathname === `/c/${addDefiniteLeadingAt(chat.friendDetails.username)}`) {
			return "bg-gray-200"
		}
		return "hover:bg-gray-200 cursor-pointer"
	}, [chat.friendDetails.username, location.pathname])

	return (
		<div
			className={`flex items-start p-4 border-b border-gray-300 ${backgroundColor}`}
			onClick={navigateToChat}
		>
			<div className="flex flex-col w-full">
				<span className="font-semibold text-gray-800">
					@{chat.friendDetails.username}
				</span>
				<span className="text-sm text-gray-600 truncate">
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
