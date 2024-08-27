import { useState, useEffect, useRef } from "react"
import BodyUsernameSearchModal from "./body-username-search-modal"
import useUsernameSearch from "../../../hooks/chat/username-search"
import HeaderUsernameSearchModal from "./header-username-search-modal"
import useClickOutsideModalUseEffect from "../../../hooks/click-outside-modal-use-effect"

interface Props {
    closeModal: () => void
}

export default function UsernameSearchModal(props: Props) {
	const { closeModal } = props
	const [isLoading, setIsLoading] = useState(false)
	const [usernameSearchResults, setUsernameSearchResults] = useState<UsernameSearch[]>([])
	const [usernameToSearchFor, setUsernameToSearchFor] = useState("")
	const modalRef = useRef<HTMLDivElement>(null)
	const mouseDownTarget = useRef<EventTarget | null>(null)
	const usernameSearch = useUsernameSearch()
	useClickOutsideModalUseEffect(mouseDownTarget, modalRef, closeModal)

	useEffect(() => {
		void usernameSearch(usernameToSearchFor, setIsLoading, setUsernameSearchResults)
	}, [usernameSearch, usernameToSearchFor])

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div
				className="bg-white dark:bg-zinc-900 w-11/12 max-w-lg rounded-lg shadow-lg"
				ref={modalRef}
				onClick={e => e.stopPropagation()}
			>
				<HeaderUsernameSearchModal
					usernameToSearchFor={usernameToSearchFor}
					setUsernameToSearchFor={setUsernameToSearchFor}
				/>
				<div className="max-h-60 overflow-y-auto p-2">
					<BodyUsernameSearchModal
						isLoading={isLoading}
						usernameSearchResults={usernameSearchResults}
						closeModal={closeModal}
					/>
				</div>
			</div>
		</div>
	)
}
