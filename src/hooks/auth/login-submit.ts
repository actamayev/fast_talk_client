import _ from "lodash"
import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { isNonSuccessResponse } from "../../utils/type-checks"
import confirmLoginFields from "../../utils/auth/confirm-login-fields"
import setErrorAxiosResponse from "../../utils/auth/set-error-axios-response"
import useSetDataAfterLoginOrRegister from "./set-data-after-login-or-register"
import { useApiClientContext } from "../../contexts/fast-talk-api-client-context"

export default function useLoginSubmit (
	whereToNavigate: PageNames,
	loginInformation: LoginCredentials,
	setError: (error: string) => void,
	setLoading: (loading: boolean) => void
): (
	e: React.FormEvent<HTMLFormElement>,
) => Promise<void> {
	const fortunaApiClient = useApiClientContext()
	const setDataAfterLogin = useSetDataAfterLoginOrRegister()
	const navigate = useTypedNavigate()

	return useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setError("")
		try {
			const areCredentialsValid = confirmLoginFields(loginInformation, setError)
			if (areCredentialsValid === false) return

			setLoading(true)
			const response = await fortunaApiClient.authDataService.login(loginInformation)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to login. Please reload page and try again.")
				return
			}
			setDataAfterLogin(response.data)
			navigate(whereToNavigate)
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError, "Unable to login")
		} finally {
			setLoading(false)
		}
	}, [fortunaApiClient.authDataService, loginInformation, navigate, setDataAfterLogin, setError, setLoading, whereToNavigate])
}
