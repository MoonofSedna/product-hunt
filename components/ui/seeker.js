import React, { useState } from "react";
import styled from "@emotion/styled";
import Router from "next/router";
import { BsSearch } from "react-icons/bs";

// components
import Button from "./buttons";

const StyledSeeker = styled.form`
  height: auto;
  & > input {
    border: 2px solid var(--green);
    border-radius: 5px;
    height: 32px;
    margin: 0 5px 0 10px;
    background: var(--gray3);
  }

  & > input:focus {
    outline: none;
    border: 2px solid var(--purple);
  }

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    background: var(--aqua);
    padding: 0.8rem 0.5rem;
    & > input {
      width: 100%;
      height: 35px;
      margin: 0;
    }
    & > button {
      width: 50px;
      height: 35px;
      margin-left: 5px;
    }
  }
  & svg {
    margin: 0 !important;
  }
`;

export default function Seeker() {
  const [value, setValue] = useState("");

  const searchProduct = (e) => {
    e.preventDefault();
    if (value.trim() === "") return;
    Router.push(`/search?q=${value}`);
  };

  return (
    <StyledSeeker onSubmit={searchProduct}>
      <input type="text" onChange={(e) => setValue(e.target.value)} />
      <Button>
        <BsSearch />
      </Button>
    </StyledSeeker>
  );
}
