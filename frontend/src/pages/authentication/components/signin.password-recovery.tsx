import Link from "@/components/custom/link"
import pages from "@/pages/pages.config"
import { useNavigate } from "react-router"

export default function PasswordRecovery(): React.ReactNode {
	const navigate = useNavigate()

	return (
		<div className='hstack gap-1 justify-start'>
			<p className='text-xs'>Forgot your password?</p>
			<Link
				label={'Reset Password'}
				onClick={() => navigate(pages.register)}
				className='text-xs'
			/>
		</div>
	)
}