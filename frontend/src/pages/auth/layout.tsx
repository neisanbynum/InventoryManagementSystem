import { TextLink } from "@/components/custom/clickable";
import { HStack, VStack } from "@/components/custom/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ReactNode } from "react";
import { useLocation, Outlet, useNavigate } from "react-router";
import Paths from "../route-names";

export default function AuthenticationLayout(): ReactNode {
    return (
        <VStack>
            <AuthPanel/>
        </VStack>
    )
}

function AuthPanel(): ReactNode {
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
			<HStack className={'gap-1'}>
				{pathname === Paths.auth && <p>Need to create an account?</p>}
				{pathname === Paths.register && <p>Already have an account?</p>}
				<TextLink
					label={pathname === Paths.auth ? 'Register Now' : 'Sign In'}
					onClick={() => navigate(pathname === Paths.auth ? Paths.register : Paths.auth)}
				/>
			</HStack>
		</CardFooter>
	)
}
