import { FormContent } from "@/components/form-content/form-content.types";
import PasswordRecovery from "./password-recovery";

export const inputs: FormContent = {
    name: 'sign-in',
    content: [
        {
            name: 'credentials',
            rows: [
                {
                    name: 'userID',
                    inputs: [{ name: 'userID', label: 'Employee ID', type: 'number' }]
                },
                {
                    name: 'password',
                    inputs: [{ name: 'password', label: 'Password', type: 'password' }]
                },
                {
                    name: 'password-recovery',
                    inputs: [<PasswordRecovery/>],
                    justify: 'start'
                }
            ]
        }
    ]
}