import Clickable from '@/components/clickable'
import FormBuilder from '@/components/form-content'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { OrderCustomerSearchFormType, OrderCustomerSearchFormZodSchema } from '../workers.types'
import { InputSchemaDefinition, FormContent } from '@/components/form-content/form-content.types'
import { Separator } from '@/components/ui/separator'

export default function OrderCustomerSearch({ ref }: {ref?: React.RefObject<HTMLDivElement | null>}): React.ReactElement {
	const form = useForm<OrderCustomerSearchFormType>({
		resolver: zodResolver(OrderCustomerSearchFormZodSchema),
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			customerID: '',
			last: '',
			first: '',
			email: '',
			phone: ''
		}
	})

	const onSubmit = (customerInfo: OrderCustomerSearchFormType) => {
		const entries = Object.values(customerInfo).filter((entry) => entry !== '')
		console.log(entries)
		if (entries.length === 0) {
			form.setError('root.random', { type: 'required', message: 'Requires at least one field' })
			setTimeout(() => {
				form.clearErrors()
			}, 3000)
			return
		}
		console.log(customerInfo)
	}

	return (
		<Card className='w-full shadow-md hover:shadow-lg' ref={ref}>
			<CardHeader>
				<CardTitle>Place Order</CardTitle>
				<CardDescription>Enter customer information to search for existing customers</CardDescription>
			</CardHeader>
			<CardContent>
				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
						<div className='vstack gap-8'>
							<FormBuilder inputMap={OrderCustomerSearchInputs} content={BrowserInputs} />
							<Clickable type='submit' label='Find Customer' className='w-60' />
						</div>
					</form>
				</FormProvider>
			</CardContent>
		</Card>
	)
}


const OrderCustomerSearchInputs: InputSchemaDefinition<OrderCustomerSearchFormType> = {
    customerID: { name: 'customerID', label: 'Customer ID', type: 'number' },
    last: { name: 'last', label: 'Last Name' },
    first: { name: 'first', label: 'First Name' },
    email: { name: 'email', label: 'Email Address', type: 'email' },
    phone: { name: 'phone', label: 'Phone Number', type: 'number', className: 'w-3/5' }
}

const BrowserInputs: FormContent<typeof OrderCustomerSearchInputs> = {
    name: 'order-customer-search-form',
    rowStyles: [{ group: 1, sub: 1, row: 1, style: {justifyContent: 'start'}}],
    components: [
        { group: 1, sub: 1, row: 1, components: ['customerID']},
        { group: 1, sub: 2, row: 1, components: [<Separator/>]},
        { group: 1, sub: 3, row: 1, components: ['last', 'first']},
        { group: 1, sub: 3, row: 2, components: ['email', 'phone']}
    ]
}