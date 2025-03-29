import { cn } from '@sglara/cn'
import { LucideProps } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type ClickableVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'icon'
type Icon = React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
export type Icons = { icon: Icon, name: string, class?: HTMLElement['className']}[]
interface ClickableProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ClickableVariant
	label?: string
	icons?: Icons
	side?: 'left' | 'right'
}

export default function Clickable({ ...props }: ClickableProps): React.ReactNode {
	const { variant, label, side, className, icons, ...rest } = props
	const icon_only: boolean = !label && Boolean(icons)
	const variantClass = `${icon_only ? 'icon' : variant ?? 'default'}-clickable`
	const [iconSize, setIconSize] = useState<number | undefined>(undefined)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const button = ref.current
		if (!button) return

		function updateSize() {
			if (button) setIconSize(Math.max(button.offsetHeight, 0))
		}

		updateSize()

		const observer = new ResizeObserver(updateSize)
		observer.observe(button)

		return () => observer.disconnect()
	}, [])

	function RenderIcons({size}: {size?: number}): React.ReactNode {
		return (
			<>
				{icons?.map((ico) => (
					<ico.icon key={ico.name} size={size} className={ico.class}/>
				))}
			</>
		)
	}

	return (
		<button
			className={cn(variantClass, className)}
			{...rest}
		>
			<div ref={ref} className={`hstack bg-transparent size-full gap-1`}>
				{icons && side !== 'right' && <RenderIcons size={iconSize}/>}
				{label}
				{icons && side === 'right' && <RenderIcons size={iconSize}/>}
			</div>
		</button>
	)
}
