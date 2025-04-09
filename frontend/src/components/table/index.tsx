/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useLayoutEffect, useState } from 'react'
import { ColumnDef, Columns } from './table.types'
import { cn } from '@sglara/cn'
import { useTableContext } from './utils/useTableContext'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, ArrowUpAZ, ArrowDownZA, ArrowUp, ArrowDown } from 'lucide-react'
import Clickable from '../clickable'
import { convertMeasurement, useComputedDimensions } from '@/utils/dom-tools'
import TableProvider from './table.context'
import { useDebouncedCallback } from 'use-debounce'

interface TableProps<T extends Record<string, any>> {
	className?: React.HTMLAttributes<HTMLDivElement>['className']
	columns?: Columns<T>
	data: T[]
	width?: React.CSSProperties['width']
	height?: React.CSSProperties['height']
	minColWidth?: React.CSSProperties['width']
	initRowsPerPage?: number
	rowHeight?: React.CSSProperties['height']
	filter?: boolean
}

export default function Table<T extends Record<string, any>>({
	className,
	columns,
	data,
	width = '100%',
	height,
	minColWidth = '100px',
	initRowsPerPage,
	rowHeight = '35px',
	filter
}: TableProps<T>): React.ReactElement {
	return (
		<TableProvider columns={columns} data={data} initRowsPerPage={initRowsPerPage} minColWidth={minColWidth}>
			<TableWrapper className={className} width={width} height={height} rowHeight={rowHeight} filter={filter} />
		</TableProvider>
	)
}

type TableWrapperProps<T extends Record<string, any>> = Omit<
	TableProps<T>,
	'data' | 'columns' | 'initRowsPerPage' | 'minColWidth'
>

function TableWrapper<T extends Record<string, any>>({
	className,
	width,
	height,
	rowHeight,
	filter
}: TableWrapperProps<T>): React.ReactElement {
	const component = useComputedDimensions<HTMLDivElement>()
	const filterer = useComputedDimensions<HTMLDivElement>()
	const paginater = useComputedDimensions<HTMLDivElement>()

	const [tableHeight, setTableHeight] = useState<number | undefined>()

	useLayoutEffect(() => {
		if (height) setTableHeight(convertMeasurement(height) - filterer.height - paginater.height)
	}, [filterer.height, height, paginater.height])

	return (
		<div ref={component.ref} className={'flex flex-col'} style={{ width, height, maxHeight: height }}>
			<Filter ref={filterer.ref} show={filter} className='mb-2' />
			<div
				role='table'
				id='Data-Table'
				className={cn(
					'flex flex-col w-full overflow-clipped overflow-y-auto hidden-scroll border rounded-xl bg-card',
					className
				)}
				style={{ height: tableHeight, maxHeight: tableHeight }}
			>
				<Head width={width} />
				<Body width={width} rowHeight={rowHeight} />
			</div>
			<Pagination ref={paginater.ref} className='mt-2' />
		</div>
	)
}

interface FilterProps {
	className?: React.HTMLAttributes<HTMLDivElement>['className']
	show?: boolean
	ref?: React.RefObject<HTMLDivElement | null> | ((node: HTMLDivElement | null) => void)
	inputWidth?: React.CSSProperties['width']
}

function Filter({ className, show, ref, inputWidth }: FilterProps): React.ReactNode {
	const { setFilter } = useTableContext()
	const [input, setInput] = useState('') // local state for immediate input tracking

	const debouncedSetFilter = useDebouncedCallback((value: string) => {
		setFilter(value)
	}, 300) // 300ms debounce delay

	if (!show) return null

	return (
		<div ref={ref} className={cn('flex h-fit items-center gap-2', className)}>
			<Label className='text-md'>Filter:</Label>
			<Input
				type='text'
				id='filter'
				value={input}
				onChange={(e) => {
					const value = e.target.value
					setInput(value)
					debouncedSetFilter(value)
				}}
				style={{ width: inputWidth || 150, height: '2rem' }}
			/>
		</div>
	)
}

interface SortIconProps<T extends Record<string, any>> {
	col: ColumnDef<T>
}

function SortIcon<T extends Record<string, any>>({ col }: SortIconProps<T>): React.ReactNode {
	const { sort } = useTableContext()

	return sort?.accessorKey === col.accessorKey ? (
		sort.sort === 'asc' ? (
			<ArrowUpAZ size={12} />
		) : (
			<ArrowDownZA size={12} />
		)
	) : null
}

type HeadProps<T extends Record<string, any>> = Pick<TableProps<T>, 'width'>

function Head<T extends Record<string, any>>({ width }: HeadProps<T>): React.ReactElement {
	const { gridTemplateColumns, columns, setSort, sort } = useTableContext()

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
					gridTemplateColumns
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
						onClick={() => {
							if (col.sortable !== false)
								setSort({
									accessorKey: col.accessorKey,
									sort: sort?.accessorKey === col.accessorKey && sort.sort === 'asc' ? 'desc' : 'asc'
								})
						}}
					>
						<p>{col.header}</p>
						<SortIcon col={col} />
					</div>
				))}
			</div>
		</div>
	)
}

type BodyProps<T extends Record<string, any>> = Pick<TableProps<T>, 'width' | 'rowHeight'>

function Body<T extends Record<string, any>>({ width, rowHeight }: BodyProps<T>): React.ReactElement {
	const { page, filter, gridTemplateColumns, columns } = useTableContext()

	if (page.length === 0) {
		return (
			<div className='flex size-full justify-center items-center'>
				<p className='text-xl font-semibold'>{filter ? 'No Results' : 'No Data'}</p>
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
						gridTemplateColumns
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
						)
					})}
				</div>
			))}
		</div>
	)
}

type PaginationProps = Omit<FilterProps, 'show' | 'inputWidth'>

function Pagination({ className, ref }: PaginationProps): React.ReactElement {
	const {
		rowsPerPage,
		setRowsPerPage,
		rowsPerPageOptions,
		page,
		currRange,
		ranges,
		start,
		firstPage,
		prevPage,
		end,
		nextPage,
		lastPage
	} = useTableContext()

	return (
		<div
			ref={ref}
			id='Data-Table-Pagination'
			className={cn('flex w-full h-fit justify-between items-center gap-4', className)}
		>
			<div className='flex flex-col w-fit h-fit justify-center items-center gap-1'>
				<p className='text-sm font-semibold'>Rows Displayed: </p>
				<Select onValueChange={(val) => setRowsPerPage(Number(val))}>
					<SelectTrigger className='w-28 h-8 border rounded-sm shadow hover:shadow-xl bg-slate-50 dark:bg-slate-800'>
						<SelectValue defaultValue={rowsPerPage} placeholder={rowsPerPage} />
					</SelectTrigger>
					<SelectContent>
						{rowsPerPageOptions.map((opt, i) => (
							<SelectItem key={`Displayed-Row-Option-${i}`} value={`${opt}`}>
								{opt}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className='flex flex-col w-fit h-fit justify-center items-center gap-1'>
				<p className='text-sm font-semibold'>
					{`Page ${page.length !== 0 ? currRange + 1 : 0} of ${ranges.length}`}
				</p>
				<div className='flex w-fit h-fit justify-center items-center gap-2'>
					<Clickable
						className='border rounded-sm enabled:shadow enabled:hover:shadow-xl bg-slate-50 dark:bg-slate-800'
						icons={[{ icon: ChevronsLeft, name: 'First-Page' }]}
						disabled={start}
						onClick={() => firstPage()}
					/>
					<Clickable
						className='border rounded-sm enabled:shadow enabled:hover:shadow-xl bg-slate-50 dark:bg-slate-800'
						icons={[{ icon: ChevronLeft, name: 'Prev-Page' }]}
						disabled={start}
						onClick={() => prevPage()}
					/>
					<Clickable
						className='border rounded-sm enabled:shadow enabled:hover:shadow-xl bg-slate-50 dark:bg-slate-800'
						icons={[{ icon: ChevronRight, name: 'Next-Page' }]}
						disabled={end}
						onClick={() => nextPage()}
					/>
					<Clickable
						className='border rounded-sm enabled:shadow enabled:hover:shadow-xl bg-slate-50 dark:bg-slate-800'
						icons={[{ icon: ChevronsRight, name: 'Last-Page' }]}
						disabled={end}
						onClick={() => lastPage()}
					/>
				</div>
			</div>
		</div>
	)
}
