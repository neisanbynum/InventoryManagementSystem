/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpAZ, ArrowDownZA } from 'lucide-react'
import { SortIconProps } from '../table.types'

export default function SortIcon<T extends Record<string, any>>({
	col,
	useDataValues
}: SortIconProps<T>): React.ReactNode {
	return useDataValues.sort?.accessorKey === col.accessorKey ? (
		useDataValues.sort.sort === 'asc' ? (
			<ArrowUpAZ size={18} />
		) : (
			<ArrowDownZA size={18} />
		)
	) : null
}
