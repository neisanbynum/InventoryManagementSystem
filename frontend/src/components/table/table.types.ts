/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ColumnDef<T extends Record<string, any>> {
	accessorKey: keyof T
	header: string
	width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
	align?: 'left' | 'center' | 'right'
	sortable?: boolean
    value?: (row: T) => any
	renderCell?: (value: T[keyof T], row: T) => React.ReactNode
}

export type Columns<T extends Record<string, any>> = ColumnDef<T>[]

export interface DataTableProps<T extends Record<string, any>> {
	className?: React.HTMLAttributes<HTMLDivElement>['className']
	columns?: Columns<T>
	data: T[]
	displayedRows?: number
	rowHeight?: React.CSSProperties['height']
	filter?: boolean
	height?: React.CSSProperties['height']
	width?: React.CSSProperties['width']
	minColWidth?: React.CSSProperties['width']
}

export interface useDataValues<T extends Record<string, any>> {
	ranges: { start: number; end: number }[]
    currRange: number
	sort?: { accessorKey: keyof T; sort: 'asc' | 'desc' }
	rowsPerPage: number
	start: boolean
	end: boolean
	page: T[]
	rowsPerPageOptions: [number, number, number, number, number]
	setFilter: React.Dispatch<React.SetStateAction<string>>
	setSort: React.Dispatch<React.SetStateAction<{ accessorKey: keyof T; sort: 'asc' | 'desc' } | undefined>>
	setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
	firstPage: () => void
	prevPage: () => void
	nextPage: () => void
	lastPage: () => void
}

export interface useTableRangeInit<T extends Record<string, any>> {
	data: T[]
	rowQty?: number
}

export interface useTableRangeValues<T extends Record<string, any>> {
	page: T[]
	ranges: { start: number; end: number }[]
    currRange: number
	rowsPerPage: number
	rowsPerPageOptions: [number, number, number, number, number]
	start: boolean
	end: boolean
	firstPage: () => void
	prevPage: () => void
	nextPage: () => void
	lastPage: () => void
	setUsedData: React.Dispatch<React.SetStateAction<T[]>>
	setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
}

export interface TableBodyProps<T extends Record<string, any>> {
	columns?: Columns<T>
	page: T[]
	rowHeight?: React.CSSProperties['height']
	minColWidth?: React.CSSProperties['width']
	width?: React.CSSProperties['width']
}

export interface TableFilterProps {
	setFilter: React.Dispatch<React.SetStateAction<string>>
	className?: React.HTMLAttributes<HTMLDivElement>['className']
	show?: boolean
	ref?: React.RefObject<HTMLDivElement | null> | ((node: HTMLDivElement | null) => void)
    inputWidth?: React.CSSProperties['width']
}

export interface TableHeadProps<T extends Record<string, any>> {
	columns?: Columns<T>
	width?: React.CSSProperties['width']
	minColWidth?: React.CSSProperties['width']
	computedData: useDataValues<T>
}

export interface SortIconProps<T extends Record<string, any>> {
    useDataValues: useDataValues<T>
    col: ColumnDef<T>
}

export interface TablePaginationProps<T extends Record<string, any>> {
	ref?: React.RefObject<HTMLDivElement | null> | ((node: HTMLDivElement | null) => void)
	className?: React.HTMLAttributes<HTMLDivElement>['className']
	computedData: useDataValues<T>
}