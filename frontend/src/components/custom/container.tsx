import { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ClassName = React.HTMLAttributes<HTMLDivElement>['className']
interface StackProps {
	children?: ReactNode
	className?: ClassName
	style?: CSSProperties
}

export function HStack({ children, className, style }: StackProps): ReactNode {
	return (
		<div
			className={cn('flex flex-row w-full h-fit justify-center items-center', className)}
			style={style}
		>
			{children}
		</div>
	)
}

export function VStack({ children, className, style }: StackProps): ReactNode {
	return (
		<div
			className={cn('flex flex-col w-full h-full justify-center items-center', className)}
			style={style}
		>
			{children}
		</div>
	)
}
