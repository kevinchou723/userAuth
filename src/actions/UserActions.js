import axios from 'axios';
import { parseFullName } from 'parse-full-name';

export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_FIRSTNAME = "SET_USER_FIRSTNAME";
export const SET_USER_SESSION_ID = "SET_USER_SESSION_ID";
export const SET_IS_USER_AUTHENTICATED = "SET_IS_USER_AUTHENTICATED";


export const setUserEmail = ({ email }) => {
    return {
        type: SET_USER_EMAIL,
        email
    };
}

export const setUserFirstname = ({ firstname }) => {
    return {
        type: SET_USER_FIRSTNAME,
        firstname
    };
}

export const setUserSessionId = ({ sessionId }) => {
    return {
        type: SET_USER_SESSION_ID,
        sessionId
    };
}

export const setIsUserAuthenticated = ({ isAuthenticated }) => {
    return {
        type: SET_IS_USER_AUTHENTICATED,
        isAuthenticated
    };
}

export const checkIsUserAuthenticated = () => {
    return (dispatch, getState) => {
        axios.get('/api/me').then((res) => {
            const { data } = res;
            dispatch(setUserEmail({ email: data.user.email }));
            dispatch(setUserFirstname({ firstname: data.user.firstname }));
            dispatch(setUserSessionId({ sessionId: data.user.sessionId }));
            dispatch(setIsUserAuthenticated({ isAuthenticated: true }));
        }).catch((err) => {
            throw err;
        });
    }
}

export const signUpUser = () => {
    return (dispatch, getState) => {
        const userValues = getState().form.signup.values;
        const parsedName = parseFullName(userValues.fullname);
        const userData = {
            firstname: parsedName.first.toLowerCase(),
            lastname: parsedName.last.toLowerCase(),
            email: userValues.email,
            password: userValues.password
        };
        
        axios.post('/api/signup', userData).then((res) => {
            const { data } = res;
            dispatch(setUserEmail({email: data.user.email}));
            dispatch(setUserFirstname({firstname: data.user.firstname}));
            dispatch(setUserSessionId({sessionId: data.user.sessionId}));
            dispatch(setIsUserAuthenticated({isAuthenticated: true}));
        }).catch((err)=>{
            throw err;
        });
    }
};