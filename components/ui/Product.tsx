import styled from '@emotion/styled';

const ProductContainer = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 8rem 3rem 3rem 3rem;
	width: 100%;
	max-width: 1100px;
	@media (max-width: 400px) {
		padding: 20px;
	}
`;

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	grid-template-rows: 1fr;
	grid-column-gap: 30px;
	grid-row-gap: 0px;
	& h2 {
		color: var(--gray3);
		font-size: 2.8rem;
		padding: 1rem 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	& h3 {
		color: var(--gray3);
		margin: 1rem 0;
	}
	p,
	span {
		color: var(--gray3);
	}

	& .created {
		font-size: 1.4rem;
	}
	& .created:first-letter {
		text-transform: uppercase;
	}
	& .div1 {
		position: relative;
		& img {
			border-radius: 4px;
			height: auto;
			width: 100%;
		}

		& .image-container {
			width: 90%;
			max-width: 300px;
		}

		span {
			color: var(--gray3);
			font-size: 1.1rem;
		}

		& > div {
			display: flex;
			align-items: center;
			width: 100%;
			padding: 1rem 0;
			& button {
				display: flex;
				align-items: center;
				padding: 1rem;
				margin-right: 0.7rem;
				& a {
					color: var(--white);
				}
			}
			& svg {
				font-size: 15px;
			}
		}
	}

	& svg {
		margin-right: 5px;
	}
	& .div2 {
		margin-top: 6rem;
	}

	.comments-form {
		padding: 1rem;
		width: 100%;
		background: var(--gray4);
		& textarea {
			background: var(--gray2);
			color: var(--gray3);
		}
		& textarea::placeholder {
			color: var(--gray5);
		}
		& label {
			padding: 0.5rem 1rem;
		}
	}
	& hr {
		border-width: 1px;
		border-color: var(--gray3);
	}

	.has-voted svg {
		color: var(--red);
	}

	.delete-product {
		background: var(--red);
		display: block;
		color: var(--white);
		margin: 1rem 0;
		&:hover {
			background: var(--dark-red);
		}
		svg {
			position: relative;
			top: 2px;
			left: 5px;
		}
	}
`;

const Comments = styled.div`
	display: flex;
	flex-direction: column;
	background: var(--gray4);
	border-radius: 4px;
	padding: 1rem;
	width: 100%;
	margin: 1rem 0;
	color: var(--white);
	& p {
		margin: 0;
	}
	& span {
		font-size: 1.1rem;
	}
	& h6 {
		font-size: 1.1rem;
		margin: 0;
	}
`;

export { ProductContainer, Container, Comments };
