export interface MenuDivider {
    readonly type: 'divider'
}

export interface MenuLink {
	readonly type: 'link'
	readonly label: string
	readonly link: string
}

export interface MenuGroup {
	readonly type: 'group'
	readonly group: string
	readonly items: MenuLink[]
}

export type MenuItem = MenuDivider | MenuLink | MenuGroup
export type MenuContent = MenuItem[]

export interface TopbarMenuProps {
	content?: MenuContent
	width?: React.CSSProperties['width']
}
export interface MenuTriggerProps {
	opened: boolean
}
export interface MenuItemProps {
	item: MenuItem
}
export interface MenuGroupProps {
	group: MenuGroup
}
export interface MenuLinkProps {
	item: MenuLink
}