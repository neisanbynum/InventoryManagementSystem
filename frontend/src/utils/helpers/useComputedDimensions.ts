import { useCallback, useEffect, useRef, useState } from "react";
import convertMeasurement from "./convertMeasurement";

export interface ComputedDimensions<T extends HTMLElement> {
	width: number
	height: number
	ref: (node: T | null) => void
}

export default function useComputedDimensions<T extends HTMLElement>(): ComputedDimensions<T> {
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
	}, [])

	useEffect(() => {
		return () => {
			observerRef.current?.disconnect()
		}
	}, [])

    return {ref, width, height}
}