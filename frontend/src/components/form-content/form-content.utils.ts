import { FormGroup, FormRow, Input } from './form-content.types'

export function isGroup(item: FormGroup | FormRow): item is FormGroup {
	return typeof item === 'object' && item !== null && 'rows' in item && Array.isArray((item as FormGroup).rows)
}

export function isRow(item: FormGroup | FormRow): item is FormRow {
	return typeof item === 'object' && item !== null && 'inputs' in item && Array.isArray((item as FormRow).inputs)
}

export function isInput(item: Input | React.ReactNode): item is Input {
	return (
		typeof item === 'object' &&
		item !== null &&
		'label' in item &&
		'name' in item &&
		typeof (item as Input).name === 'string'
	)
}

export const justifyMap: Record<string, string> = {
	start: 'justify-start',
	center: 'justify-center',
	end: 'justify-end',
	between: 'justify-between',
	around: 'justify-around'
}
