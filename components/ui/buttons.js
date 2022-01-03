import styled from "@emotion/styled";

const Button = styled.button`
  border-radius: 5px;

  background: ${(props) => (props.bgColor ? "#696cba" : "#00a6a6")};
  color: var(--white);
  font-weight: 700;
  cursor: pointer;
  border: none;
  padding: 0.6rem 0.8rem;
  &:hover {
    background: ${(props) => (props.bgColor ? "#00a6a6" : "#696cba")};
    color: var(--white);
  }
`;

export default Button;
