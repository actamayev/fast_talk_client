declare global {
	type EmailOrUnknown = "Email" | "Unknown"

	type StaticPageNames =
		"/" |
		"/login" |
		"/register"

	type DynamicPageNames =
		`/c/${AtPrefixedString}`

	type PageNames = StaticPageNames | DynamicPageNames

	type PathHeaders =
		"/auth" |
		"/chat"

	type AtPrefixedString = string & { __brand: "AtPrefixedString" }

	interface TimestampsInterface {
		createdAt: Date
		updatedAt: Date
	}
}

export {}
