/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from 'react'
import TableFilter from './components/table.filter'
import { useData } from './table.utils'
import useComputedDimensions from '@/utils/helpers/useComputedDimensions'
import convertMeasurement from '@/utils/helpers/convertMeasurement'
import TableHead from './components/table.head'
import TablePagination from './components/table.pagination'
import TableBody from './components/table.body'
import { DataTableProps } from './table.types'
import { cn } from '@sglara/cn'



export default function Table<T extends Record<string, any>>({
	className,
	columns,
	data,
	width = '100%',
	height,
	minColWidth = '125px',
	displayedRows = 10,
	rowHeight = '35px',
	filter = false
}: DataTableProps<T>): React.ReactNode {
	const computedData = useData(data, displayedRows)

	const component = useComputedDimensions<HTMLDivElement>()
	const filterer = useComputedDimensions<HTMLDivElement>()
	const paginater = useComputedDimensions<HTMLDivElement>()
	const [tableHeight, setTableHeight] = useState<number | undefined>()
	useLayoutEffect(() => {
		if (height) setTableHeight(convertMeasurement(height) - filterer.height - paginater.height)
	}, [filterer.height, height, paginater.height])

	return (
		<div ref={component.ref} className={'flex flex-col'} style={{ width, height, maxHeight: height }}>
			<TableFilter ref={filterer.ref} show={filter} setFilter={computedData.setFilter} className='mb-2' />
			<div
				role='table'
				id='Data-Table'
				className={cn('flex flex-col w-full overflow-clipped overflow-y-auto hidden-scroll border rounded-xl bg-card', className)}
				style={{ height: tableHeight, maxHeight: tableHeight }}
			>
				<TableHead
					columns={columns}
					width={component.width}
					computedData={computedData}
					minColWidth={minColWidth}
				/>
				<TableBody
					width={component.width}
					columns={columns}
					page={computedData.page}
					rowHeight={rowHeight}
					minColWidth={minColWidth}
				/>
			</div>
			<TablePagination ref={paginater.ref} computedData={computedData} className='mt-2' />
		</div>
	)
}
