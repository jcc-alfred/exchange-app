import React from 'react';
import { connect } from "react-redux";
import NewsDetailPageView from "./NewsDetailPageView";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );


const NewsDetailPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( NewsDetailPageView );

export default NewsDetailPage;