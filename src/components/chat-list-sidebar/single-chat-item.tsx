import _ from "lodash"
import { observer } from "mobx-react"
import ChatClass from "../../classes/chat-class"
import useDateFormatter from "../../hooks/date-formatter"

interface Props {
	chat: ChatClass
}

function SingleChatItem(props: Props) {
	const { chat } = props
	const dateFormatter = useDateFormatter()

	return (
		<div className="flex items-start p-4 border-b border-gray-300 hover:bg-gray-200 cursor-pointer">
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
