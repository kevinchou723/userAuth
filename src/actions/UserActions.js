import axios from 'axios';
import { parseFullName } from 'parse-full-name';
import { push } from 'react-router-redux';

export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_FIRSTNAME = "SET_USER_FIRSTNAME";
export const SET_USER_SESSION_ID = "SET_USER_SESSION_ID";
export const SET_IS_USER_AUTHENTICATED = "SET_IS_USER_AUTHENTICATED";
export const SET_FLASH_MESSAGE = "SET_FLASH_MESSAGE";


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

export const setFlashMessage = ({message}) => {
    return {
        type: SET_FLASH_MESSAGE,
        message
    }
}

export const checkIsUserAuthenticated = () => {
    return (dispatch, getState) => {
        const isAuthenticated = getState().user.get('isAuthenticated');
        if (!isAuthenticated){
            axios.get('/api/me').then((res) => {
                const { data } = res;
                if(data.isAuthenticated){
                    dispatch(setUserEmail({ email: data.user.email }));
                    dispatch(setUserFirstname({ firstname: data.user.firstname }));
                    dispatch(setUserSessionId({ sessionId: data.user.sessionId }));
                    dispatch(setIsUserAuthenticated({ isAuthenticated: true }));
                    dispatch(push('/me'));
                }else{
                    dispatch(setIsUserAuthenticated({ isAuthenticated: false }));
                    dispatch(push('/login'));
                }
            }).catch((err) => {
                throw err;
            });
        }else{
            dispatch(push('/me'));
        }
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
            if (data.success) {
                dispatch(setUserEmail({ email: data.user.email }));
                dispatch(setUserFirstname({ firstname: data.user.firstname }));
                dispatch(setUserSessionId({ sessionId: data.user.sessionId }));
                dispatch(setIsUserAuthenticated({ isAuthenticated: true }));
                dispatch(push('/me'));
            } else {
                dispatch(setFlashMessage({message: data.message}));
            }
        }).catch((err)=>{
            throw err;
        });
    }
};

export const loginUser = () => {
    return (dispatch, getState) => {
        const userValues = getState().form.login.values;
        const userData = {
            email: userValues.email,
            password: userValues.password
        };

        axios.post('/api/login', userData).then((res) => {
            const { data } = res;
            if(data.success){
                dispatch(setUserEmail({ email: data.user.email }));
                dispatch(setUserFirstname({ firstname: data.user.firstname }));
                dispatch(setUserSessionId({ sessionId: data.user.sessionId }));
                dispatch(setIsUserAuthenticated({ isAuthenticated: true }));
                dispatch(push('/me'));
            }else{
                dispatch(setFlashMessage({ message: data.message }));
            }
        }).catch((err) => {
            throw err;
        });
    }
};

export const logoutUser = () => {
    return (dispatch, getState) => {
        axios.get('/api/logout').then((res) => {
            const { data } = res;
            if(data.success){
                dispatch(setUserEmail({ email: null }));
                dispatch(setUserFirstname({ firstname: null }));
                dispatch(setUserSessionId({ sessionId: null }));
                dispatch(setIsUserAuthenticated({ isAuthenticated: false }));
                dispatch(push('/login'));
            }
        }).catch((err) => {
            throw err;
        });
    }
}