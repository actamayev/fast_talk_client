import _ from "lodash"
import Missing from "./missing"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useEffect, useMemo, useRef } from "react"
import { useAuthContext } from "../contexts/auth-context"
import { useChatsContext } from "../contexts/chat-context"
import BasicHelmet from "../components/helmet/basic-helmet"
import MessageBubble from "../components/chat/message-bubble"
import MessageTextBox from "../components/chat/message-text-box"
import { removeIndefiniteLeadingAt } from "../utils/leading-at-operations"
import useRetrieveMessagesFromChatUseEffect from "../hooks/chat/retrieve-messages-from-chat-use-effect"

function Chat() {
	const { friendUsername } = useParams<{ friendUsername: AtPrefixedString }>()
	const authClass = useAuthContext()
	const chatsClass = useChatsContext()
	useRetrieveMessagesFromChatUseEffect(friendUsername)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const chat  = chatsClass.contextForChatByFriendUsername(removeIndefiniteLeadingAt(friendUsername))

	const borderColor = useMemo(() => {
		if (chat?.draftMessage && chat.draftMessage.length >= 69) return "border-red-500"
		return "border-gray-300"
	}, [chat?.draftMessage])

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
			<div className="flex flex-col h-screen">
				<div className="flex-1 px-2 overflow-y-auto overscroll-contain">
					{chat.messagesArray.map(singleMessage => (
						<MessageBubble
							key={singleMessage.messageId}
							message={singleMessage}
						/>
					))}
					<div ref={messagesEndRef} />
				</div>
				<div className={`pt-1 border-t ${borderColor}`}>
					<MessageTextBox chat={chat} />
				</div>
			</div>
		</>
	)
}

export default observer(Chat)
