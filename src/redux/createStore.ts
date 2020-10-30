import { configureStore, getDefaultMiddleware, AnyAction, Store } from "@reduxjs/toolkit";
import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";

import { AppState, State } from "./state/AppState";
import { appRootReducer } from "./reducer/appRootReducer";

let persistor: Persistor;

export const getPersistor = () => {
  return persistor;
};

export const setPersistor = (ptor: Persistor) => {
  persistor = ptor;
};

const persistAppStateConfig = {
  key: "appRootState",
  storage,
  stateReconciler: autoMergeLevel2,
};

export const configureAppReduxStore = (history: History) => {
  const middleware = [
    ...getDefaultMiddleware(),
    createSagaMiddleware(),
    //thunk.withExtraArgument(getFirebase),
    routerMiddleware(history),
  ];
  if (process.env.REACT_APP_NO_REDUX_LOGGER !== "true") {
    middleware.push(createLogger({ level: "debug" }));
  }

  const store: Store<State> = configureStore({
    reducer: {
      appState: persistReducer<AppState, AnyAction>(persistAppStateConfig, appRootReducer),
    },
    middleware,
    devTools: process.env.NODE_ENV !== "production",
  });

  setPersistor(persistStore(store));

  return { store, persistor: getPersistor() };
};
