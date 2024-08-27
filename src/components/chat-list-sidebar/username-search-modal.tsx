/* eslint-disable no-nested-ternary */
import _ from "lodash"
import { observer } from "mobx-react"
import { FaTimes } from "react-icons/fa"
import { useState, useEffect, useRef, useCallback } from "react"
import { useChatsContext } from "../../contexts/chat-context"
import HoverOutlineComponent from "../hover-outline-component"
import useUsernameSearch from "../../hooks/chat/username-search"
import useNavigateToChat from "../../hooks/navigate/navigate-to-chat"
import useCreateTemporaryChat from "../../hooks/chat/create-temporary-new-chat"
import useClickOutsideModalUseEffect from "../../hooks/click-outside-modal-use-effect"

interface Props {
    closeModal: () => void;
}

function UsernameSearchModal(props: Props) {
	const { closeModal } = props
	const chatsClass = useChatsContext()
	const navigate = useNavigateToChat()
	const [isLoading, setIsLoading] = useState(false)
	const [usernameSearchResults, setUsernameSearchResults] = useState<UsernameSearch[]>([])
	const [usernameToSearchFor, setUsernameToSearchFor] = useState("")
	const modalRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const mouseDownTarget = useRef<EventTarget | null>(null)
	const usernameSearch = useUsernameSearch()
	const createTemporaryChat = useCreateTemporaryChat()
	useClickOutsideModalUseEffect(mouseDownTarget, modalRef, closeModal)

	useEffect(() => {
		if (!inputRef.current) return
		inputRef.current.focus()
	}, [])

	useEffect(() => {
		void usernameSearch(usernameToSearchFor, setIsLoading, setUsernameSearchResults)
	}, [usernameSearch, usernameToSearchFor])

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

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				className="bg-white dark:bg-zinc-900 w-11/12 max-w-lg rounded-lg shadow-lg"
				ref={modalRef}
				onClick={e => e.stopPropagation()}
			>
				<div className="flex justify-between items-center p-4 border-b border-zinc-300 dark:border-zinc-700">
					<input
						type="text"
						ref={inputRef}
						onChange={(e) => setUsernameToSearchFor(e.target.value)}
						placeholder="Search by username..."
						className="w-full p-2 border border-zinc-300 dark:border-zinc-700
						rounded text-lg dark:bg-zinc-800 dark:text-white focus:outline-none cursor-auto"
						value={usernameToSearchFor}
					/>
					<HoverOutlineComponent
						onClickAction={closeModal}
						classes="relative flex items-center justify-center text-black dark:text-white"
						circlePixelSize="30"
					>
						<FaTimes />
					</HoverOutlineComponent>
				</div>
				<div className="max-h-60 overflow-y-auto p-2">
					{isLoading ? (
						<div className="text-center p-4">Loading...</div>
					) : _.isEmpty(usernameSearchResults) ? (
						<div className="text-center text-zinc-500 p-4">No users found</div>
					) : (
						usernameSearchResults.map((singleUsername) => (
							<div
								key={singleUsername.user_id}
								onClick={() => navigateToOrCreateNewChat(singleUsername)}
								className="p-2 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded"
							>
								{singleUsername.username}
							</div>
						))
					)}
				</div>
			</div>
		</div>
	)
}

export default observer(UsernameSearchModal)
