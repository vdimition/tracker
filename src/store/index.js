import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import { timesReducer } from "./ducks/times";
import { usersReadReducer } from "./ducks/users";
import { projectsReadReducer } from "./ducks/projects";

export const appReducer = combineReducers({
  times: timesReducer,
  usersRead: usersReadReducer,
  projectsRead: projectsReadReducer,
});

export const store = createStore(appReducer, applyMiddleware(thunkMiddleware));
