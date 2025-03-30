import { FormContent, InputDefinition, InputMap} from "./form-content.types"
import React from "react"
import { FormInput } from "../custom/inputs"

interface FormBuilderProps<T extends InputMap> {
	inputMap: T
	content?: FormContent<T>
}

export default function FormBuilder<T extends InputMap>({ inputMap, content }: FormBuilderProps<T>): React.ReactElement {
	type Row = { group: number, sub: number, row: number, components: ((keyof T)| React.ReactElement)[], tweak?: { [key in keyof T]?: Partial<InputDefinition>} }
	type Group = Row[]
	type GroupStructure = { rows: Group, style?: React.CSSProperties }
	type RowStructure = { row: Row, style?: React.CSSProperties }

	function getGroups(): Record<number, GroupStructure> {
		const grouped: Record<number, GroupStructure> = {}
		content?.components?.forEach((row) => {
			if (!grouped[row.group]) grouped[row.group] = { rows: [] }
			grouped[row.group].rows.push(row)
		})
		content?.groupStyles?.forEach(style => {
			if (grouped[style.group]) grouped[style.group].style = style.style
		})
		return grouped
	}

	function getSubGroups(group: Group): Record<number, GroupStructure> {
		const grouped: Record<number, GroupStructure> = {}
		group.forEach(row => {
			if (!grouped[row.sub]) grouped[row.sub] = { rows: [] }
			grouped[row.sub].rows.push(row)
			if (!grouped[row.sub].style) {
				const style = content?.subStyles?.find((style) => {
					return style.sub === row.sub && style.group === row.group
				})
				if (style) grouped[row.sub].style = style.style
			}
		})
		return grouped
	}

	function getRows(sub: Group): Record<number, RowStructure> {
		const grouped: Record<number, RowStructure> = {}
		sub.forEach(row => {
			grouped[row.row] = { row }
			const style = content?.rowStyles?.find((style) => {
				return style.row === row.row && style.sub === row.sub && style.group === row.group
			})
			if (style) grouped[row.row].style = style.style
		})
		return grouped
	}

	function RenderGroup({ groupKey, group, style }: { groupKey: string, group: Group, style?: React.CSSProperties }): React.ReactElement {
		const subgroups: [string, GroupStructure][] = Object.entries(getSubGroups(group))
		return (
			<div className="form-group gap-5" style={style}>
				{subgroups.map(([sub, { rows, style }]) => {
					const subKey = `${groupKey}-Sub${sub}`
					return <RenderSubGroup key={subKey} subKey={subKey} subgroup={rows} style={style} />
				})}
			</div>
		)
	}

	function RenderSubGroup({ subKey, subgroup, style }: { subKey: string, subgroup: Group, style?: React.CSSProperties }): React.ReactElement {
		const rows: [string, RowStructure][] = Object.entries(getRows(subgroup))
		return (
			<div className="form-group" style={style}>
				{rows.map(([ind, { row, style }]) => {
					const rowKey = `${subKey}-Row${ind}`
					return <RenderRow key={rowKey} rowKey={rowKey} row={row} style={style} />
				})}
			</div>
		)
	}

	function RenderRow({ rowKey, row, style }: { rowKey: string, row: Row, style?: React.CSSProperties }): React.ReactElement {
		return (
			<div className='form-row' style={style}>
				{row.components.map((comp, i) => {
					const compKey: string = `${rowKey}-Comp${i}`
					if (React.isValidElement(comp)) return React.cloneElement(comp, { key: compKey })

					if (!inputMap[comp]) {
						console.warn(`Missing inputMap definition for "${comp as string}"`)
						return null
					}

					const config: InputDefinition = { ...inputMap[comp], ...(row.tweak?.[comp] ?? {}) }

					return (
						<FormInput
							key={compKey}
							name={config.name}
							label={config.label}
							type={config.type}
							width={config.width}
							placeholder={config.placeholder}
							passwordHint={config.passwordHint}
						/>
					)
				})}
			</div>
		)
	}

	const groups: [string, GroupStructure][] = Object.entries(getGroups())
	return (
		<div className='form-content' style={{ gap: content?.gap }}>
			{groups.map(([groupID, { rows, style }]) => {
				const groupKey = `${content?.name}-Group${groupID}`
				return <RenderGroup key={groupKey} groupKey={groupKey} group={rows} style={style}/>
			})}
		</div>
	)
}