import Clickable from '@/components/clickable'
import FormBuilder from '@/components/form-content'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import {
	BrowserInputs,
	OrderCustomerSearchFormType,
	OrderCustomerSearchFormZodSchema,
	OrderCustomerSearchInputs
} from './order-customer-search.config'
import { toast } from 'sonner'

interface OrderCustomerSearchProps {
	ref?: React.RefObject<HTMLDivElement | null> | ((node: HTMLElement | null) => void)
}

export default function OrderCustomerSearch({ ref }: OrderCustomerSearchProps): React.ReactElement {
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
		if (entries.length === 0) {
			toast.error('Empty Search Parameters', {
				description: 'At least one field is required to search for existing customer'
			})
		} else {
			toast('Good Search', {
				description: JSON.stringify(customerInfo)
			})
		}
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
