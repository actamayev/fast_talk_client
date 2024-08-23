import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useChatsContext } from "../contexts/chat-context"
import BasicHelmet from "../components/helmet/basic-helmet"
import { removeLeadingAt } from "../utils/leading-at-operations"
import useRetrieveMessagesFromChatUseEffect from "../hooks/chat/retrieve-messages-from-chat-use-effect"

function Chat() {
	const { friendUsername } = useParams<{ friendUsername: AtPrefixedString }>()
	const chatsClass = useChatsContext()
	useRetrieveMessagesFromChatUseEffect(friendUsername)

	if (_.isUndefined(friendUsername)) return null
	const chat  = chatsClass.contextForChatByFriendUsername(removeLeadingAt(friendUsername))
	if (_.isUndefined(chat)) return null

	return (
		<>
			<BasicHelmet
				pageTitleData={friendUsername}
				description={`Chat with ${friendUsername}`}
				url={`http://localhost:3000/c/${friendUsername}`}
			/>
			{chat.messagesArray.map(singleMessage => (
				<div key={singleMessage.messageId}>
					{singleMessage.text}
				</div>
			))}
		</>
	)
}

export default observer(Chat)
