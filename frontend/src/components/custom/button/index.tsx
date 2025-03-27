import { CSSProperties, ReactNode } from 'react'
import './styles.css'
import { Dimensions } from '../../custom.types'

type Varient = 'default' | 'destructive' | 'secondary' | 'outline' | 'ghost'

interface ClickProps extends Dimensions {
	type?: HTMLButtonElement['type']
	label: string
	onClick?: () => void
	varient?: Varient
	className?: HTMLElement['className']
	style?: CSSProperties
	disabled?: boolean
}

export function Clickable({ ...props }: ClickProps): ReactNode {
	return (
		<button
			type={props.type || 'button'}
			className={`clickable ${props.varient || 'default'} ${props.className}`.trim()}
			onClick={props.onClick}
			style={{
				minWidth: props.minWidth,
				width: props.width,
				maxWidth: props.maxWidth,
				minHeight: props.minHeight,
				height: props.height,
				maxHeight: props.maxHeight,
				...props.style
			}}
			disabled={props.disabled || false}
		>
			{props.label}
		</button>
	)
}

interface LinkProps {
	label: string
	onClick: () => void
	fontSize?: CSSProperties['fontSize']
	weight?: CSSProperties['fontWeight']
}

export function TextLink({ ...props }: LinkProps): ReactNode {
	return (
		<p
			onClick={props.onClick}
			className={`link-button ${props.weight && `font-[${props.weight}]`} ${
				props.fontSize && `text-[${props.fontSize}]`
			}`.trim()}
		>
			{props.label}
		</p>
	)
}
