import { FieldValues, useFormContext, UseFormReturn } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useState } from 'react'
import { Input } from '../ui/input'
import { cn } from '@sglara/cn'
import { FormInputProps, RenderInputProps } from './form-input.types'

export default function FormInput({ ...props }: FormInputProps): React.ReactElement {
	const { name } = props
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { control }: UseFormReturn<FieldValues, any, undefined> = useFormContext()

	return <FormField control={control} name={name} render={({ field }) => <RenderInput field={field} {...props} />} />
}

function RenderInput({ ...props }: RenderInputProps): React.ReactElement {
	const pwd: boolean = props.type === 'password'
	const pwdHint: boolean = pwd && props.pwdHint !== false
	const [type, setType] = useState<typeof props.type>(props.type)

	function handleDoubleClick(e: React.MouseEvent<HTMLInputElement>): void {
		e.preventDefault()
		if (pwd) {
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
		<FormItem className={cn('w-full', props.className)}>
			{props.label && <FormLabel className={props.labelClassName}>{props.label}</FormLabel>}
			<FormControl>
				<Input
					aria-label={props.label}
					aria-describedby={props.desc ? `${props.name}-desc` : undefined}
					type={type}
					required={props.required}
					aria-required={props.required}
					disabled={props.disabled}
					aria-disabled={props.disabled}
					placeholder={pwd ? 'Double-Click to Toggle Visibility' : props.placeholder}
					// autoComplete={pwd ? 'new-password' : undefined}
					onDoubleClick={handleDoubleClick}

					{...props.field}
				/>
			</FormControl>
			{props.desc && <FormDescription className={props.descClassName}>{props.desc}</FormDescription>}
			<FormMessage className={cn('text-xs', props.messageClassName)} />
			{pwdHint && props.field.value && (
				<p className={cn('text-xs', props.pwdHintClassName)}>Double-Click to Toggle Visibility</p>
			)}
		</FormItem>
	)
}
