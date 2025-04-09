const isBrowser = typeof window !== 'undefined'


export type RemString = string & { __brand: 'rem' };

function isRemString(str: string): str is RemString {
  return str.endsWith('rem');
}

/**
 * Converts a value from rem units to px units.
 *
 * @param {number|RemString} rem - The value in rem units to convert. Can be a numeric value or a string with 'rem' suffix (e.g. '2rem').
 * @returns {number} The converted value in px units.
 *
 * @description If running in a browser environment, uses the current font size of the document element.
 *              Otherwise, assumes a default font size of 16px.
 * @throws {Error} If the input string is not a valid rem string.
 */
export default function remToPx(rem: number | RemString): number {
  if (typeof rem === 'string' && !isRemString(rem)) {
    throw new Error('Invalid rem string');
  }
  const val = typeof rem === 'string' ? parseFloat(rem) : rem;
  return isBrowser ? val * parseFloat(getComputedStyle(document.documentElement).fontSize) : val * 16;
}
