
import { cn } from '@sglara/cn'
import { LucideProps } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type ClickableVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
interface ClickableProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ClickableVariant
	label?: string
	icon?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
	side?: 'left' | 'right'
}

export default function Clickable({ ...props }: ClickableProps): React.ReactNode {
	const { variant, label, side, className, ...rest } = props
	const variantClass = `${variant ?? 'default'}-clickable`
	const iconClass: HTMLButtonElement['className'] = props.icon && !label ? 'p-3' : ''
	const [size, setSize] = useState<number | undefined>(undefined)
	const ref = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		const button = ref.current
		if (!button) return

		function updateSize() {
			if (button) setSize(Math.max(button.offsetHeight / 2, 0))
		}

		updateSize()

		const observer = new ResizeObserver(updateSize)
		observer.observe(button)

		return () => observer.disconnect()
	}, [])

	return (
		<button
			ref={ref}
			className={cn(variantClass, iconClass, className)}
			{...rest}
		>
			<div className={`hstack bg-transparent size-full gap-1`}>
				{props.icon && side !== 'right' && (
					<props.icon
						size={size}
						style={{ padding: 0, margin: 0 }}
					/>
				)}
				{label}
				{props.icon && side === 'right' && (
					<props.icon
						size={size}
						style={{ padding: 0, margin: 0 }}
					/>
				)}
			</div>
		</button>
	)
}
