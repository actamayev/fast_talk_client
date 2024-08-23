import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import BasicHelmet from "../components/helmet/basic-helmet"
import useRetrieveMessagesFromChatUseEffect from "../hooks/chat/retrieve-messages-from-chat-use-effect"

function Chat() {
	const { friendUsername } = useParams<{ friendUsername: AtPrefixedString }>()
	useRetrieveMessagesFromChatUseEffect(friendUsername)
	if (_.isUndefined(friendUsername)) return null

	return (
		<>
			<BasicHelmet
				pageTitleData={friendUsername}
				description={`Chat with ${friendUsername}`}
				url={`http://localhost:3000/c/${friendUsername}`}
			/>
		</>
	)
}

export default observer(Chat)
