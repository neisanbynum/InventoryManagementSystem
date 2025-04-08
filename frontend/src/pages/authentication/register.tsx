import breakpointSwitch, { useWindowWidth } from '@/utils/helpers/breakpoint-switch'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { RegisterFormType, RegisterFormZodSchema } from './register.types'
import { zodResolver } from '@hookform/resolvers/zod'
import server from '@/utils/server'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { BrowserInputs, MobileInputs, RegisterFormInputs } from './register.config'
import FormBuilder from '@/components/form-content'
import Clickable from '@/components/clickable'
import pages from '../pages.config'

export default function RegisterOutlet(): React.ReactElement {
	const navigate = useNavigate()
	const width = useWindowWidth()

	const form = useForm<RegisterFormType>({
		resolver: zodResolver(RegisterFormZodSchema),
		defaultValues: {
			userID: '',
			teamID: '',
			last: '',
			first: '',
			middle: '',
			email: '',
			phone: '',
			password: '',
			passwordConfirm: ''
		},
		mode: 'onBlur',
		reValidateMode: 'onBlur'
	})

	const onSubmit = (data: RegisterFormType) => {
		server
			.put('auth', data)
			.then((res) => {
				console.log(res.data)
				toast('Account Created!', {
					description: 'Your account has successfully been created. Await verification from a team admin.'
				})
				navigate(pages.signin)
			})
			.catch((error) => {
				if (error instanceof AxiosError) {
					console.log(error.response?.data.detail)
					toast.error('Registration Error', {
						description: error.response?.data.detail || 'Failed to create your account'
					})
				}
			})
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} style={{ width: '100%' }}>
				<div className='vstack gap-8'>
					<FormBuilder
						inputMap={RegisterFormInputs}
						content={breakpointSwitch({ width, b: BrowserInputs, m: MobileInputs })}
					/>
					<Clickable type='submit' label='Register' className='w-60' />
				</div>
			</form>
		</FormProvider>
	)
}
