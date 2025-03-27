import { CSSProperties, HTMLInputTypeAttribute, ReactNode } from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useFormContext } from 'react-hook-form'
import { Input } from '../ui/input'

interface InputProps {
	className?: HTMLElement['className']
	minWidth?: CSSProperties['minWidth']
	width?: CSSProperties['width']
	maxWidth?: CSSProperties['maxWidth']
	margin?: CSSProperties['margin']
	padding?: CSSProperties['padding']
	name: string
	label?: string
	placeholder?: HTMLInputElement['placeholder']
	desc?: string
	required?: HTMLInputElement['required']
	disabled?: HTMLInputElement['disabled']
	type?: HTMLInputTypeAttribute
}

export function FormInput({ ...props }: InputProps): ReactNode {
	const form = useFormContext()

	return (
		<FormField
			control={form.control}
			name={props.name}
			render={function ({ field }) {
				return (
					<FormItem
						className={props.className}
						style={{
							minWidth: props.minWidth,
							width: props.width || '100%',
							maxWidth: props.maxWidth,
							margin: props.margin,
							padding: props.padding
						}}
					>
						{props.label && <FormLabel>{props.label}</FormLabel>}
						<FormControl>
							<Input
								type={props.type}
								disabled={props.disabled}
								required={props.required || true}
								placeholder={props.placeholder}
								{...field}
							/>
						</FormControl>
						{props.desc && <FormDescription>{props.desc}</FormDescription>}
						<FormMessage />
					</FormItem>
				)
			}}
		/>
	)
}

interface LinkProps {
    label: string
    onClick: () => void
    fontSize?: CSSProperties['fontSize']
    weight?: CSSProperties['fontWeight']
}

export function LinkButton({...props}: LinkProps): ReactNode {
    return (
        <p
            onClick={props.onClick}
            style={{
                fontSize: props.fontSize,
                fontWeight: props.weight || 500,
                cursor: 'pointer',
            }}
            className={'hover:underline'}
        >
            {props.label}
        </p>
    )
}

