import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { uid } from 'uid';
// firebase
import { ref } from 'firebase/storage';
import { uploadBytes, getDownloadURL } from 'firebase/storage';
import firebase from '../firebase';
// components
import Form from '../components/ui/Form';
import Button from '../components/ui/Button';
// hooks
import useValidation from '../hooks/useValidation';
// utils
import ValidateNewProduct from '../utils/validations/validate-new-product';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function NewProduct() {
	const [error, setError] = useState(false);
	const [imageUrl, setImageUrl] = useState('');
	const [uploadError, setUploadError] = useState('');

	const initialState = {
		name: '',
		category: '',
		site: '',
		price: '',
		description: '',
	};

	const router = useRouter();

	const { user } = useSelector((state: RootState) => state.user);

	const { values, errors, handleChange, handleSubmit, resetForm } =
		useValidation(initialState, ValidateNewProduct, createProduct);
	const { name, category, price, site, description } = values;

	async function createProduct() {
		try {
			if (!user) {
				return router.push('/login');
			}
			if (!imageUrl) {
				setUploadError('Image is required');
				return;
			}
			const product = {
				...values,
				imageUrl: imageUrl,
				votes: 0,
				comments: [],
				createdAt: Date.now(),
				creator: {
					id: user.uid,
					name: user.displayName,
				},
				hasVoted: [],
			};
			await firebase.addProduct(product);
			resetForm();
			router.push('/');
		} catch (e) {
			setError(true);
		}
	}

	const handleUploadSuccess = async (
		filename: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!filename.target.files) {
			setImageUrl('');
			return;
		} else {
			const fileRef = ref(firebase.storage, `products/${uid()}`);

			await uploadBytes(fileRef, filename.target.files[0])
				.then(() => {
					getDownloadURL(fileRef).then(url => {
						setImageUrl(url);
						!url
							? setUploadError('Image is required')
							: setUploadError('');
					});
				})
				.catch(e => {
					setUploadError(e.message);
				});
		}
	};

	const fields = [
		{
			name: 'name',
			label: 'Product Name',
			value: name,
			error: errors.name,
		},
		{
			name: 'category',
			label: 'Category',
			value: category,
			error: errors.category,
		},
		{
			name: 'site',
			label: 'Site',
			value: site,
			error: errors.site,
		},
		{
			name: 'price',
			label: 'Price',
			value: price,
			error: errors.price,
		},
		{
			name: 'image',
			label: 'Image',
			value: imageUrl,
			error: uploadError,
			type: 'file',
		},
		{
			name: 'description',
			label: 'Description',
			value: description,
			error: errors.description,
			type: 'textarea',
		},
	];

	if (!user) {
		router.push('/');
		return null;
	}

	return (
		<Form onSubmit={handleSubmit} noValidate>
			<h3>Create New Product</h3>
			{fields.map((field, index) => {
				return (
					<div key={index}>
						<label htmlFor={field.name}>{field.label}</label>
						{field.type === 'textarea' ? (
							<textarea
								name={field.name}
								id={field.name}
								value={field.value}
								onChange={handleChange}
							/>
						) : field.type === 'file' ? (
							<input
								type='file'
								name={field.name}
								id={field.name}
								onChange={handleUploadSuccess}
							/>
						) : (
							<input
								type='text'
								name={field.name}
								id={field.name}
								value={field.value}
								onChange={handleChange}
							/>
						)}
						{errors[field.name] && (
							<span>{errors[field.name]}</span>
						)}
					</div>
				);
			})}
			<Button type='submit'>Create</Button>
			{error && <span>{error}</span>}
		</Form>
	);
}
