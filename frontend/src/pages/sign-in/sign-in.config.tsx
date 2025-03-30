import { FormContent, InputSchemaDefinition } from "@/components/form-content/form-content.types";
import { SignInForm } from "./sign-in.types";
import PasswordRecovery from "./password-recovery";

export const signInInputs: InputSchemaDefinition<SignInForm> = {
    userID: { name: 'userID', label: 'Employee ID', type: 'number' },
    password: { name: 'password', label: 'Password', type: 'password' },
}

export const browserInputs: FormContent<typeof signInInputs> = {
    name: 'sign-in-form',
    components: [
        { group: 1, sub: 1, row: 1, components: ['userID'] },
        { group: 1, sub: 1, row: 2, components: ['password'] },
        { group: 1, sub: 1, row: 3, components: [<PasswordRecovery/>] }
    ]
}