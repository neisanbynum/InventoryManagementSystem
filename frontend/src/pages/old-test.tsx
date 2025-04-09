// import PageWrapper from '@/components/page-wrapper'
import OrderCustomerSearch from './workers/components/order-customer-search'
import DataTable from '@/components/table'
import { TestUserColumns, TestUserData } from './workers/existing-order.config'
import TopbarMenu from '@/components/page-wrapper/topbar-menu'
import ThemeToggle from '@/components/theme-toggle'
import { RootState } from '@/state/main'
import { useSelector } from 'react-redux'
import React from 'react'
import { cn } from '@sglara/cn'

export default function TestPage(): React.ReactNode {
	return (
		<div className={'relative flex flex-col w-screen max-w-screen h-screen max-h-screen overflow-x-hidden sm:overflow-y-auto md:overflow-y-hidden'}>
			<Topbar/>
			<div className='flex flex-col grow justify-center items-center p-4'>
				<div className='vstack h-full max-h-full max-w-full gap-4 min-w-[34rem] md:w-1/3 sm:w-full'>
					<OrderCustomerSearch/>
					<div className='w-full max-h-full'>
						<DataTable columns={TestUserColumns} data={TestUserData} filter className='shadow-md hover:shadow-lg'/>
					</div>
				</div>
			</div>
		</div>
		// <Webpage>
		// 	<div className='vstack min-h-fit max-w-full gap-4 min-w-[34rem] md:w-1/3 sm:w-full'>
		// 		<OrderCustomerSearch/>
		// 		<DataTable columns={TestUserColumns} data={TestUserData} filter className='w-full grow shadow-md hover:shadow-lg'/>
		// 	</div>
		// </Webpage>
	)
}

interface ComponentProps<T extends HTMLElement> extends React.HTMLAttributes<T> {
	children?: React.ReactNode
}

function Grid({ children, style, ...rest }: ComponentProps<HTMLDivElement>): React.ReactElement {
	return (
		<div {...rest} style={{...style, display: 'grid'}}>
			{children}
		</div>
	)
}

interface GridItemProps<T extends HTMLDivElement> extends ComponentProps<T> {
	rowStart?: number
	rowEnd?: number
	colStart?: number
	colEnd?: number
	gridArea?: [number, number?, number?, number?]
	zIndex?: React.HTMLAttributes<T>['']
}

function Topbar(): React.ReactElement {
	return (
		<div className='sticky top-0 z-10 flex w-full h-12 justify-between items-center p-2 bg-slate-50 dark:bg-black'>
			<TopbarHeader/>
			<TopbarControls/>
		</div>
	)
}

function TopbarHeader(): React.ReactNode {
	const { authenticated, userName } = useSelector((state: RootState) => state.app)

	if (!authenticated) return <p>Inventory Management System</p>
	return <p>{`${userName?.last}, ${userName?.first} ${userName?.middle}`.trim()}</p>
}

function TopbarControls(): React.ReactNode {
	return (
		<div className='hstack w-fit justify-between gap-2'>
			<TopbarMenu />
			<ThemeToggle />
		</div>
	)
}