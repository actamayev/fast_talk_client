import React from "react"
import BasicHelmet from "../components/helmet/basic-helmet"

interface HelmetData {
	[key: string]: React.ReactNode
}

const helmetData: HelmetData = {
	"/": (
		<BasicHelmet
			pageTitleData="FastTalk"
			description="Talk Fast with FastTalk"
			url="http://localhost:3000/"
			needsFortunaSuffix={false}
		/>
	),
	"/login": (
		<BasicHelmet
			pageTitleData="Login"
			description="Login to your FastTalk account to talk fask."
			url="http://localhost:3000/login"
		/>
	),
	"/register": (
		<BasicHelmet
			pageTitleData="Register"
			description="Create an account with fastTalk to start talking fast."
			url="http://localhost:3000/register"
		/>
	)
}

export default helmetData
