import { cn } from '@sglara/cn'
import { ClickableBodyProps, ClickableProps, ClickableVariant } from './clickable.types'
import { isIconOnly, useElementSize, useIconsBySide } from './clickable.utils'
import Spinner from '../custom/spinner'

const variantMap: Record<ClickableVariant, string> = {
	default: 'default-clickable',
	destructive: 'destructive-clickable',
	outline: 'outline-clickable',
	secondary: 'secondary-clickable',
	ghost: 'ghost-clickable',
	icon: 'icon-clickable'
}

export default function Clickable({ ...props }: ClickableProps) {
	const { variant, label, className, icons, isLoading, disabled, ...rest } = props

	// Variant Class
	const iconOnly = isIconOnly({ label, icons })
	const variantClass = cn(iconOnly ? 'icon-clickable' : variantMap[variant ?? 'default'])

	// Adaptive Icon Resizing
	const [bodyRef, bodySize] = useElementSize()

	return (
		<button
			className={cn(variantClass, className)}
			disabled={disabled || isLoading}
			aria-busy={isLoading}
			{...rest}
		>
			<div ref={bodyRef} className={'hstack bg-transparent size-full gap-1'}>
				{isLoading ? (
					<Spinner size={bodySize} />
				) : (
					<ClickableBody label={label} icons={icons} size={bodySize} />
				)}
			</div>
		</button>
	)
}

function ClickableBody({ label, icons, size }: ClickableBodyProps): React.ReactNode {
	const LeftIcons = useIconsBySide({ icons, side: 'left', size })
	const RightIcons = useIconsBySide({ icons, side: 'right', size })

	return (
		<>
			{LeftIcons}
			{label}
			{RightIcons}
		</>
	)
}