import _ from "lodash"
import { Helmet } from "react-helmet"

interface Props {
	pageTitleData: string
	description: string
	url: string
	needsFortunaSuffix?: boolean
}

export default function BasicHelmet(props: Props) {
	const { pageTitleData, description, url, needsFortunaSuffix = true } = props
	const truncatedTitle = _.truncate(pageTitleData, { length: 50 }) + (needsFortunaSuffix ? " | Fortuna" : "")
	const truncatedDescription = _.truncate(description, { length: 155})

	return (
		<Helmet>
			<title>{truncatedTitle}</title>
			<meta property="og:title" content={truncatedTitle} />
			<meta name="twitter:title" content={truncatedTitle} />

			<meta name="description" content={truncatedDescription}/>
			<meta property="og:description" content={truncatedDescription}/>
			<meta name="twitter:description" content={truncatedDescription}/>

			<meta property="og:url" content={url} />
		</Helmet>
	)
}
