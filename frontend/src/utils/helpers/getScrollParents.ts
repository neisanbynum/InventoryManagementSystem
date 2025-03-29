export default function getScrollParents(node: HTMLElement | null): HTMLElement[] {
	const parents: HTMLElement[] = []
	if (!node) return parents

	let current: HTMLElement | null = node.parentElement
	while (current) {
		const style = window.getComputedStyle(current)
		if (/(auto|scroll)/.test(style.overflow + style.overflowY + style.overflowX)) {
			parents.push(current)
		}
		current = current.parentElement
	}

	return parents
}