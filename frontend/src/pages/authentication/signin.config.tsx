import { FormContent, InputSchemaDefinition } from "@/components/form-content/form-content.types"
import { SignInFormType } from "./signin.types"
import PasswordRecovery from "./components/signin.password-recovery"

export const SignInInputs: InputSchemaDefinition<SignInFormType> = {
    userID: { name: 'userID', label: 'Employee ID', type: 'number' },
    password: { name: 'password', label: 'Password', type: 'password' },
}

export const AllLayoutsInputs: FormContent<typeof SignInInputs> = {
    name: 'sign-in-form',
    components: [
        { group: 1, sub: 1, row: 1, components: ['userID'] },
        { group: 1, sub: 1, row: 2, components: ['password'] },
        { group: 1, sub: 1, row: 3, components: [<PasswordRecovery/>] }
    ]
}