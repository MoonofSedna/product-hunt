/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import FirebaseContext from "../firebase/context";

export default function useProduct(orderBy, getPage, limit) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(0);

  const { firebase } = useContext(FirebaseContext);

  function getSnapshot(snapshot) {
    const productsArray = [...products];
    setPageSize(snapshot.size);
    snapshot.forEach((doc) => {
      productsArray.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setProducts(productsArray);
    setLoading(false);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const lastViewed =
        products?.length > 0 ? products[products.length - 1]?.createdAt : null;
      try {
        await firebase.snapshot(getSnapshot, orderBy, lastViewed, limit);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [getPage]);

  return { products, loading, pageSize };
}
