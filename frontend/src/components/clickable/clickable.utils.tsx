import { useEffect, useMemo, useRef, useState } from 'react'
import { isIconOnlyArgs, useIconBySideArgs } from './clickable.types'

export function isIconOnly({ label, icons }: isIconOnlyArgs): boolean {
	return !label && icons !== undefined && icons.length > 0
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
	React.RefObject<T | null>,
	number | undefined
] {
	const ref = useRef<T>(null)
	const [size, setSize] = useState<number | undefined>(undefined)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const updateSize = () => {
			setSize(Math.max(element.offsetHeight, 0))
		}

		updateSize()

		const observer = new ResizeObserver(updateSize)
		observer.observe(element)

		return () => observer.disconnect()
	}, [])

	return [ref, size]
}

export function useIconsBySide({ icons, side, size }: useIconBySideArgs) {
	return useMemo(() => {
		if (!icons || icons.length === 0) return null
		return icons
			?.filter((ico) => (ico.side ?? 'left') === side)
			.map((ico, i) => <ico.icon key={`${ico.name}-${i}`} size={size} className={ico.class} />)
	}, [icons, side, size])
}
