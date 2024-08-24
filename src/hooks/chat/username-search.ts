import _ from "lodash"
import { useCallback } from "react"
import { isErrorResponses } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useUsernameSearch(): (
	usernameToSearchFor: string,
	setIsLoading: (value: React.SetStateAction<boolean>) => void,
	setUsernameSearchResults: React.Dispatch<React.SetStateAction<UsernameSearch[]>>
) => Promise<void> {
	const fastTalkApiClient = useApiClientContext()

	return useCallback(async (
		usernameToSearchFor: string,
		setIsLoading: (value: React.SetStateAction<boolean>) => void,
		setUsernameSearchResults: React.Dispatch<React.SetStateAction<UsernameSearch[]>>
	) => {
		try {
			if (_.isEmpty(usernameToSearchFor.trim())) {
				setUsernameSearchResults([])
				return
			}
			setIsLoading(true)

			const response = await fastTalkApiClient.chatDataService.searchForUsername(usernameToSearchFor)
			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				throw new Error("User Search Failed")
			}
			setUsernameSearchResults(response.data.usernames)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [fastTalkApiClient.chatDataService])
}
