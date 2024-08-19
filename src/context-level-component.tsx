import AuthProvider from "./contexts/auth-context"

export default function ContextLevelComponent ({ children } : { children: React.ReactNode }) {
	return (
		<AuthProvider>
			{children}
		</AuthProvider>
	)
}
