import { FormContent } from '@/pages/register/test.config'
import { InputDefinition, InputMap } from './form-content.types'
import { cn } from '@sglara/cn'
import React from 'react'
import { FormInput } from '../custom/inputs'

interface FormBuilderProps<T extends InputMap> {
	inputMap: T
	content?: FormContent<T>
}

export default function FormBuilder<T extends InputMap>({
	inputMap,
	content
}: FormBuilderProps<T>): React.ReactElement {
	type Row = {
		group: number
		subgroup?: number
		groupRow: number
		components: (keyof T | React.ReactElement)[]
		tweak?: { [key in keyof T]: Partial<InputDefinition> }
	}
	type Group = Row[]

	function getGroups(): Record<number, Group> {
		const grouped: Record<number, Group> = {}
		content?.components?.forEach((row) => {
			if (!grouped[row.group]) grouped[row.group] = []
			grouped[row.group].push(row)
		})
		return grouped
	}

	const groups: Record<number, Group> = getGroups()
	function FormGroups({ group }: { group: Group }): React.ReactElement {
		const groupKey: string = `${content?.name}-Group${group[0].group}`
		const groupStyle: React.CSSProperties | undefined = content?.groupStyles?.find(
			(style) => style.group === group[0].group && style.subgroup === group[0].subgroup
		)?.style

		const subgroups: Record<number, Group> = {}
		group.forEach((row) => {
			if (row.subgroup) {
				if (!subgroups[row.subgroup]) subgroups[row.subgroup] = []
				subgroups[row.subgroup].push(row)
			}
		})
		const groups: [string, Group][] = [...Object.entries(subgroups)].sort(([a], [b]) => Number(a) - Number(b))
		if (groups.length !== 0) {
			return (
				<div key={groupKey} className={cn('form-group', 'gap-4')} style={groupStyle}>
					{groups.map(([id, grp]) => {
						const subgroupKey: string = `${content?.name}-${grp[0].group}-${id}`
						const subgroupStyle: React.CSSProperties | undefined = content?.groupStyles?.find(
							(style) => style.group === grp[0].group && style.subgroup === grp[0].subgroup
						)?.style

						return (
							<div key={subgroupKey} className='form-group' style={subgroupStyle}>
								{grp.map((row, i) => {
									const rowKey: string = `${subgroupKey}-Row${i}`
									return <FormRow key={rowKey} row={row} />
								})}
							</div>
						)
					})}
				</div>
			)
		}

		return (
			<div key={groupKey} className='form-group' style={groupStyle}>
				{group.map((row, i) => {
					const rowKey: string = `${groupKey}-Row${i}`
					return <FormRow key={rowKey} row={row} />
				})}
			</div>
		)
	}

	function FormRow({ row }: { row: Row }): React.ReactElement {
		const rowStyle: React.CSSProperties | undefined = content?.rowStyles?.find(
			(style) => style.group === row.group && style.subgroup === row.subgroup && style.groupRow === row.groupRow
		)?.style

		return (
			<div className='form-row' style={rowStyle}>
				{row.components.map((comp, i) => {
					const compKey: string = `${content?.name}-Group${row.group}-${
						row.subgroup && `Subgroup${row.subgroup}-`
					}Row${row.groupRow}-Comp${i}`
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

	return (
		<div className='form-content' style={{ gap: content?.gap }}>
			{Object.values(groups).map((group, i) => (
				<FormGroups key={`${content?.name}-Group${i}`} group={group} />
			))}
		</div>
	)
}
