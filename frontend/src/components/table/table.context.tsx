/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useEffect } from "react"
import { Columns } from "./table.types"
import { TableSort, TableContext } from "./utils/useTableContext"
import useTableRange from "./utils/useTableRange"


export interface TableProviderProps<T extends Record<string, any>> {
    children?: React.ReactNode
	columns?: Columns<T>
	data: T[]
	initRowsPerPage?: number
	minColWidth?: React.CSSProperties['width']
}

export default function TableProvider<T extends Record<string, any>>({
    children,
	columns,
	data,
	initRowsPerPage,
	minColWidth
}: TableProviderProps<T>): React.ReactElement {
	const [filter, setFilter] = useState<string>('')
    const [sort, setSort] = useState<TableSort<T> | undefined>()

    const gridTemplateColumns: React.CSSProperties['gridTemplateColumns'] = useMemo(() => {
        return columns?.map((col) => `minmax(${minColWidth || '100px'}, ${col.width ?? 1}fr)`).join(' ')
    }, [columns, minColWidth])

    const filtered: T[] = useMemo(() => {
		const filteredData = data.filter((row) =>
			Object.values(row).some((val) => {
				if (val instanceof Date) return val.toLocaleString().startsWith(String(filter))
				return String(val).toLowerCase().startsWith(String(filter).toLowerCase())
			})
		)
		return filteredData
	}, [data, filter])

	const sorted: T[] = useMemo(() => {
		if (!sort) return filtered
		return [...filtered].sort((a, b) => {
			const valA = a[sort.accessorKey]
			const valB = b[sort.accessorKey]
			if (typeof valA === 'number' && typeof valB === 'number') {
				return sort.sort === 'asc' ? valA - valB : valB - valA
			}
			return sort.sort === 'asc'
				? String(valA).localeCompare(String(valB))
				: String(valB).localeCompare(String(valA))
		})
	}, [filtered, sort])

	const {
		page,
		ranges,
        currRange,
		rowsPerPage,
		rowsPerPageOptions,
		start,
		end,
		firstPage,
		prevPage,
		nextPage,
		lastPage,
		setUsedData,
		setRowsPerPage
	} = useTableRange({ data: sorted, rowQty: initRowsPerPage })

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => setUsedData(sorted), [sorted])

    return (
        <TableContext.Provider
            value={{
				columns,
				data,
				filter,
                setFilter,
				sort,
                setSort,
                gridTemplateColumns,
                page,
                ranges,
                currRange,
                rowsPerPage,
                rowsPerPageOptions,
                start,
                end,
                firstPage,
                prevPage,
                nextPage,
                lastPage,
                setRowsPerPage
            }}
        >
            {children}
        </TableContext.Provider>
    )
}
