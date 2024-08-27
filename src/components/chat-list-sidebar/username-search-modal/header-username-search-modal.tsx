import { useEffect, useRef } from "react"

interface Props {
	usernameToSearchFor: string
	setUsernameToSearchFor: React.Dispatch<React.SetStateAction<string>>
}

export default function HeaderUsernameSearchModal(props: Props) {
	const { usernameToSearchFor, setUsernameToSearchFor } = props
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (!inputRef.current) return
		inputRef.current.focus()
	}, [])

	return (
		<div className="flex justify-between items-center p-4 border-b border-zinc-300 dark:border-zinc-700">
			<input
				type="text"
				ref={inputRef}
				onChange={(e) => setUsernameToSearchFor(e.target.value)}
				placeholder="Search by username..."
				className="w-full p-2 border border-zinc-300 dark:border-zinc-700
				rounded text-lg dark:bg-zinc-800 dark:text-white focus:outline-none cursor-text"
				value={usernameToSearchFor}
			/>
		</div>
	)
}
