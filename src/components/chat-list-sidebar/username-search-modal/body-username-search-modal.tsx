import _ from "lodash"
import { useCallback } from "react"
import { observer } from "mobx-react"
import { useChatsContext } from "../../../contexts/chat-context"
import useNavigateToChat from "../../../hooks/navigate/navigate-to-chat"
import useCreateTemporaryChat from "../../../hooks/chat/create-temporary-new-chat"

interface Props {
	isLoading: boolean
	usernameSearchResults: UsernameSearch[]
	closeModal: () => void
}

function BodyUsernameSearchModal(props: Props) {
	const { isLoading, usernameSearchResults, closeModal } = props
	const chatsClass = useChatsContext()
	const navigate = useNavigateToChat()
	const createTemporaryChat = useCreateTemporaryChat()

	const navigateToOrCreateNewChat = useCallback((singleUsername: UsernameSearch) => {
		const existingChat = chatsClass.contextForChatByFriendUsername(singleUsername.username)
		if (!_.isUndefined(existingChat)) {
			closeModal()
			navigate(singleUsername.username)
			return
		}
		createTemporaryChat(singleUsername)
		closeModal()
	}, [chatsClass, closeModal, createTemporaryChat, navigate])


	if (isLoading === true) return <div className="text-center p-4">Loading...</div>

	if (_.isEmpty(usernameSearchResults)) {
		return <div className="text-center text-zinc-500 p-4">No users found</div>
	}

	return (
		<>
			{usernameSearchResults.map((singleUsername) => (
				<div
					key={singleUsername.user_id}
					onClick={() => navigateToOrCreateNewChat(singleUsername)}
					className="cursor-pointer border-b dark:text-white overflow-hidden"
				>
					<div className="hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded p-2">
						{singleUsername.username}
					</div>
				</div>
			))}
		</>
	)
}

export default observer(BodyUsernameSearchModal)
