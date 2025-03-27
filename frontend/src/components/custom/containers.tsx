import { CSSProperties, ReactNode } from "react";

interface StackProps {
    children?: ReactNode
    key?: string
    minWidth?: CSSProperties['minWidth']
    width?: CSSProperties['width']
    maxWidth?: CSSProperties['maxWidth']
    minHeight?: CSSProperties['minHeight']
    height?: CSSProperties['height']
    maxHeight?: CSSProperties['maxHeight']
    justify?: CSSProperties['justifyContent']
    align?: CSSProperties['alignItems']
    gap?: CSSProperties['gap']
    padding?: CSSProperties['padding']
    margin?: CSSProperties['margin']
    className?: string
    style?: CSSProperties
}

function Stack({...p}: StackProps, direction: CSSProperties['flexDirection']): ReactNode {
    return (
        <div
            key={p.key}
            className={p.className}
            style={{
                display: 'flex',
                flexDirection: direction,
                minWidth: p.minWidth,
                width: p.width || '100%',
                maxWidth: p.maxWidth,
                minHeight: p.minHeight,
                height: p.height || '100%',
                maxHeight: p.maxHeight,
                justifyContent: p.justify || 'center',
                alignItems: p.align || "center",
                gap: p.gap,
                padding: p.padding,
                margin: p.margin,
                ...p.style
            }}
        >
            {p.children}
        </div>
    )
}

export function HStack({...p}: StackProps): ReactNode {
    return Stack(p, 'row')
}

export function VStack({...p}: StackProps): ReactNode {
    return Stack(p, 'column')
}