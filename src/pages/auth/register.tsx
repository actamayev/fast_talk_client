import { useState } from "react"
import Button from "../../components/button"
import ErrorMessage from "../../components/error-message"
import AuthTemplate from "../../components/auth-template"
import EmailInput from "../../components/auth/email-input"
import PageHelmet from "../../components/helmet/page-helmet"
import useRegisterSubmit from "../../hooks/auth/register-submit"
import UsernameInput from "../../components/auth/username-input"
import PasswordInput from "../../components/auth/password-input"
import ConfirmPassword from "../../components/auth/confirm-password"
import SubRegisterInfo from "../../components/auth/sub-register-info"
import useRedirectKnownUser from "../../hooks/redirect/redirect-known-user"

export default function RegisterPage() {
	useRedirectKnownUser()
	const [registerInformation, setRegisterInformation] = useState<RegisterCredentials>({
		email: "",
		username: "",
		password: "",
		passwordConfirmation: ""
	})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const registerSubmit = useRegisterSubmit(registerInformation, setError, setLoading)

	const createSetCredentialsFunction = (setter: React.Dispatch<React.SetStateAction<RegisterCredentials>>) => {
		return (newCredentials: Partial<LoginCredentials | RegisterCredentials>) => {
			setter(prevState => ({ ...prevState, ...newCredentials as Partial<RegisterCredentials> }))
		}
	}

	return (
		<div>
			<PageHelmet pageTitle="/register" />
			<AuthTemplate title="Register">
				<form onSubmit={registerSubmit} className="mb-3">
					<UsernameInput
						credentials={registerInformation}
						setCredentials={setRegisterInformation}
					/>

					<EmailInput
						registerInformation={registerInformation}
						setRegisterInformation={setRegisterInformation}
					/>

					<PasswordInput
						credentials = {registerInformation}
						setCredentials = {createSetCredentialsFunction(setRegisterInformation)}
					/>

					<ConfirmPassword
						credentials = {registerInformation}
						setCredentials = {createSetCredentialsFunction(setRegisterInformation)}
					/>

					<ErrorMessage error={error} />

					<Button
						title="Register"
						className="mt-3 w-full font-semibold text-lg text-white"
						colorClass="bg-blue-600"
						hoverClass="hover:bg-blue-700"
						disabled={loading}
					/>
				</form>
				<SubRegisterInfo />
			</AuthTemplate>
		</div>
	)
}
