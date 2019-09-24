import {
    netExchangeDoBatchCancelEntrust,
    netExchangeDoBatchEntrust,
    netExchangeDoCancelEntrust,
    netExchangeDoEntrust,
    netExchangeEntrustlist,
    netExchangeGetCoinExchangeAreaList,
    netExchangeGetCoinExchangeList,
    netExchangeGetCoinList,
    netExchangeGetEntrustList,
    netExchangeGetIsExchangeSafe,
    netExchangeGetMarketList,
    netExchangeGetUserDepositListByCoinId,
    netExchangeLastPrice
} from "../net/ExchangeApiNet";
import userActionTypes from "../reducers/user/userActionTypes";
import metaActionTypes from "../reducers/meta/metaActionTypes";


export function exchangeGetMarketList(callback) {
    return (dispatch) => {
        netExchangeGetMarketList((err, res) => {
            callback && callback(err, res)
        });
    };
}


export function exchangeGetCoinExchangeList(callback) {
    return (dispatch) => {
        netExchangeGetCoinExchangeList((err, res) => {
            callback && callback(err, res)
        });
    };
}


export function exchangeGetCoinExchangeAreaList(callback) {
    return (dispatch) => {
        netExchangeGetCoinExchangeAreaList((err, res) => {
            if (!err) {
                dispatch({
                    type: metaActionTypes.COIN_EXCHANGE_AREA,
                    data: res.data
                })
            }
            callback && callback(err, res)
        });
    };
}

export function exchangeLastPrice(coin_name, callback) {
    return (dispatch) => {
        netExchangeLastPrice(coin_name, (err, res) => {
            callback && callback(err, res)
        });
    };
}


export function exchangeDoBatchCancelEntrust(query, callback) {
    return (dispatch) => {
        netExchangeDoBatchCancelEntrust(query, (err, res) => {
            callback && callback(err, res)
        });
    };
}

export function exchangeGetUserDepositListByCoinId(query, callback) {
    return (dispatch) => {
        netExchangeGetUserDepositListByCoinId(query, (err, res) => {
            callback && callback(err, res)
        });
    };
}

export function exchangeGetCoinList(callback) {
    return (dispatch) => {
        netExchangeGetCoinList((err, res) => {
            callback && callback(err, res)
        });
    };
}

export function exchangeGetEntrustList(coinExchangeId, callback) {
    return (dispatch) => {
        netExchangeGetEntrustList(coinExchangeId, (err, res) => {
            callback && callback(err, res)
        });
    };
}


export function exchangeEntrustlist(coinExchangeId, callback) {
    return (dispatch) => {
        netExchangeEntrustlist(coinExchangeId, (err, res) => {
            callback && callback(err, res)
        });
    };
}


export function exchangeGetIsExchangeSafe(coinExchangeId, callback) {
    return (dispatch) => {
        netExchangeGetIsExchangeSafe(coinExchangeId, (err, res) => {
            callback && callback(err, res)
        });
    };
}


export function exchangeDoEntrust(query, callback) {
    return (dispatch) => {
        netExchangeDoEntrust(query, (err, res) => {
            callback && callback(err, res)
        });
    };
}


export function exchangeDoCancelEntrust(query, callback) {
    return (dispatch) => {
        netExchangeDoCancelEntrust(query, (err, res) => {
            callback && callback(err, res)
        });
    };
}


export function exchangeDoBatchEntrust(query, callback) {
    return (dispatch) => {
        netExchangeDoBatchEntrust(query, (err, res) => {
            callback && callback(err, res)
        });
    };
}


