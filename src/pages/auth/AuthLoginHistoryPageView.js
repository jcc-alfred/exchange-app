import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListItem } from "react-native-elements";
import commonStyles from "../../styles/commonStyles";
import Util from "../../util/Util";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";

class AuthLoginHistoryPageView extends React.Component {

    constructor( props ) {
        super( props );


        let navState = this.props.navigation.state;

        this.state = {
            callback: navState.params.callback,
        };
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.login_history ),
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


    _renderItem( viewHeight, item, index ) {
        return (
            <ListItem
                containerStyle={[ { height: 50 } ]}
                title={item.account}
                onPress={() => {
                    if ( this.state.callback instanceof Function ) {
                        this.state.callback( item );
                        this.props.navigation.goBack();
                    }
                }}
            />
        )
    };


    render() {
        const viewHeight = 50;
        const separatorHeight = Util.getDpFromPx( 1 );
        return (
            <View
                style={[
                    commonStyles.wrapper, commonStyles.commonBG
                ]}>

                <FlatList
                    style={[ commonStyles.wrapper, {} ]}
                    renderItem={( { item, index } ) => {
                        return this._renderItem( viewHeight, item, index );
                    }}
                    data={this.props.loginHistoryForDebug}
                    keyExtractor={( item, index ) => {
                        return '' + index;
                    }}
                    ItemSeparatorComponent={() => {
                        return <View style={[ commonStyles.commonIntervalStyle, { height: separatorHeight } ]}/>;
                    }}
                    getItemLayout={( data, index ) => (
                        { length: viewHeight, offset: ( viewHeight + separatorHeight ) * index, index }
                    )}
                >
                </FlatList>
            </View>
        );
    }
}


const styles = StyleSheet.create( {} );

export default AuthLoginHistoryPageView;

