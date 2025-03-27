export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function titlecase(str: string): string {
    const step_two: string[] = [':', '-', '.', '?', '!']
	const words: string[] = str.split(' ')
    for (let i: number = 0; i < words.length; i++) {
        // Check if the word is the first word
        if (i === 0) {
            words[i] = capitalize(words[i])
        // Check if the word follows a colon, em dash, or end punctuation
        } else if (step_two.includes(words[i - 1].slice(-1))) {
            words[i] = capitalize(words[i])
        // Check if the word contains a hyphen
        } else if (words[i].includes('-')) {
            const split: string[] = words[i].split('-')
            words[i] = split.map((word: string) => capitalize(word)).join('-')
        // Check if the word is longer than 3 characters
        } else if (words[i].length >= 4) {
            words[i] = capitalize(words[i])
        }
    }
    return words.join(' ')
}
