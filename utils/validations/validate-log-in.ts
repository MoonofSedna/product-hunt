import { ValuesInterface } from '../../hooks/useValidation';

export default function ValidateLogIn(values: ValuesInterface) {
	let errors = {} as ValuesInterface;

	if (!values.email) {
		errors.email = 'Email is required';
	}

	if (!values.password) {
		errors.password = 'Password is required';
	}

	return errors;
}
