import React, { memo, useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { BsFillChatTextFill, BsFillHeartFill } from 'react-icons/bs';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// components
import Image from 'next/image';
// interface
import { ProductsInterface } from '../../interfaces/products.interface';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import firebase from '../../firebase';
import { RootState } from '../../store';

const Card = styled.div`
	width: 100%;
	margin: 0.6rem 0;
	padding: 10px;
	display: grid;
	grid-template-columns: 200px 1fr;
	grid-template-rows: 1fr;
	grid-column-gap: 0px;
	grid-row-gap: 0px;
	background: var(--card-gradient);
	border-radius: 5px;
	overflow: hidden;
	& img {
		cursor: pointer;
		border-radius: 4px;
	}
	& a > span {
		height: 100% !important;
		width: 100% !important;
	}
	@media (max-width: 767px) {
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
		& img {
			width: 100% !important;
		}
	}
`;

const Container = styled.div`
	padding: 0.8rem 2rem;
	display: flex;
	justify-content: space-between;
	font-family: 'Open Sans', sans-serif;
	overflow: hidden;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	& h3 {
		font-size: 2rem;
		cursor: pointer;
		color: var(--gray3);
		padding: 0;
		margin: 0 0 0.3rem 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		&:hover {
			text-shadow: 0 0 1px var(--white);
		}
	}
	& > span {
		font-size: 1.1rem;
		color: var(--gray3);
	}
	& p {
		font-size: 1.6rem;
		color: var(--gray1);
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	& svg {
		margin-right: 5px;
	}

	@media (max-width: 500px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const Divider = styled.div`
	width: 100%;
	height: 1px;
	background: var(--gray3);
	margin: 0.5rem 0;
`;

const CommentsBox = styled.div`
	display: flex;
	align-items: center;
	color: var(--gray3);
	padding: 0.5rem 0;
	font-size: 1.5rem;
	width: auto;
	border-radius: 5px;
	a {
		color: var(--gray3);
		user-select: none;
		display: flex;
		align-items: center;
		margin-right: 10px;
		&:hover {
			text-decoration: underline;
		}
	}
	& > span {
		display: flex;
		align-items: center;
		user-select: none;
		cursor: pointer;
		svg {
			margin: 0 5px 0 5px;
		}
		&.has-voted svg {
			fill: var(--red);
		}
	}
	& span:hover {
		text-decoration: underline;
	}
	& > svg {
		cursor: pointer;
		margin: 0 5px 0 0 !important;
	}
`;

const ImageContainer = styled.div`
	a {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;

		img {
			object-fit: cover;
		}
	}
`;

export default memo(function ProductCard({
	id,
	name,
	description,
	imageUrl,
	votes,
	hasVoted,
	comments,
	createdAt,
}: ProductsInterface) {
	const { user } = useSelector((state: RootState) => state.user);
	const router = useRouter();
	const [productVotes, setProductVotes] = useState(votes);
	const [userVote, setUserVote] = useState<string[]>([...hasVoted]);

	const voteForProduct = async () => {
		if (!user) {
			return router.push('/login');
		}
		let userHasVoted = userVote.includes(user.uid);
		try {
			const votesCount = userHasVoted
				? productVotes - 1
				: productVotes + 1;
			setProductVotes(votesCount);

			const votesList = userHasVoted
				? userVote.filter(id => id !== user.uid)
				: [...userVote, user.uid];
			setUserVote(votesList);

			await firebase.updateDoc(id, {
				votes: votesCount,
				hasVoted: votesList,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card>
			<ImageContainer>
				<Link href={`/products/${id}`}>
					<Image
						src={imageUrl}
						alt={name}
						width={200}
						height={200}
						priority
					/>
				</Link>
			</ImageContainer>
			<Container>
				<Link href={`/products/${id}`} passHref>
					<h3 className='name'>{name}</h3>
				</Link>
				<Divider />
				<p>{description}</p>
				<Divider />
				<CommentsBox>
					<Link href={`/products/${id}`} passHref>
						<BsFillChatTextFill />
						{` ${comments.length}`} comments
					</Link>
					<span
						className={
							user && userVote.includes(user.uid)
								? 'has-voted'
								: ''
						}
						onClick={() => voteForProduct()}
					>
						<BsFillHeartFill /> votes {` ${productVotes}`}
					</span>
				</CommentsBox>

				<span>
					Created {formatDistanceToNow(new Date(createdAt))} ago.
				</span>
			</Container>
		</Card>
	);
});
