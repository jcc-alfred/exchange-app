import * as React from 'react';
import { FlatList, StyleSheet, View, } from 'react-native';
import SearchLayout from 'react-navigation-addon-search-layout';
import commonStyles from "../../styles/commonStyles";
import { ListItem } from "react-native-elements";
import Util from "../../util/Util";
import constStyles from "../../styles/constStyles";

class CountrySearchPageView extends React.Component {
    constructor( props ) {
        super( props );

        let navState = this.props.navigation.state;

        const modelArray = navState.params ? navState.params.modelArray : [];

        this.state = {
            modelArray: modelArray,
            modelShowArray: this.calcShowData( modelArray, null ),
            searchText: null,
            callback: navState.params ? navState.params.callback : null,
        };

    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            header: null,
            headerBackTitle: null,
        };
    };


    _handleQueryChange = searchText => {
        this.setState( { searchText: searchText } );
    };

    shouldComponentUpdate( nextProps, nextState ) {
        if ( nextState.searchText !== this.state.searchText ) {
            this.setState( {
                modelShowArray: this.calcShowData( this.state.modelArray, nextState.searchText ),
            } );
        }

        return true;
    }


    calcShowData( modelList, searchText ) {
        let modelShowArray = [];

        if ( !searchText || searchText.length <= 0 ) {

            return modelShowArray;
        }

        {
            let result = [];
            for ( let index = 0; index < modelList.length; index++ ) {
                const item = modelList[ index ];
                if ( item.displayTitle.indexOf( searchText ) >= 0 ) {
                    result.push( item );
                }
            }

            result = result.sort( function ( a, b ) {
                const aIndex = a.displayTitle.indexOf( searchText );
                const bIndex = b.displayTitle.indexOf( searchText );
                if ( aIndex === bIndex ) {
                    return 0;
                } else if ( aIndex > bIndex ) {
                    return 1;
                } else {
                    return -1;
                }
            } );

            modelShowArray = modelShowArray.concat( result );
        }

        {
            let result = [];
            for ( let index = 0; index < modelList.length; index++ ) {
                const item = modelList[ index ];
                if ( item.displayTitle.toUpperCase().indexOf( searchText.toUpperCase() ) >= 0 && modelShowArray.indexOf( item ) < 0 ) {
                    result.push( item );
                }
            }

            result = result.sort( function ( a, b ) {
                const aIndex = a.displayTitle.toUpperCase().indexOf( searchText.toUpperCase() );
                const bIndex = b.displayTitle.toUpperCase().indexOf( searchText.toUpperCase() );
                if ( aIndex === bIndex ) {
                    return 0;
                } else if ( aIndex > bIndex ) {
                    return 1;
                } else {
                    return -1;
                }
            } );

            modelShowArray = modelShowArray.concat( result );
        }

        {
            let result = [];
            for ( let index = 0; index < modelList.length; index++ ) {
                const item = modelList[ index ];
                if ( ( item.displayContent ).indexOf( searchText ) >= 0 && modelShowArray.indexOf( item ) < 0 ) {
                    result.push( item );
                }
            }

            result = result.sort( function ( a, b ) {
                const aIndex = ( a.displayContent ).indexOf( searchText );
                const bIndex = ( b.displayContent ).indexOf( searchText );
                if ( aIndex === bIndex ) {
                    return 0;
                } else if ( aIndex > bIndex ) {
                    return 1;
                } else {
                    return -1;
                }
            } );

            modelShowArray = modelShowArray.concat( result );
        }

        {
            let result = [];
            for ( let index = 0; index < modelList.length; index++ ) {
                const item = modelList[ index ];
                if ( item.sort.indexOf( searchText ) >= 0 && modelShowArray.indexOf( item ) < 0 ) {
                    result.push( item );
                }
            }

            result = result.sort( function ( a, b ) {
                const aIndex = a.sort.indexOf( searchText );
                const bIndex = b.sort.indexOf( searchText );
                if ( aIndex === bIndex ) {
                    return 0;
                } else if ( aIndex > bIndex ) {
                    return 1;
                } else {
                    return -1;
                }
            } );

            modelShowArray = modelShowArray.concat( result );
        }

        {
            let result = [];
            for ( let index = 0; index < modelList.length; index++ ) {
                const item = modelList[ index ];
                if ( item.sort.toUpperCase().indexOf( searchText.toUpperCase() ) >= 0 && modelShowArray.indexOf( item ) < 0 ) {
                    result.push( item );
                }
            }

            result = result.sort( function ( a, b ) {
                const aIndex = a.sort.toUpperCase().indexOf( searchText.toUpperCase() );
                const bIndex = b.sort.toUpperCase().indexOf( searchText.toUpperCase() );
                if ( aIndex === bIndex ) {
                    return 0;
                } else if ( aIndex > bIndex ) {
                    return 1;
                } else {
                    return -1;
                }
            } );

            modelShowArray = modelShowArray.concat( result );
        }


        return modelShowArray;
    }

    onCallback( item ) {
        if ( this.state.callback && this.state.callback instanceof Function ) {
            this.state.callback( item );
        }

        this.props.navigation.goBack();
    };

    renderCommonItem( viewHeight, item, index ) {
        return (
            <ListItem
                containerStyle={[ { height: 50 } ]}
                title={item.displayTitle}
                rightTitle={item.displayContent}
                onPress={() => {
                    this.onCallback( item.data );
                }}
            />
        );
    }


    render() {
        let { searchText } = this.state;
        const viewHeight = 50;
        const separatorHeight = Util.getDpFromPx( 1 );

        return (
            <SearchLayout
                onChangeQuery={this._handleQueryChange}
                headerBackgroundColor={constStyles.THEME_COLOR}
                headerTintColor={'white'}
            >
                <FlatList
                    keyboardShouldPersistTaps="always"
                    data={this.state.modelShowArray}
                    keyExtractor={( item, index ) => {
                        return '' + index;
                    }}
                    renderItem={( { item, index } ) => {
                        return this.renderCommonItem( viewHeight, item, index );
                    }}
                    ItemSeparatorComponent={() => {
                        return <View style={[ commonStyles.commonIntervalStyle, { height: separatorHeight } ]}/>
                    }}
                    getItemLayout={( modelList, index ) => (
                        { length: viewHeight, offset: ( viewHeight + separatorHeight ) * index, index }
                    )}
                    onScroll={() => {
                        if ( this.props.onScroll ) {
                            this.props.onScroll();
                        }
                    }}
                />

            </SearchLayout>
        );
    }
}

const styles = StyleSheet.create( {} );

export default CountrySearchPageView;
