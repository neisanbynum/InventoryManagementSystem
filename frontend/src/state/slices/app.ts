import { UserName } from '@/utils/types/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Theme = 'dark' | 'light'

export interface AppState {
	currTheme: Theme
	authenticated: boolean
	userName?: UserName
	teams?: number[]
}

export const THEME_KEY: string = 'IMS-theme'
const savedTheme: Theme|null = localStorage.getItem(THEME_KEY) as Theme|null
const preferDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches

const initialState: AppState = {
	currTheme: savedTheme ? savedTheme : preferDark ? 'dark' : 'light',
	authenticated: false
}

const reducer = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setTheme: function (state, action: PayloadAction<Theme>) {
			state.currTheme = action.payload
		},
		authenticate: function (state, action: PayloadAction<{name: UserName, teams: number[]}>) {
			state.authenticated = true
			state.userName = action.payload.name
			state.teams = action.payload.teams
		}
	}
})

export const { setTheme, authenticate } = reducer.actions
export const appReducer = reducer.reducer
