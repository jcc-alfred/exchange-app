import countryDataJson from "./country_data";
import SortSelectAndSearchModel from "../model/SortSelectAndSearchModel";
import I18n from "../../../I18n";

export function countryDataParse() {
    let modelArray = [];
    let modelMap = {};


    for ( let index = 0; index < countryDataJson.length; index++ ) {
        countryDataJson[ index ].name = I18n.t( 'country.' + countryDataJson[ index ].phoneRegion + '.value' );
        countryDataJson[ index ].currency_name = I18n.t( 'country.' + countryDataJson[ index ].phoneRegion + '.currency_name' );

        const sort = I18n.t( 'country.' + countryDataJson[ index ].phoneRegion + '.sort' );
        countryDataJson[ index ].sort = sort ? sort.toUpperCase() : countryDataJson[ index ].name.toUpperCase();

        let model = new SortSelectAndSearchModel(
            countryDataJson[ index ].name,
            '+' + countryDataJson[ index ].phoneCode,
            countryDataJson[ index ].phoneRegion,
            countryDataJson[ index ].sort,
            countryDataJson[ index ]
        );

        modelArray.push( model );
        modelMap[ model.key ] = model;
    }

    modelArray = modelArray.sort( function ( a, b ) {
        if ( a.sort === b.sort ) {
            return 0;
        } else if ( a.sort > b.sort ) {
            return 1;
        } else {
            return -1;
        }
    } );


    let sectionArray = [];
    let sectionMap = {};

    for ( let index = 0; index < modelArray.length; index++ ) {
        const item = modelArray[ index ];
        const key = '' + item.sort[ 0 ];
        let section = sectionMap[ key ];
        if ( !section ) {
            section = {
                isSectionHeader: true,
                title: key,
                data: [],
            };
            sectionMap[ key ] = section;

            sectionArray.push( section );
        }

        section.data.push( { isSectionHeader: false, data: item } );
    }


    return {
        modelArray: modelArray,
        modelMap: modelMap,
        sectionArray: sectionArray,
    }
}
