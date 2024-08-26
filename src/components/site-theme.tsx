import { observer } from "mobx-react"
import { FaMoon } from "react-icons/fa"
import { IoMdSunny } from "react-icons/io"
import HoverOutlineComponent from "./hover-outline-component"
import useDefaultSiteTheme from "../hooks/memos/default-site-theme"
import useSetDefaultSiteTheme from "../hooks/set-default-site-theme"

function ChooseSiteTheme() {
	const defaultSiteTheme = useDefaultSiteTheme()
	const setDefaultSiteTheme = useSetDefaultSiteTheme()

	return (
		<HoverOutlineComponent
			onClickAction={setDefaultSiteTheme}
			classes="relative flex items-center justify-center text-black dark:text-white"
			circlePixelSize="30px"
		>
			{defaultSiteTheme === "light"
				? (<IoMdSunny />)
				: (<FaMoon />)
			}
		</HoverOutlineComponent>
	)
}

export default observer(ChooseSiteTheme)
