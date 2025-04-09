import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@sglara/cn'
import { TableFilterProps } from '../table.types'

export default function TableFilter({
	setFilter,
	className,
	show,
	ref,
	inputWidth
}: TableFilterProps): React.ReactNode {
	if (!show) return null

	return (
		<div ref={ref} className={cn('flex h-fit items-center gap-2', className)}>
			<Label className='text-md'>Filter:</Label>
			<Input
				type='text'
				id='filter'
				onChange={(e) => setFilter(e.target.value)}
				style={{ width: inputWidth || 150, height: '2rem' }}
			/>
		</div>
	)
}
