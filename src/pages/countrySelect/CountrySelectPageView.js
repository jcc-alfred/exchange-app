import React from "react";
import { Platform, SafeAreaView, SectionList, StatusBar, StyleSheet, Text, View } from "react-native";
import commonStyles from "../../styles/commonStyles";
import { countryDataParse } from "./data/countryDataParse";
import Util from "../../util/Util";
import constStyles from "../../styles/constStyles";
import YIndexComponent from "./component/YIndexComponent";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { ListItem } from "react-native-elements";
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'
import Keys from "../../configs/Keys";
import I18n from "../../I18n";


class CountrySelectPageView extends ( React.PureComponent || React.Component ) {
    constructor( props ) {
        super( props );

        let navState = this.props.navigation.state;

        this.state = {
            modelArray: [],
            modelMap: {},
            sectionArray: [],
            callback: navState.params ? navState.params.callback : null,
        };
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.select_country ),
            headerRight: (
                <BorderlessButton
                    onPress={() => params.countrySearch()}
                    style={{ marginRight: 15 }}>
                    <Ionicons
                        name="md-search"
                        size={Platform.OS === 'ios' ? 22 : 25}
                        color={'white'}
                    />
                </BorderlessButton>
            ),
            headerBackTitle: null,
        };
    };

    static renderSectionHeader = ( { section } ) => {
        return (
            <View style={[commonStyles.commonBG, { height: 30, justifyContent: 'center' }]}>
                <Text style={[{
                    marginLeft: 15,
                    color: constStyles.THEME_COLOR,
                    fontSize: 14,
                }]}>{section.isFav ? 'Common List' : section.title}</Text>
            </View>
        );
    };

    componentWillUnmount() {
        this.setState = ( state, callback ) => {

        };
    }

    componentDidMount() {
        this.props.navigation.setParams( { countrySearch: this.countrySearch } );

        const countryData = countryDataParse();

        let {
            modelArray,
            modelMap,
            sectionArray
        } = countryData;

        this.setState( {
            modelArray: modelArray,
            modelMap: modelMap,
            sectionArray: sectionArray,
        } );
    }

    countrySearch = () => {
        this.props.navigation.navigate( 'CountrySearchPage', {
            modelArray: this.state.modelArray,
            callback: ( country ) => {
                this.onCallback( country )
            }
        } )
    };

    onCallback( item ) {
        if ( this.state.callback && this.state.callback instanceof Function ) {
            this.state.callback( item );
        }

        this.props.navigation.goBack();
    };

    renderCommonItem = ( { item } ) => {
        return (
            <ListItem
                containerStyle={[{ height: 50 }]}
                title={item.data.displayTitle}
                rightTitle={item.data.displayContent}
                rightTitleStyle={[{ paddingRight: 20 }]}
                onPress={() => {
                    this.onCallback( item.data.data );
                }}
            />
        );
    };

    onChangeKey( key ) {
        let currentSectionIndex = 0;
        for ( let index = 0; index < this.state.sectionArray.length; index++ ) {
            if ( key === YIndexComponent.FAV_CODE && index === 0 && this.state.sectionArray[ 0 ].isFav ) {
                currentSectionIndex = 0;
            } else {
                if ( this.state.sectionArray[ index ].title >= key
                ) {
                    currentSectionIndex = index;
                    break;
                }
            }
        }

        if ( currentSectionIndex >= 0 && currentSectionIndex < this.state.sectionArray.length ) {
            this._sectionList.scrollToLocation( {
                animated: false,
                itemIndex: 0,
                sectionIndex: currentSectionIndex,
                viewOffset: 0,
                viewPosition: 0.5
            } );
        }
    }


    render() {

        const sectionHeight = 30;
        const viewHeight = 50;
        const separatorHeight = Util.getDpFromPx( 1 );

        this.getItemLayout = sectionListGetItemLayout( {
            getItemHeight: ( rowData, sectionIndex, rowIndex ) => viewHeight,
            getSeparatorHeight: () => separatorHeight,
            getSectionHeaderHeight: () => sectionHeight,
            getSectionFooterHeight: () => 0
        } );

        return (
            <View style={[commonStyles.wrapper]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={commonStyles.wrapper}>
                    <View style={[commonStyles.wrapper]}>
                        <SectionList
                            ref={( sectionList ) => {
                                this._sectionList = sectionList;
                            }}
                            sections={this.state.sectionArray}
                            keyExtractor={( item, index ) => {
                                return '' + index;
                            }}
                            renderItem={this.renderCommonItem}
                            renderSectionHeader={CountrySelectPageView.renderSectionHeader}
                            ItemSeparatorComponent={() => {
                                return <View style={[commonStyles.commonIntervalStyle]}/>
                            }}
                            getItemLayout={this.getItemLayout}
                            onScroll={() => {
                                if ( this.props.onScroll ) {
                                    this.props.onScroll();
                                }
                            }}
                        />

                        <YIndexComponent
                            style={[{ position: 'absolute', right: 0, top: 0, bottom: 0 }]}
                            isOpen={true}
                            isContainFav={false}
                            onSelect={( key ) => {
                                this.onChangeKey( key );
                            }}
                        />
                    </View>

                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create( {} );

export default CountrySelectPageView;
