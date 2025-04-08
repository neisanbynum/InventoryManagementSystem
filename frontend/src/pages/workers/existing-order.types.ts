export interface ExistingOrder {
    id: string | number
    product: string
    placed: string | Date
    status: 'placed' | 'working' | 'awaiting parts' | 'awaiting pickup' | 'shipped' | 'fulfilled'
    paid: 'awaiting' | 'partial' | 'full'
}