import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const isBrowser = typeof window !== 'undefined'


export type RemString = string & { __brand: 'rem' };
/**
 * Converts a rem value to pixels.
 *
 * This function takes a rem value, either as a number or a string (e.g. '2rem'), and returns the equivalent value in pixels.
 * The conversion is based on the current font size of the document's root element.
 *
 * @param rem The rem value to convert, either a number or a string (e.g. '2rem').
 * @returns The converted rem value in pixels.
 * @throws {Error} If the input string does not end with 'rem'.
 */
export function remToPx(rem: number | RemString): number {
  if (typeof rem === 'string' && !rem.endsWith('rem')) {
    throw new Error('Invalid rem string');
  }
  const val = typeof rem === 'string' ? parseFloat(rem) : rem;
  return isBrowser ? val * parseFloat(getComputedStyle(document.documentElement).fontSize) : val * 16;
}

/**
 * Converts a measurement value to a number in pixels.
 *
 * This function takes a string or number value and returns the equivalent value in pixels.
 * If the input value is a string, it is parsed and converted to pixels based on its unit (px or rem).
 *
 * @param val The measurement value to convert, either a string (e.g. '10px', '2rem') or a number.
 * @returns The converted measurement value in pixels.
 */
export function convertMeasurement(val: string | number): number {
	if (typeof val === 'string') {
		if (val.endsWith('px')) return parseFloat(val)
		if (val.endsWith('rem')) return remToPx(val as RemString)
	}
	return val as number
}

/**
 * A React hook that computes the dimensions of an HTMLElement, excluding padding.
 *
 * This hook returns an object with the following properties:
 * - `width`: the computed width of the element, excluding padding.
 * - `height`: the computed height of the element, excluding padding.
 *
 * The hook uses a ResizeObserver to update the dimensions when the element is resized.
 *
 * @param ref A React ref object that references the HTMLElement to compute dimensions for.
 * @template T The type of HTMLElement to compute dimensions for.
 * @returns An object with the computed dimensions, excluding padding.
 */
export function useExcludePadding<T extends HTMLElement>(
	ref: React.RefObject<T | null>
): { width: number; height: number } {
	const [height, setHeight] = useState<number>(0)
	const [width, setWidth] = useState<number>(0)

	useLayoutEffect(() => {
		const node = ref.current
		if (!node) return

		const update = () => {
			const style = window.getComputedStyle(node)

			const paddingY = convertMeasurement(style.paddingTop) + convertMeasurement(style.paddingBottom)
			const paddingX = convertMeasurement(style.paddingLeft) + convertMeasurement(style.paddingRight)

			setHeight(node.clientHeight - paddingY)
			setWidth(node.clientWidth - paddingX)
		}

		const observer = new ResizeObserver(update)
		observer.observe(node)

		return () => observer.disconnect()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { width, height }
}

export interface ComputedDimensions<T extends HTMLElement> {
	width: number;
	height: number;
	ref: (node: T | null) => void;
}

/**
 * A React hook that computes the dimensions of an HTMLElement, including margins.
 *
 * This hook returns an object with the following properties:
 * - `ref`: a callback function to attach to the HTMLElement to compute its dimensions.
 * - `width`: the computed width of the element, including margins.
 * - `height`: the computed height of the element, including margins.
 *
 * The hook uses a ResizeObserver to update the dimensions when the element is resized.
 *
 * @template T The type of HTMLElement to compute dimensions for.
 * @returns An object with the computed dimensions, including a ref to attach to the element.
 */
export function useComputedDimensions<T extends HTMLElement>(): ComputedDimensions<T> {
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const observerRef = useRef<ResizeObserver | null>(null)
	const nodeRef = useRef<T | null>(null)

	const ref = useCallback((node: T | null) => {
		if (observerRef.current) observerRef.current.disconnect()
		if (!node) {
			setWidth(0)
			setHeight(0)
			return
		}
		
		const update = () => {
			const rect = node.getBoundingClientRect()
			const style = window.getComputedStyle(node)

			const marginY = convertMeasurement(style.marginTop) + convertMeasurement(style.marginBottom)
			const marginX = convertMeasurement(style.marginLeft) + convertMeasurement(style.marginRight)

			const newHeight = rect.height + marginY
			const newWidth = rect.width + marginX

			if (newHeight !== height) setHeight(newHeight)
			if (newWidth !== width) setWidth(newWidth)
		}

		update()

		const observer = new ResizeObserver(update)
		observer.observe(node)
		observerRef.current = observer
		nodeRef.current = node
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		return () => {
			observerRef.current?.disconnect()
		}
	}, [])

    return {ref, width, height}
}