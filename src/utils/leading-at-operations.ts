export function addDefiniteLeadingAt(str: string): AtPrefixedString {
	if (str.startsWith("@")) {
		return str as AtPrefixedString
	}
	return `@${str}` as AtPrefixedString
}

export function removeLeadingAt(str: AtPrefixedString): string {
	if (str.startsWith("@")) return str.slice(1)
	return str
}
