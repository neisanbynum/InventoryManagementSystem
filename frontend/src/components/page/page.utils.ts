import { PageProviderValues } from './page.types'
import { createContext, useContext, useLayoutEffect, useRef, useState } from "react";

export const PageContext = createContext<PageProviderValues | null>(null)

export function usePageContext(): PageProviderValues {
    const context = useContext(PageContext)
    if (!context) throw new Error('PageContext must be used within PageProvider')
    return context
}

export function useRefUpdates<T extends HTMLElement>() {
	const [rect, setRect] = useState<DOMRect | null>(null)
	const [scrollTop, setScrollTop] = useState<number>(-1)
	const [clientHeight, setClientHeight] = useState<number>(-1)
	const [scrollHeight, setScrollHeight] = useState<number>(-1)
    const [hovering, setHovering] = useState<boolean>(false)
    const [scrolling, setScrolling] = useState<boolean>(false)

    const ref = useRef<T | null>(null)

    useLayoutEffect(() => {
        const node = ref.current
        if (!node) return

        let scrollTimeout: ReturnType<typeof setTimeout> | null = null

        const update = () => {
			setRect(node.getBoundingClientRect())
			setScrollTop(node.scrollTop)
			setClientHeight(node.clientHeight)
			setScrollHeight(node.scrollHeight)
        }

        const handleMouseEnter = () => {
            setHovering(true)
            update()
        }

        const handleMouseLeave = () => {
            setHovering(false)
            update()
        }

        const setScroll = () => {
            setScrolling(true)
            if (scrollTimeout) clearTimeout(scrollTimeout)

            update()

            scrollTimeout = setTimeout(() => {
                setScrolling(false)
            }, 1500)
        }

        update()

        node.addEventListener('scroll', setScroll)
        node.addEventListener('mouseenter', handleMouseEnter)
        node.addEventListener('mouseleave', handleMouseLeave)
        const observer = new ResizeObserver(update)
        observer.observe(node)

        return () => {
            node.removeEventListener('scroll', setScroll)
            if (scrollTimeout) clearTimeout(scrollTimeout)
            node.removeEventListener('mouseenter', handleMouseEnter)
            node.removeEventListener('mouseleave', handleMouseLeave)
            observer.disconnect()
        }
    }, [])

	return [ref, rect, scrollTop, clientHeight, scrollHeight, hovering, scrolling] as const
}