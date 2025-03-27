import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Theme = 'dark' | 'light'

export interface ThemeProviderState {
	currTheme: Theme
}

export const THEME_KEY: string = 'IMS-theme'
const savedTheme: Theme|null = localStorage.getItem(THEME_KEY) as Theme|null
const preferDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches

const initialState: ThemeProviderState = {
	currTheme: savedTheme ? savedTheme : preferDark ? 'dark' : 'light'
}

const reducer = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: function (state, action: PayloadAction<Theme>) {
			state.currTheme = action.payload
		}
	}
})

export const { setTheme } = reducer.actions
export const themeReducer = reducer.reducer
