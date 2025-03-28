import Clickable from '@/components/custom/clickable'
import { FormInput } from '@/components/custom/inputs'
import Paths from '@/pages/route-names'
import server from '@/utils/server'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

const registerUserForm = z.object({
	userID: z
		.literal('')
		.or(z.string().length(10, { message: 'Must be 10 digits' }).regex(/^\d+$/, { message: 'Must be a number' })),
	teamID: z
		.literal('')
		.or(z.string().length(10, { message: 'Must be 10 digits' }).regex(/^\d+$/, { message: 'Must be a number' })),
	last: z.literal('').or(z.string().min(2, { message: 'Must be at least 2 characters' })),
	first: z.literal('').or(z.string().min(2, { message: 'Must be at least 2 characters' })),
	middle: z.string().optional(),
	email: z.literal('').or(z.string().email({ message: 'Must be a valid email' })),
	phone: z.literal('').or(z.string().length(10, { message: 'Must be 10 digits' }).regex(/^\d+$/, { message: 'Must be a number' })),
	password: z.literal('').or(z.string().min(8, { message: 'Must be at least 8 characters' })),
	passwordConfirm: z.literal('').or(z.string().min(8, { message: 'Must be at least 8 characters' }))
})
type RegisterUserForm = z.infer<typeof registerUserForm>

export default function RegistrationForm(): ReactNode {
	const navigate = useNavigate()

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
			navigate(Paths.auth)
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
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				style={{ width: '100%' }}
			>
				<div className='vstack gap-8'>
					<RegisterInputs />
					<Clickable
						type='submit'
						label='Register'
						className='w-60'
					/>
				</div>
			</form>
		</FormProvider>
	)
}

function RegisterInputs(): ReactNode {
	return (
		<div className='vstack gap-8'>
            <CompanyInformation/>
			<PersonalInformation/>
            <Password/>
		</div>
	)
}

function CompanyInformation(): ReactNode {
	return (
		<div className='form-hstack'>
			<FormInput
				name='userID'
				label='Employee ID'
				type='number'
			/>
			<FormInput
				name='teamID'
				label='Team ID'
				type='number'
			/>
		</div>
	)
}

function PersonalInformation(): ReactNode {
	return (
		<div className='vstack gap-2'>
			<div className='form-hstack'>
				<FormInput
					name='last'
					label='Last Name'
				/>
				<FormInput
					name='first'
					label='First Name'
				/>
				<FormInput
					name='middle'
					label='Middle Name'
                    width='75%'
				/>
			</div>
			<div className='form-hstack'>
				<FormInput
					name='email'
					label='Email Address'
					type='email'
				/>
				<FormInput
					name='phone'
					label='Phone Number'
					type='number'
					width='75%'
				/>
			</div>
		</div>
	)
}

function Password(): ReactNode {
	return (
		<div className='form-hstack'>
			<FormInput
				name='password'
				label='Password'
				type='password'
			/>
			<FormInput
				name='passwordConfirm'
				label='Confirm Password'
				type='password'
				passwordHint={false}
			/>
		</div>
	)
}