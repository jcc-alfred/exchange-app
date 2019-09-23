import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import configureStore from "./store/configure-store";
import Main from "./Main";
import { Provider } from "react-redux";

let _provider;
let _store;

export function setup( props ) {
    console.disableYellowBox = true;

    const [ isLoadingComplete, setLoadingComplete ] = useState( false );
    const [ store, setStore ] = useState( null );

    if ( !isLoadingComplete && !props.skipLoadingScreen ) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => {
                    configureStore( ( store ) => {
                        _store = store;

                        setStore( store );

                        setLoadingComplete( true );
                    } );
                }}
            />
        );
    } else {
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        );
    }
}

async function loadResourcesAsync() {
    await Promise.all( [
        Asset.loadAsync( [
            require( '../assets/images/robot-dev.png' ),
            require( '../assets/images/robot-prod.png' ),
            require( '../assets/images/vip.png' ),
            require( '../assets/images/qr_code.png' ),
        ] ),
        Font.loadAsync( {
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free to
            // remove this if you are not using it in your app
            'space-mono': require( '../assets/fonts/SpaceMono-Regular.ttf' ),
        } )
    ] );
}

function handleLoadingError( error ) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn( error );
}

export function getStore() {
    return _store;
}

