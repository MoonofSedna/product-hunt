import styled from '@emotion/styled';

const Title = styled.h3`
	font-size: ${(props: { size?: string }) => props.size || '3.8rem'};
	font-weight: 700;
	color: var(--gray3);
`;

export default Title;
