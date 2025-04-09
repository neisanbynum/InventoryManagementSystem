/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateGridTemplate } from '../table.utils'
import SortIcon from './table.header-sort-icon'
import React from 'react'
import { TableHeadProps } from '../table.types'

export default function TableHead<T extends Record<string, any>>({
	columns,
	width,
	minColWidth,
	computedData
}: TableHeadProps<T>): React.ReactElement {
	return (
		<div
			role='rowgroup'
			id='Data-Table-Head'
			className='sticky top-0 right-0 flex flex-col w-full h-[50px] min-h-[50px] justify-center items-center gap-0 bg-slate-100 dark:bg-slate-950'
			style={{ width, maxWidth: width }}
		>
			<div
				role={'row'}
				id='Data-Table-Head-Row'
				style={{
					width,
					maxWidth: width,
					height: '100%',
					display: 'grid',
					gridTemplateRows: '100%',
					gridTemplateColumns: generateGridTemplate(columns, minColWidth)
				}}
			>
				{columns?.map((col, i) => (
					<div
						key={i}
						role={'columnheader'}
						className={
							'flex size-full justify-between items-center text-xs font-semibold px-2 py-1 border bg-slate-100 dark:bg-slate-950'
						}
						style={{ gridRow: 1, gridColumn: i + 1 }}
						onClick={() =>{
							if (col.sortable !== false) computedData.setSort({
								accessorKey: col.accessorKey,
								sort:
									computedData.sort?.accessorKey === col.accessorKey &&
									computedData.sort.sort === 'asc'
										? 'desc'
										: 'asc'
							})
						}}
					>
						<p>{col.header}</p>
						<SortIcon col={col} useDataValues={computedData} />
					</div>
				))}
			</div>
		</div>
	)
}
