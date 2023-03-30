import React, { memo } from 'react';
import styled from '@emotion/styled';
import { AiFillFire } from 'react-icons/ai';
// components
import Button from '../../components/ui/Button';
import ProductCard from '../../components/ui/ProductCard';
import Title from './Title';
// interfaces
import { ProductsInterface } from '../../interfaces/products.interface';

const Card = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
	padding: 2rem;
	grid-gap: 25px;
	& h3 {
		text-align: center;
	}
	@media (max-width: 767px) {
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		padding: 2rem;
		grid-gap: 25px;
	}
`;

const TextIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 3.6rem;
	margin: 1.4rem 0;
	color: var(--white);
	& > h3 {
		padding: 3rem 0;
	}
	svg {
		color: var(--pink);
		margin-right: 1rem;
	}
	@media (max-width: 776px) {
		font-size: 2.5rem;
	}
`;

const Container = styled.div`
	width: 100%;
	max-width: 1600px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	& button {
		margin: 2rem 0;
	}
	@media (max-width: 767px) {
		margin-top: 2rem;
	}
`;

interface ProductsContainerProps {
	title: string;
	products: ProductsInterface[];
	setPagination?: () => void;
	pagination?: boolean;
}

export default memo(function ProductsContainer({
	title,
	products,
	setPagination,
	pagination,
}: ProductsContainerProps) {
	return (
		<Container>
			<TextIcon>
				<AiFillFire /> <Title>{title}</Title>
			</TextIcon>
			{products?.length === 0 && (
				<Title size='2.5rem'> There not products</Title>
			)}
			<Card>
				{products?.length > 0 &&
					products?.map(product => (
						<ProductCard key={product.id} {...product} />
					))}
			</Card>
			{pagination && (
				<Button onClick={() => setPagination?.()}>Load more</Button>
			)}
		</Container>
	);
});
