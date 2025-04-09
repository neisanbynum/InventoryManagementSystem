/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateGridTemplate } from '../table.utils'
import { cn } from '@sglara/cn'
import { TableBodyProps } from '../table.types'

export default function TableBody<T extends Record<string, any>>({
	page,
	columns,
	rowHeight,
	minColWidth,
	width
}: TableBodyProps<T>): React.ReactNode {
	if (page.length === 0) {
		return (
			<div className='flex size-full justify-center items-center'>
				<p className='text-xl font-semibold'>No Data</p>
			</div>
		)
	}

	return (
		<div
			role={'rowgroup'}
			id='Data-Table-Body'
			className='flex flex-col w-full h-fit justify-center items-center gap-0'
			style={{ width, maxWidth: width }}
		>
			{page.map((row, ri) => (
				<div
					key={`Data-Row-${ri}`}
					role={'row'}
					className={cn(ri % 2 !== 0 && 'bg-slate-50 dark:bg-slate-800')}
					style={{
						width,
						maxWidth: width,
						display: 'grid',
						gridTemplateRows: rowHeight,
						gridTemplateColumns: generateGridTemplate(columns, minColWidth)
					}}
				>
					{columns?.map((col, ci) => {
						const cellValue = col.value ? col.value(row) : row[col.accessorKey]
						const renderedCell = col.renderCell ? col.renderCell(cellValue, row) : cellValue
						return (
							<div
								key={`Data-Cell-${ri}-${ci}`}
								role={'cell'}
								className='flex size-full justify-start items-center text-sm px-2 py-1 border'
								style={{ gridRow: 1, gridColumn: ci + 1, justifyContent: col.align }}
							>
								{renderedCell}
							</div>
						);
					})}
				</div>
			))}
		</div>
	)
}
