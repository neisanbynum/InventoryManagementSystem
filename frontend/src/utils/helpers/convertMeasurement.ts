import { remToPx } from "./breakpoint-switch"

export default function convertMeasurement(val: string|number): number {
    if (typeof val === 'number') return val
    if (val.endsWith('px')) return Number(val.replace('px', ''))
    if (val.endsWith('rem')) return remToPx(Number(val.replace('rem', '')))
    return 0
}