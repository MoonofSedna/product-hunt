/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, ChangeEventHandler, ChangeEvent } from 'react';

export interface ValuesInterface {
	[x: string]: string;
}

const useValidation = (
	initialState: ValuesInterface,
	validate: (x: ValuesInterface) => ValuesInterface,
	func: () => void
) => {
	const [values, setValues] = useState(initialState as ValuesInterface);
	const [errors, setErrors] = useState({} as ValuesInterface);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (isSubmitting) {
			if (Object.keys(errors).length === 0) {
				func();
			}
			setIsSubmitting(false);
		}
	}, [isSubmitting]);

	const handleChange = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| ChangeEvent<HTMLTextAreaElement>
	) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const validationErrors = validate(values);
		setErrors(validationErrors);
		setIsSubmitting(true);
	};

	const handleBlur = () => {
		const validationErrors = validate(values);
		setErrors(validationErrors);
	};

	return {
		values,
		errors,
		handleChange,
		handleSubmit,
		handleBlur,
		resetForm: () => setValues(initialState),
	};
};

export default useValidation;
