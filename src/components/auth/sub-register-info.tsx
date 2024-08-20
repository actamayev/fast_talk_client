import { Link } from "react-router-dom"

export default function SubRegisterInfo() {
	return (
		<div className="text-zinc-950 dark:text-zinc-200 flex items-center">
			<span>
				Already have an account?&nbsp;
			</span>
			<Link to="/login" className="hover:underline font-semibold">
				Login
			</Link>
		</div>
	)
}
