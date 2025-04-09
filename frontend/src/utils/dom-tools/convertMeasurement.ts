import remToPx, { RemString } from './remToPx'

/**
 * Converts a measurement value from a string or number to a numeric value in pixels.
 *
 * @param {string|number} val - The measurement value to convert. Can be a numeric value or a string with a unit suffix (e.g. '10px', '2rem').
 * @returns {number} The converted measurement value in pixels.
 *
 * @description Supports conversion from 'px' and 'rem' units. If the input is already a number, it is returned unchanged.
 */
export default function convertMeasurement(val: string | number): number {
	if (typeof val === 'string') {
		if (val.endsWith('px')) return parseFloat(val)
		if (val.endsWith('rem')) return remToPx(val as RemString)
	}
	return val as number
}
