import { createSelector } from "reselect";
import { isEmpty, isLoaded } from "react-redux-firebase";

import { AppState, initialAppRootState, State } from "../state/AppState";

export const getAppState = (state: State): AppState => {
  if (state.appState) {
    return state.appState;
  }
  return initialAppRootState;
};

export const getFirebaseAuth = createSelector([getAppState], (state: AppState) => {
  return state.firebase.auth;
});

export const getFirebaseProfile = createSelector([getAppState], (state: AppState) => {
  return state.firebase.profile;
});

export const getFirebaseIsAuthenticated = createSelector([getFirebaseAuth], (auth: any) => {
  return isLoaded(auth) && !isEmpty(auth.uid);
});

export const getUser = createSelector(
  [getFirebaseAuth, getFirebaseProfile],
  (auth: any, profile: any): User => {
    return {
      auth: {
        uid: auth.uid,
        displayName: auth.displayName ? auth.displayName : auth.email,
        photoURL: auth.photoURL,
        email: auth.email,
      },
      profile: {
        roles: profile.roles,
        address: profile.address,
        settings: profile.settings,
      },
    };
  }
);

export interface User {
  auth: UserAuth;
  profile: UserProfile;
}

export interface UserAuth {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
}

export interface UserProfile {
  roles: UserRole[];
  address: UserAddress;
  settings: UserSettings;
}

export interface UserRole {
  name: string;
}

export interface UserAddress {
  city: string;
  country: string;
}

export interface UserSettings {
  notifications: boolean;
}
