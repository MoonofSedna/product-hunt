import { getStorage } from 'firebase/storage';
import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user';

const store = configureStore({
	reducer: {
		user,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
