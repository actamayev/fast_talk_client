import { useCallback } from "react"
import useTypedNavigate from "./typed-navigate"
import { addDefiniteLeadingAt } from "../../utils/leading-at-operations"

export default function useNavigateToChat(): (friendUsername: string) => void {
	const navigate = useTypedNavigate()

	return useCallback((friendUsername: string): void => {
		navigate(`/c/${addDefiniteLeadingAt(friendUsername)}`)
	}, [navigate])
}
