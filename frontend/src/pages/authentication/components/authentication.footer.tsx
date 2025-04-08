import { CardFooter } from '@/components/ui/card'
import pages from '@/pages/pages.config'
import { useNavigate } from 'react-router'
import { AuthenCardSectionProps } from '../authentication.types'
import Link from '@/components/custom/link'

export default function AuthenFooter({ pathname }: AuthenCardSectionProps): React.ReactNode {
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
