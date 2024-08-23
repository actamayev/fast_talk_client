import ChatListSidebar from "./chat-list-sidebar/chat-list-sidebar"

interface Props {
	children: React.ReactNode
}

export default function Layout(props: Props) {
	const { children } = props

	return (
		<div className="min-h-screen dark:bg-neutral-900 flex">
			<ChatListSidebar />
			<div className="flex-1 w-full overflow-y-auto px-8 py-6 mt-14 ml-72 relative">
				{children}
			</div>
		</div>
	)
}
