import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sun, Moon } from 'lucide-react'
import { setTheme, Theme, THEME_KEY } from '@/state/slices/app'
import { titlecase } from '@/utils/helpers/parsers'
import { RootState } from '@/state/main'
import Clickable, { Icons } from '@/components/custom/clickable'
import { ToolTip, ToolTipContent, ToolTipTrigger } from '@/components/custom/tooltip'


export default function ThemeToggle(): React.ReactNode {
	const { currTheme } = useSelector((state: RootState) => state.app)
	const dispatch = useDispatch()

	const icons: Icons = [
		{icon: Sun, name: 'light-icon', class: 'absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'},
		{icon: Moon, name: 'dark-icon', class: 'absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'}
	]

	// Initialize Theme
	useEffect(() => {
		const theme: Theme|null = localStorage.getItem(THEME_KEY) as Theme|null
		if (theme) applyTheme(theme)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Apply Theme
	function applyTheme(theme: Theme): void {
		const root = window.document.documentElement
		root.classList.remove('light', 'dark')
		root.classList.add(theme)
		localStorage.setItem(THEME_KEY, theme)
		dispatch(setTheme(theme))
	}

	function toggleTheme(): void {
		const newTheme: Theme = currTheme === 'dark' ? 'light' : 'dark'
		applyTheme(newTheme)
	}

	return (
		<ToolTip>
			<ToolTipTrigger>
				<Clickable
					variant='icon'
					onClick={toggleTheme}
					aria-label={`Toggle Theme to ${titlecase(currTheme === 'dark' ? 'light' : 'dark')}`}
					icons={icons}
				/>
			</ToolTipTrigger>
			<ToolTipContent>
				{`${titlecase(currTheme === 'dark' ? 'light' : 'dark')} Theme`}
			</ToolTipContent>
		</ToolTip>
	)
}
