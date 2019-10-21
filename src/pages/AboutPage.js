import React from 'react';
import { connect } from "react-redux";
import AboutPageView from "./AboutPageView";
import {docGetArticleList, docGetHomeNewsList} from "../actions/DocAction";
import metaActionTypes from "../reducers/meta/metaActionTypes";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        docList: store.metaStore.docList,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onGetArticleList: ( callback ) => {
        dispatch( docGetArticleList( ( err, res ) => {
            if ( !err ) {
                dispatch(
                    {
                        type: metaActionTypes.DOC_LIST,
                        data: res.data
                    }
                )
            }
            callback && callback( err, res )
        } ) );
    },
} );

const AboutPage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( AboutPageView );

export default AboutPage;
