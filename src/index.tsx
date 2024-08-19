import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { disableReactDevTools } from "@fvilers/disable-react-devtools"
import App from "./App"
import "../src/styles/index.css"
import Layout from "./components/layout"
import ContextLevelComponent from "./context-level-component"

if (process.env.NODE_ENV === "production") disableReactDevTools()

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
)

root.render(
	<React.StrictMode>
		<ContextLevelComponent>
			<BrowserRouter>
				<Layout>
					<App />
				</Layout>
			</BrowserRouter>
		</ContextLevelComponent>
	</React.StrictMode>
)
