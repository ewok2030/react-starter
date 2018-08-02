import axios from 'axios';

// Action types
/*
  Define a set of action types to be used within this module
  Convention is to name them as project/module/actionType
*/
const GET_TASKS = 'react-starter/task/GET_TASKS';
const GET_TASKS_SUCCESS = 'react-starter/task/GET_TASKS_SUCCESS';
const GET_TASKS_ERROR = 'react-starter/task/GET_TASKS_ERROR';
const GET_TASK = 'react-starter/task/GET_TASK';
const GET_TASK_SUCCESS = 'react-starter/task/GET_TASK_SUCCESS';
const GET_TASK_ERROR = 'react-starter/task/GET_TASK_ERROR';

// Initial state
/*
   Define the module's initial state, to be injected into the reducer
   The initial state should contain default values for most properties, or the containers
   who reference this module's state should be able to deal with missing properties
*/
const initialState = {
  active: null, // which task is currently select
  isLoading: false, // if the UI should show loading
  list: [], // list of tasks populated from API
};

// Reducer
/*
  A single function named 'reducer' will be loaded by redux as this module's state
  The reducer accepts the current state (which is the initial state on first load) and an action.
  The reducers job is to decide how to modify the current state based on the action type.
*/
export default function reducer(state = initialState, action = {}) {
  /*
    Always return a new instance of the state object, never modify the old state
    Use the ES6 syntax new = {...old} to create a new object with the same properties,
    we must use immutable operations only.
  */
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        isLoading: true, // Tell the UI some loading action has begun, so it can update
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false, // Tell the UI loading has complete
        list: action.data, // lists of task entities
        active: null, // clear the active task, in case it is not present in state.list
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        isLoading: false, // Tell the UI loading has complete
        active: null, // GET failed, so clear the active task to avoid confusion
        error: action.error, // Tell the UI what the error message is
      };
    case GET_TASK:
      return {
        ...state,
        isLoading: true, // Tell the UI some loading action has begun, so it can update
      };
    case GET_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false, // Tell the UI loading has complete
        active: action.data, // Set the Active task to the action payload
      };
    case GET_TASK_ERROR:
      return {
        ...state,
        isLoading: false, // Tell the UI loading has complete
        active: null, // GET failed, so clear the active task to avoid confusion
        error: action.error, // Tell the UI what the error message is
      };
    default:
      // Must return the current state, if no modifications are to be made
      return state;
  }
}

// Action Creators
/*
  Provide reusable functions that containers can call to dispatch actions.
  Action creators must be return a function (not just be a function) which accepts the dispatcher as an argument.

  The reducer will listen for events, and modify the state as needed.
  Any data the reducer requires must be a payload in the dispatched action.
*/
export const getTasks = () => (dispatch) => {
  /*
    Dispatched Actions must always have a 'type' property, but can have other fields.
    The reducer consumes the actions, so the contents of the action object is a contract between the two.
  */

  // Dispatch an action, so the reducer can update the isLoading property
  dispatch({ type: GET_TASKS });

  // Make a call to an API
  axios.get('/api/task/').then((response) => {
    // If call was successful, dispatch success action type
    dispatch({ type: GET_TASKS_SUCCESS, data: response.data });
  }).catch((response) => {
    // If call was unsucceffuly, dispatch error action type
    dispatch({ type: GET_TASKS_ERROR, error: response.data });
  });
};


export const getTask = id => (dispatch) => {
  dispatch({ type: GET_TASK });
  axios.get(`/api/task/${id}`).then((response) => {
    dispatch({ type: GET_TASK_SUCCESS, data: response.data });
  }).catch((response) => {
    dispatch({ type: GET_TASK_ERROR, error: response.data });
  });
};
