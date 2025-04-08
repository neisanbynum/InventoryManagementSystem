import { FormContent, InputSchemaDefinition } from '@/components/form-content/form-content.types'
import { RegisterFormType } from './register.types'

export const RegisterFormInputs: InputSchemaDefinition<RegisterFormType> = {
	userID: { name: 'userID', label: 'Employee ID', type: 'number' },
	teamID: { name: 'teamID', label: 'Team ID', type: 'number' },
	last: { name: 'last', label: 'Last Name' },
	first: { name: 'first', label: 'First Name' },
	middle: { name: 'middle', label: 'Middle Name', className: 'w-4/5' },
	email: { name: 'email', label: 'Email Address', type: 'email' },
	phone: { name: 'phone', label: 'Phone Number', type: 'number', className: 'w-3/5' },
	password: { name: 'password', label: 'Password', type: 'password' },
	passwordConfirm: { name: 'passwordConfirm', label: 'Confirm Password', type: 'password', pwdHint: false }
}

export const BrowserInputs: FormContent<typeof RegisterFormInputs> = {
	name: 'register-form',
	components: [
		{ group: 1, sub: 1, row: 1, components: ['userID', 'teamID'] },
		{ group: 2, sub: 1, row: 1, components: ['last', 'first', 'middle'] },
		{ group: 2, sub: 1, row: 2, components: ['email', 'phone'] },
		{ group: 3, sub: 1, row: 1, components: ['password', 'passwordConfirm'] }
	]
}

export const MobileInputs: FormContent<typeof RegisterFormInputs> = {
	name: 'register-form',
	components: [
		{ group: 1, sub: 1, row: 1, components: ['userID', 'teamID'] },
		{ group: 2, sub: 1, row: 1, components: ['last'] },
		{ group: 2, sub: 1, row: 2, components: ['first'] },
		{ group: 2, sub: 1, row: 3, components: ['middle'], tweak: { middle: { className: 'w-full' } } },
		{ group: 2, sub: 2, row: 1, components: ['email'] },
		{ group: 2, sub: 2, row: 2, components: ['phone'], tweak: { phone: { className: 'w-full' } } },
		{ group: 3, sub: 1, row: 1, components: ['password', 'passwordConfirm'] }
	]
}
