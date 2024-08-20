import { useState } from "react"
import Button from "../../components/button"
import ErrorMessage from "../../components/error-message"
import AuthTemplate from "../../components/auth-template"
import useLoginSubmit from "../../hooks/auth/login-submit"
import PageHelmet from "../../components/helmet/page-helmet"
import ContactInput from "../../components/auth/contact-input"
import SubLoginInfo from "../../components/auth/sub-login-info"
import PasswordInput from "../../components/auth/password-input"
import useRedirectKnownUser from "../../hooks/redirect/redirect-known-user"

export default function LoginPage() {
	useRedirectKnownUser()
	const [loginInformation, setLoginInformation] = useState<LoginCredentials>({
		contact: "",
		password: ""
	})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const loginSubmit = useLoginSubmit(loginInformation, setError, setLoading)

	const createSetCredentialsFunction = (setter: React.Dispatch<React.SetStateAction<LoginCredentials>>) => {
		return (newCredentials: Partial<LoginCredentials | RegisterCredentials>) => {
			setter(prevState => ({ ...prevState, ...newCredentials as Partial<LoginCredentials> }))
		}
	}
	return (
		<div>
			<PageHelmet pageTitle="/login" />
			<AuthTemplate title="Login">
				<form onSubmit={loginSubmit} className="mb-3">
					<ContactInput
						loginInformation={loginInformation}
						setLoginInformation={setLoginInformation}
					/>

					<PasswordInput
						credentials = {loginInformation}
						setCredentials = {createSetCredentialsFunction(setLoginInformation)}
					/>

					<ErrorMessage error={error} />

					<Button
						title="Login"
						className="mt-3 w-full font-semibold text-lg text-white"
						colorClass="bg-blue-600"
						hoverClass="hover:bg-blue-700"
						disabled={loading}
					/>
				</form>
				<SubLoginInfo />
			</AuthTemplate>
		</div>
	)
}
