/* eslint-disable react-refresh/only-export-components */
import { FormContent, InputSchemaDefinition } from '@/components/form-content/form-content.types'
import { Separator } from '@/components/ui/separator'
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

export const OrderCustomerSearchInputs: InputSchemaDefinition<OrderCustomerSearchFormType> = {
    customerID: { name: 'customerID', label: 'Customer ID', type: 'number' },
    last: { name: 'last', label: 'Last Name' },
    first: { name: 'first', label: 'First Name' },
    email: { name: 'email', label: 'Email Address', type: 'email' },
    phone: { name: 'phone', label: 'Phone Number', type: 'number', className: 'w-3/5' }
}

export const BrowserInputs: FormContent<typeof OrderCustomerSearchInputs> = {
    name: 'order-customer-search-form',
    rowStyles: [{ group: 1, sub: 1, row: 1, style: {justifyContent: 'start'}}],
    components: [
        { group: 1, sub: 1, row: 1, components: ['customerID']},
        { group: 1, sub: 2, row: 1, components: [<Separator/>]},
        { group: 1, sub: 3, row: 1, components: ['last', 'first']},
        { group: 1, sub: 3, row: 2, components: ['email', 'phone']}
    ]
}