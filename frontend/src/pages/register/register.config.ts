import { FormContent } from "@/components/form-content/form-content.types";

export const largeLayoutInputs: FormContent = {
    name: 'register',
    content: [
        {
            name: 'company-info',
            inputs: [
                { name: 'userID', label: 'Employee ID', type: 'number' },
                { name: 'teamID', label: 'Team ID', type: 'number' }
            ]
        },
        {
            name: 'personal-info',
            rows: [
                {
                    name: 'name',
                    inputs: [
                        { name: 'last', label: 'Last Name' },
                        { name: 'first', label: 'First Name' },
                        { name: 'middle', label: 'Middle Name', width: '75%' }
                    ]
                },
                {
                    name: 'contact',
                    inputs: [
                        { name: 'email', label: 'Email Address', type: 'email' },
                        { name: 'phone', label: 'Phone Number', type: 'number', width: '60%' }
                    ]
                }
            ]
        },
        {
            name: 'password',
            inputs: [
                { name: 'password', label: 'Password', type: 'password' },
                { name: 'passwordConfirm', label: 'Confirm Password', type: 'password', passwordHint: false }
            ]
        }
    ]
}