import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useLocation, Outlet, useNavigate } from "react-router";
import Paths from "../route-names";
import Link from "@/components/custom/link";

export default function AuthenticationLayout(): React.ReactNode {
    return (
        <div className="vstack">
            <AuthPanel/>
        </div>
    )
}

function AuthPanel(): React.ReactNode {
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

function AuthHeader(): React.ReactNode {
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

function AuthFooter(): React.ReactNode {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	return (
		<CardFooter>
			<div className="hstack gap-1">
				{pathname === Paths.auth && <p>Need to create an account?</p>}
				{pathname === Paths.register && <p>Already have an account?</p>}
				<Link
					label={pathname === Paths.auth ? 'Register Now' : 'Sign In'}
					onClick={() => navigate(pathname === Paths.auth ? Paths.register : Paths.auth)}
				/>
			</div>
		</CardFooter>
	)
}
