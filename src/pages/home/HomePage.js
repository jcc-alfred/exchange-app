import React from 'react';
import { connect } from "react-redux";
import HomePageView from "./HomePageView";
import { commonRegionGetDisplay } from "../../actions/CommonAction";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        regionDisplay: store.settingStore.regionDisplay,
        deviceEnv: store.settingStore.deviceEnv,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ({
    onCommonRegionGetDisplay: ( callback ) => {
        dispatch( commonRegionGetDisplay( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
});

const HomePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( HomePageView );

export default HomePage;
