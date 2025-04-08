import { FormInputProps } from "../form-input/form-input.types"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InputSchemaDefinition<T extends Record<string, any>> = {
	[K in keyof T]: FormInputProps & { name: K }
}
export type InputMap = Record<string, FormInputProps>


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
		tweak?: { [key in keyof T]?: Partial<FormInputProps> }
	}[]
}
