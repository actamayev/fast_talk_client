import { observer } from "mobx-react"
import PageHelmet from "../components/helmet/page-helmet"
import useRedirectUnknownUser from "../hooks/redirect/redirect-unknown-user"
import useRetrieveChatsListUseEffect from "../hooks/chat/retrieve-chats-list-use-effect"

function Home() {
	useRedirectUnknownUser()
	useRetrieveChatsListUseEffect()

	return (
		<>
			<PageHelmet pageTitle="/" />
			<div className="text-center">
				Home
			</div>
		</>
	)
}

export default observer(Home)
