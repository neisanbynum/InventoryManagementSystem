import { cn } from '@sglara/cn'
import { DropdownMenuTrigger } from '../ui/dropdown-menu'
import Clickable from '../clickable'
import { Menu, SquareMenu } from 'lucide-react'
import { MenuTriggerProps } from './topbar-menu.types'

export default function MenuTrigger({ opened }: MenuTriggerProps): React.ReactNode {
	const menuClass = cn(opened ? 'scale-0' : 'scale-100', 'absolute transition-transform duration-400')
	const squarMenuClass = cn(opened ? 'scale-100' : 'scale-0', 'absolute transition-transform duration-400')

	return (
		<DropdownMenuTrigger asChild className='bg-transparent'>
			<Clickable
				variant='icon'
				aria-label={opened ? 'Close Menu' : 'Open Menu'}
				icons={[
					{ icon: Menu, name: 'closed-menu', class: menuClass },
					{ icon: SquareMenu, name: 'opened-menu', class: squarMenuClass }
				]}
			/>
		</DropdownMenuTrigger>
	)
}
