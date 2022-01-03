import styled from "@emotion/styled";

const Form = styled.form`
  width: 100%;
  background-color: ${(props) => (props.BgColor ? props.BgColor : "#00a6a6")};
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  max-width: 500px;
  border-radius: 10px;
  padding: 4rem 2.5rem;

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
    font-size: 1.8rem;
  }
  & input {
    font-size: 1.5rem;
    font-weight: 500;
    border: none;
    height: 32px;
    border-radius: 5px;
    padding: 0px 10px;
    width: 100%;
    background: var(--aqua);
  }
  & input:focus {
    outline: none;
  }
  & input::placeholder {
    color: var(--gray4);
  }
  & input[type="submit"] {
    text-transform: uppercase;
    background-color: var(--aqua);
    border: none;
    border-radius: 5px;
    color: var(--green);
    font-weight: bold;
    margin-top: 20px;
    cursor: pointer;
    height: 38px;
    font-size: 1.6rem;
    &:hover {
      background-color: var(--purple);
      color: var(--white);
    }
  }

  & input[type="file"] {
    padding: 0;
    color: var(--aqua);
    background: none;
    cursor: pointer;
  }

  & input[type="file"]::-webkit-file-upload-button {
    border: none;
    border-radius: 5px;
    color: var(--green);
    font-weight: bold;
    padding: 5px 10px;
    cursor: pointer;
  }

  & textarea {
    font-size: 1.5rem;
    border: none;
    resize: none;
    border-radius: 5px;
    padding: 10px 10px;
    background: var(--aqua);
    height: 100px;

    &:focus {
      outline: none;
    }
  }
`;

export default Form;
