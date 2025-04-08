/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react'
import { useTableRangeInit, useTableRangeValues } from '../table.types'



export default function useTableRange<T extends Record<string, any>>({
	data,
	rowQty
}: useTableRangeInit<T>): useTableRangeValues<T> {
	const [usedData, setUsedData] = useState<T[]>(data)
	const [rowsPerPage, setRowsPerPage] = useState<number>(rowQty)
	const rowsPerPageOptions: [number, number, number, number, number] = useMemo(() => {
		return [rowQty, rowQty * 2, rowQty * 3, rowQty * 4, rowQty * 5]
	}, [rowQty])

	const length = usedData.length
	const ranges: { start: number; end: number }[] = useMemo(() => {
		const rangeList: { start: number; end: number }[] = []
		for (let i = 0; i < length; i += rowsPerPage) {
			rangeList.push({ start: i, end: Math.min(i + rowsPerPage, length) })
		}
		return rangeList
	}, [length, rowsPerPage])

	const [page, setPage] = useState<T[]>([])
	const [currRange, setCurrRange] = useState<number>(0)

	const updatePage = (): void => {
		if (ranges.length === 0 || length === 0) {
			setPage([])
			return
		}
		const safeIndex = Math.max(0, Math.min(currRange, ranges.length - 1))
		const range = ranges[safeIndex]
		if (range) {
			setPage(usedData.slice(range.start, range.end))
		}
	}

	useEffect(() => {
		setCurrRange(0)
        updatePage()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [usedData, ranges])

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => updatePage(), [currRange])

	const start = currRange === 0
	const end = ranges.length === 0 || currRange === ranges.length - 1

	const firstPage = () => {
		if (!start) setCurrRange(0)
	}

	const prevPage = () => {
		if (!start) setCurrRange(Math.max(0, currRange - 1))
	}

	const nextPage = () => {
		if (!end) setCurrRange(Math.min(currRange + 1, ranges.length - 1))
	}

	const lastPage = () => {
		if (!end) setCurrRange(ranges.length - 1)
	}

	return {
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
	}
}
