import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { createFirebaseInstance, ReactReduxFirebaseProvider } from "react-redux-firebase";
import { ToastContainer } from "react-toastify";
import { Store } from "redux";
import { Persistor } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";

import { reactReduxFirebaseConfig } from "../../constants/firebase";
import theme from "../../theme";
import { State } from "../../redux/state/AppState";

import { App } from "./App";

export interface BootstrapProps {
  store: Store<State>;
  persistor: Persistor;
  firebase: any;
}

export const Bootstrap: React.FC<BootstrapProps> = ({ store, persistor, firebase }) => {
  const reactReduxFirebaseProps = {
    firebase,
    config: reactReduxFirebaseConfig,
    dispatch: store.dispatch,
    createFirebaseInstance,
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
            <Router>
              <App />
              <ToastContainer enableMultiContainer containerId={"BL"} position={"bottom-left"} autoClose={4000} draggable={false} />
              <ToastContainer enableMultiContainer containerId={"TR"} position={"top-right"} autoClose={4000} draggable={false} />
            </Router>
          </ReactReduxFirebaseProvider>
        </PersistGate>
      </StoreProvider>
    </MuiThemeProvider>
  );
};
