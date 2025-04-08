import { Card, CardContent } from '@/components/ui/card'
import breakpointSwitch, { useWindowWidth } from '@/utils/helpers/breakpoint-switch'
import { Outlet, useLocation } from 'react-router'
import AuthenHeader from './components/authentication.header'
import AuthenFooter from './components/authentication.footer'
import pages from '../pages.config'
import Page from '@/components/page'

export default function AuthenticationPage(): React.ReactElement {
	const { pathname } = useLocation()
	const width = useWindowWidth()
	const SignInCardWidth = breakpointSwitch({ width, b: '30rem', t: '30rem', m: '100%' })
	const RegisterCardWidth = breakpointSwitch({ width, b: '35rem', t: '35rem', m: '100%' })

	return (
		<Page>
			<Card>
				<AuthenHeader pathname={pathname} />
				<CardContent style={{ width: pages.signin ? SignInCardWidth : RegisterCardWidth }}>
					<Outlet />
				</CardContent>
				<AuthenFooter pathname={pathname} />
			</Card>
		</Page>
	)
}
