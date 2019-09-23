import React from 'react';
import * as Localization from 'expo-localization';
import { countryDataParse } from "../data/countryDataParse";

const CountryUtil = {

    calcCountry( defaultCountryCode ) {
        const { modelList, modelMap } = countryDataParse();

        let defaultCountryCode1;

        if ( !__DEV__ ) {
            defaultCountryCode1 = defaultCountryCode && defaultCountryCode.length > 0 ? defaultCountryCode : Localization.country;
        } else {
            defaultCountryCode1 = defaultCountryCode && defaultCountryCode.length > 0 ? defaultCountryCode : "SG";
        }

        let countryData = null;

        if ( defaultCountryCode1 && defaultCountryCode1.length > 0 ) {
            countryData = modelMap[ defaultCountryCode1 ];
        }
        if ( !countryData ) {
            countryData = modelMap[ 'US' ];
        }

        return countryData.data;
    },
};

export default CountryUtil;
