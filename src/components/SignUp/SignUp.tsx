import * as React from "react";
import { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { Link, useHistory } from "react-router-dom";

import { routes } from "../../app/routes";

export interface ErrorProps {
  message: string;
}

interface SignUpProps {
  username: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
  error: ErrorProps | null;
}

export const SignUp: React.FC = () => {
  const history = useHistory();

  const firebase = useFirebase();
  const appAuth = firebase.auth();

  const initialState = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null,
  };
  const [signUpData, setSignUpDate] = useState<SignUpProps>(initialState);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    const { email, passwordOne } = signUpData;
    appAuth
      .createUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        console.log("TEST authUser", authUser);
        setSignUpDate({ ...initialState });
        history.push(routes.home.path);
      })
      .catch((error) => {
        console.log("TEST error", error);
        setSignUpDate({ ...error });
      });

    evt.preventDefault();
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpDate({
      ...signUpData,
      [evt.target.name]: evt.target.value,
    });
  };

  const isInvalid = (): boolean => {
    return signUpData.passwordOne !== signUpData.passwordTwo || signUpData.passwordOne === "" || signUpData.email === "" || signUpData.username === "";
  };
  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" value={signUpData.username} onChange={handleChange} type="text" placeholder="Full Name" />
        <input name="email" value={signUpData.email} onChange={handleChange} type="text" placeholder="Email Address" />
        <input name="passwordOne" value={signUpData.passwordOne} onChange={handleChange} type="password" placeholder="Password" />
        <input name="passwordTwo" value={signUpData.passwordTwo} onChange={handleChange} type="password" placeholder="Confirm Password" />
        <button disabled={isInvalid()} type="submit">
          Sign Up
        </button>
        {signUpData.error && <p>{signUpData.error.message}</p>}
      </form>
    </div>
  );
};

export const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.signUp.path}>Sign Up</Link>
  </p>
);
