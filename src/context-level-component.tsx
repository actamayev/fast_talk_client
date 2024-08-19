import AuthProvider from "./contexts/auth-context"
import FastTalkApiClientProvider from "./contexts/fast-talk-api-client-context"

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<FastTalkApiClientProvider>
				{children}
			</FastTalkApiClientProvider>
		</AuthProvider>
	)
}
