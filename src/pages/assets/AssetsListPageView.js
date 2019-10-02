import React from 'react';
import {
    Dimensions,
    FlatList,
    InteractionManager,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import {Text, Button, Input} from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";






const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const ThirdRout = () => (
    <View style={[styles.scene, { backgroundColor: '#cfe961' }]} />
);

const FourthRout = () => (
    <View style={[styles.scene, { backgroundColor: '#e9e6e3' }]} />
);






class AssetsListPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            refreshing: false,
            isRequesting: false,
            data: [],

            index: 0,
            routes: [
                { key: 'first', title: '币币账户' },
                { key: 'second', title: '合约账户' },
                { key: 'third', title: '法币账户' },
                { key: 'fourth', title: '杠杆账户' },
            ],
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
                        assets: item
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


    header() {
        return null;
    }

    render() {

        const viewHeight = 110;
        const separatorHeight = 1;

        return (
            <View style={[ commonStyles.wrapper, ]}>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    {this.renderTopBanner()}
                    {this.exchangeAreaTabs()}
                </SafeAreaView>
            </View>
        );
    }

    renderTopBanner(){




        return(
            <View style={[ {backgroundColor:"#0083dc"} ]}>
                <View >
                    <Text style={styles.smallGrayFont} >{I18n.t( Keys.Total_account_assets)} (GTB)</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                    <Text style={styles.bigAssetFont}>0.000000</Text>
                    <Text style={styles.smallGrayFont}>=0.00 cny</Text>

                </View>
                <View style={{flexDirection:"row"}}>
                    <Button
                        title={I18n.t( Keys.Punching)}
                        titleStyle={{fontSize:12}}
                        style={[{margin:5}]}
                        containerStyle={{flex:1}}
                    />
                    <Button
                        titleStyle={{fontSize:12}}
                        title={I18n.t( Keys.WithDraw)}
                        containerStyle={{flex:1}}
                        style={[{margin:5}]}
                    />
                    <Button
                        title={I18n.t( Keys.transfer)}
                        titleStyle={{fontSize:12}}
                        style={[{margin:5}]}
                        containerStyle={{flex:1}}

                    />
                </View>
            </View>
        )
    }




    exchangeAreaTabs() {

        return (

            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                    third: ThirdRout,
                    fourth: FourthRout,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />

        );
    }














    renderDataList(){
        const viewHeight = 110;
        const separatorHeight = 1;
        return(
        <View style={[ commonStyles.wrapper, ]}>

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

        </View>

    );
    }
}








const styles = StyleSheet.create( {
    smallGrayFont: {
        color: 'white',
        fontSize: 12,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 16,
        paddingBottom: 8
    },

    bigAssetFont: {
        color: '#ffffff',

        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 8
    },

    scene: {
        flex: 1,
    },

//        color: '#62a3bf',



} );

export default AssetsListPageView;

