import { useState, useCallback } from "react"
import { RiChatNewLine } from "react-icons/ri"
import HoverOutlineComponent from "../hover-outline-component"
import UsernameSearchModal from "./username-search-modal/username-search-modal"
import useEscapeListenerUseEffect from "../../hooks/escape-key-listener-use-effect"

export default function UsernameSearchButton() {
	const [isUsernameSearchOpen, setIsUsernameSearchOpen] = useState(false)

	const closeUsernameSearch = useCallback(() => {
		setIsUsernameSearchOpen(false)
	}, [])

	useEscapeListenerUseEffect(isUsernameSearchOpen, closeUsernameSearch)

	const changeUsernameSearchStatus = useCallback(() => {
		setIsUsernameSearchOpen((prevState) => !prevState)
	}, [])

	return (
		<div>
			<HoverOutlineComponent
				onClickAction={changeUsernameSearchStatus}
				classes="relative flex items-center justify-center text-black dark:text-white"
			>
				<RiChatNewLine size={20} />
			</HoverOutlineComponent>
			{isUsernameSearchOpen && (
				<UsernameSearchModal closeModal={closeUsernameSearch} />
			)}
		</div>
	)
}
