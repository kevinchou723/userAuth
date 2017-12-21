import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
// import FormReducer from './FormReducer';
import UserReducer from './UserReducer';

//combines all the reducers
export default combineReducers({
    form: FormReducer,
    user: UserReducer
});