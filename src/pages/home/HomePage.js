import React from 'react';
import { connect } from "react-redux";
import HomePageView from "./HomePageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        isLoggedIn: store.userStore.isLoggedIn,
        regionDisplay: store.settingStore.regionDisplay,
        deviceEnv: store.settingStore.deviceEnv,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const HomePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( HomePageView );

export default HomePage;
