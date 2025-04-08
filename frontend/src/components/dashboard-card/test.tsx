import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card"

interface CardContainerProps {
    children?: React.ReactNode
}

export function DashboardCardContainer({ children }: CardContainerProps): React.ReactElement {
    return (
        <div className={'hstack gap-4 flex-wrap'}>
            {children}
        </div>
    )
}

interface DashboardCardProps {
	title: string
	desc: string
}

export function DashboardCard({ ...props }: DashboardCardProps): React.ReactElement {
	return (
		<Card
			className='flex grow min-w-60 max-w-1/2 h-40 shadow hover:shadow-lg'
		>
			<CardHeader>
				<CardTitle>{props.title}</CardTitle>
				<CardDescription>{props.desc}</CardDescription>
			</CardHeader>
		</Card>
	)
}
