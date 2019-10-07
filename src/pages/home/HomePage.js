import React from 'react';
import { connect } from "react-redux";
import HomePageView from "./HomePageView";
import { docGetHomeNewsList, exchangeGetMarketList } from "../../actions/ExchangeAction";

const mapStoreToProps = ( store, ownProps ) => {
    return {
        marketList: store.metaStore.marketList
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onExchangeGetMarketList: ( callback ) => {
        dispatch( exchangeGetMarketList( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },

    onGetNewsList: ( callback ) => {
        dispatch( docGetHomeNewsList( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
} );


const HomePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( HomePageView );

export default HomePage;
