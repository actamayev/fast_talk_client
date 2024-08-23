import { useMemo } from "react"
import { observer } from "mobx-react"
import { useLocation } from "react-router-dom"
import { useAuthContext } from "../contexts/auth-context"
import ChatListSidebar from "./chat-list-sidebar/chat-list-sidebar"

interface Props {
	children: React.ReactNode
}

function Layout(props: Props) {
	const { children } = props
	const location = useLocation()
	const authClass = useAuthContext()

	const layoutClasses = useMemo(() => {
		if (location.pathname === "/login" || location.pathname === "/register") {
			return "flex-1 w-full overflow-y-auto px-14 py-6 mt-14"
		}
		return "flex-1 w-full overflow-y-auto px-8 py-6 mt-14 ml-72 relative"
	}, [location.pathname])

	return (
		<div className="min-h-screen dark:bg-neutral-900 flex">
			{authClass.isLoggedIn && (
				<ChatListSidebar />
			)}
			<div className={layoutClasses}>
				{children}
			</div>
		</div>
	)
}

export default observer(Layout)
