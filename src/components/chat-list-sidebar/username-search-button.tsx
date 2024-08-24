import { observer } from "mobx-react"
import { useCallback, useState } from "react"
import { RiChatNewLine } from "react-icons/ri"
import DisplayUsernames from "./display-usernames"
import UsernameSearchBox from "./username-search-box"
import HoverOutlineComponent from "../hover-outline-component"

function UsernameSearchButton() {
	const [isUsernameSearchOpen, setIsUsernameSearchOpen] = useState(false)
	const [usernameSearchResults, setUsernameSearchResults] = useState<UsernameSearch[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const openUsernameSearch = useCallback(() => {
		setIsUsernameSearchOpen(prevState => !prevState)
	}, [])

	const closeSearchBox = useCallback(() => {
		setIsUsernameSearchOpen(false)
	}, [])

	return (
		<div className="relative">
			<HoverOutlineComponent
				classes="relative flex items-center justify-center text-black"
				onClickAction={openUsernameSearch}
			>
				<RiChatNewLine size={20} />
			</HoverOutlineComponent>
			{isUsernameSearchOpen && (
				<>
					<UsernameSearchBox
						closeSearchBox={closeSearchBox}
						setUsernameSearchResults={setUsernameSearchResults}
						setIsLoading={setIsLoading}
					/>
					<DisplayUsernames
						closeSearchBox={closeSearchBox}
						usernameSearchResults={usernameSearchResults}
						isLoading={isLoading}
					/>
				</>
			)}
		</div>
	)
}

export default observer(UsernameSearchButton)
