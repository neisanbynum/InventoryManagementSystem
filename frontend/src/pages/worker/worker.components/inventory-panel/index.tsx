import { PanelProps } from '../../worker.types'
import Table from '@/components/table'
import { columns, reducedColumns } from './inventory-panel.config'
import { useEffect, useRef, useState } from 'react'
import server from '@/utils/server'
import useBreakpoint from '@/utils/responsive-tools/useBreakpoint'

export default function InventoryPanel({ className, useableSize }: PanelProps): React.ReactElement {
	const TableRef = useRef<HTMLDivElement>(null)
	const inventoryColumns = useBreakpoint(
		{ lg: reducedColumns, xl: columns },
		{ ref: TableRef, breakpoints: { lg: 800 } }
	)
	const teamID = 'Implement_TeamID_Into_AppSlice'
	const [inventory, setInventory] = useState([])

	useEffect(() => {
		server
			.get(`/inventory/${teamID}`)
			.then(() => {
				setInventory([])
			})
			.catch(() => {
				// pass
			})
	}, [])

	return (
		<div
			ref={TableRef}
			id='Worker-Dashboard-Inventory-Panel'
			className={className}
			style={{ height: useableSize?.height, maxHeight: useableSize?.height }}
		>
			<Table
				columns={inventoryColumns}
				data={inventory}
				height={useableSize?.height}
				minColWidth={'75px'}
				className='shadow-sm hover:shadow-lg'
				initRowsPerPage={30}
				filter
			/>
		</div>
	)
}
