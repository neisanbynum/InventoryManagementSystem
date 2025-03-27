import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ReactNode, useState } from 'react'
import { MENUBAR } from '../constants'
import { Menu, SquareMenu } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function MenubarMenu(): ReactNode {
	const [opened, setOpened] = useState(false)

	return (
		<DropdownMenu onOpenChange={setOpened}>
			<MenuTrigger opened={opened} />
			<MenuContent />
		</DropdownMenu>
	)
}

interface TriggerProps {
	opened: boolean
}

function MenuTrigger({ opened }: TriggerProps): ReactNode {
	const iconSize: string = `calc(${MENUBAR.height} - ${MENUBAR.padding})`

	return (
		<DropdownMenuTrigger
			asChild
			style={{ background: 'transparent' }}
		>
			<Button
				variant={'ghost'}
				size={'icon'}
				aria-label={opened ? 'Close Menu' : 'Open Menu'}
				className='hover:bg-transparent'
				style={{ outline: 0, border: 0 }}
			>
				<Menu className={`w-[${iconSize}] h-[${iconSize}] scale-${opened ? 0 : 100} transition-all`} />
				<SquareMenu
					className={`absolute w-[${iconSize}] h-[${iconSize}] scale-${opened ? 100 : 0} transition-all`}
				/>
			</Button>
		</DropdownMenuTrigger>
	)
}

interface MenuLink {
	readonly type: 'link'
	readonly label: string
	readonly link: string
	readonly protected?: boolean
}

interface MenuGroup {
	readonly type: 'group'
	readonly group: string
	readonly items: MenuLink[]
	readonly protected?: boolean
}

type MenuDivider = { type: 'divider' }

type MenuItem = MenuDivider | MenuLink | MenuGroup
type MenuItems = MenuItem[]

function MenuContent(): ReactNode {
	const items: MenuItems = [
		{ type: 'link', label: 'Sign In', link: '/auth' },
		{ type: 'divider' },
		{ type: 'link', label: 'Register', link: '/auth/register' }
	]

	return (
		<DropdownMenuContent className='w-[15rem]'>
			{items.map((item, index) => (
				<RenderItem
					key={`MenuItem-${index}`}
					item={item}
					index={index}
				/>
			))}
		</DropdownMenuContent>
	)
}

interface ItemProps {
	item: MenuItem
	index: number
}

function RenderItem({ item, index }: ItemProps): ReactNode {
	switch (item.type) {
		case 'divider':
			return <DropdownMenuSeparator key={`Menu-Divider-${index}`} />
		case 'group':
			return (
				<RenderGroup
					group={item}
					key={`MenuGroup-${item.group}-${index}`}
				/>
			)
		case 'link':
			return (
				<RenderLink
					key={`MenuLink-${item.label}-${index}`}
					item={item}
				/>
			)
	}
}

interface GroupProps {
	group: MenuGroup
}

function RenderGroup({ group }: GroupProps): ReactNode {
	// TODO: Check if user is logged in
	const render: boolean = group.protected ? true : true
	if (!render) return null

	return (
		<DropdownMenuGroup key={group.group}>
			<DropdownMenuLabel>{group.group}</DropdownMenuLabel>
			{group.items.map((item, index) => (
				<RenderLink
					key={`MenuLink-${group.group}-${item.label}-${index}`}
					item={item}
				/>
			))}
		</DropdownMenuGroup>
	)
}

interface LinkProps {
	item: MenuLink
}

function RenderLink({ item }: LinkProps): ReactNode {
	const navigate = useNavigate()
	// TODO: Check if user is logged in
	const render: boolean = item.protected ? true : true
	if (!render) return null

	return <DropdownMenuItem onClick={() => navigate(item.link)}>{item.label}</DropdownMenuItem>
}
