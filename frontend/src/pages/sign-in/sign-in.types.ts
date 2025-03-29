import { z } from "zod"

export const authForm = z.object({
	userID: z
		.literal('')
		.or(z.string().length(10, { message: 'Must be 10 digits' }).regex(/^\d+$/, { message: 'Must be a number' })),
	password: z.literal('').or(z.string().min(8, { message: 'Must be at least 8 characters' }))
})
export type AuthForm = z.infer<typeof authForm>