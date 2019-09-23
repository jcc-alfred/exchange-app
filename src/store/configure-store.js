import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import thunk from "redux-thunk";
import { persistCombineReducers, persistStore, } from "redux-persist";
import { reducers } from "../reducers";
import storage from 'redux-persist/es/storage'
import { navMiddleware } from '../AppNavigator';

const { logger } = require( 'redux-logger' );

const middleWares = [];


// configuring saga middleware
const sagaMiddleware = createSagaMiddleware();

middleWares.push( sagaMiddleware );
middleWares.push( thunk );
middleWares.push( navMiddleware );

/* global __DEV__  */
if ( __DEV__ ) {
    middleWares.push( logger );
}
const createStoreWithMiddleware = applyMiddleware( ...middleWares );

export default function configureStore( onComplete ) {
    const config = {
        key: 'primary',
        storage,
        // transform: [],
        //whitelist: ['userStore'],,
    };

    let reducer = persistCombineReducers( config, reducers );

    const store = createStore(
        reducer,
        undefined,
        compose(
            createStoreWithMiddleware,
        )
    );

    persistStore( store, null, () => {
        if ( onComplete != null ) {
            onComplete( store );
        }
    } );

    // install saga run
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch( END );
}