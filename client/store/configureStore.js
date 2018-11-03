import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { connectRouter, routerMiddleware } from 'connected-react-router'

// Modules - import each module to be mounted on redux store
import account from './modules/account';

export default function configureStore(history, initialState) {
    const reducers = {
        form, // reduxForm must be named 'form'
        // mount your modules here
        account: account,
    };

    const middleware = [
        thunk,
        logger,
        routerMiddleware(history)
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    const rootReducer = combineReducers({
        ...reducers,
    });

    return createStore(
        connectRouter(history)(rootReducer),
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}
