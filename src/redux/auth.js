import * as ActionTypes from './ActionTypes';

const initialState = {
    loading: false,
    authenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
    status: { error: null, message: null },
    name: null
};

export const Auth = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {...state,
                loading: true,
                authenticated: false,
                user: action.payload
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {...state,
                loading: false,
                authenticated: true,
                status: { error: false, message: null },
                token: action.token,
                name: action.user
            };
        case ActionTypes.LOGIN_FAILURE:
            return {...state,
                loading: false,
                authenticated: false,
                status: { error: true, message: action.message }
            };
        case ActionTypes.LOGOUT_REQUEST:
            return {...state,
                loading: true,
                authenticated: true
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {...state,
                loading: false,
                authenticated: false,
                token: '',
                user: null,
                name: null
            };
        default:
            return state;
    }
}