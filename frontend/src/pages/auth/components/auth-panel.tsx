import { HStack } from '@/components/custom/containers'
import { LinkButton } from '@/components/custom/inputs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Paths from '@/pages/route-names'
import { ReactNode } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'

export default function AuthPanel(): ReactNode {
	const { pathname } = useLocation()

	return (
		<Card style={{ width: pathname === Paths.auth ? '30rem' : '35rem' }}>
			<AuthHeader />
			<CardContent>
				<Outlet />
			</CardContent>
			<AuthFooter />
		</Card>
	)
}

function AuthHeader(): ReactNode {
	const { pathname } = useLocation()

	return (
		<CardHeader>
			<CardTitle>{pathname === Paths.auth ? 'Authentication' : 'Registration'}</CardTitle>
			<CardDescription>
				{pathname === Paths.register && "Create an account to access your team's inventory management system!"}
				{pathname === Paths.auth && "Sign in to access your team's inventory management system!"}
			</CardDescription>
		</CardHeader>
	)
}

function AuthFooter(): ReactNode {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	return (
		<CardFooter>
			<HStack
				height={'fit-content'}
				gap={'0.25rem'}
			>
				{pathname === Paths.auth && <p>Need to create an account?</p>}
				{pathname === Paths.register && <p>Already have an account?</p>}
				<LinkButton
					label={pathname === Paths.auth ? 'Register Now' : 'Sign In'}
					onClick={() => navigate(pathname === Paths.auth ? Paths.register : Paths.auth)}
				/>
			</HStack>
		</CardFooter>
	)
}
