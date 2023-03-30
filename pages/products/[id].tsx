import React, {
	useState,
	useRef,
	FormEvent,
	ChangeEvent,
	useEffect,
} from 'react';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {
	BsFillChatTextFill,
	BsFillHeartFill,
	BsFillTrashFill,
} from 'react-icons/bs';
// components
import Form from '../../components/ui/Form';
import Button from '../../components/ui/Button';
import Chip from '../../components/ui/Chip';
import {
	ProductContainer,
	Comments,
	Container,
} from '../../components/ui/Product';
// firebase
import firebase from '../../firebase';
// interfaces
import { ProductsInterface } from '../../interfaces/products.interface';
// redux
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

export default function Product({
	productData,
	error,
	id,
}: {
	productData: ProductsInterface;
	error: boolean;
	id: string;
}) {
	const [product, setProduct] = useState({
		...productData,
	} as ProductsInterface);
	const [comment, setComment] = useState('');
	const [categories, setCategories] = useState<string[]>([]);
	const fromRef = useRef(null);
	const { user } = useSelector((state: RootState) => state.user);

	const router = useRouter();

	const voteForProduct = async () => {
		if (!user) {
			return router.push('/login');
		}
		let userHasVoted = product?.hasVoted.includes(user.uid);
		let voteList = product?.hasVoted;
		try {
			const newTotal = userHasVoted
				? product.votes - 1
				: product.votes + 1;

			voteList = userHasVoted
				? voteList.filter((vote: string) => vote !== user.uid)
				: [...voteList, user.uid];

			setProduct({ ...product, votes: newTotal, hasVoted: voteList });

			await firebase.updateDoc(id, {
				votes: newTotal,
				hasVoted: voteList,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const commentOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};

	const addComment = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as HTMLFormElement;
		target.reset();

		if (comment.trim() === '') {
			return;
		}

		if (!user) {
			return router.push('/login');
		}

		const newComment = {
			message: comment,
			user: user.displayName,
			userId: user.uid,
			created: Date.now(),
		};

		const comments = [newComment, ...product.comments];

		const savedProduct = { ...product, comments: comments };

		try {
			await firebase.updateDoc(id, savedProduct);
			setProduct(savedProduct);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProduct = async () => {
		if (!user) {
			return router.push('/login');
		}
		if (product.creator.id !== user.uid) {
			return router.push('/login');
		}
		try {
			await firebase.deleteDoc(id);
			router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const currentCategories = product.category.split(',');
		setCategories(currentCategories);
	}, []);

	return (
		<ProductContainer>
			{!error && product && (
				<Container>
					<div className='div1'>
						<h2>{product.name}</h2>
						<Image
							src={product.imageUrl}
							alt={product.name}
							width={600}
							height={400}
							priority
						/>
						<div>
							<Button>
								<a target='_blank' href={product.site}>
									Go to site
								</a>
							</Button>
							<Button
								className={
									user && product.hasVoted.includes(user.uid)
										? 'has-voted'
										: ''
								}
								onClick={voteForProduct}
							>
								<BsFillHeartFill /> Votes {product.votes}
							</Button>
						</div>
						<p>Price: ${product.price}</p>
						<p>
							Category:{' '}
							{categories.map((category, index) => (
								<Chip key={index}>{category}</Chip>
							))}
						</p>
						<p>{product.description}</p>
						<span className='created'>
							By {product.creator.name}{' '}
							{formatDistanceToNow(new Date(product.createdAt))}{' '}
							ago.
						</span>
						{product?.creator.id === user?.uid && (
							<Button
								className='delete-product'
								onClick={deleteProduct}
							>
								Delete product
								<BsFillTrashFill />
							</Button>
						)}
					</div>
					<div className='div2'>
						{user && (
							<Form
								className='comments-form'
								onSubmit={addComment}
								ref={fromRef}
							>
								<label htmlFor='message'>Add a comment</label>
								<div>
									<textarea
										placeholder='Put a comment...'
										name='message'
										id='message'
										onChange={commentOnChange}
									/>
								</div>
								<div>
									<Button type='submit'>Add Comment</Button>
								</div>
							</Form>
						)}
						<h3>
							Comments <BsFillChatTextFill />
						</h3>
						<hr />
						{product.comments.length > 0 ? (
							product.comments.map(comment => (
								<Comments key={comment.created}>
									<p>{comment.message}</p>
									<span>
										By{' '}
										{comment.userId === product.creator.id
											? 'the creator'
											: comment.user}{' '}
										at{' '}
										{formatDistanceToNow(
											new Date(comment.created)
										)}{' '}
										ago.
									</span>
								</Comments>
							))
						) : (
							<span>No comments yet...</span>
						)}
					</div>
				</Container>
			)}

			{error && <h2>Product not found</h2>}
		</ProductContainer>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { id } = context.query;
	if (!id)
		return {
			props: {
				productData: null,
				error: true,
				id: null,
			},
		};

	const data = (await firebase.getDoc(id as string)).data();

	return {
		props: {
			productData: data || null,
			error: !data,
			id: id as string,
		},
	};
}
