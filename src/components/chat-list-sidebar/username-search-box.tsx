import { useEffect, useRef, useState } from "react"
import useUsernameSearch from "../../hooks/chat/username-search"

interface Props {
	closeSearchBox: () => void
	setUsernameSearchResults: React.Dispatch<React.SetStateAction<UsernameSearch[]>>
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UsernameSearchBox(props: Props) {
	const { closeSearchBox, setUsernameSearchResults, setIsLoading } = props
	const inputRef = useRef<HTMLInputElement>(null)
	const [usernameToSearchFor, setUsernameToSearchFor] = useState("")
	const usernameSearch = useUsernameSearch()

	useEffect(() => {
		if (!inputRef.current) return
		inputRef.current.focus()
	}, [])

	useEffect(() => {
		void usernameSearch(usernameToSearchFor, setIsLoading, setUsernameSearchResults)
	}, [setIsLoading, setUsernameSearchResults, usernameSearch, usernameToSearchFor])

	return (
		<div className="absolute top-0 left-0 right-0 bg-white dark:bg-black shadow-lg p-4 z-10 w-full max-w-lg mx-auto">
			<input
				type="text"
				ref={inputRef}
				onChange={(e) => setUsernameToSearchFor(e.target.value)}
				placeholder="Search by username..."
				className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded focus:outline-none text-lg"
				value={usernameToSearchFor}
			/>
			<button
				onClick={closeSearchBox}
				className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-xl"
			>
				&times;
			</button>
		</div>
	)
}
