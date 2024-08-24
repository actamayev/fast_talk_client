import { useMemo } from "react"
import { useAuthContext } from "../../contexts/auth-context"

export default function useDefaultSiteTheme (): SiteThemes {
	const authClass = useAuthContext()

	return useMemo(() => {
		return authClass.defaultSiteTheme
	}, [authClass.defaultSiteTheme])
}
