import { z } from "zod"

export const RegisterFormZodSchema = z.object({
	userID: z
		.literal('')
		.or(z.string().length(10, { message: 'Must be 10 digits' }).regex(/^\d+$/, { message: 'Must be a number' })),
	teamID: z
		.literal('')
		.or(z.string().length(10, { message: 'Must be 10 digits' }).regex(/^\d+$/, { message: 'Must be a number' })),
	last: z.literal('').or(z.string().min(2, { message: 'Must be at least 2 characters' })),
	first: z.literal('').or(z.string().min(2, { message: 'Must be at least 2 characters' })),
	middle: z.string().optional(),
	email: z.literal('').or(z.string().email({ message: 'Must be a valid email' })),
	phone: z.literal('').or(z.string().length(10, { message: 'Must be 10 digits' }).regex(/^\d+$/, { message: 'Must be a number' })),
	password: z.literal('').or(z.string().min(8, { message: 'Must be at least 8 characters' })),
	passwordConfirm: z.literal('').or(z.string().min(8, { message: 'Must be at least 8 characters' }))
})
export type RegisterFormType = z.infer<typeof RegisterFormZodSchema>