import { useState, useEffect } from 'react';
// firebase
import firebase from '../firebase';
import {
	DocumentData,
	QueryDocumentSnapshot,
	QuerySnapshot,
} from 'firebase/firestore';
// interface
import { ProductsInterface } from '../interfaces/products.interface';

export default function useProduct(
	orderBy: string,
	limit: number,
	productsData: ProductsInterface[]
) {
	const [products, setProducts] = useState<ProductsInterface[]>([
		...productsData,
	]);
	const [lastDoc, setLastDoc] = useState(
		productsData[productsData.length - 1]?.createdAt
	);
	const [pageSize, setPageSize] = useState(0);

	function getSnapshot(snapshot: QuerySnapshot) {
		const productsArray: ProductsInterface[] = [...products];
		snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
			const newData: DocumentData = doc.data();
			productsArray.push({
				...(newData as ProductsInterface),
				id: doc.id,
			});
		});
		setProducts(productsArray);
	}

	const setPagination = async () => {
		if (!lastDoc) return;
		try {
			const snapshot = await firebase.searchCollection(
				orderBy,
				lastDoc,
				limit
			);
			getSnapshot(snapshot);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setPageSize(products.length);
		setLastDoc(products[products.length - 1]?.createdAt);
	}, [products]);

	return { products, pageSize, setPagination };
}
