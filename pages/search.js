import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import ProductCard from "../components/ui/product-card";
import styled from "@emotion/styled";
import useProduct from "../hooks/useProduct";

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

export default function Search() {
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const { products, loading, pageSize } = useProduct("createdAt", page, 5);

  const router = useRouter();
  const {
    query: { q },
  } = router;

  useEffect(() => {
    const search = q.toLocaleLowerCase();
    const filtered = products?.filter((product) => {
      return product.name.toLocaleLowerCase().includes(search);
    });
    setResults(filtered);
  }, [q, products]);
  console.log(products);
  return (
    <Container>
      <ProductsContainer>
        <h1>Results</h1>
        {loading && <ClimbingBoxLoader color=" #bffcfb" size={10} />}
        {!loading &&
          results?.length > 0 &&
          results?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        {!loading && results?.length === 0 && <h3> There not products</h3>}
      </ProductsContainer>
    </Container>
  );
}
