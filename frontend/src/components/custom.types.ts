import { CSSProperties } from "react";

export interface Dimensions {
    minWidth?: CSSProperties['minWidth']
    width?: CSSProperties['width']
    maxWidth?: CSSProperties['maxWidth']
    minHeight?: CSSProperties['minHeight']
    height?: CSSProperties['height']
    maxHeight?: CSSProperties['maxHeight']
}

export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl' | CSSProperties['fontSize']
export type FontWeight = 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black' | CSSProperties['fontWeight']
