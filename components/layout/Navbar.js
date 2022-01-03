import React, { useContext } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { BsFillHouseFill } from "react-icons/bs";
import { AiFillFire } from "react-icons/ai";
import { IoBagAdd } from "react-icons/io5";

// utils
import PATH from "../../utils/Path";
import useScreenSize from "../../hooks/useScreenSize";
// firebase
import FirebaseContext from "../../firebase/context";

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 15px;
  color: var(--purple);
  font-weight: bold;
  & a {
    margin: 0px 8px;
  }
  & span {
    display: flex;
    align-items: center;
    margin: 0 8px;
    cursor: pointer;
  }
  & svg {
    margin: 0px 4px 0 5px;
    font-size: 1.8rem;
  }

  & span:hover {
    color: var(--green);
    border-bottom: 2px solid var(--green);
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

export default function NavBar() {
  const { user } = useContext(FirebaseContext);
  const mobileVersion = useScreenSize({ size: "1024px" });

  return (
    <Navigation>
      <Link href={PATH.HOME} passHref>
        <span>
          <BsFillHouseFill /> {!mobileVersion && "Home"}
        </span>
      </Link>
      <Link href={PATH.POPULAR} passHref>
        <span>
          <AiFillFire /> {!mobileVersion && "Popular"}
        </span>
      </Link>
      {user && (
        <Link href={PATH.PRODUCTS} passHref>
          <span>
            <IoBagAdd />
            {!mobileVersion && "New Product"}
          </span>
        </Link>
      )}
    </Navigation>
  );
}
