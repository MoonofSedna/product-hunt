import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import Router from "next/router";
// components
import Form from "../components/ui/form";
import Images from "../components/ui/Images";
// hooks
import useValidation from "../hooks/useValidation";
import ValidateSignUp from "../utils/validations/validate-sign-up";
// firebase
import firebase from "../firebase";
// context
import FirebaseContext from "../firebase/context";

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 0.5rem 0 1.5rem 0;
`;

export default function SignUp() {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const [error, setError] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidation(initialState, ValidateSignUp, createUser);
  const { name, email, password } = values;

  const { user } = useContext(FirebaseContext);

  if (user) {
    Router.push("/");
    return null;
  }
  async function createUser() {
    try {
      await firebase.signin(name, email, password);
      Router.push("/");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <Images name="Logo" width={150} height={150} />
      <Form onSubmit={handleSubmit} noValidate>
        <Title>Sign up</Title>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
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
            onBlur={handleBlur}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <input type="submit" value="Create account" />
        {error && <span>{error}</span>}
      </Form>
    </>
  );
}
