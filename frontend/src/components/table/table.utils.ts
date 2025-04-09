/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react'
import useTableRange from './utils/useTableRange'
import { Columns, useDataValues } from './table.types'

export function generateGridTemplate<T extends Record<string, any>>(
	columns?: Columns<T>,
	minColWidth?: React.CSSProperties['width']
): string | undefined {
	return columns?.map((col) => `minmax(${minColWidth || '100px'}, ${col.width ?? 1}fr)`).join(' ')
}

export function useData<T extends Record<string, any>>(data: T[], displayQty: number): useDataValues<T> {
	const [filter, setFilter] = useState<string>('')
	const [sort, setSort] = useState<{ accessorKey: keyof T; sort: 'asc' | 'desc' } | undefined>()

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
	} = useTableRange({ data: sorted, rowQty: displayQty })

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => setUsedData(sorted), [sorted])

	return {
		ranges,
        currRange,
		sort,
		rowsPerPage,
		start,
		end,
		page,
		rowsPerPageOptions,
		setFilter,
		setSort,
		setRowsPerPage,
		firstPage,
		prevPage,
		nextPage,
		lastPage
	}
}
