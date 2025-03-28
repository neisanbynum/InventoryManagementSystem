import { createRoot } from 'react-dom/client'
import '../index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import store from './state/main'
import UnprotectedLayout from './layouts/unprotected'
import { StrictMode } from 'react'
import AuthenticationLayout from './pages/auth/layout'
import AuthenticationForm from './pages/auth'
import Paths from './pages/route-names'
import RegistrationForm from './pages/auth/nested/register'
import RegistrationVerification from './pages/auth/nested/verification'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route element={<UnprotectedLayout />}>
						<Route path={Paths.home} element={<div>Home</div>} />
						<Route path={Paths.auth} element={<AuthenticationLayout/>} >
							<Route index element={<AuthenticationForm/>} />
							<Route path={Paths.register} element={<RegistrationForm/>} />
						</Route>
						<Route path={Paths.registerVerification} element={<RegistrationVerification/>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
		<Toaster position='top-right' richColors/>
	</StrictMode>
)
