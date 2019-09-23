import React from 'react';
import { connect } from "react-redux";
import SettingLanguagePageView from "./SettingLanguagePageView";
import settingActionTypes from "../../reducers/setting/settingActionTypes";

const mapStoreToProps = ( store, ownProps ) => {
    const { params } = ownProps.navigation.state;

    return {
        language: store.settingStore.language,
    }
};

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onChangeLanguage: ( language ) => {
        dispatch( ( dispatch ) => {
            dispatch( { 'type': settingActionTypes.LANGUAGE_UPDATE, data: language } );
        } );
    },

} );

const SettingLanguagePage = connect(
    mapStoreToProps,
    mapDispatchToProps
)( SettingLanguagePageView );

export default SettingLanguagePage;
