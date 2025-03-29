export interface MenuLink {
	readonly type: 'link'
	readonly label: string
	readonly link: string
	readonly protected?: boolean
}
export interface MenuGroup {
	readonly type: 'group'
	readonly group: string
	readonly items: MenuLink[]
	readonly protected?: boolean
}
export interface MenuDivider {
	readonly type: 'divider'
}
export type MenuItem = MenuDivider | MenuLink | MenuGroup
export type MenuContent = MenuItem[]


export interface MenuTriggerProps {
	opened: boolean
}
export interface MenuContentProps {
    content?: MenuContent
    width?: React.CSSProperties['width']
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