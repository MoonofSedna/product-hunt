import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// components
import ProductsContainer from '../components/ui/ProductsContainer';
// firebase
import firebase from '../firebase';
// interfaces
import { ProductsInterface } from '../interfaces/products.interface';

export default function Search({
	products,
}: {
	products: ProductsInterface[];
}) {
	const router = useRouter();
	const [results, setResults] = useState<ProductsInterface[]>([]);

	const {
		query: { q },
	} = router;

	useEffect(() => {
		const search = (q as string).toLowerCase();
		const filtered = products?.filter(product => {
			return product.name.toLowerCase().includes(search);
		});
		setResults(filtered);
	}, [q, products]);

	return <ProductsContainer title='Results' products={results} />;
}

export async function getStaticProps() {
	const productsArray: ProductsInterface[] = firebase.getData(
		await firebase.snapshot('createdAt')
	);
	return {
		props: {
			products: productsArray,
		},
	};
}
