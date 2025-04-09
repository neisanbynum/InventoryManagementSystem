import { Columns } from "@/components/table/table.types"
import { titlecase } from "@/utils/helpers/parsers"
import { cn } from "@sglara/cn"

export interface ExistingOrder {
    id: string | number
    customerID: number
    product: string
    placed: string | Date
    status: 'placed' | 'working' | 'awaiting parts' | 'awaiting pickup' | 'shipped' | 'fulfilled'
    paid: 'awaiting' | 'partial' | 'full'
}

export const columns: Columns<ExistingOrder> = [
    {accessorKey: 'customerID', header: 'Customer ID'},
    {accessorKey: 'product', header: 'Product', width: 6},
    {accessorKey: 'placed', header: 'Date Placed'},
    {accessorKey: 'status', header: 'Status', width: 2, renderCell: (_, row) => <p className="text-sm font-semibold">{titlecase(row.status)}</p>},
    {accessorKey: 'paid', header: 'Payment', width: 2, renderCell: (_, row) => <p className={cn('text-sm font-semibold', row.paid === 'awaiting' && 'text-destructive', row.paid === 'partial' && 'text-yellow-600')}>{titlecase(row.paid)}</p>}
]