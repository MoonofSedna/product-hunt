import { UserInterface } from './../../interfaces/user.interface';
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
	} as { user: UserInterface | null },
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},
		logout: state => {
			state.user = null;
		},
	},
});

export default userSlice.reducer;

export const { login, logout } = userSlice.actions;
