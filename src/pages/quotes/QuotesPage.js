import React from 'react';
import { connect } from "react-redux";
import QuotesPageView from "./QuotesPageView";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );

const QuotesPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( QuotesPageView );

export default QuotesPage;
