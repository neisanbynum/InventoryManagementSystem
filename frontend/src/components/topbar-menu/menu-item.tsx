import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { MenuGroupProps, MenuItemProps, MenuLinkProps } from './topbar-menu.types'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/main'
import { useNavigate } from 'react-router'

export default function MenuItem({ item }: MenuItemProps): React.ReactNode {
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
	const { authenticated } = useSelector((state: RootState) => state.app)
	if (!authenticated && group.protected) return null

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

	const { authenticated } = useSelector((state: RootState) => state.app)
	if (!authenticated && item.protected) return null

	return <DropdownMenuItem onClick={() => navigate(item.link)}>{item.label}</DropdownMenuItem>
}
