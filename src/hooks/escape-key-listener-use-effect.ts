import { useCallback, useEffect } from "react"

export default function useEscapeListenerUseEffect(
	addEventListenerCondition: boolean,
	onClickEscapeKey: () => void
): void {
	const handleKeyDown = useCallback((event: KeyboardEvent) => {
		if (event.key === "Escape") {
			onClickEscapeKey()
		}
	}, [onClickEscapeKey])

	useEffect(() => {
		if (addEventListenerCondition) {
			window.addEventListener("keydown", handleKeyDown)
		} else {
			window.removeEventListener("keydown", handleKeyDown)
		}

		// Clean up the event listener on component unmount
		return (): void => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [addEventListenerCondition, handleKeyDown])
}
