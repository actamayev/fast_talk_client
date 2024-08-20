import { observer } from "mobx-react"
import useRedirectUnknownUser from "../hooks/redirect/redirect-unknown-user"

function Home() {
	useRedirectUnknownUser()

	return (
		<div className="text-center">
			Home
		</div>
	)
}

export default observer(Home)
