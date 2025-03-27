import { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ClassName = React.HTMLAttributes<HTMLDivElement>['className']
interface StackProps {
	children?: ReactNode
	className?: ClassName
	style?: CSSProperties
}

export function HStack({ ...props }: StackProps): ReactNode {
	const style: ClassName = 'flex flex-row w-full h-fit justify-center items-center gap-4'
	return (
		<div
			className={cn(style, props.className)}
			style={props.style}
		>
			{props.children}
		</div>
	)
}

export function VStack({ ...props }: StackProps): ReactNode {
	const style: ClassName = 'flex flex-col w-full h-full justify-center items-center gap-4'
	return (
		<div
			className={cn(style, props.className)}
			style={props.style}
		>
			{props.children}
		</div>
	)
}
