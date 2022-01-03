/* eslint-disable @next/next/no-page-custom-font */
import React from "react";
import styled from "@emotion/styled";
import ClipLoader from "react-spinners/ClipLoader";
import { Global, css } from "@emotion/react";
// components
import Header from "./Header";

const StyledLayout = styled.main`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default function Layout({ children, loading }) {
  return (
    <StyledLayout>
      <Global
        styles={css`
          :root {
            --gray1: #3d3d3d;
            --gray2: #6f6f6f;
            --gray3: #f9f9f9;
            --gray4: #858585;
            --green: #00a6a6;
            --aqua: #bffcfb;
            --purple: #696cba;
            --white: #fff;
            --black: #000;
            --red: #ecec00;
            --red2: #ff0000;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
            min-height: 100%;
          }
          *,
          *::before,
          *::after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem;
            font-weight: 600;
            line-height: 1.7;
            font-family: "Quicksand", sans-serif;
          }
          h1,
          h2,
          h3 {
            margin: 0;
            line-height: 1.2;
          }
          ul {
            list-style: none;
          }
          a {
            text-decoration: none;
          }
        `}
      />

      {loading ? (
        <Loading>
          <ClipLoader color="#696cba" size={60} />
        </Loading>
      ) : (
        <>
          <Header />
          <Container>{children}</Container>
        </>
      )}
    </StyledLayout>
  );
}
