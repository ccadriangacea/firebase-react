export interface State {
  appState: AppState;
}

export interface AppState {
  firebase: any;
  error: ErrorState;
}

export interface ErrorState {
  error?: string;
  code?: number;
}

export const initialErrorState: ErrorState = {};

export const initialAppRootState: AppState = {
  firebase: { authError: null },
  error: initialErrorState,
};
