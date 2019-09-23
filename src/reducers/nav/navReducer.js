import React from "react";
import { NavigationActions } from "react-navigation";
import navActionTypes from "./navActionTypes";
import { RootNavigator } from "../../AppNavigator";

export const initialNavState = {
    ...RootNavigator.router.getStateForAction( NavigationActions.navigate( { routeName: "mainPage" } ) ),
};

export default function navReducer( state = initialNavState, action ) {
    let nextState;

    switch ( action.type ) {
        case navActionTypes.NAV_CLEAR_STACK:
            if ( !__DEV__ ) {
                return {
                    ...initialNavState,
                };
            }
            break;
        case 'Navigation/BACK':
            const { type, routeName } = action;
            if ( state.routes && state.routes.length > 0 ) {
                const lastRoute = state.routes[ state.routes.length - 1 ];
                const previousRoute = state.routes.length >= 2 ? state.routes[ state.routes.length - 2 ] : null;

                if ( lastRoute.params && lastRoute.params.backKey && lastRoute.params.backKey.length > 0 ) {
                    nextState = RootNavigator.router.getStateForAction(
                        NavigationActions.back( { key: lastRoute.params.backKey } ),
                        state
                    );
                } else {
                    nextState = RootNavigator.router.getStateForAction( action, state );
                }
            } else {
                nextState = RootNavigator.router.getStateForAction( action, state );
            }
            break;
        case 'Navigation/NAVIGATE': {
            const { type, routeName } = action;

            nextState = RootNavigator.router.getStateForAction( action, state );
            break;
        }
        default:
            nextState = RootNavigator.router.getStateForAction( action, state );
            break;
    }


    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}
