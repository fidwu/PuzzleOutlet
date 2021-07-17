import * as ActionTypes from './ActionTypes';

const initialState = {
    loading: false,
    authenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { "email": "", "name": "" },
    status: { error: null, message: null }
};

export const Auth = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {...state,
                loading: true,
                authenticated: false,
                user: { ...state.user, "email": action.payload }
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {...state,
                loading: false,
                authenticated: true,
                status: { error: false, message: null },
                token: action.token,
                user: { ...state.user, "name": action.user }
            };
        case ActionTypes.LOGIN_FAILURE:
            return {...state,
                loading: false,
                authenticated: false,
                status: { error: true, message: action.message }
            };

        case ActionTypes.SIGNUP_REQUEST:
            return {...state,
                loading: true,
                authenticated: false,
                user: { ...state.user, "email": action.payload }
            };
        case ActionTypes.SIGNUP_SUCCESS:
            return {...state,
                loading: false,
                authenticated: true,
                status: { error: false, message: null },
                token: action.token,
                user: { ...state.user, "name": action.user }
            };
        case ActionTypes.SIGNUP_FAILURE:
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
                user: { "email": "", "name": "" },
            };

        // case ActionTypes.GET_USER:
        //     console.log(action.user);
        //     return {...state,
        //         user: action.user
        //     }

        default:
            return state;
    }
}