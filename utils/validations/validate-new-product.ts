import { ValuesInterface } from '../../hooks/useValidation';

export default function ValidateSignUp(values: ValuesInterface) {
	const errors = {} as ValuesInterface;
	if (!values.name) {
		errors.name = 'Name is required';
	} else if (values.name.length < 4) {
		errors.password = 'Name must be at least 4 characters';
	}
	if (!values.category) {
		errors.category = 'Category is required';
	}

	if (!values.site) {
		errors.site = 'Site is required';
	}

	if (!values.price) {
		errors.price = 'Price is required';
	}

	if (!values.description) {
		errors.description = 'Description is required';
	} else if (values.description.length < 4) {
		errors.description = 'Description must be at least 4 characters';
	}

	return errors;
}
