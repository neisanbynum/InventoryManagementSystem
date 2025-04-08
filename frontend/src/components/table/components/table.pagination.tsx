/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@sglara/cn'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Clickable from '@/components/clickable'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { TablePaginationProps } from '../table.types'

export default function TablePagination<T extends Record<string, any>>({
	ref,
	className,
	computedData
}: TablePaginationProps<T>): React.ReactNode {
	return (
		<div
			ref={ref}
			id='Data-Table-Pagination'
			className={cn('flex w-full h-fit justify-between items-center gap-4', className)}
		>
			<div className='flex flex-col w-fit h-fit justify-center items-center gap-1'>
				<p className='text-sm font-semibold'>Rows Displayed: </p>
				<Select onValueChange={(val) => computedData.setRowsPerPage(Number(val))}>
					<SelectTrigger className='w-28 h-8 border rounded-sm shadow hover:shadow-xl bg-slate-50 dark:bg-slate-800'>
						<SelectValue defaultValue={computedData.rowsPerPage} placeholder={computedData.rowsPerPage} />
					</SelectTrigger>
					<SelectContent>
						{computedData.rowsPerPageOptions.map((opt, i) => (
							<SelectItem key={`Displayed-Row-Option-${i}`} value={`${opt}`}>
								{opt}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className='flex flex-col w-fit h-fit justify-center items-center gap-1'>
				<p className='text-sm font-semibold'>
					{`Page ${computedData.page.length !== 0 ? computedData.currRange + 1 : 0} of ${
						computedData.ranges.length
					}`}
				</p>
				<div className='flex w-fit h-fit justify-center items-center gap-2'>
					<Clickable
						className='border rounded-sm enabled:shadow enabled:hover:shadow-xl bg-slate-50 dark:bg-slate-800'
						icons={[{ icon: ChevronsLeft, name: 'First-Page' }]}
						disabled={computedData.start}
						onClick={() => computedData.firstPage()}
					/>
					<Clickable
						className='border rounded-sm enabled:shadow enabled:hover:shadow-xl bg-slate-50 dark:bg-slate-800'
						icons={[{ icon: ChevronLeft, name: 'Prev-Page' }]}
						disabled={computedData.start}
						onClick={() => computedData.prevPage()}
					/>
					<Clickable
						className='border rounded-sm enabled:shadow enabled:hover:shadow-xl bg-slate-50 dark:bg-slate-800'
						icons={[{ icon: ChevronRight, name: 'Prev-Page' }]}
						disabled={computedData.end}
						onClick={() => computedData.nextPage()}
					/>
					<Clickable
						className='border rounded-sm enabled:shadow enabled:hover:shadow-xl bg-slate-50 dark:bg-slate-800'
						icons={[{ icon: ChevronsRight, name: 'Last-Page' }]}
						disabled={computedData.end}
						onClick={() => computedData.lastPage()}
					/>
				</div>
			</div>
		</div>
	)
}
