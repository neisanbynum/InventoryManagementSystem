import { useLayoutEffect, useState } from 'react'
import convertMeasurement from './convertMeasurement'

/**
 * A hook that calculates the width and height of an element, excluding its padding.
 *
 * @param {React.RefObject<T | null>} ref - A reference to the element whose dimensions are to be calculated.
 * @returns {{width: number, height: number}} An object containing the width and height of the element, excluding its padding.
 *
 * @description This hook uses the ResizeObserver API to observe changes to the element's size and update the calculated dimensions accordingly.
 */
export default function useExcludePadding<T extends HTMLElement>(
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
