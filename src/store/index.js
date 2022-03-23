import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import studentReducer from './studentStore';
import campusReducer from './campusStore';


const reducer = combineReducers({
  students: studentReducer,
  campuses: campusReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;