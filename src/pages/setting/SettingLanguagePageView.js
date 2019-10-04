import React from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { ListItem } from "react-native-elements";
import I18n from "../../I18n";
import commonStyles from "../../styles/commonStyles";
import languageData from "../../../data/languageData";
import Util from "../../util/Util";
import Keys from "../../configs/Keys";

class SettingLanguagePageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            languageData: languageData
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.languages ),
            headerBackTitle: null,
        };
    };

    componentDidMount() {
    }

    componentWillUnmount() {
        this.setState = ( state, callback ) => {

        };
    }

    componentWillReceiveProps( nextProps ) {
    }

    shouldComponentUpdate( nextProps, nextState ) {
        return true;
    }

    renderItem( { item, index, viewHeight } ) {
        return (
            <ListItem
                containerStyle={[ { height: viewHeight } ]}
                title={I18n.t( "language." + item.name )}
                checkmark={this.props.language === item.code}
                onPress={() => {
                    this.props.onChangeLanguage( item.code );
                }}
            />
        );
    }

    render() {
        const viewHeight = 50;
        const separatorHeight = Util.getDpFromPx( 1 );


        return (
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="light-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <FlatList
                        data={this.state.languageData}
                        keyExtractor={( item, index ) => {
                            return '' + index;
                        }}
                        renderItem={( { item, index } ) => {
                            return this.renderItem( { item, index, viewHeight } );
                        }}
                        ItemSeparatorComponent={() => {
                            return (
                                <View style={[ commonStyles.commonIntervalStyle, {
                                    height: separatorHeight,
                                    marginLeft: 15,
                                } ]}/>
                            )
                        }}
                        getItemLayout={( data, index ) => (
                            { length: viewHeight, offset: ( viewHeight + separatorHeight ) * index, index }
                        )}
                    />
                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create( {} );

export default SettingLanguagePageView;

