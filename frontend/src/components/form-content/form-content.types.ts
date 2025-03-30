export type AllowedInputType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url'
export interface Input {
	name: string
	label: string
	type?: AllowedInputType
	width?: React.CSSProperties['width']
	placeholder?: string
	passwordHint?: boolean
}
export interface InputDefinition {
	name: string
	label: string
	type?: AllowedInputType
	width?: React.CSSProperties['width']
	placeholder?: string
	passwordHint?: boolean
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InputSchemaDefinition<T extends Record<string, any>> = {
	[K in keyof T]: InputDefinition & { name: K }
}
export type InputMap = Record<string, Input>


export type GroupStyle = { group: number; style: React.CSSProperties }
export type SubGroupStyle = { group: number; sub: number; style: React.CSSProperties }
export type RowStyle = { group: number; sub: number; row: number; style: React.CSSProperties }
export type FormStyle = GroupStyle | SubGroupStyle | RowStyle
export type FormContent<T extends InputMap> = {
	name: string
	gap?: React.CSSProperties['gap']
	groupStyles?: GroupStyle[]
	subStyles?: SubGroupStyle[]
	rowStyles?: RowStyle[]
	components?: {
		group: number
		sub: number
		row: number
		components: (keyof T | React.ReactElement)[]
		tweak?: { [key in keyof T]?: Partial<InputDefinition> }
	}[]
}
