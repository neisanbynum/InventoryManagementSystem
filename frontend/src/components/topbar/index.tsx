import { RootState } from '@/state/main'
import { cn } from '@sglara/cn'
import { useSelector } from 'react-redux'
import TopbarHeader from './components/topbar-header'
import TopbarMenu from './components/topbar-menu'
import { UnsecureContent } from './topbar.config'
import ThemeToggle from '../theme-switcher'

export default function Topbar({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
	const { authenticated } = useSelector((state: RootState) => state.app)

	function Controls(): React.ReactElement {
		return (
			<div className='hstack w-fit justify-between gap-2'>
				<TopbarMenu content={!authenticated ? UnsecureContent : undefined} />
				<ThemeToggle />
			</div>
		)
	}

	return (
		<div
            {...rest}
			id='Page-Topbar'
			className={cn(
				'flex w-full h-full justify-between items-center p-2 bg-slate-50 dark:bg-black border',
				className
			)}
		>
			<TopbarHeader />
			<Controls />
		</div>
	)
}
