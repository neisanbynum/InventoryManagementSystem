export interface PageProviderValues {
    scrollBarStyle?: React.CSSProperties
    scrollThumbStyle?: React.CSSProperties
    renderScrollBar: boolean
    ref: React.RefObject<HTMLDivElement | null>
}

export interface PageProviderProps {
    children?: React.ReactNode
}