import { Clickable } from '@/components/custom/button'
import { HStack, VStack } from '@/components/custom/container'
import { FormInput } from '@/components/custom/inputs'
import Paths from '@/pages/route-names'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
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

	function onSubmit(data: RegisterUserForm) {
		console.log(data)
		navigate(Paths.registerVerification)
	}

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				style={{ width: '100%' }}
			>
				<VStack className='gap-8'>
					<RegisterInputs />
					<Clickable
						type='submit'
						label='Register'
						width='15rem'
					/>
				</VStack>
			</form>
		</FormProvider>
	)
}

function RegisterInputs(): ReactNode {
	return (
		<VStack className='gap-8'>
            <CompanyInformation/>
			<PersonalInformation/>
            <Password/>
		</VStack>
	)
}

function CompanyInformation(): ReactNode {
	return (
		<HStack className='gap-2 items-start'>
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
		</HStack>
	)
}

function PersonalInformation(): ReactNode {
	return (
		<VStack className='gap-2'>
			<HStack className='gap-2 items-start'>
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
			</HStack>
			<HStack className='gap-2 items-start'>
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
			</HStack>
		</VStack>
	)
}

function Password(): ReactNode {
	return (
		<HStack className='gap-2 items-start'>
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
		</HStack>
	)
}