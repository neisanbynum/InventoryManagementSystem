import Page from '@/components/page'
import React, { useLayoutEffect, useRef, useState } from 'react'
import Table from '@/components/table'
import { cn } from '@sglara/cn'
import OrderCustomerSearch from './components/order-customer-search'
import { TestUserColumns, TestUserData } from './existing-order.config'

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
            <div className='flex lg:flex-row md:flex-col w-full max-w-full h-full max-h-full gap-4'>
                <InventoryPanel pageHeight={clientHeight} className={'lg:row-start-1 lg:col-start-1 md:row-start-2 md:col-start-1'}>
                    <Table
                        columns={[]}
                        data={[]}
                        height={orderPanelHeight}
                        className='shadow-sm hover:shadow-lg'
                        displayedRows={30}
                    />
                </InventoryPanel>
                <OrderPanel ref={orderPanelRef} pageHeight={clientHeight} className={'lg:row-start-1 lg:col-start-2 md:row-start-1 md:col-start-1'}>
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
			className={cn('vstack min-w-[30rem] xl:w-1/3 lg:w-1/2 md:w-full gap-4 p-0 m-0', className)}
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
			className={cn('vstack min-w-[30rem] xl:w-2/3 lg:w-1/2 md:w-full gap-4 p-0 m-0', className)}
			style={{ height: pageHeight, maxHeight: pageHeight }}
		>
			{children}
		</div>
	)
}
