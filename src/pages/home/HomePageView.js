import React from 'react';
import {
    FlatList,
    InteractionManager,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import { Updates } from 'expo';
import { ConfirmDialog } from "react-native-simple-dialogs";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import { Text } from "react-native-elements";
import commonStyles from "../../styles/commonStyles";
import Toast from "react-native-root-toast";

class HomePageView extends React.Component {
    constructor( props ) {
        super( props );


        this.state = {
            isRequesting: false,
            dataSources: [],
            updateDialogVisible: false
        }

    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.home ),
            headerBackTitle: null,
        };
    };

    componentDidMount() {
        this.checkForUpdate();
        this.loadData( true );
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


    checkForUpdate() {
        Updates.checkForUpdateAsync()
            .then( ( update ) => {
                if ( update.isAvailable ) {
                    this.setState( {
                        updateDialogVisible: true
                    } );
                }
            } )
            .catch( err => {

            } )
    }

    doUpdate() {
        Updates.fetchUpdateAsync()
            .then( ( update ) => {
                Updates.reload()
                    .then( () => {

                    } )
                    .catch( err => {

                    } );
            } )
            .catch( err => {

            } );
    }


    loadData( isInit ) {
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
            this.props.onExchangeGetMarketList( ( error, resBody ) => {
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
                        dataSources: resBody.data
                    } );
                }
            } );
        } );
    }


    _onRefresh = () => {
        this.loadData( false );
    };


    header() {
        if ( this.state.isLoading ) {
            return <View><Text>Loading...</Text></View>
        }

        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 20,
                    alignItems: 'center'
                }}>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>名称</Text>

                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>最新价</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text>涨跌幅</Text>
                </View>

            </View>
        )
    }


    renderItem( viewHeight, item, index ) {
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                onPress={() => {
                    Toast.show("111111")
                }}>

                <View style={{ alignItems: 'center', flexDirection: 'row', height: 50, marginStart: 40 }}>

                    <Text style={{ flex: 1 }}>
                        {item.coinEx.coin_name}/{item.coinEx.exchange_coin_name}
                    </Text>

                    <Text style={{ flex: 1 }}>
                        {item.market.last_price}
                    </Text>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: item.market.change_rate > 0 ? 'green' : 'red' }}>
                            {( item.market.change_rate * 100 ).toFixed( 2 )}%
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );

    }

    render() {
        const viewHeight = 110;
        const separatorHeight = 1;


        return (
            <View style={commonStyles.wrapper}>
                <SafeAreaView style={[ commonStyles.wrapper ]}>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        data={this.state.dataSources}
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

                    <ConfirmDialog
                        title={I18n.t( Keys.notification )}
                        message={I18n.t( Keys.update_now )}
                        visible={this.state.updateDialogVisible}
                        onTouchOutside={() => this.setState( { updateDialogVisible: false } )}
                        positiveButton={{
                            title: I18n.t( Keys.yes ),
                            onPress: () => {
                                this.setState( {
                                    updateDialogVisible: false
                                } );
                                this.doUpdate();
                            }
                        }}
                        negativeButton={{
                            title: I18n.t( Keys.no ),
                            onPress: () => {
                                this.setState( {
                                    updateDialogVisible: false
                                } );
                            }
                        }}
                    />

                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create( {
    scene: {
        flex: 1,
    },
} );

export default HomePageView;

