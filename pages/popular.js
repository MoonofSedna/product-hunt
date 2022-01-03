/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import ProductCard from "../components/ui/product-card";
import styled from "@emotion/styled";
import useProduct from "../hooks/useProduct";
import Button from "../components/ui/buttons";

const ProductsContainer = styled.div`
  width: 90%;
  min-height: 300px;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--green);
  border-radius: 8px;
  padding: 2rem;

  & h1 {
    color: var(--aqua);
    font-size: 3.5rem;
    padding: 2rem 0 4rem 0;
  }
  @media (max-width: 767px) {
    max-width: 500px;
  }

  @media (max-width: 450px) {
    & h1 {
      font-size: 2.5rem;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem 0;
  margin-top: 8rem;
  & h3 {
    font-size: 2.4rem;
    margin: 1.4rem 0;
    color: var(--green);
  }

  & button {
    margin: 2rem 0;
  }
  @media (max-width: 767px) {
    margin-top: 2rem;
  }
`;

export default function Popular() {
  const [page, setPage] = useState(1);
  const { products, loading, pageSize } = useProduct("createdAt", page, 5);

  return (
    <Container>
      <ProductsContainer>
        <h1>Popular </h1>
        {loading && <ClimbingBoxLoader color=" #bffcfb" size={10} />}
        {!loading &&
          products?.length > 0 &&
          products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        {!loading && products?.length === 0 && <h3> There not products</h3>}
      </ProductsContainer>
      {pageSize >= 5 && (
        <Button bgColor onClick={() => setPage(page + 1)}>
          Load more
        </Button>
      )}
    </Container>
  );
}
