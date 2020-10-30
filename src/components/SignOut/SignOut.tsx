import * as React from "react";
import { useFirebase } from "react-redux-firebase";

export const SignOut: React.FC = () => {
  const firebase = useFirebase();
  const appAuth = firebase.auth();

  return (
    <button type="button" onClick={appAuth.signOut}>
      Sign Out
    </button>
  );
};
