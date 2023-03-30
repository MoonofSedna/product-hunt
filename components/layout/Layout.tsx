import React from 'react';
import styled from '@emotion/styled';
import ClipLoader from 'react-spinners/ClipLoader';
import { Global, css } from '@emotion/react';
// components
import Header from './Header';

const StyledLayout = styled.main`
	height: 100vh;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr;
	grid-column-gap: 0px;
	grid-row-gap: 0px;
`;

const Container = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: var(--gray1);
	padding-top: 6rem;
`;

const Loading = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

interface LayoutInterface {
	children: React.ReactNode;
	loading?: boolean;
}

export default function Layout({ children, loading }: LayoutInterface) {
	return (
		<StyledLayout>
			<Global
				styles={css`
					:root {
						--gray1: #292626;
						--gray2: #676767;
						--gray3: #f9f9f9;
						--gray4: #494848;
						--gray5: #c3c3c3;
						--pink: #f764ba;
						--white: #fff;
						--red: #ff0000;
						--dark-red: #b20606;
						--gradient: linear-gradient(
							to right,
							#a63990,
							#be459d,
							#d652aa,
							#e557a7,
							#f25ca4,
							#ff63a1,
							#ff668f,
							#ff6b7e
						);
						--card-gradient: linear-gradient(
							to right bottom,
							#fba1d9,
							#fa90d0,
							#f97ec7,
							#fc75bb,
							#fe6cae,
							#ff63a1,
							#ff668f,
							#ff6b7e
						);
						--card-gradient-hover: linear-gradient(
							to right bottom,

							#ff6b7e,
							#ff668f,
							#ff63a1,
							#fe6cae,
							#fc75bb,
							#f97ec7,
							#fa90d0,
							#fba1d9
						);
					}
					html {
						font-size: 62.5%;
						box-sizing: border-box;
						min-height: 100%;
					}
					*,
					*::before,
					*::after {
						box-sizing: inherit;
					}
					body {
						font-size: 1.6rem;
						font-weight: 600;
						line-height: 1.7;
						font-family: 'Quicksand', sans-serif;
					}
					h1,
					h2,
					h3 {
						margin: 0;
						line-height: 1.2;
						color: var(--gray3);
					}
					ul {
						list-style: none;
					}
					a {
						text-decoration: none;
					}
				`}
			/>

			{loading ? (
				<Container>
					<Loading>
						<ClipLoader color='#f764ba' size={60} />
					</Loading>
				</Container>
			) : (
				<>
					<Header />
					<Container>{children}</Container>
				</>
			)}
		</StyledLayout>
	);
}
