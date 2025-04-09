import Page from '@/components/page'
import useExcludePadding from '@/utils/dom-tools/useExcludePadding'
import { useEffect, useRef } from 'react'
import InventoryPanel from './worker.components/inventory-panel'
import useBreakpoint from '@/utils/responsive-tools/useBreakpoint'
import OrderPanel from './worker.components/order-panel'
import { cn } from '@sglara/cn'
import remToPx from '@/utils/dom-tools/remToPx'

export default function WorkerDashboardPage(): React.ReactElement {
	const PageRef = useRef<HTMLDivElement>(null)
	const DashboardRef = useRef<HTMLDivElement>(null)

	const useablePage = useExcludePadding(PageRef)

	const PageClass = useBreakpoint({ lg: `flex-col min-h-[${useablePage.height * 2 + remToPx(4)}]`, xl: 'flex-row' }, { ref: DashboardRef })
	const InventoryPanelClass = useBreakpoint({ lg: 'w-full', xl: 'w-1/2', xxl: 'w-2/3' }, { ref: DashboardRef })
	const OrderPanelClass = useBreakpoint({ lg: 'w-full', xl: 'w-1/2', xxl: 'w-1/3' }, { ref: DashboardRef })

    useEffect(() => console.log(PageClass), [PageClass])

	return (
		<Page ref={PageRef}>
			<div
				ref={DashboardRef}
				className={cn('flex w-full max-w-full h-full max-h-full gap-4 hidden-scroll', PageClass)}
			>
				<InventoryPanel
					useableSize={useablePage}
					className={cn('flex flex-col min-w-[30rem]', InventoryPanelClass)}
				/>
				<OrderPanel
					className={cn('flex flex-col min-w-[30rem] gap-4', OrderPanelClass)}
					useableSize={useablePage}
				/>
			</div>
		</Page>
	)
}
