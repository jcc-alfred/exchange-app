import React from 'react';
import { connect } from "react-redux";
import HomePageView from "./HomePageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const HomePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( HomePageView );

export default HomePage;
