import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthenCardSectionProps } from "../authentication.types";
import pages from "@/pages/pages.config";

export default function AuthenHeader({ pathname }: AuthenCardSectionProps): React.ReactElement {
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