import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from '@/components/custom/inputs'
import { useNavigate } from 'react-router'
import Paths from '@/pages/route-names'
import server from '@/utils/server'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useDispatch } from 'react-redux'
import { authenticate } from '@/state/slices/app'
import Clickable from '@/components/custom/clickable'
import Link from '@/components/custom/link'

const authForm = z.object({
	userID: z
		.literal('')
		.or(z.string().length(10, { message: 'Must be 10 digits' }).regex(/^\d+$/, { message: 'Must be a number' })),
	password: z.literal('').or(z.string().min(8, { message: 'Must be at least 8 characters' }))
})

type AuthForm = z.infer<typeof authForm>

export default function AuthenticationForm(): React.ReactNode {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const form = useForm<AuthForm>({
		resolver: zodResolver(authForm),
		defaultValues: {
			userID: '',
			password: ''
		},
		mode: 'onBlur',
		reValidateMode: 'onBlur'
	})

	async function onSubmit(entries: AuthForm) {
		try {
			const { data } = await server.post('/auth', entries)
			console.log(data)
			dispatch(authenticate(data))
			toast.success('Authenticated!', {
				description: 'Welcome to Inventory Management System'
			})
			navigate(Paths.registerVerification)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data.detail)
				toast.error('Authentication Error', {
					description: error.response?.data.detail || 'Failed to access account.'
				})
			}
		}
	}

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='w-full'
			>
				<div className='vstack gap-8'>
					<AuthenticationInputs />
					<Clickable
						type='submit'
						label='Authenticate'
						className='w-60'
					/>
				</div>
			</form>
		</FormProvider>
	)
}

function AuthenticationInputs(): React.ReactNode {
	return (
		<div className='hstack gap-2'>
			<FormInput
				name={'userID'}
				label={'Employee ID'}
				type={'number'}
			/>
			<FormInput
				name={'password'}
				label={'Password'}
				type={'password'}
			/>
			<PasswordRecovery />
		</div>
	)
}

function PasswordRecovery(): React.ReactNode {
	const navigate = useNavigate()

	return (
		<div className='hstack gap-1 justify-start'>
			<p className='text-xs'>Forgot your password?</p>
			<Link
				label={'Reset Password'}
				onClick={() => navigate(Paths.register)}
				className='text-xs'
			/>
		</div>
	)
}
