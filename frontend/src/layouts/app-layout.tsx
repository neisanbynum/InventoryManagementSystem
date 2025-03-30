import { Outlet } from 'react-router'
import Topbar from '@/components/topbar'

export default function AppLayout(): React.ReactNode {
	return (
		<div className='vstack w-screen max-w-screen h-screen max-h-screen'>
			<Topbar />
			<div className='vstack p-4'>
				<Outlet />
			</div>
			<div className='hstack h-8 p-1 bg-slate-50 dark:bg-black'>Live, Laugh, Love</div>
		</div>
	)
}
