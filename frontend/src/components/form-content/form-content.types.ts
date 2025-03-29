export type AllowedInputType = 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around'

export interface Input {
    name: string
    label: string
    type?: AllowedInputType
    width?: React.CSSProperties['width']
    placeholder?: string
    passwordHint?: boolean
}
export type FormRow = { name: string, inputs: (Input | React.ReactNode)[], justify?: Justify}
export type FormGroup = { name: string, rows: FormRow[] }
export type FormContent = { name: string, content: (FormRow | FormGroup)[] }

export type FormRowProps = { row: FormRow, index?: number }
export type FormGroupProps = { group: FormGroup, index?: number }
export type FormContentProps = { content: FormContent, gap?: React.CSSProperties['gap'] }