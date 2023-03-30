import { useState, useEffect } from 'react';
import firebase from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
// redux
import { login } from '../store/slices/user';
import store from '../store';

export default function useAuthentication() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebase.auth, authUser => {
			if (authUser) {
				const user = {
					uid: authUser.uid,
					email: authUser.email,
					displayName: authUser.displayName,
				};
				store.dispatch(login(user));
			} else {
				store.dispatch(login(null));
			}
			setLoading(false);
		});

		return () => {
			unsubscribe();
		};
	});

	return { loading };
}
