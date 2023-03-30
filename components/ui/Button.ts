import styled from '@emotion/styled';

const Button = styled.button`
	border-radius: 4px;
	background: ${(props: { link?: boolean }) =>
		props.link ? 'none' : 'var(--card-gradient)'};
	color: var(--white);
	font-weight: 700;
	cursor: pointer;
	border: none;
	padding: ${(props: { type?: string }) =>
		props.type === 'submit' ? '1rem 0.8rem' : '0.6rem 0.8rem'};
	transition: all 0.4s ease-in;
	&:hover {
		background: ${(props: { link?: boolean }) =>
			props.link ? 'none' : 'var(--card-gradient-hover)'};
	}
`;

export default Button;
