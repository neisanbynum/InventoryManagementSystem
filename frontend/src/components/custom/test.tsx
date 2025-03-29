import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";


type Position = {top: number; left: number}
type ParentProps = {children: React.ReactNode}
interface ToolTipContextProps {
    triggerRef: React.RefObject<HTMLDivElement | null>
    contentRef: React.RefObject<HTMLDivElement | null>
    visible: boolean
    show: () => void
    hide: () => void
    delay: number
    position: Position | null
}

const ToolTipContext = createContext<ToolTipContextProps | null>(null)
const useToolTip = () => {
    const context = useContext(ToolTipContext)
    if (!context) throw new Error('ToolTip components must be used within <ToolTip>')
    return context
}

interface ToolTipProps {
    children?: React.ReactNode
    delay?: number
}

export function ToolTip({children, delay = 1500}: ToolTipProps): React.ReactNode {
    // Children Refs
    const triggerRef = useRef<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)

    // Passed Props
    const [visible, setVisible] = useState<boolean>(false)
    const [contentPosition, setContentPosition] = useState<Position|null>(null)

    // Functions
    const show = useCallback(() => setVisible(true), [])
    const hide = useCallback(() => setVisible(false), [])

    // Position Logic
    useEffect(() => {
        if (!visible || !triggerRef.current || !contentRef.current) return

        function calculate(): void {
            if (!triggerRef.current || !contentRef.current) return

            const trigger = triggerRef.current.getBoundingClientRect()
            const content = contentRef.current.getBoundingClientRect()
            const body = document.documentElement.getBoundingClientRect()

            const maxLeft = body.width - content.width - 8
            const left = Math.min(trigger.left + window.scrollX, maxLeft)

            const spaceBelow = body.height - trigger.bottom
            const shouldFlip = spaceBelow < content.height + 8
            const top = shouldFlip ? trigger.top + window.scrollY - content.height - 8 : trigger.bottom + window.scrollY + 8

            setContentPosition({top, left})
        }

        calculate()

        const observer = new ResizeObserver(calculate)
        observer.observe(contentRef.current)

        return () => observer.disconnect()
    }, [visible])


    return (
        <ToolTipContext.Provider
            value={{
                triggerRef,
                contentRef,
                visible,
                show,
                hide,
                delay,
                position: contentPosition
            }}
        >
            <div>{children}</div>
        </ToolTipContext.Provider>
    )
}

export function ToolTipTrigger({children}: ParentProps): React.ReactNode {
    const { triggerRef, show, hide, delay } = useToolTip()
    const timeoutRef = useRef<number | null>(null)

    function showToolTip(): void {
        timeoutRef.current = window.setTimeout(() => {
            show()
        }, delay)
    }

    function hideToolTip(): void {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        hide()
    }

    return (
        <div
            ref={triggerRef}
            onMouseEnter={showToolTip}
            onMouseLeave={hideToolTip}
        >
            {children}
        </div>
    )
}

export function ToolTipContent({children}: ParentProps):  React.ReactNode {
    const { contentRef, position, visible } = useToolTip()

    if (!visible || !position) return null

    return (
        <div 
            ref={contentRef}    
            className="tooltip-content"
            style={{
                position: 'absolute',
                zIndex: 100,
                ...position
            }}
        >
            {children}
        </div>
    )
}