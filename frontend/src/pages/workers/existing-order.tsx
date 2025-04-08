import { Card } from '@/components/ui/card'
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
	Table as TableType,
	ColumnDef
} from '@tanstack/react-table'
import { ExistingOrderColumns } from './existing-order.config'
import DataTablePagination from '@/components/data-table/table-pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ExistingOrder } from './existing-order.types'

export default function ExistingOrderTable(): React.ReactElement {
	const table = useReactTable({
		data: [],
		columns: ExistingOrderColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	})

	return (
		<div className='vstack gap-2'>
			<Card className='w-full h-full shadow-md md:shadow-lg p-0'>
				<Table>
					<ExistingOrderTableHeader table={table} />
                    <ExistingOrderTableBody table={table} columns={ExistingOrderColumns}/>
				</Table>
			</Card>
			<DataTablePagination table={table} />
		</div>
	)
}

function ExistingOrderTableHeader({ table }: { table: TableType<ExistingOrder> }) {
	return (
		<TableHeader>
			{table.getHeaderGroups().map((headerGroup) => (
				<TableRow key={headerGroup.id}>
					{headerGroup.headers.map((header) => (
						<TableHead key={header.id}>
							{header.isPlaceholder
								? null
								: flexRender(header.column.columnDef.header, header.getContext())}
						</TableHead>
					))}
				</TableRow>
			))}
		</TableHeader>
	)
}

interface TableBodyPlaceholderProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	columns: ColumnDef<ExistingOrder, any>[]
}

interface TableBodyProps extends TableBodyPlaceholderProps {
	table: TableType<ExistingOrder>
}

function ExistingOrderTableBody({ table, columns }: TableBodyProps) {
	return (
		<TableBody>
			{table.getRowModel().rows?.length ? (
				table.getRowModel().rows.map((row) => (
					<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
						{row.getVisibleCells().map((cell) => (
							<TableCell key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						))}
					</TableRow>
				))
			) : (
				<ExistingOrderTablePlaceholder columns={columns} />
			)}
		</TableBody>
	)
}

function ExistingOrderTablePlaceholder({ columns }: TableBodyPlaceholderProps) {
	return (
		<TableRow>
			<TableCell colSpan={columns.length} className='h-24 text-center'>
				No Results
			</TableCell>
		</TableRow>
	)
}
