import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { SignInFormType, SignInFormZodSchema } from './signin.types'
import { zodResolver } from '@hookform/resolvers/zod'
import server from '@/utils/server'
import { authenticate } from '@/state/slices/app'
import { toast } from 'sonner'
import pages from '../pages.config'
import { AxiosError } from 'axios'
import FormBuilder from '@/components/form-content'
import { AllLayoutsInputs, SignInInputs } from './signin.config'
import Clickable from '@/components/clickable'

export default function SignInOutlet(): React.ReactElement {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const form = useForm<SignInFormType>({
		resolver: zodResolver(SignInFormZodSchema),
		defaultValues: {
			userID: '',
			password: ''
		},
		mode: 'onBlur',
		reValidateMode: 'onBlur'
	})

	const onSubmit = (credentials: SignInFormType) => {
		server
			.post('/auth', credentials)
			.then(({ data }) => {
				console.log(data)
				dispatch(authenticate(data))
				toast.success('Authenticated!', {
					description: 'Welcome to Inventory Management System'
				})
				navigate(pages.authTest)
			})
			.catch((error) => {
				if (error instanceof AxiosError) {
					console.log(error.response?.data.detail)
					toast.error('Authentication Error', {
						description: error.response?.data.detail || 'Failed to access account'
					})
				}
			})
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
				<div className='vstack gap-8'>
					<FormBuilder inputMap={SignInInputs} content={AllLayoutsInputs} />
					<Clickable type='submit' label='Authenticate' className='w-60' />
				</div>
			</form>
		</FormProvider>
	)
}
