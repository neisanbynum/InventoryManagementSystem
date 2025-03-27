import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { HStack, VStack } from '@/components/custom/containers'
import { FormInput, LinkButton } from '@/components/custom/inputs'
import { useNavigate } from 'react-router'
import Paths from '@/pages/route-names'
import { Clickable } from '@/components/custom/button'

const authForm = z.object({
	userID: z
		.literal('')
		.or(z.string().length(10, { message: 'Must be 10 digits' }).regex(/^\d+$/, { message: 'Must be a number' })),
	password: z
		.literal('')
		.or(z.string().min(8, { message: 'Must be at least 8 characters' }))
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
				<VStack
					height={'fit-content'}
					gap={'2rem'}
				>
					<AuthenticationInputs />
					<Clickable type='submit' label='Authenticate'/>
				</VStack>
			</form>
		</FormProvider>
	)
}

function AuthenticationInputs(): ReactNode {
	return (
		<VStack
			height={'fit-content'}
			gap={'0.5rem'}
		>
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
			<PinRecovery />
		</VStack>
	)
}

function PinRecovery(): ReactNode {
	const navigate = useNavigate()

	return (
		<HStack
			height={'fit-context'}
			justify={'start'}
			gap={'0.25rem'}
		>
			<p style={{ fontSize: '0.75rem' }}>Forgot your pin?</p>
			<LinkButton
				label={'Recover It'}
				onClick={() => navigate(Paths.register)}
                fontSize={'0.75rem'}
			/>
		</HStack>
	)
}
