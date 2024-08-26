import { useCallback } from "react"
import { useAuthContext } from "../contexts/auth-context"
import useDefaultSiteTheme from "./memos/default-site-theme"

export default function useSetDefaultSiteTheme(): () => void {
	const authClass = useAuthContext()
	const defaultSiteTheme = useDefaultSiteTheme()

	return useCallback(() => {
		try {
			const newSiteTheme = defaultSiteTheme === "light" ? "dark" : "light"
			authClass.setDefaultSiteTheme(newSiteTheme)
		} catch (error) {
			console.error(error)
		}
	}, [defaultSiteTheme, authClass])
}
