import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { createBrowserHistory as createHistory, History } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { compose } from "redux";

import { firebaseDev } from "../constants/firebase";
import { configureAppReduxStore } from "../redux/createStore";

import { Bootstrap, BootstrapProps } from "./components/Bootstrap";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// TODO export const firebaseConfig = process.env.NODE_ENV === "production" ? firebaseProd : firebaseDev;
export const firebaseConfig = process.env.NODE_ENV === "production" ? firebaseDev : firebaseDev;

function renderApp(props: BootstrapProps) {
  ReactDOM.render(<Bootstrap {...props} />, document.getElementById("root") as HTMLElement);
}

export function main() {
  const history: History = createHistory({
    basename: window.location.pathname,
  });

  const { store, persistor } = configureAppReduxStore(history);

  if (!firebase.apps.length) {
    console.log("Going to do initializeApp and firestore...");
    try {
      firebase.initializeApp(firebaseConfig);

      firebase.firestore();
    } catch (e) {
      console.error(e);
    }
  }

  renderApp({ store, persistor, firebase });
}
