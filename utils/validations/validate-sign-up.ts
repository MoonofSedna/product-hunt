import { ValuesInterface } from '../../hooks/useValidation';

export default function validateSignUp(values: ValuesInterface) {
	const errors = {} as ValuesInterface;

	if (!values.username) {
		errors.username = 'Username is required';
	} else if (values.username.length < 3) {
		errors.username = 'Username must be at least 3 characters';
	} else if (values.username.length > 20) {
		errors.username = 'Username must be less than 20 characters';
	}

	if (!values.email) {
		errors.email = 'Email is required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = "Email isn't valid";
	}

	if (!values.password) {
		errors.password = 'Password is required';
	} else if (values.password.length < 6) {
		errors.password = 'Password must be at least 6 characters';
	}

	return errors;
}
