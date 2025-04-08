import Clickable from '@/components/clickable'
import FormBuilder from '@/components/form-content'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { OrderCustomerSearchInputs, BrowserInputs } from './order-customer-search.config'
import { OrderCustomerSearchFormType, OrderCustomerSearchFormZodSchema } from './order-customer-search.types'

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
