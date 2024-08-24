import _ from "lodash"

export function addDefiniteLeadingAt(str: string): AtPrefixedString {
	if (str.startsWith("@")) {
		return str as AtPrefixedString
	}
	return `@${str}` as AtPrefixedString
}

export function removeIndefiniteLeadingAt(str: AtPrefixedString | undefined): string | undefined {
	if (_.isUndefined(str)) return undefined
	return removeDefiniteLeadingAt(str)
}

export function removeDefiniteLeadingAt(str: AtPrefixedString): string {
	if (str.startsWith("@")) return str.slice(1)
	return str
}
