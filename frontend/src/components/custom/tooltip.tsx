import getScrollParents from '@/utils/helpers/getScrollParents';
import clamp from '@/utils/helpers/number-clamp'
import { cn } from '@sglara/cn'
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

type Position = { top: number; left: number }
type ParentProps = { children: React.ReactNode }
type Placement =
	| 'top'
	| 'top-start'
	| 'top-end'
	| 'bottom'
	| 'bottom-start'
	| 'bottom-end'
	| 'left'
	| 'right'
	| 'center'
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
	disabled?: boolean
	delay?: number
	placement?: Placement
	padding?: number
	gap?: number
}

export function ToolTip({
	children,
	disabled = false,
	delay = 700,
	placement = 'bottom',
	padding = 8,
	gap = 8
}: ToolTipProps): React.ReactNode {
	// Children Refs
	const triggerRef = useRef<HTMLDivElement | null>(null)
	const contentRef = useRef<HTMLDivElement | null>(null)

	// Passed Props
	const [visible, setVisible] = useState<boolean>(false)
	const [contentPosition, setContentPosition] = useState<Position | null>(null)

	// Functions
	const show = useCallback(() => setVisible(!disabled ? true : false), [disabled])
	const hide = useCallback(() => setVisible(false), [])

	// Position Logic
	useEffect(() => {
		if (!visible || !triggerRef.current || !contentRef.current) return

		function calculate(): void {
			if (!triggerRef.current || !contentRef.current) return

			const trigger = triggerRef.current.getBoundingClientRect()
			const content = contentRef.current.getBoundingClientRect()
			const bounds = document.documentElement.getBoundingClientRect()

			setContentPosition(getPosition({ trigger, content, body: bounds, placement, gap }))
		}

		calculate()

		const scrollParents = getScrollParents(triggerRef.current)

        scrollParents.forEach(parent =>
            parent.addEventListener('scroll', calculate, { passive: true })
        )
        window.addEventListener('scroll', calculate, { passive: true })
        window.addEventListener('resize', calculate)

        const observer = new ResizeObserver(calculate)
        observer.observe(contentRef.current)

        return () => {
            scrollParents.forEach(parent =>
                parent.removeEventListener('scroll', calculate)
            )
            window.removeEventListener('scroll', calculate)
            window.removeEventListener('resize', calculate)
            observer.disconnect()
        }
	}, [gap, padding, placement, visible])

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

export function ToolTipTrigger({ children }: ParentProps): React.ReactNode {
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
			onClick={hideToolTip}
		>
			{children}
		</div>
	)
}

export function ToolTipContent({ children }: ParentProps): React.ReactNode {
	const { contentRef, position, visible } = useToolTip()

	if (!visible) return null

	return (
		<div
			ref={contentRef}
			className={cn('tooltip-content', position && 'tooltip-visible')}
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

interface PositionInput {
	trigger: DOMRect
	content: DOMRect
	body: DOMRect
	placement: Placement
	gap?: number
    padding?: number
}

function getPosition({ trigger, content, body, placement, gap = 8, padding = 8 }: PositionInput): Position {
	const scrollY = window.scrollY
	const scrollX = window.scrollX

	const centerX = trigger.left + trigger.width / 2 - content.width / 2
	const centerY = trigger.top + trigger.height / 2 - content.height / 2

	const placements: Record<Placement, Position> = {
		'top': {
			top: trigger.top + scrollY - content.height - gap,
			left: centerX + scrollX
		},
		'top-start': {
			top: trigger.top + scrollY - content.height - gap,
			left: trigger.left + scrollX
		},
		'top-end': {
			top: trigger.top + scrollY - content.height - gap,
			left: trigger.right - content.width + scrollX
		},
		'bottom': {
			top: trigger.bottom + scrollY + gap,
			left: centerX + scrollX
		},
		'bottom-start': {
			top: trigger.bottom + scrollY + gap,
			left: trigger.left + scrollX
		},
		'bottom-end': {
			top: trigger.bottom + scrollY + gap,
			left: trigger.right - content.width + scrollX
		},
		'left': {
			top: centerY + scrollY,
			left: trigger.left + scrollX - content.width - gap
		},
		'right': {
			top: centerY + scrollY,
			left: trigger.right + scrollX + gap
		},
		'center': {
			top: centerY + scrollY,
			left: centerX + scrollX
		}
	}

	const { top, left } = placements[placement]

	// Clamp inside viewport (collision-proofing)
	return {
		top: clamp(top, padding, body.height - content.height - padding),
		left: clamp(left, padding, body.width - content.width - padding)
	}
}
