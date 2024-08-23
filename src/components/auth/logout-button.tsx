import { observer } from "mobx-react"
import { IoExitOutline } from "react-icons/io5"
import Button from "../button"
import useLogout from "../../hooks/auth/logout"

function LogoutButton() {
	const logout = useLogout()

	return (
		<Button
			title="Logout"
			colorClass="bg-red-500"
			hoverClass="hover:bg-red-600"
			className="text-white text-center text-sm rounded-full flex items-center justify-center h-8"
			titleIcon={<IoExitOutline className="w-4 h-4" />}
			onClick={logout}
		/>
	)
}

export default observer(LogoutButton)
