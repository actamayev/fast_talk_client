import { observer } from "mobx-react"
import Button from "../button"
import useLogout from "../../hooks/auth/logout"

function LogoutButton() {
	const logout = useLogout()

	return (
		<Button
			title="Logout"
			colorClass="bg-red-500"
			hoverClass="hover:bg-red-600"
			onClick={logout}
		/>
	)
}

export default observer(LogoutButton)
