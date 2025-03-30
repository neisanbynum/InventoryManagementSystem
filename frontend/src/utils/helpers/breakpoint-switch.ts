import { useState, useEffect } from 'react'
import { isBrowser, isMobileOnly, isTablet } from 'react-device-detect'

export interface BreakpointSwitchArgs<T> {
	browser?: T
	tablet?: T
	mobile?: T
	width?: number
	debug?: boolean
}

export function remToPx(rem: number): number {
	if (typeof window === 'undefined') return rem * 16
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

export function useWindowWidth(): number | undefined {
	const [width, setWidth] = useState<number | undefined>(
		typeof window !== 'undefined' ? window.innerWidth : undefined
	)

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return width
}

export default function breakpointSwitch<T>({
	browser,
	tablet,
	mobile,
	width,
	debug
}: BreakpointSwitchArgs<T>): T | undefined {
	const windowWidth = width ?? (typeof window !== 'undefined' ? window.innerWidth : undefined)

	const widthIsMobile = windowWidth !== undefined && windowWidth < remToPx(35)
	const widthIsTablet = windowWidth !== undefined && windowWidth >= remToPx(35) && windowWidth < remToPx(48)
	const widthIsBrowser = windowWidth !== undefined && windowWidth >= remToPx(48)

	if (debug && process.env.NODE_ENV === 'development') {
		console.debug('Device Type:', {
			isBrowser,
			isTablet,
			isMobileOnly,
			width,
			widthIsMobile,
			widthIsTablet,
			widthIsBrowser
		})
	}

	// Prefer responsive width logic when available
	if (widthIsBrowser) return browser ?? tablet ?? mobile
	if (widthIsTablet) return tablet ?? browser ?? mobile
	if (widthIsMobile) return mobile ?? tablet ?? browser

	// Fall back to react-device-detect
	if (isBrowser && browser) return browser
	if (isTablet && tablet) return tablet
	if (isMobileOnly && mobile) return mobile

	// Final fallback
	return browser ?? tablet ?? mobile
}
