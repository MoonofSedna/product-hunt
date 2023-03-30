import styled from '@emotion/styled';

const Form = styled.form`
	background-color: var(--gray4);
	color: var(--white);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 95%;
	max-width: 500px;
	border-radius: 4px;
	padding: 4rem 2.5rem;
	& h3 {
		font-size: 3rem;
		font-weight: 600;
		margin-bottom: 2rem;
	}
	& span {
		color: var(--red);
		font-size: 1.3rem;
	}

	& > span {
		margin-top: 2rem;
	}

	& > div {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin: 5px 0;
	}

	& label {
		width: 100%;
		display: block;
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.3rem;
		font-family: 'Open Sans', sans-serif;
	}
	& input {
		font-size: 1.5rem;
		font-weight: 500;
		border: none;
		height: 32px;
		border-radius: 5px;
		padding: 18px 10px;
		width: 100%;
		background: var(--gray2);
		color: var(--gray3);
	}
	& input:focus {
		outline: none;
		outline: 1px solid var(--pink);
	}

	& input::placeholder {
		color: var(--gray5);
	}
	& button[type='submit'] {
		border: none;
		width: 100%;
		border-radius: 5px;
		font-weight: bold;
		margin-top: 20px;
		cursor: pointer;
		height: 38px;
		font-size: 1.6rem;
	}

	& input[type='file'] {
		padding: 0;
		color: var(--gray3);
		background: none;
		cursor: pointer;
	}

	& input[type='file']::-webkit-file-upload-button {
		border: none;
		border-radius: 5px;
		color: var(--pink);
		font-weight: bold;
		padding: 5px 10px;
		cursor: pointer;
	}

	& textarea {
		font-size: 1.5rem;
		border: none;
		resize: none;
		border-radius: 3px;
		padding: 10px 10px;
		background: var(--gray2);
		height: 100px;
		color: var(--gray3);
		&:focus {
			outline: none;
		}
	}
	@media (max-width: 508px) {
		& h3 {
			font-size: 2rem;
			font-weight: 600;
			margin-bottom: 2rem;
		}
	}
`;

export default Form;
