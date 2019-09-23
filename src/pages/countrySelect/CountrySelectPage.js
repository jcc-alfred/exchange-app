import React from 'react';
import CountrySelectPageView from "./CountrySelectPageView";
import { connect } from "react-redux";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};


const mapDispatchToProps = ( dispatch, ownProps ) => ({});

const CountrySelectPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( CountrySelectPageView );

export default CountrySelectPage;
