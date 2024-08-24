import _ from "lodash"
import Missing from "./missing"
import { observer } from "mobx-react"
import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import MessageBubble from "../components/message-bubble"
import { useAuthContext } from "../contexts/auth-context"
import { useChatsContext } from "../contexts/chat-context"
import BasicHelmet from "../components/helmet/basic-helmet"
import { removeIndefiniteLeadingAt } from "../utils/leading-at-operations"
import useRetrieveMessagesFromChatUseEffect from "../hooks/chat/retrieve-messages-from-chat-use-effect"

function Chat() {
	const { friendUsername } = useParams<{ friendUsername: AtPrefixedString }>()
	const authClass = useAuthContext()
	const chatsClass = useChatsContext()
	useRetrieveMessagesFromChatUseEffect(friendUsername)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const chat  = chatsClass.contextForChatByFriendUsername(removeIndefiniteLeadingAt(friendUsername))

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
	}, [chat?.messagesArray.length])

	if (_.isUndefined(chat) || _.isUndefined(friendUsername)) return null

	if (authClass.isLoggedIn === false) return <Missing />

	return (
		<>
			<BasicHelmet
				pageTitleData={friendUsername}
				description={`Chat with ${friendUsername}`}
				url={`http://localhost:3000/c/${friendUsername}`}
			/>
			<div className="p-4 space-y-2 overflow-y-auto">
				{chat.messagesArray.map(singleMessage => (
					<MessageBubble
						key={singleMessage.messageId}
						message={singleMessage}
					/>
				))}
				{/* Dummy div to act as an anchor for scrolling */}
				<div ref={messagesEndRef} />
			</div>
		</>
	)
}

export default observer(Chat)
