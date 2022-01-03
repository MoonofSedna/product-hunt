import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import Router from "next/router";
import Form from "../components/ui/form";
import Images from "../components/ui/Images";
import useValidation from "../hooks/useValidation";
// utils
import ValidateLogIn from "../utils/validations/validate-log-in";
// firebase
import firebase from "../firebase";
// context
import FirebaseContext from "../firebase/context";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 0.5rem 0 1.5rem 0;
`;

export default function Login() {
  const initialState = {
    email: "",
    password: "",
  };

  const [error, setError] = useState(false);

  const { user } = useContext(FirebaseContext);

  async function logIn() {
    try {
      await firebase.login(email, password);
      Router.push("/");
    } catch (e) {
      setError(e.message);
    }
  }

  const { values, errors, handleChange, handleSubmit } = useValidation(
    initialState,
    ValidateLogIn,
    logIn
  );
  const { email, password } = values;

  if (user) {
    Router.push("/");
    return null;
  }

  return (
    <>
      <Images name="Logo" width={150} height={150} />
      <Form onSubmit={handleSubmit} noValidate>
        <Title>Log In</Title>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <input type="submit" value="Log In" />
        {error && <span>{error}</span>}
      </Form>
    </>
  );
}
