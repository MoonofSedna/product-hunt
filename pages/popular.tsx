import React from 'react';
// components
import ProductsContainer from '../components/ui/ProductsContainer';
// firebase
import firebase from '../firebase';
// interfaces
import { ProductsInterface } from '../interfaces/products.interface';

export default function Popular({
	products,
}: {
	products: ProductsInterface[];
}) {
	return <ProductsContainer title='Popular Products' products={products} />;
}

export async function getServerSideProps() {
	const productsArray: ProductsInterface[] = firebase.getData(
		await firebase.snapshot('votes', 10)
	);

	const sorted = productsArray.filter(i => i.votes >= 1);

	return {
		props: {
			products: sorted,
		},
	};
}
