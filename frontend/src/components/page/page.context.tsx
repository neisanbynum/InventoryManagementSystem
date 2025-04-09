import { useLayoutEffect, useState } from 'react'
import { PageContext, useRefUpdates } from './page.utils'
import { PageProviderProps } from './page.types'

export default function PageProvider({ children, ref }: PageProviderProps): React.ReactElement {
	const scrollBarPadding: React.CSSProperties['padding'] = 4
	const scrollBarWidth: React.CSSProperties['width'] = 16

	const [scrollBarStyle, setScrollBarStyle] = useState<React.CSSProperties | undefined>(undefined)
	const [scrollThumbStyle, setScrollThumbStyle] = useState<React.CSSProperties | undefined>(undefined)
	const [renderScrollBar, setRenderScrollBar] = useState<boolean>(false)

	const [rect, scrollTop, clientHeight, scrollHeight, hovering, scrolling, defaultRef] = useRefUpdates<HTMLDivElement>(ref)

	useLayoutEffect(() => {
		let frame: number
		const node = defaultRef.current
		if (!node || !rect) return

		const renderScroll = () => {
			const hidden: number = scrollHeight - clientHeight
			setRenderScrollBar(hidden > 0)
			if (hidden <= 0) return

			setScrollBarStyle({
				position: 'fixed',
				top: rect.top,
				right: 0,
                zIndex: 20,
				height: clientHeight,
				width: scrollBarWidth,
				opacity: scrolling ? 0.25 : 0.1,
				transition: 'all',
				transitionDuration: '250ms'
			})

			const scrollPercent: number = scrollTop / hidden

			const thumbLength: number = (clientHeight * (clientHeight - scrollBarPadding * 2)) / scrollHeight
			const thumbOrigin: number = rect.top + scrollBarPadding
			const thumbTermination: number = rect.top + clientHeight - thumbLength - scrollBarPadding
			const thumbTop: number = thumbOrigin + (thumbTermination - thumbOrigin) * scrollPercent

			setScrollThumbStyle({
				position: 'fixed',
				top: thumbTop,
				right: scrollBarPadding,
                zIndex: 20,
				height: thumbLength,
				width: scrollBarWidth - scrollBarPadding * 2,
				opacity: 0.75,
				transition: 'all'
			})
		}

		const hideScroll = () => {
			setScrollBarStyle({ ...scrollBarStyle, width: 0, padding: 0 })
			setScrollThumbStyle({ ...scrollThumbStyle, width: 0 })
		}

		if (hovering) {
			frame = requestAnimationFrame(renderScroll)
		} else {
			frame = requestAnimationFrame(hideScroll)
		}

		return () => cancelAnimationFrame(frame)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clientHeight, hovering, scrolling, rect, scrollHeight, scrollTop])

	return (
		<PageContext.Provider value={{ scrollBarStyle, scrollThumbStyle, renderScrollBar, defaultRef }}>
			{children}
		</PageContext.Provider>
	)
}
