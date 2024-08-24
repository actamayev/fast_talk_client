import { useCallback } from "react"
import { useAuthContext } from "../contexts/auth-context"
import useDefaultSiteTheme from "./memos/default-site-theme"

export default function useSetDefaultSiteTheme(): () => void {
	// const fortunaApiClient = useApiClientContext()
	const authClass = useAuthContext()
	const defaultSiteTheme = useDefaultSiteTheme()

	return useCallback(() => {
		try {
			const newSiteTheme = defaultSiteTheme === "light" ? "dark" : "light"
			authClass.setDefaultSiteTheme(newSiteTheme)
			// if (!_.isNull(fortunaApiClient.httpClient.accessToken)) {
			// 	const siteThemeResponse = await fortunaApiClient.personalInfoDataService.setDefaultSiteTheme(newSiteTheme)
			// 	if (!_.isEqual(siteThemeResponse.status, 200) || isErrorResponse(siteThemeResponse.data)) {
			// 		throw Error("Unable to save new default site theme")
			// 	}
			// }
		} catch (error) {
			console.error(error)
		}
	}, [defaultSiteTheme, authClass])
}
