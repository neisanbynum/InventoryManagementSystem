import { PanelProps } from '../../worker.types'
import useComputedDimensions from '@/utils/helpers/useComputedDimensions'
import OrderCustomerSearch from './order-customer-search'
import { useLayoutEffect, useRef, useState } from 'react'
import OrderTable from './order-table'

export default function OrderPanel({ className, useableSize }: PanelProps): React.ReactElement {
	const OrderPanelRef = useRef<HTMLDivElement>(null)
	const orderCustomerPanel = useComputedDimensions()

	const [orderTableHeight, setOrderTableHeight] = useState<number | undefined>(undefined)

	useLayoutEffect(() => {
		const orderPanelNode = OrderPanelRef.current
		if (!useableSize?.height || !orderPanelNode || !orderCustomerPanel.height) return

		const gap = parseFloat(window.getComputedStyle(orderPanelNode).gap)
		
		setOrderTableHeight(useableSize.height - orderCustomerPanel.height - gap)
	}, [orderCustomerPanel, useableSize])

	return (
		<div
			ref={OrderPanelRef}
			id='Worker-Dashboard-Order-Panel'
			className={className}
			style={{ height: useableSize?.height, maxHeight: useableSize?.height }}
		>
			<OrderCustomerSearch ref={orderCustomerPanel.ref} />
			<OrderTable height={orderTableHeight} />
		</div>
	)
}
