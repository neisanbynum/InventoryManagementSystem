import { useLayoutEffect, useMemo, useState } from 'react'
import remToPx from '../dom-tools/remToPx'

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type BreakpointItem<T> = Record<Breakpoint, T>
export type useBreakpointArgs<T> = Partial<BreakpointItem<T>>
export type Breakpoints = Partial<Record<Breakpoint, number>>

export interface useBreakpointOptions {
	breakpoints?: Breakpoints
	ref?: React.RefObject<HTMLElement | null>
}

/**
 * A React hook that returns the current breakpoint based on the width of an element or the document body.
 *
 * @template T The type of the breakpoint values.
 * @param {useBreakpointArgs<T>} args An object with breakpoint values for each size (sm, md, lg, xl, xxl).
 * @param {useBreakpointOptions} [options] An object with options for the hook.
 * @param {React.RefObject<HTMLElement | null>} [options.ref] A reference to an HTMLElement or null.
 * @param {Breakpoints} [options.breakpoints] An object with custom breakpoint values.
 * @returns {T | undefined} The current breakpoint value, or undefined if no value is provided for the current breakpoint.
 */
export default function useBreakpoint<T>(args: useBreakpointArgs<T>, options?: useBreakpointOptions): T | undefined {
	const { sm, md, lg, xl, xxl } = args
	const { ref, breakpoints } = options ?? {}
	const [width, setWidth] = useState<number>(0)

	useLayoutEffect(() => {
		const node = ref ? ref.current : window.document.getElementById('body')
		if (!node) return

		const update = () => setWidth(node.clientWidth)

		const observer = new ResizeObserver(update)
		observer.observe(node)

		return () => observer.disconnect()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const currentBreakpoint = useMemo(() => {
		if (width <= (breakpoints?.sm ?? remToPx(40))) {
			return sm ?? md ?? lg ?? xl ?? xxl
		} else if (width <= (breakpoints?.md ?? remToPx(48))) {
			return md ?? lg ?? xl ?? xxl
		} else if (width <= (breakpoints?.lg ?? remToPx(64))) {
			return lg ?? xl ?? xxl
		} else if (width <= (breakpoints?.xl ?? remToPx(80))) {
			return xl ?? xxl
		} else {
			return xxl
		}
	}, [width, breakpoints, sm, md, lg, xl, xxl])

	return currentBreakpoint
}
