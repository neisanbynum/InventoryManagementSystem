import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { HStack, VStack } from '@/components/custom/container'
import { FormInput } from '@/components/custom/inputs'
import { useNavigate } from 'react-router'
import Paths from '@/pages/route-names'
import { Clickable, TextLink } from '@/components/custom/clickable'

const authForm = z.object({
	userID: z
		.literal('')
		.or(z.string().length(10, { message: 'Must be 10 digits' }).regex(/^\d+$/, { message: 'Must be a number' })),
	password: z.literal('').or(z.string().min(8, { message: 'Must be at least 8 characters' }))
})

type AuthForm = z.infer<typeof authForm>

export default function AuthenticationForm(): ReactNode {
	const form = useForm<AuthForm>({
		resolver: zodResolver(authForm),
		defaultValues: {
			userID: '',
			password: ''
		},
		mode: 'onBlur',
		reValidateMode: 'onBlur'
	})

	function onSubmit(data: AuthForm) {
		console.log(data)
	}

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				style={{ width: '100%' }}
			>
				<VStack className='gap-8'>
					<AuthenticationInputs />
					<Clickable
						type='submit'
						label='Authenticate'
						className='w-60'
					/>
				</VStack>
			</form>
		</FormProvider>
	)
}

function AuthenticationInputs(): ReactNode {
	return (
		<VStack className='gap-2'>
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
		</VStack>
	)
}

function PasswordRecovery(): ReactNode {
	const navigate = useNavigate()

	return (
		<HStack className='gap-1 justify-start'>
			<p style={{ fontSize: '0.75rem' }}>Forgot your password?</p>
			<TextLink
				label={'Reset Password'}
				onClick={() => navigate(Paths.register)}
				size={'0.75rem'}
			/>
		</HStack>
	)
}
