import React from 'react';
import {
    FlatList,
    InteractionManager,
    Platform,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import Toast from "react-native-root-toast";
import AuthLoginView from "../auth/components/AuthLoginView";
import Spinner from "react-native-loading-spinner-overlay";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AssetsView from "../assets/components/AssetsView";
import { Text } from "react-native-elements";

class AssetsListPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            refreshing:false,
            isRequesting: false,
            data: []
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: "Assets",
            headerBackTitle: null,
        };
    };

    componentDidMount() {
        this.loadData()
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

    loadData(isInit) {

        if ( isInit ) {
            this.setState( {
                isRequesting: true
            } );
        } else {
            if ( this.state.refreshing ) {
                return;
            }

            this.setState( {
                refreshing: true,
            } );
        }

        InteractionManager.runAfterInteractions( () => {
            this.props.onAssetsGetUserAssets( ( error, resBody ) => {
                if ( error ) {
                    this.setState( {
                        isRequesting: false,
                        refreshing: false
                    } );

                    Toast.show( error.message );
                } else {
                    this.setState( {
                        isRequesting: false,
                        refreshing: false,
                        data: resBody.data
                    } );
                }
            } );
        } );
    }

    _onRefresh = () => {
        this.loadData( false );
    };



    renderItem( viewHeight, item, index ) {
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                onPress={() => {
                    this.props.navigation.navigate( "AssetsDetailPage", {
                        assets:item
                    } )
                }}>
                <View style={[ { height: viewHeight } ]}>
                    <Text>
                        {
                            JSON.stringify( item )
                        }
                    </Text>
                </View>
            </TouchableHighlight>
        );

    }


    header()
    {
        return null;
    }

    render() {

        const viewHeight = 110;
        const separatorHeight = 1;

        return (
            <View style={[ commonStyles.wrapper, ]}>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        data={this.state.data}
                        keyExtractor={( item, index ) => {
                            return 'item ' + index;
                        }}
                        renderItem={( { item, index } ) => {
                            return this.renderItem( viewHeight, item, index );
                        }}
                        // renderItem={({ item }) => <Item title={item.title} />}
                        ListHeaderComponent={() => {
                            return this.header();
                        }}
                        ItemSeparatorComponent={() => {
                            return <View
                                style={[ commonStyles.commonIntervalStyle, { height: separatorHeight } ]}/>;
                        }}
                        getItemLayout={( data, index ) => (
                            { length: viewHeight, offset: ( viewHeight + separatorHeight ) * index, index }
                        )}
                        onScroll={() => {
                        }}
                    />


                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default AssetsListPageView;

