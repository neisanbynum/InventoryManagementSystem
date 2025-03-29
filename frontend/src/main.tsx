import { createRoot } from 'react-dom/client'
import '../index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import store from './state/main'
import AppLayout from './layouts/app-layout'
import { StrictMode } from 'react'
import RegistrationVerification from './pages/verification'
import { Toaster } from './components/ui/sonner'
import pages from './pages/__pages.config'
import AuthLayout from './layouts/auth-layout'
import AuthenticationLayout from './layouts/authentication-layout'
import SignInForm from './pages/sign-in'
import RegisterForm from './pages/register'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route path={pages.home} element={<div>Home</div>} />
						<Route path={pages.authenication} element={<AuthenticationLayout />}>
							<Route path={pages.signin} element={<SignInForm />} />
							<Route path={pages.register} element={<RegisterForm />} />
						</Route>
						<Route path={pages.verification} element={<RegistrationVerification />} />
						<Route path={pages.authenticated} element={<AuthLayout />}>
							<Route path={pages.authTest} element={<div>Testing Auth Home</div>} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
		<Toaster position='top-right' richColors />
	</StrictMode>
)
