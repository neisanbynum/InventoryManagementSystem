export interface PageProviderValues {
    scrollBarStyle?: React.CSSProperties
    scrollThumbStyle?: React.CSSProperties
    renderScrollBar: boolean
    defaultRef: React.RefObject<HTMLDivElement | null>
}

export interface PageProviderProps {
    children?: React.ReactNode
    ref?: React.RefObject<HTMLDivElement | null>
}