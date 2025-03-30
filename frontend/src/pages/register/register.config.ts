import { FormContent, InputSchemaDefinition } from "@/components/form-content/form-content.types"
import { RegisterUserForm } from "./register.types"

export const registerInputs: InputSchemaDefinition<RegisterUserForm> = {
    userID: { name: 'userID', label: 'Employee ID', type: 'number' },
    teamID: { name: 'teamID', label: 'Team ID', type: 'number' },
    last: { name: 'last', label: 'Last Name' },
    first: { name: 'first', label: 'First Name' },
    middle: { name: 'middle', label: 'Middle Name', width: '75%' },
    email: { name: 'email', label: 'Email Address', type: 'email' },
    phone: { name: 'phone', label: 'Phone Number', type: 'number', width: '60%' },
    password: { name: 'password', label: 'Password', type: 'password' },
    passwordConfirm: { name: 'passwordConfirm', label: 'Confirm Password', type: 'password', passwordHint: false }
}

export const browserInputs: FormContent<typeof registerInputs> = {
    name: 'register-form',
    components: [
        { group: 1, sub: 1, row: 1, components: ['userID', 'teamID'] },
        { group: 2, sub: 1, row: 1, components: ['last', 'first', 'middle']},
        { group: 2, sub: 1, row: 2, components: ['email', 'phone']},
        { group: 3, sub: 1, row: 1, components: ['password', 'passwordConfirm']}
    ]
}

export const mobileInputs: FormContent<typeof registerInputs> = {
    name: 'register-form',
    groupStyles: [
        // { group: 2, style: {gap: '2rem'}}
    ],
    components: [
        { group: 1, sub: 1, row: 1, components: ['userID', 'teamID'] },
        { group: 2, sub: 1, row: 1, components: ['last']},
        { group: 2, sub: 1, row: 2, components: ['first']},
        { group: 2, sub: 1, row: 3, components: ['middle'], tweak: {middle: {width: '100%'}}},
        { group: 2, sub: 2, row: 1, components: ['email']},
        { group: 2, sub: 2, row: 2, components: ['phone'], tweak: {phone: {width: '100%'}}},
        { group: 3, sub: 1, row: 1, components: ['password', 'passwordConfirm']}
    ]
}