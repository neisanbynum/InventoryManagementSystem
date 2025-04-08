import { ColumnDef } from "@tanstack/react-table";
import { ExistingOrder } from "./existing-order.types";
import { Columns } from "@/components/table/table.types";

export const ExistingOrderColumns: ColumnDef<ExistingOrder>[] = [
    {
        accessorKey: 'product',
        header: 'Product Description',
        size: 800
    },
    {
        accessorKey: 'placed',
        header: 'Date Placed'
    },
    {
        accessorKey: 'paid',
        header: 'Payment Status'
    },
    {
        accessorKey: 'status',
        header: 'Order Status'
    }
]

export interface User {
    id: number | string
    last: string
    first: string
    middle: string
}

export const TestUserColumns: Columns<User> = [
    { accessorKey: 'id', header: 'Employee ID', width: 1, align: 'center' },
    { accessorKey: 'last', header: 'Last Name', width: 2 },
    { accessorKey: 'first', header: 'First Name', width: 2 },
    { accessorKey: 'middle', header: 'Middle Name', width: 2 }
]

export const TestUserData: User[] = [
    { id: 1521574395, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 1571524395, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 1511554395, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 1412432451, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 1252524252, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 5215353213, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 2515252525, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 2522551352, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 4525452543, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 3535345345, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 3525453445, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 5432534434, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 2425554353, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 4534545354, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
    { id: 4524356664, last: 'Bynum', first: 'Emmanuel', middle: 'Nathan' },
]