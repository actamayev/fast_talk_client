import _ from "lodash"
import Missing from "./missing"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import MessageBubble from "../components/message-bubble"
import { useAuthContext } from "../contexts/auth-context"
import { useChatsContext } from "../contexts/chat-context"
import BasicHelmet from "../components/helmet/basic-helmet"
import { removeLeadingAt } from "../utils/leading-at-operations"
import useRetrieveMessagesFromChatUseEffect from "../hooks/chat/retrieve-messages-from-chat-use-effect"

function Chat() {
	const { friendUsername } = useParams<{ friendUsername: AtPrefixedString }>()
	const authClass = useAuthContext()
	const chatsClass = useChatsContext()
	useRetrieveMessagesFromChatUseEffect(friendUsername)

	if (authClass.isLoggedIn === false) return <Missing />
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
				<MessageBubble
					key={singleMessage.messageId}
					message={singleMessage}
				/>
			))}
		</>
	)
}

export default observer(Chat)
