import { ErrorPayload } from "../reducer/appRootReducer";
import { State } from "../state/AppState";

export const getErrorPayload = (state: State): ErrorPayload => {
  return state.appState.error;
};
