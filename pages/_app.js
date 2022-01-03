import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import firebase, { FirebaseContext } from "../firebase";
import useAuthentication from "../hooks/useAuthentication";

function MyApp({ Component, pageProps }) {
  const { user, loading } = useAuthentication();

  return (
    <FirebaseContext.Provider value={{ firebase, user }}>
      <Layout loading={loading}>
        <Component {...pageProps} />
      </Layout>
    </FirebaseContext.Provider>
  );
}

export default MyApp;
