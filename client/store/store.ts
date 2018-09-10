import {
  Action,
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { FormStateMap, reducer as formReducer } from 'redux-form';
import { authReducer, AuthStateTypes, IAuthState } from './auth';
import { ISubmitEntryState, submitEntryReducer } from './submitEntry';
import { ITagsState, tagsReducer } from './tags';
import { NextContext } from 'next';

export interface IAppState {
  auth: IAuthState;
  form: FormStateMap;
  submitEntry: ISubmitEntryState;
  tags: ITagsState;
}

export interface INextContextWithRedux extends NextContext {
  reduxStore: Store & {
    dispatch: ThunkDispatch<IAppState, void, Action>;
  };
}

const rootReducer = combineReducers<IAppState>({
  auth: authReducer,
  form: formReducer,
  submitEntry: submitEntryReducer,
  tags: tagsReducer,
});

const store = (state: IAppState, action) => {
  if (action.type === AuthStateTypes.LOGOUT_REQUEST) {
    state = undefined;
  }

  return rootReducer(state, action);
};

export const initializeStore = (initialState = {}) =>
  createStore(store, initialState, composeWithDevTools(applyMiddleware(thunk)));
