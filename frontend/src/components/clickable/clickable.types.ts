type SVGAttributes = Partial<React.SVGProps<SVGSVGElement>>;
type ElementAttributes = React.RefAttributes<SVGSVGElement> & SVGAttributes
interface LucideProps extends ElementAttributes {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
}

export type ClickableVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'icon'
export type Icon = React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
export type IconDesc = { icon: Icon, name: string, class?: string, side?: 'left' | 'right' }
export type Icons = IconDesc[]
export type Side = 'left' | 'right'

export interface ClickableProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ClickableVariant
	label?: string
	icons?: Icons
	isLoading?: boolean
}
export interface ClickableBodyProps {
    label?: string
	icons?: Icons
    size?: number
}

export type isIconOnlyArgs = { label?: string, icons?: Icons }
export type useIconBySideArgs = { icons?: Icons, side: Side, size?: number }