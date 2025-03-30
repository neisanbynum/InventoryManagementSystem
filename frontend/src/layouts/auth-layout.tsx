import Spinner from '@/components/custom/spinner'
import pages from '@/pages/pages.config'
import { RootState } from '@/state/main'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router'

export default function AuthLayout(): React.ReactNode {
	const { authenticated } = useSelector((state: RootState) => state.app)
	const navigate = useNavigate()
	const path = useLocation().pathname

	useEffect(() => {
		if (path.startsWith('/auth') && !authenticated) navigate(pages.signin)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authenticated, path])

	if (!authenticated)
		return (
			<div className='vstack gap-4'>
				<Spinner size={36} />
				<p className='text-lg font-semibold'>Redirecting Back to Sign In...</p>
			</div>
		)

	return <Outlet />
}
