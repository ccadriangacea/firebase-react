export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export const firebaseDev: FirebaseConfig = {
  apiKey: "----",
  authDomain: "----",
  databaseURL: "----",
  projectId: "----",
  storageBucket: "----",
  messagingSenderId: "----",
  appId: "----",
};

export const firebaseProd = {};

export const reactReduxFirebaseConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableLogging: false,
};
