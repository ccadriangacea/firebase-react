import { makeStyles, Theme } from "@material-ui/core";
import * as React from "react";
import { auth } from "firebase/app";
import { useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";

import "react-toastify/dist/ReactToastify.css";

import { routes } from "../../app/routes";
import { getFirebaseIsAuthenticated } from "../../redux/selector/firebaseSelectors";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

export const SignIn: React.FC = () => {
  const classes = useStyles();

  const firebaseApp = useFirebase();
  const history = useHistory();

  const isAuthenticated: boolean = useSelector(getFirebaseIsAuthenticated);

  const firebaseUiConfig: firebaseui.auth.Config = {
    signInFlow: "popup", // Popup signin flow rather than redirect flow.
    credentialHelper: "none",
    signInOptions: [
      auth.EmailAuthProvider.PROVIDER_ID,
      // auth.GoogleAuthProvider.PROVIDER_ID, // activate first in firebase
      // auth.FacebookAuthProvider.PROVIDER_ID // activate first in firebase
    ],
    callbacks: { signInSuccessWithAuthResult: () => false },
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push(routes.home.path);
    }
    return;
  }, [isAuthenticated, history]);

  return (
    <div className={classes.root}>
      <StyledFirebaseAuth uiConfig={firebaseUiConfig as any} firebaseAuth={firebaseApp.auth()} />
    </div>
  );
};
