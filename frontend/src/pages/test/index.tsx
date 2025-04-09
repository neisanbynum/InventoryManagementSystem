import Page from '@/components/page'
import React, { useLayoutEffect, useRef, useState } from 'react'
import OrderCustomerSearch from '../workers/components/order-customer-search'
import { TestUserColumns, TestUserData } from '../workers/existing-order.config'
import Table from '@/components/table'
import { cn } from '@sglara/cn'

export default function TestPage(): React.ReactElement {
	const [clientHeight, setClientHeight] = useState<number | undefined>()
	useLayoutEffect(() => {
		const page = document.getElementById('Page-Content')
		if (page) {
			const padding = Number(window.getComputedStyle(page).padding.replace('px', ''))
			setClientHeight(page.clientHeight - padding * 2)
		}
	}, [])

	const orderPanelRef = useRef<HTMLDivElement | null>(null)
    const [orderPanelHeight, setOrderPanelHeight] = useState<number>()
	const orderCustomerSearchRef = useRef<HTMLDivElement | null>(null)
	const [orderTableHeight, setOrderTableHeight] = useState<number | undefined>()
	useLayoutEffect(() => {
		const orderPanel = orderPanelRef.current
		const customerPanel = orderCustomerSearchRef.current
		if (!orderPanel || !customerPanel || !clientHeight) return
        setOrderPanelHeight(orderPanel.getBoundingClientRect().height)
		const orderPanelGap = Number(window.getComputedStyle(orderPanel).gap.replace('px', ''))
		setOrderTableHeight(clientHeight - customerPanel.getBoundingClientRect().height - orderPanelGap)
	}, [clientHeight])

	return (
		<Page>
            <div className='flex sm:flex-col md:flex-col lg:flex-row w-full max-w-full h-full max-h-full gap-4'>
                <InventoryPanel pageHeight={clientHeight} className={'xl:w-2/3 lg:w-1/2 sm:w-full md:w-full'}>
                    <Table
                        columns={[]}
                        data={[]}
                        height={orderPanelHeight}
                        className='shadow-sm hover:shadow-lg'
                        displayedRows={30}
                    />
                </InventoryPanel>
                <OrderPanel ref={orderPanelRef} pageHeight={clientHeight} className={'xl:w-1/3 lg:w-1/2 sm:w-full md:w-full'}>
                    <OrderCustomerSearch ref={orderCustomerSearchRef} />
                    <Table
                        columns={TestUserColumns}
                        data={TestUserData}
                        height={orderTableHeight}
                        className='shadow-sm hover:shadow-lg'
                    />
                </OrderPanel>
            </div>
		</Page>
	)
}

interface PanelProps {
	children?: React.ReactNode
	ref?: React.RefObject<HTMLDivElement | null>
	pageHeight?: number
    className?: React.HTMLAttributes<HTMLDivElement>['className']
}

function OrderPanel({ children, ref, pageHeight, className }: PanelProps): React.ReactElement {
	return (
		<div
			ref={ref}
			className={cn('vstack min-w-[30rem] gap-4 p-0 m-0', className)}
			style={{ height: pageHeight, maxHeight: pageHeight }}
		>
			{children}
		</div>
	)
}

function InventoryPanel({ children, ref, pageHeight, className }: PanelProps): React.ReactElement {
	return (
		<div
			ref={ref}
			className={cn('vstack min-w-[30rem] gap-4 p-0 m-0', className)}
			style={{ height: pageHeight, maxHeight: pageHeight }}
		>
			{children}
		</div>
	)
}
