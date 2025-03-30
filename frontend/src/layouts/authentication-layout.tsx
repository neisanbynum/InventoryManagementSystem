import Link from '@/components/custom/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import pages from '@/pages/__pages.config'
import breakpointSwitch, { useWindowWidth } from '@/utils/helpers/breakpoint-switch'
import { Outlet, useLocation, useNavigate } from 'react-router'

export default function AuthenticationLayout(): React.ReactNode {
	const { pathname } = useLocation()
	const width = useWindowWidth()

	return (
		<div className='vstack'>
			<Card
				style={{
					width:
						pathname === pages.signin
							? breakpointSwitch({ width, browser: '30rem', tablet: '30rem', mobile: '100%' })
							: breakpointSwitch({ width, browser: '35rem', tablet: '35rem', mobile: '100%' })
				}}
			>
				<Header pathname={pathname} />
				<CardContent>
					<Outlet />
				</CardContent>
				<Footer pathname={pathname} />
			</Card>
		</div>
	)
}

function Header({ pathname }: { pathname: string }): React.ReactNode {
	return (
		<CardHeader>
			<CardTitle>{pathname === pages.signin ? 'Authentication' : 'Registration'}</CardTitle>
			<CardDescription>
				{pathname === pages.register && "Create an account to access your team's inventory management system!"}
				{pathname === pages.signin && "Sign in to access your team's inventory management system!"}
			</CardDescription>
		</CardHeader>
	)
}

function Footer({ pathname }: { pathname: string }): React.ReactNode {
	const navigate = useNavigate()

	return (
		<CardFooter>
			<div className='hstack gap-1'>
				{pathname === pages.signin && <p>Need to create an account?</p>}
				{pathname === pages.register && <p>Already have an account?</p>}
				<Link
					label={pathname === pages.signin ? 'Register Now' : 'Sign In'}
					onClick={() => navigate(pathname === pages.signin ? pages.register : pages.signin)}
				/>
			</div>
		</CardFooter>
	)
}
