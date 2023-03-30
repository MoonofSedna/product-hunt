import React from 'react';
// components
import ProductsContainer from '../components/ui/ProductsContainer';
// firebase
import firebase from '../firebase';
// hooks
import useProduct from '../hooks/useProduct';
// interfaces
import { ProductsInterface } from '../interfaces/products.interface';

export default function Home({
	productsData,
	count,
}: {
	productsData: ProductsInterface[];
	count: number;
}) {
	const size = 6;
	const { products, pageSize, setPagination } = useProduct(
		'createdAt',
		size,
		productsData
	);
	return (
		<ProductsContainer
			title='New Products'
			products={products}
			setPagination={() => setPagination()}
			pagination={pageSize >= size && pageSize < count}
		/>
	);
}

export async function getServerSideProps() {
	const productsArray: ProductsInterface[] = firebase.getData(
		await firebase.snapshot('createdAt', 6)
	);
	const count = (await firebase.count).data().count;
	return {
		props: {
			productsData: productsArray,
			count,
		},
	};
}
