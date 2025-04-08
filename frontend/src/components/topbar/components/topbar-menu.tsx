import Clickable from '@/components/clickable'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { cn } from '@sglara/cn'
import { Menu, SquareMenu } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { MenuTriggerProps, MenuItemProps, MenuGroupProps, MenuLinkProps, TopbarMenuProps } from '../topbar.types'

export default function TopbarMenu({ content, width = 200 }: TopbarMenuProps): React.ReactNode {
	const [opened, setOpened] = useState<boolean>(false)

	return (
		<DropdownMenu onOpenChange={setOpened}>
			<MenuTrigger opened={opened} />
			<MenuContent content={content} width={width} />
		</DropdownMenu>
	)
}

function MenuTrigger({ opened }: MenuTriggerProps): React.ReactNode {
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

function MenuContent({ content, width }: TopbarMenuProps): React.ReactNode {
	if (!content || content.length === 0) return null

	return (
		<DropdownMenuContent className='shadow-lg duration-400' style={{ width }}>
			{content.map((item, i) => (
				<MenuItem key={`Menu-Item-${i}`} item={item} />
			))}
		</DropdownMenuContent>
	)
}

function MenuItem({ item }: MenuItemProps): React.ReactNode {
	switch (item.type) {
		case 'divider':
			return <DropdownMenuSeparator />
		case 'group':
			return <Group group={item} />
		case 'link':
			return <Link item={item} />
	}
}

function Group({ group }: MenuGroupProps): React.ReactNode {
	return (
		<DropdownMenuGroup>
			<DropdownMenuLabel>{group.group}</DropdownMenuLabel>
			{group.items.map((item, i) => (
				<Link key={`MenuLink-${group.group}-${item.label}-${i}`} item={item} />
			))}
		</DropdownMenuGroup>
	)
}

function Link({ item }: MenuLinkProps): React.ReactNode {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	if (item.link === pathname) return null

	return <DropdownMenuItem onClick={() => navigate(item.link)}>{item.label}</DropdownMenuItem>
}
