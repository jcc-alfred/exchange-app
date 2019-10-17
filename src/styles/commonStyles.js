/**
 * @class StylesCommon
 * @desc 通用样式
 */
import React from 'react';
import { Dimensions, StyleSheet } from "react-native";
import constStyles from "./constStyles";
import Util from "../util/Util";

let totalWidth = Dimensions.get( 'window' ).width;


const commonStyles = StyleSheet.create(
    {
        wrapper: {
            flex: 1
        },
        commonBG: {
            backgroundColor: '#fafafa'
        },
        paddingCommon: {
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 15,
            paddingRight: 15
        },
        marginCommon: {
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 15,
            marginRight: 15
        },
        mgt_normal: {
            marginTop: 20
        },
        mgb_normal: {
            marginBottom: 20
        },
        mgl_normal: {
            marginLeft: 15
        },
        mgr_normal: {
            marginRight: 15
        },
        pdt_normal: {
            paddingTop: 20
        },
        pdb_normal: {
            paddingBottom: 20
        },
        pdl_normal: {
            paddingLeft: 15
        },
        pdr_normal: {
            paddingRight: 15
        },

        justAlignCenter: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        modalBoxStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            width: 100,
            backgroundColor: 'rgba(0, 0, 0, 0)'
        },
        commonTextColorStyle: {
            color: '#555555'
        },
        commonTextStyle: {
            fontSize: 16,
            color: '#292e33'
        },
        commonInputTextStyle: {
            color: '#292e33',
            fontSize: 16,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 8,
            paddingBottom: 8
        },
        commonInput: {
            height: 48,
            color: '#292e33',
            fontSize: 16,
            backgroundColor: '#e6edf2',
            borderRadius: 4,
            paddingLeft: 10,
            paddingRight: 10,
        },
        commonInputShell: {
            backgroundColor: '#e6edf2',
            height: 48,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center'
        },
        commonLabelStyle_1: {
            backgroundColor: '#e6edf2',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
        },
        commonLabelStyle_2: {
            backgroundColor: '#e6edf2',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
        },
        commonSubTextColorStyle: {
            color: '#7a8a99'
        },
        commonSubTextStyle: {
            color: '#7a8a99',
            fontSize: 16
        },
        commonSmallSubTextStyle: {
            color: '#7a8a99',
            fontSize: 12
        },
        commonIntervalStyle: {
            height: Util.getDpFromPx( 1 ),
            backgroundColor: '#e8e8e8'
        },
        newsIntervalStyle: {
            height: 10,
            backgroundColor: '#f5f5f5'
        },
        commonBorderTop: {
            borderTopWidth: Util.getDpFromPx( 1 ),
            borderTopColor: '#e8e8e8',
        },

        commonBorderBottom: {
            borderBottomWidth: Util.getDpFromPx( 1 ),
            borderBottomColor: '#e8e8e8',
        },
        jsWebView: {
            height: 0,
            width: 0,
            padding: 0,
            opacity: 0,
            backgroundColor: 'white'
        },

        buttonContainerStyle: {
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 22,
            height: 44,
            overflow: 'hidden',
            backgroundColor: constStyles.THEME_COLOR,
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonContainerDisabledStyle: {
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 22,
            height: 44,
            overflow: 'hidden',
            backgroundColor: '#b4c1cc',
            alignItems: 'center',
            justifyContent: 'center'
        },

        buttonRoundContainerStyle: {
            paddingLeft: 24,
            paddingRight: 24,
            height: 44,
            overflow: 'hidden',
            borderRadius: 22,
            flexDirection: 'row',
            backgroundColor: constStyles.THEME_COLOR,
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonRoundContainerDisabledStyle: {
            paddingLeft: 24,
            paddingRight: 24,
            height: 44,
            overflow: 'hidden',
            borderRadius: 22,
            backgroundColor: '#B5B5B5',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },


        buttonContentStyle: {
            fontSize: 18,
            color: 'white',
            fontWeight: 'normal'
        },
        buttonSmallContentStyle: {
            fontSize: 12,
            color: 'white',
            fontWeight: 'normal',
            alignItems: 'flex-start'
        },
        buttonDisabledStyle: {
            fontSize: 18,
            color: 'white',
            fontWeight: 'normal'
        },
        buttonBorder: {
            borderWidth: 1,
            padding: 25,
            borderColor: 'black'
        },
        top_info_right_btn: {
            marginRight: 15,
            color: '#892533',
            fontSize: 16
        },
        empty_btn: {
            borderColor: '#00000000',
            backgroundColor: '#00000000',
        },
        customerRow: {
            flex: 1,
            flexDirection: 'row',
            height: 50,
        },
        divide: {
            backgroundColor: constStyles.dividerColor,
            height: 1,
            marginLeft: 10,
            marginRight: 10,
        },
        smallGrayFont: {
            color: '#aaa',
            fontSize: 12,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 8
        },
        smallCommission: {
            color: '#aaa',
            fontSize: 12,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 8
        },
        smallCommissionValue: {
            color: 'black',
            fontSize: 12,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 8
        }
    }
);
export default commonStyles;
