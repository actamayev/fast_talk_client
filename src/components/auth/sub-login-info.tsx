import { Link } from "react-router-dom"

export default function SubLoginInfo() {
	return (
		<div className="text-zinc-950 dark:text-zinc-200 flex items-center">
			<span>
				Need an account?&nbsp;
			</span>
			<Link to="/register" className="hover:underline font-semibold">
				Register
			</Link>
		</div>
	)
}
