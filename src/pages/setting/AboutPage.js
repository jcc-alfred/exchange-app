import React from 'react';
import { connect } from "react-redux";
import AboutPageView from "./AboutPageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ({});

const AboutPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AboutPageView );

export default AboutPage;
