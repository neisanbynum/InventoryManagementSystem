import { createRoot } from 'react-dom/client'
import '../index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import store from './state/main'
import { StrictMode } from 'react'
import { Toaster } from './components/ui/sonner'
import pages from './pages/pages.config'
import AuthenticationPage from './pages/authentication'
import SignInOutlet from './pages/authentication/signin'
import RegisterOutlet from './pages/authentication/register'
import TestPage from './pages/test'
import Page from './components/page'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path={pages.home} element={<Page>Home</Page>} />
					<Route path={pages.authenication} element={<AuthenticationPage />}>
						<Route path={pages.signin} element={<SignInOutlet />} />
						<Route path={pages.register} element={<RegisterOutlet />} />
					</Route>
					<Route path={pages.test} element={<TestPage />} />
					{/* <Route path={pages.authenticated} element={<AuthLayout />}>
						<Route path={pages.authTest} element={<div>Testing Auth Home</div>} />
					</Route> */}
				</Routes>
			</BrowserRouter>
		</Provider>
		<Toaster position='top-right' richColors />
	</StrictMode>
)
