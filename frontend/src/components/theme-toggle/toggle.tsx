import { setTheme, Theme, THEME_KEY } from "@/state/slices/app";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Clickable from "../clickable";
import { titlecase } from "@/utils/helpers/parsers";
import { Moon, Sun } from "lucide-react";

export default function Toggle( { currTheme }: { currTheme: Theme } ) {
    const savedTheme: Theme|null = localStorage.getItem(THEME_KEY) as Theme|null
	const [ initialized, setInitialized ] = useState<boolean>(false)
	const dispatch = useDispatch()

    useEffect(() => {
        const theme = initialized ? currTheme : savedTheme ? savedTheme : currTheme
        const root = window.document.documentElement
		root.classList.remove('light', 'dark')
		root.classList.add(theme)
		localStorage.setItem(THEME_KEY, theme)

        if (!initialized) {
            dispatch(setTheme(theme))
            setInitialized(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currTheme])

    return (
        <Clickable
            variant='icon'
            onClick={() => dispatch(setTheme(currTheme === 'dark' ? 'light' : 'dark'))}
            aria-label={`Toggle Theme to ${titlecase(currTheme === 'dark' ? 'light' : 'dark')}`}
            icons={[
                {icon: Sun, name: 'light-icon', class: 'absolute rotate-0 scale-100 transition-transform duration-400 dark:-rotate-90 dark:scale-0'},
                {icon: Moon, name: 'dark-icon', class: 'absolute rotate-90 scale-0 transition-transform duration-400 dark:rotate-0 dark:scale-100'}
            ]}
        />
    )
}