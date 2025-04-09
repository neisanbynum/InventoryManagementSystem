/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react"
import { PageRanges, RowsPerPageOptions } from "./useTableRange"
import { Columns } from "../table.types";

export type TableSort<T extends Record<string, any>> = { accessorKey: keyof T; sort: 'asc' | 'desc' }

export interface TableContextValues<T extends Record<string, any>> {
    columns?: Columns<T>
    data: T[]
    filter: string
    setFilter: React.Dispatch<React.SetStateAction<string>>
    sort: TableSort<T> | undefined
    setSort: React.Dispatch<React.SetStateAction<TableSort<T> | undefined>>
    gridTemplateColumns: React.CSSProperties['gridTemplateColumns']
    page: T[]
    ranges: PageRanges
    currRange: number
    rowsPerPage: number
    rowsPerPageOptions: RowsPerPageOptions
    start: boolean
    end: boolean
    firstPage: () => void
    prevPage: () => void
    nextPage: () => void
    lastPage: () => void
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
}

export const TableContext = createContext<TableContextValues<any> | null>(null)

export function useTableContext<T extends Record<string, any>>(): TableContextValues<T> {
    const context = useContext(TableContext) as TableContextValues<T> | null
    if (!context) throw new Error('TableContext used outside of TableProvider')
    return context
}