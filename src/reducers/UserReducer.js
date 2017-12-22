import { Map } from 'immutable';
import { 
    SET_USER_EMAIL,
    SET_USER_FIRSTNAME,
    SET_USER_SESSION_ID,
    SET_IS_USER_AUTHENTICATED,
    SET_FLASH_MESSAGE
} from '../actions/UserActions';

const INITIAL_STATE = Map({
    isAuthenticated: false,
    firstname: '',
    email: '',
    sessionId: '',
    flashMessage: ''
});

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_IS_USER_AUTHENTICATED:
            return state.set('isAuthenticated', action.isAuthenticated);
        case SET_USER_EMAIL:
            return state.set('email', action.email);
        case SET_USER_FIRSTNAME:
            return state.set('firstname', action.firstname);
        case SET_USER_SESSION_ID:
            return state.set('sessionId', action.sessionId);
        case SET_FLASH_MESSAGE:
            return state.set('flashMessage', action.message);
        default:
            return state;
    }
}
