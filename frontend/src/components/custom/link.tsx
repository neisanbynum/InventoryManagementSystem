import { cn } from '@sglara/cn'

interface LinkProps {
	label: string
	onClick?: () => void
	size?: React.CSSProperties['fontSize']
	weight?: React.CSSProperties['fontWeight']
	className?: HTMLLinkElement['className']
	style?: React.CSSProperties
}

export default function Link({ ...props }: LinkProps): React.ReactNode {
	const { label, onClick, size, weight, className, style } = props
	function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>): void {
		if (e.key === 'Enter' && onClick) onClick()
	}

	return (
		<span
			role='button'
			tabIndex={0}
			className={cn('link', className)}
			style={{ fontSize: size, fontWeight: weight, ...style }}
			onClick={onClick}
			onKeyDown={handleKeyDown}
		>
			{label}
		</span>
	)
}
