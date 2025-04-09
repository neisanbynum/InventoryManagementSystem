import { Columns } from "@/components/table/table.types";
import { cn } from "@sglara/cn";

export interface InventoryItem {
    id: string
    name: string
    category?: string
    quantity: number
    price: number
    location: string
    supplier: string
    restockLevel: number
    status: 'Out of Stock' | 'In Stock' | 'Low Stock'
    added: Date
    updated: Date
}

const USD = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})

export const columns: Columns<InventoryItem> = [
    {accessorKey: 'id', header: 'Item ID', align: 'center', width: 2},
    {accessorKey: 'name', header: 'Item Name', width: 3},
    {accessorKey: 'category', header: 'Item Type', width: 1},
    {accessorKey: 'quantity', header: 'Item Quantity'},
    {accessorKey: 'price', header: 'Unit Price', value: (row) => USD.format(row.price)},
    {accessorKey: 'location', header: 'Stock Location', width: 2},
    {accessorKey: 'supplier', header: 'Item Supplier', width: 2},
    {accessorKey: 'restockLevel', header: 'Min Stock'},
    {accessorKey: 'status', header: 'Stock Level', width: 2, renderCell: (val, row) => <p className={cn('text-sm font-semibold', val === 'Low Stock' && 'text-yellow-600', val === 'Out of Stock' && 'text-destructive')}>{row.status}</p>},
    {accessorKey: 'added', header: 'Date Added', width: 2, value: (row) => new Date(row.added).toLocaleDateString('en-CA')},
    {accessorKey: 'updated', header: 'Date Updated', width: 2, value: (row) => new Date(row.updated).toLocaleDateString('en-CA')}
]

export const reducedColumns: Columns<InventoryItem> = [
    {accessorKey: 'id', header: 'Item ID', align: 'center', width: 2},
    {accessorKey: 'name', header: 'Item Name', width: 3},
    {accessorKey: 'category', header: 'Item Type', width: 1},
    {accessorKey: 'quantity', header: 'Item Quantity'},
    {accessorKey: 'location', header: 'Stock Location', width: 2},
    {accessorKey: 'status', header: 'Stock Level', width: 2, renderCell: (val, row) => <p className={cn('text-sm font-semibold', val === 'Low Stock' && 'text-yellow-600', val === 'Out of Stock' && 'text-destructive')}>{row.status}</p>},
]