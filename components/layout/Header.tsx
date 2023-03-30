import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { FaPowerOff } from 'react-icons/fa';
import { BsFillPersonPlusFill } from 'react-icons/bs';
// components
import Seeker from '../ui/Seeker';
import NavBar from './Navbar';
import Button from '../ui/Button';
// utils
import PATH from '../../utils/path';
// hooks
import useScreenSize from '../../hooks/useScreenSize';
// firebase
import firebase from '../../firebase';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: var(--gradient);
	padding: 0.5rem 1.5rem;
	color: var(--white);
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	& > button {
		margin: 0px 5px;
		display: flex;
		align-items: center;
	}

	& button svg {
		font-size: 1.4rem;
		margin-left: 5px;
	}

	& > svg {
		font-size: 2rem;
		color: var(--white);
		cursor: pointer;
	}
	& > p {
		margin: 0px 10px;
	}
	@media (max-width: 767px) {
		& button svg {
			font-size: 1.6rem;
			margin-left: 0;
		}
	}
	@media (max-width: 795px) {
		& > p {
			display: none;
		}
	}
`;

const Logo = styled.span`
	font-size: 3rem;
	font-weight: bold;
	color: var(--white);
`;

const StickyHeader = styled.header`
	position: sticky;
	top: 0;
`;

export default function Header() {
	const { user } = useSelector((state: RootState) => state.user);
	const mobileVersion = useScreenSize({ size: '767px' });

	return (
		<StickyHeader>
			<StyledHeader>
				<Container>
					<Link href='/'>
						<Logo>PH</Logo>
					</Link>
					{!mobileVersion && <Seeker />}
				</Container>
				<Container>
					<NavBar />
				</Container>
				<Container>
					{user ? (
						<Container>
							{mobileVersion ? (
								<Button link onClick={() => firebase.logout()}>
									<FaPowerOff />
								</Button>
							) : (
								<>
									<p> {user.displayName}</p>
									<Button
										link
										onClick={() => firebase.logout()}
									>
										Log Out <FaPowerOff />
									</Button>
								</>
							)}
						</Container>
					) : (
						<Container>
							<Link href={PATH.LOGIN} passHref>
								<Button link>
									{!mobileVersion && 'Log In'}
									<FaPowerOff />
								</Button>
							</Link>
							<Link href={PATH.SIGNUP} passHref>
								<Button link>
									{!mobileVersion && ' Sign Up'}
									<BsFillPersonPlusFill />
								</Button>
							</Link>
						</Container>
					)}
				</Container>
			</StyledHeader>
			{mobileVersion && <Seeker />}
		</StickyHeader>
	);
}
