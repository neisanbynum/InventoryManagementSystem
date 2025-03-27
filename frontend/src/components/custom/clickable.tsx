import { cn } from '@/lib/utils'
import { CSSProperties, ReactNode } from 'react'

type Variant = 'destructive' | 'secondary' | 'outline' | 'ghost'
type ClassName = React.HTMLAttributes<HTMLDivElement>['className']
type Variants = {
	[key in Variant]: ClassName
}

interface ClickableProps {
	type?: HTMLButtonElement['type']
	label: string
	onClick?: () => void
	variant?: Variant
	className?: ClassName
	style?: CSSProperties
	disabled?: boolean
}

export function Clickable({ ...props }: ClickableProps): ReactNode {
	const style: ClassName = Object.values({
		text: 'text-center text-primary-foreground',
		border: 'rounded-[0.5rem] box-border shadow hover:shadow-md active:shadow-sm focus:outline-none',
		spacing: 'padding-[0.4rem 1rem]',
		color: 'bg-primary disabled:opacity-50',
		action: 'touch-manipulation select-none cursor-pointer disabled:cursor-default'
	}).join(' ')
	const variants: Variants = {
		destructive: 'bg-destructive',
		outline: 'bg-background border-primary',
		secondary: 'bg-secondary text-secondary-foreground',
		ghost: 'bg-transparent text-foreground shadow-none hover:shadow-none active:shadow-none focus:shadow-none'
	}

	return (
		<button
			type={props.type || 'button'}
			className={cn(style, props.variant ? variants[props.variant] : '', props.className)}
			style={{ ...props.style }}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.label}
		</button>
	)
}

interface TextLinkProps {
	label: string
	onClick?: () => void
	size?: CSSProperties['fontSize']
	weight?: CSSProperties['fontWeight']
	className?: ClassName
	style?: CSSProperties
}

export function TextLink({ ...props }: TextLinkProps): ReactNode {
	const style: ClassName = 'font-medium cursor-pointer hover:underline'

    function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>): void {
        if (e.key === 'Enter' && props.onClick) props.onClick()
    }

	return (
		<span
            role='button'
            tabIndex={0}
			className={cn(style, props.className)}
			style={{ fontSize: props.size, fontWeight: props.weight, ...props.style }}
			onClick={props.onClick}
            onKeyDown={handleKeyDown}
		>
			{props.label}
		</span>
	)
}
