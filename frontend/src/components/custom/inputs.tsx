import { CSSProperties, HTMLInputTypeAttribute, ReactNode, useState } from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { FieldValues, useFormContext, UseFormReturn } from 'react-hook-form'
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
    passwordHint?: boolean
}

export function FormInput({ ...props }: InputProps): ReactNode {
    const password: boolean = props.type === 'password'
    const passwordHint: boolean = props.passwordHint === undefined && password ? true : Boolean(props.passwordHint)
	const showHint: boolean = password && passwordHint
    const [type, setType] = useState<typeof props.type>(props.type)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const form: UseFormReturn<FieldValues, any, undefined> = useFormContext()

    function handleDoubleClick(e: React.MouseEvent<HTMLInputElement>): void {
        e.preventDefault()
        if (password) {
            setType(type === 'password' ? 'text' : 'password')
            moveCaret(e.currentTarget)
        }
    }

    function moveCaret(target: HTMLInputElement): void {
        const length = target.value.length
        requestAnimationFrame(() => {
            target.setSelectionRange(length, length)
        })
    }

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
								type={type}
                                onDoubleClick={handleDoubleClick}
								disabled={props.disabled}
								required={props.required ? props.required : true}
								placeholder={password ? 'Double-Click to Toggle Visibility' : props.placeholder}
								{...field}
							/>
						</FormControl>
						{props.desc && <FormDescription>{props.desc}</FormDescription>}
						<FormMessage className='text-xs' />
						{showHint && field.value && <p style={{fontSize: '0.6rem'}}>Double-Click to Toggle Visibility</p>}
					</FormItem>
				)
			}}
		/>
	)
}



