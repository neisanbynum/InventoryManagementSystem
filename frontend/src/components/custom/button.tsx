import { CSSProperties, ReactNode } from 'react'
import './button.css'
import { Dimensions } from '../custom.types'

type Varient = 'default' | 'destructive' | 'secondary' | 'outline' | 'ghost'

interface ClickProps extends Dimensions {
    type?: HTMLButtonElement['type']
    label: string
    onClick?: () => void
    varient?: Varient
    className?: HTMLElement['className']
    style?: CSSProperties
    disabled?: boolean
}

export function Clickable({...props}: ClickProps): ReactNode {
    return (
        <button
            type={props.type || 'button'}
            className={`clickable ${props.varient || 'default'} ${props.className}`.trim()}
            onClick={props.onClick}
            style={{
                minWidth: props.minWidth,
                width: props.width,
                maxWidth: props.maxWidth,
                minHeight: props.minHeight,
                height: props.height,
                maxHeight: props.maxHeight,
                ...props.style
            }}
            disabled={props.disabled || false}
        >
            {props.label}
        </button>
    )
}