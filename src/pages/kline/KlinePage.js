import React from 'react';
import {connect} from "react-redux";
import KlinePageView from "./KlinePageView";
import {authLogout} from "../../actions/AuthAction";
import {LoadInitSocket} from "../../actions/SocketAction";

const mapStoreToProps = (store, ownProps) => {
    const {params} = ownProps.navigation.state;
    const coin_exchange =params.coin_exchange;

    return {
        coin_exchange: params.coin_exchange,
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
        entrustList: store.metaStore.entrustList,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // oninitSocket: (user_id, coin_exchange_id,callback) => {
    //     dispatch(LoadInitSocket(user_id, coin_exchange_id, (err, res) => {
    //             callback && callback(err, res)
    //         }
    //     ))
    // },
});

const KlinePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)(KlinePageView);

export default KlinePage;
