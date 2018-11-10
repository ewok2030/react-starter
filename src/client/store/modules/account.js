import axios from 'axios';
import { ACCOUNT } from '../../api';

// Action types
const GET_CURRENT = 'account/GET_CURRENT';
const GET_CURRENT_SUCCESS = 'GET_CURRENT_SUCCESS';
const GET_CURRENT_ERROR = 'account/GET_CURRENT_ERROR';
const GET_USERS = 'account/GET_USERS';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_ERROR = 'account/GET_USERS_ERROR';

const initialState = {
    current: { username: "Unknown" },
    users: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case GET_CURRENT_SUCCESS:
            return {
                ...state,
                current: action.data,
            };
        case GET_CURRENT_ERROR:
            return {
                ...state,
                ...initialState,
                error: action.error,
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.data,
            };
        case GET_USERS_ERROR:
            return {
                ...state,
                ...initialState,
                error: action.error,
            };
        default:
            return state;
    }
}

// Action Creators
export const getCurrent = () => (dispatch) => {
    // Dispatch an action, so the reducer can update the isLoading property
    dispatch({ type: GET_CURRENT });

    // Make a call to an API
    axios.get(ACCOUNT.getCurrent(), { withCredentials: true }).then((response) => {
        // If call was successful, dispatch success action type
        dispatch({ type: GET_CURRENT_SUCCESS, data: response.data });
    }).catch((response) => {
        // If call was unsucceffuly, dispatch error action type
        dispatch({ type: GET_CURRENT_ERROR, error: response });
    });
};

// Action Creators
export const getUsers = () => (dispatch) => {
    // Dispatch an action, so the reducer can update the isLoading property
    dispatch({ type: GET_USERS });

    // Make a call to an API
    axios.get(ACCOUNT.getAll(), { withCredentials: true }).then((response) => {
        // If call was successful, dispatch success action type
        dispatch({ type: GET_USERS_SUCCESS, data: response.data });
    }).catch((response) => {
        // If call was unsucceffuly, dispatch error action type
        dispatch({ type: GET_USERS_ERROR, error: response });
    });
};
