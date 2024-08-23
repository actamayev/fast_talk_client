import { useCallback } from "react"

export default function useDateFormatter(): (dateString: RustDate) => string {
	return useCallback((dateString: RustDate) => {
		const inputDate = new Date(dateString)
		const now = new Date()

		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
		const yesterday = new Date(today)
		yesterday.setDate(today.getDate() - 1)

		const daysAgo7 = new Date(today)
		daysAgo7.setDate(today.getDate() - 7)

		// Format for today's date
		if (inputDate >= today) {
			const hours = inputDate.getHours()
			const minutes = inputDate.getMinutes()
			const ampm = hours >= 12 ? "PM" : "AM"
			const formattedHours = hours % 12 || 12
			const formattedMinutes = minutes.toString().padStart(2, "0")
			return `${formattedHours}:${formattedMinutes}${ampm}`
		}

		// Format for yesterday's date
		if (inputDate >= yesterday && inputDate < today) {
			return "yesterday"
		}

		// Format for within the last 7 days
		if (inputDate >= daysAgo7 && inputDate < yesterday) {
			const options: Intl.DateTimeFormatOptions = { weekday: "long" }
			return inputDate.toLocaleDateString(undefined, options)
		}

		// Format for dates older than 7 days
		const options: Intl.DateTimeFormatOptions = { year: "2-digit", month: "numeric", day: "numeric" }
		return inputDate.toLocaleDateString(undefined, options)
	}, [])
}
