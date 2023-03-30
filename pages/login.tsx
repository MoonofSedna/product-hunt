import React, { useState } from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
// hooks
import useValidation from '../hooks/useValidation';
// utils
import validateLogIn from '../utils/validations/validate-log-in';
// firebase
import firebase from '../firebase';
import { FirebaseError } from 'firebase/app';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../store';
// components
import Form from '../components/ui/Form';
import Button from '../components/ui/Button';

const Title = styled.h1`
	font-size: 3.5rem;
	margin: 0.5rem 0 1.5rem 0;
`;

export default function Login() {
	const initialState = {
		email: '',
		password: '',
	};
	const [error, setError] = useState<string>();
	const { user } = useSelector((state: RootState) => state.user);

	async function logIn() {
		try {
			await firebase.login(email, password);
			Router.push('/');
		} catch (e) {
			const { message } = e as FirebaseError;
			setError(message);
		}
	}

	const { values, errors, handleChange, handleSubmit } = useValidation(
		initialState,
		validateLogIn,
		logIn
	);
	const { email, password } = values;

	if (user) {
		Router.push('/');
		return null;
	}
	const fields = [
		{
			name: 'email',
			type: 'email',
			placeholder: 'Email',
			value: email,
			error: errors.email,
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Password',
			value: password,
			error: errors.password,
			autoComplete: true,
		},
	];

	return (
		<Form onSubmit={handleSubmit} noValidate>
			<Title>Log In</Title>
			{fields.map(field => (
				<div key={field.name}>
					<label htmlFor={field.placeholder}>
						{field.placeholder}
					</label>
					<input
						type={field.type}
						id={field.name}
						placeholder={field.placeholder}
						name={field.name}
						value={field.value}
						onChange={handleChange}
						autoComplete={field.autoComplete ? 'on' : 'off'}
					/>
					{field.error && <span>{field.error}</span>}
				</div>
			))}

			<Button type='submit'>Log In</Button>
			{error && <span>{error}</span>}
		</Form>
	);
}
