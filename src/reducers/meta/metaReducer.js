import metaActionTypes from "./metaActionTypes";

const initialState = {
    coin_exchange_area: [],
    entrustList: [],
    coinList: [],
    marketList: [],
    TradePageCoinEx: null,
    docList:[]
};

export default function metaReducer( state = initialState, action ) {
    switch ( action.type ) {
        case metaActionTypes.COIN_EXCHANGE_AREA: {
            return {
                ...state,
                coin_exchange_area: action.data,
            }
        }
        case metaActionTypes.DOC_LIST: {
            return {
                ...state,
                docList: action.data,
            }
        }
        case metaActionTypes.MARKET_LIST: {
            let isExist = false;
            if ( state.TradePageCoinEx ) {
                for ( let index = 0; index < action.data.length; index++ ) {
                    if ( action.data[ index ].coin_exchange_id === state.TradePageCoinEx.coin_exchange_id ) {
                        isExist = true;
                        break;
                    }
                }
            }
            return {
                ...state,
                marketList: action.data,
                TradePageCoinEx: isExist ? state.TradePageCoinEx : action.data[ 0 ]
            }
        }
        case metaActionTypes.COIN_LIST: {
            return {
                ...state,
                coinList: action.data
            }
        }
        case metaActionTypes.CHANGE_TRADE_EX: {
            return {
                ...state,
                TradePageCoinEx: action.data
            }
        }
        default:
            return state;
    }
}
