import React, { useContext } from "react";
import styled from "@emotion/styled";
import ClipLoader from "react-spinners/ClipLoader";

import Link from "next/link";
import { FaPowerOff } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import Image from "next/image";
import Logo from "../../public/images/P.Hunt.png";
// components
import Images from "../ui/Images";
import Seeker from "../ui/seeker";
import NavBar from "./Navbar";
import Button from "../ui/buttons";
// utils
import PATH from "../../utils/Path";
import useScreenSize from "../../hooks/useScreenSize";
// firebase
import FirebaseContext from "../../firebase/context";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--aqua);
  padding: 0.5rem 1.5rem;
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
    color: var(--purple);
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

export default function Header() {
  const { user, firebase } = useContext(FirebaseContext);
  const mobileVersion = useScreenSize({ size: "767px" });

  return (
    <div>
      <StyledHeader>
        <Container>
          <Image src={Logo} width={60} height={60} alt="logo" loading="eager" />
          {!mobileVersion && <Seeker />}
          <NavBar />
        </Container>
        <Container>
          {user ? (
            <Container>
              {mobileVersion ? (
                <>
                  <Button onClick={() => firebase.logout()}>
                    <FaPowerOff />
                  </Button>
                </>
              ) : (
                <>
                  <p> {user.displayName}</p>
                  <Button onClick={() => firebase.logout()}>
                    Log Out <FaPowerOff />
                  </Button>
                </>
              )}
            </Container>
          ) : (
            <Container>
              <Link href={PATH.LOGIN} passHref>
                <Button>
                  {!mobileVersion && "Log In"}
                  <FaPowerOff />
                </Button>
              </Link>
              <Link href={PATH.SIGNUP} passHref>
                <Button>
                  {!mobileVersion && " Sign Up"}
                  <BsFillPersonPlusFill />
                </Button>
              </Link>
            </Container>
          )}
        </Container>
      </StyledHeader>
      {mobileVersion && <Seeker />}
    </div>
  );
}
