import React from 'react';
import { connect } from "react-redux";
import AssetsPageView from "./AssetsPageView";
import { userGetAssets } from "../../actions/UserAction";

const mapStoreToProps = ( store, ownProps ) => {
    return {}
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {

    onUserGetAssets: ( callback ) => {
        dispatch( userGetAssets( ( err, res ) => {
            callback && callback( err, res )
        } ) );
    },
} );

const AssetsPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AssetsPageView );

export default AssetsPage;
