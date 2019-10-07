import { PixelRatio } from "react-native";
import React from 'react';
import I18n from "../I18n";

const Util = {
    getDpFromPx: function ( pxValue ) {
        return pxValue / PixelRatio.get();
    },

    numtoPercentage: function ( value ) {
        return ( value * 100 ).toFixed( 2 ) + '%'
    },

    isArray: function ( o ) {
        return Object.prototype.toString.call( o ) === '[object Array]';
    },

    group: function ( array, subGroupLength ) {
        let index = 0;
        const newArray = [];

        while ( index < array.length ) {
            newArray.push( array.slice( index, index += subGroupLength ) );
        }

        return newArray;
    },

    toMoneyDisplay: function ( num ) {
        let num1 = num.toFixed( 2 );
        num1 = parseFloat( num1 );
        num1 = num1.toLocaleString();
        return num1;
    },

    toMoneyDisplayWithCurrency: function ( num, currencyCode ) {
        let num1 = num.toFixed( 2 );
        num1 = parseFloat( num1 );
        num1 = num1.toLocaleString();

        if ( currencyCode === 'SGD' ) {
            return "S$ " + num1;
        } else {
            return currencyCode + ' ' + num1;
        }
    },

    calcDisplayByLanguage( obj, key ) {
        let aaa = I18n.locale;

        if ( I18n.locale === 'zh-Hans' ) {
            return obj[ key + "Cn" ];
        } else {
            return obj[ key ];
        }
    },

    calcDisplayDiscount( discount ) {
        let num1 = '' + ( discount * 100 ).toFixed( 0 );
        num1 = parseFloat( num1 );
        num1 = num1.toLocaleString();

        return num1 + "%"
    }
};

export default Util;
