import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import { usersReadReducer } from "./ducks/users";
import { projectsReadReducer } from "./ducks/projects";
import { tracerReducer } from "./ducks/tracker";

export const appReducer = combineReducers({
  usersRead: usersReadReducer,
  projectsRead: projectsReadReducer,
  tracer: tracerReducer,
});

export const store = createStore(appReducer, applyMiddleware(thunkMiddleware));
