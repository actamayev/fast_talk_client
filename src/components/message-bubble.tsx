import { format } from "date-fns"
import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"

interface Props {
	message: MessageData;
}

function MessageBubble (props: Props) {
	const { message } = props
	const authClass = useAuthContext()

	// Check if the message was sent by the current user
	const isOwnMessage = message.senderDetails.username === authClass.username

	// Format the message's timestamp
	const messageTime = format(new Date(message.updatedAt), "h:mm a")

	return (
		<div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} my-2`}>
			<div
				className={`max-w-xs md:max-w-md lg:max-w-lg p-1.5 rounded-xl shadow ${
					isOwnMessage ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
				}`}
			>
				<div className="whitespace-pre-wrap">{message.text}</div>
				<div className={`text-xs mt-1 ${isOwnMessage ? "text-right" : "text-left"}`}>
					{messageTime}
				</div>
			</div>
		</div>
	)
}

export default observer(MessageBubble)
