import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useChatsContext } from "../../contexts/chat-context"
import useNavigateToChat from "../../hooks/navigate/navigate-to-chat"
import useCreateTemporaryChat from "../../hooks/chat/create-temporary-new-chat"

interface Props {
	closeSearchBox: () => void
	usernameSearchResults: UsernameSearch[]
	isLoading: boolean
}

function DisplayUsernames(props: Props) {
	const { closeSearchBox, usernameSearchResults, isLoading } = props
	const chatsClass = useChatsContext()
	const navigate = useNavigateToChat()
	const createTemporaryChat = useCreateTemporaryChat()

	const navigateToOrCreateNewChat = useCallback((singleUsername: UsernameSearch) => {
		const existingChat = chatsClass.contextForChatByFriendUsername(singleUsername.username)
		if (!_.isUndefined(existingChat)) {
			closeSearchBox()
			navigate(singleUsername.username)
			return
		}
		createTemporaryChat(singleUsername)
		closeSearchBox()
	}, [chatsClass, closeSearchBox, createTemporaryChat, navigate])

	if (isLoading === true) return <>Loading...</>

	return (
		<div className="mt-4 max-h-60 overflow-y-auto bg-white p-2 border border-gray-200 rounded shadow-lg">
			{_.isEmpty(usernameSearchResults) ? (
				<div className="text-center text-gray-500 p-4">No results found</div>
			) : (
				usernameSearchResults.map((singleUsername) => (
					<div
						key={singleUsername.user_id}
						onClick={() => navigateToOrCreateNewChat(singleUsername)}
						className="p-2 hover:underline cursor-pointer text-lg border-b last:border-b-0"
					>
						{singleUsername.username}
					</div>
				))
			)}
		</div>
	)
}

export default observer(DisplayUsernames)
