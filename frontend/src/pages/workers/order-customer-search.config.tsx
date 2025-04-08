import { FormContent, InputSchemaDefinition } from "@/components/form-content/form-content.types";
import { OrderCustomerSearchFormType } from "./order-customer-search.types";
import { Separator } from "@/components/ui/separator";

export const OrderCustomerSearchInputs: InputSchemaDefinition<OrderCustomerSearchFormType> = {
    customerID: { name: 'customerID', label: 'Customer ID', type: 'number' },
    last: { name: 'last', label: 'Last Name' },
    first: { name: 'first', label: 'First Name' },
    email: { name: 'email', label: 'Email Address', type: 'email' },
    phone: { name: 'phone', label: 'Phone Number', type: 'number', className: 'w-3/5' }
}

export const BrowserInputs: FormContent<typeof OrderCustomerSearchInputs> = {
    name: 'order-customer-search-form',
    rowStyles: [{ group: 1, sub: 1, row: 1, style: {justifyContent: 'start'}}],
    components: [
        { group: 1, sub: 1, row: 1, components: ['customerID']},
        { group: 1, sub: 2, row: 1, components: [<Separator/>]},
        { group: 1, sub: 3, row: 1, components: ['last', 'first']},
        { group: 1, sub: 3, row: 2, components: ['email', 'phone']}
    ]
}