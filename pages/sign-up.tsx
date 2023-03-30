import React, { useState } from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
import { FirebaseError } from 'firebase-admin';
// components
import Form from '../components/ui/Form';
import Button from '../components/ui/Button';
// hooks
import useValidation from '../hooks/useValidation';
// utils
import validateSignUp from '../utils/validations/validate-sign-up';
// firebase
import firebase from '../firebase';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Title = styled.h1`
	font-size: 3.5rem;
	margin: 0.5rem 0 1.5rem 0;
`;

export default function SignUp() {
	const initialState = {
		username: '',
		email: '',
		password: '',
	};

	const [error, setError] = useState<string>();

	const { values, errors, handleChange, handleSubmit, handleBlur } =
		useValidation(initialState, validateSignUp, createUser);
	const { username, email, password } = values;

	const { user } = useSelector((state: RootState) => state.user);

	if (user) {
		Router.push('/');
		return null;
	}

	async function createUser() {
		try {
			await firebase.signin(username, email, password);
			Router.push('/');
		} catch (e) {
			const { message } = e as FirebaseError;
			setError(message);
		}
	}

	const fields = [
		{
			name: 'username',
			type: 'text',
			placeholder: 'Username',
			value: username,
			error: errors.username,
		},
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
			<Title>Sign up</Title>
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
						onBlur={handleBlur}
						autoComplete={field.autoComplete ? 'on' : 'off'}
					/>
					{field.error && <span>{field.error}</span>}
				</div>
			))}

			<Button type='submit'>Create account</Button>
			{error && <span>{error}</span>}
		</Form>
	);
}
