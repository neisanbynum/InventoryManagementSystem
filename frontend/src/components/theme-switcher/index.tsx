import { RootState } from '@/state/main'
import { setTheme, Theme, THEME_KEY } from '@/state/slices/app'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Clickable from '../clickable'
import { titlecase } from '@/utils/helpers/parsers'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@sglara/cn'

export default function ThemeToggle(): React.ReactElement {
	const { currTheme } = useSelector((state: RootState) => state.app)
	const dispatch = useDispatch()

	const sunClass = cn(
		currTheme === 'dark' ? '-rotate-90 scale-0' : 'rotate-0 scale-100',
		'absolute transition-transform duration-900'
	)
	const moonClass = cn(
		currTheme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0',
		'absolute transition-transform duration-900'
	)

	useEffect(() => {
		const saved = localStorage.getItem(THEME_KEY) as Theme | null
		if (!saved) {
			setAppTheme('dark')
			return
		}
		setAppTheme(saved)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const setAppTheme = (theme: Theme) => {
		const root = window.document.documentElement
		root.classList.remove('light', 'dark')
		root.classList.add(theme)
		localStorage.setItem(THEME_KEY, theme)
		dispatch(setTheme(theme))
	}

	return (
		<Clickable
			variant='icon'
			onClick={() => setAppTheme(currTheme === 'dark' ? 'light' : 'dark')}
			aria-label={`Toggle Theme to ${titlecase(currTheme === 'dark' ? 'light' : 'dark')}`}
			icons={[
				{ icon: Sun, name: 'light-icon', class: sunClass },
				{ icon: Moon, name: 'dark-icon', class: moonClass }
			]}
		/>
	)
}
