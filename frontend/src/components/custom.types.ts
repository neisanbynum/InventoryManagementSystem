import { CSSProperties } from "react";

export interface Dimensions {
    minWidth?: CSSProperties['minWidth']
    width?: CSSProperties['width']
    maxWidth?: CSSProperties['maxWidth']
    minHeight?: CSSProperties['minHeight']
    height?: CSSProperties['height']
    maxHeight?: CSSProperties['maxHeight']
}