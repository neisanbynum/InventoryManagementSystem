import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sun, Moon } from 'lucide-react'
import { setTheme, Theme, THEME_KEY } from '@/state/slices/app'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { titlecase } from '@/utils/helpers/parsers'
import { RootState } from '@/state/main'


export default function ThemeToggle(): React.ReactNode {
	const { currTheme } = useSelector((state: RootState) => state.app)
	const dispatch = useDispatch()

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
		<TooltipProvider delayDuration={1800}>
			<Tooltip>
				<TooltipTrigger asChild style={{background: 'transparent'}}>
					<Button
						variant={'ghost'}
						size={'icon'}
						onClick={toggleTheme}
                        aria-label={`Toggle Theme to ${titlecase(currTheme === 'dark' ? 'light' : 'dark')}`}
                        className="hover:bg-transparent"
						style={{outline: 0, border: 0}}
					>
						<Sun
							className={`rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
						/>
						<Moon
							className={`absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`}
						/>
                        <span className="sr-only">Toggle Theme</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{titlecase(currTheme === 'dark' ? 'light' : 'dark')}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
