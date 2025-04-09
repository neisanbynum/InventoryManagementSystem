import { Columns } from '@/components/table/table.types'
import { z } from 'zod'

export const OrderCustomerSearchFormZodSchema = z.object({
	customerID: z
		.literal('')
		.or(z.string().length(8, 'Invalid Customer ID').regex(/^\d+$/, { message: 'Must be a number' })),
	last: z.literal('').or(z.string().min(2, '2 letters required to search')).optional(),
	first: z.literal('').or(z.string().min(2, '2 letters required to search')).optional(),
	email: z
		.literal('')
		.or(z.string().email({ message: 'Must be a valid email' }))
		.optional(),
	phone: z
		.literal('')
		.or(z.string().length(10, { message: 'Must be 10 digits' }).regex(/^\d+$/, { message: 'Must be a number' }))
		.optional()
})

export type OrderCustomerSearchFormType = z.infer<typeof OrderCustomerSearchFormZodSchema>

export interface ExistingOrder {
    id: string | number
    product: string
    placed: string | Date
    status: 'placed' | 'working' | 'awaiting parts' | 'awaiting pickup' | 'shipped' | 'fulfilled'
    paid: 'awaiting' | 'partial' | 'full'
}

export const ExistingOrderColumns: Columns<ExistingOrder> = [
    
]