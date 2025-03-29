import Clickable from "@/components/clickable"
import { authenticate } from "@/state/slices/app"
import server from "@/utils/server"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useForm, FormProvider } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import pages from "../__pages.config"
import { AuthForm, authForm } from "./sign-in.types"
import { FormContent } from "@/components/form-content"
import { inputs } from "./sign-in.config"

export default function SignInForm(): React.ReactNode {
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
			navigate(pages.authTest)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data.detail)
				toast.error('Authentication Error', {
					description: error.response?.data.detail || 'Failed to access account'
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
					<FormContent content={inputs} />
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