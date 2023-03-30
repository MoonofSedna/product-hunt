import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsFillHouseFill } from 'react-icons/bs';
import { AiFillFire } from 'react-icons/ai';
import { IoBagAdd } from 'react-icons/io5';
// utils
import PATH from '../../utils/path';
// hooks
import useScreenSize from '../../hooks/useScreenSize';
// firebase
import { useSelector } from 'react-redux';
// redux
import { RootState } from '../../store';

const Navigation = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 15px;
	color: var(--white);
	font-weight: bold;
	& a {
		margin: 0px 8px;
		color: var(--white);
	}
	@media (max-width: 1024px) {
		& svg {
			font-size: 2.5rem;
		}
		& span {
			padding: 0px 5px;
		}
	}
`;

const LinkItem = styled.div`
	display: flex;
	align-items: center;
	margin: 0 8px;
	cursor: pointer;
	vertical-align: middle;
	& svg {
		margin: 0px 6px 0 5px;
		font-size: 1.8rem;
		color: var(--white);
	}
	&:hover,
	&.active {
		position: relative;

		&:after {
			content: '';
			position: absolute;
			bottom: -5px;
			width: 110%;
			transition: all 0.3s ease-in-out;
			border: 1px solid var(--gray3);
		}
	}
`;

export default function NavBar() {
	const mobileVersion = useScreenSize({ size: '1024px' });
	const router = useRouter();

	const { user } = useSelector((state: RootState) => state.user);

	const navigation = [
		{
			name: 'Home',
			path: PATH.HOME,
			icon: <BsFillHouseFill />,
		},
		{
			name: 'Popular',
			path: PATH.POPULAR,
			icon: <AiFillFire />,
		},
		{
			name: 'New Product',
			path: PATH.PRODUCTS,
			icon: <IoBagAdd />,
		},
	];

	function NavigationItems() {
		return (
			<>
				{navigation
					.filter(item =>
						user ? item : item?.path !== PATH.PRODUCTS
					)
					.map(item => (
						<Link key={item.name} href={item.path} passHref>
							<LinkItem
								className={
									router.pathname === item.path
										? 'active'
										: ''
								}
							>
								{item.icon}
								{!mobileVersion && <span>{item.name}</span>}
							</LinkItem>
						</Link>
					))}
			</>
		);
	}

	return (
		<Navigation>
			<NavigationItems />
		</Navigation>
	);
}
