import _ from "lodash"
import ChatClass from "../../classes/chat-class"
import { observer } from "mobx-react"

interface Props {
	chat: ChatClass
}

function SingleChatItem(props: Props) {
	const { chat } = props

	return (
		<div className="flex items-start p-4 border-b border-gray-300 hover:bg-gray-200 cursor-pointer">
			<div className="flex flex-col">
				<span className="font-semibold text-gray-800">
					@{chat.friendDetails.username}
				</span>
				<span className="text-sm text-gray-600 truncate">
					{_.isNull(chat.lastMessage) ? (
						<>No Messages yet</>
					) : (
						<>
							{chat.lastMessage.didUserSend && (<>You: </>)}
							{chat.lastMessage.text}
						</>
					)}
				</span>
			</div>
		</div>
	)
}

export default observer(SingleChatItem)
