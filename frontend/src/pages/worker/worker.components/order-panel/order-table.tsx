import Table from '@/components/table'
import React, { useEffect, useState } from 'react'
import { columns } from './order-table.config'
import { cn } from '@sglara/cn'
import server from '@/utils/server'

export interface OrderTableProps {
	className?: React.HTMLAttributes<HTMLDivElement>['className']
	height?: React.CSSProperties['height']
}

export default function OrderTable({ className, height }: OrderTableProps): React.ReactElement {
	// TODO: Incorporate TeamID into App Slice w/ Auth and User
	const teamID = 'Implement_TeamID_Into_AppSlice'
	const [data, setData] = useState([])

	useEffect(() => {
		server
			.get(`/orders/${teamID}`)
			.then(() => {
				setData([])
			})
			.catch(() => {
				// TODO: Implement Backend Route to GET orders
			})
	}, [])

	return (
		<Table columns={columns} data={data} height={height} className={cn('shadow-sm hover:shadow-lg', className)} filter />
	)
}
