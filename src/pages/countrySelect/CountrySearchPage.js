import React from 'react';
import CountrySearchPageView from "./CountrySearchPageView";
import { connect } from "react-redux";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};


const mapDispatchToProps = ( dispatch, ownProps ) => ({});

const CountrySearchPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( CountrySearchPageView );

export default CountrySearchPage;
