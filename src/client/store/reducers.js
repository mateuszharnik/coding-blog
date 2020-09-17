import { combineReducers } from 'redux';
import navbar from './NavBar/reducers';

const root = combineReducers({
  navbar,
});

export default root;
