import Clickable from '@/components/clickable'
import server from '@/utils/server'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import pages from '../__pages.config'
import { RegisterUserForm, registerUserForm } from './register.types'
import breakpointSwitch, { useWindowWidth } from '@/utils/helpers/breakpoint-switch'
import FormBuilder from '@/components/form-content'
import { browserInputs, mobileInputs, registerInputs } from './register.config'

export default function RegisterForm(): ReactNode {
	const navigate = useNavigate()
	const width = useWindowWidth()

	const form = useForm<RegisterUserForm>({
		resolver: zodResolver(registerUserForm),
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

	async function onSubmit(data: RegisterUserForm) {
		console.log(data)
		try {
			const res = await server.put('/auth', data)
			console.log(res)
			toast('Account Created!', {
				description: 'Your account has successfully been created. Await verification from a team admin.'
			})
			navigate(pages.signin)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data.detail)
				toast.error('Registration Error', {
					description: error.response?.data.detail || 'Failed to create your account'
				})
			}
		}
	}

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} style={{ width: '100%' }}>
				<div className='vstack gap-8'>
					<FormBuilder inputMap={registerInputs} content={breakpointSwitch({ width, browser: browserInputs, mobile: mobileInputs})}/>
					<Clickable type='submit' label='Register' className='w-60' />
				</div>
			</form>
		</FormProvider>
	)
}
