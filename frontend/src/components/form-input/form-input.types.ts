import { HTMLInputTypeAttribute } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";


export interface FormInputProps {
	name: string
	className?: HTMLInputElement['className']
	label?: string
	labelClassName?: HTMLLabelElement['className']
	placeholder?: string
	desc?: string
	descClassName?: HTMLParagraphElement['className']
	messageClassName?: HTMLParagraphElement['className']
	pwdHint?: boolean
	pwdHintClassName?: HTMLParagraphElement['className']
	required?: boolean
	disabled?: boolean
	type?: HTMLInputTypeAttribute
}

export interface RenderInputProps extends FormInputProps {
	field: ControllerRenderProps<FieldValues, string>
}