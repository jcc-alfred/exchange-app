import React from "react";
import {Dimensions, Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";

import {DrawerActions} from 'react-navigation-drawer';
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {Button, ListItem, SearchBar} from "react-native-elements";
import {Header} from 'react-navigation';
import constStyles from "../../../styles/constStyles";
import {Ionicons} from "@expo/vector-icons";
import commonStyles from "../../../styles/commonStyles";
import OrderHistoryPage from "../../order/OrderHistoryPage";
import TextInput from "react-native-web/dist/exports/TextInput";
import {changeTradePageCoinExchange} from "../../../actions/ExchangeAction";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import TradeMenuPairList from "../../../components/TradeMenuPairList";
import Spinner from "react-native-loading-spinner-overlay";

class TradeExMenu extends React.Component {

    constructor(props) {
        super(props);
        const {index, routes, scenes} = this.initTabData(this.props.coin_exchange_area);
        this.state = {
            index: index ? index : 0,
            routes: routes ? routes : [],
            scenes: scenes ? scenes : [],
            search: '',
        }

    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.coin_exchange_area !== nextProps.coin_exchange_area || nextProps.marketList !== this.props.marketList) {
            const {index, routes, scenes} = this.initTabData(nextProps.coin_exchange_area);
            this.setState({
                // index: index,
                routes: routes,
                scenes: scenes
            })
        }

        return true;
    }

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        // return (
        //     <View style={[ { paddingTop: getStatusBarHeight() + Header.HEIGHT } ]}>
        //         <Text>{JSON.stringify(this.props.marketList)}</Text>
        //     </View>
        // );

        const { search } = this.state;

        return (
            <View style={commonStyles.wrapper}>
                <SafeAreaView style={[commonStyles.wrapper]}>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        platform={"default"}
                        lightTheme={true}
                        value={search}
                    />
                    {this.exchangeAreaTabs()}

                    {/*<ConfirmDialog*/}
                    {/*title={I18n.t( Keys.notification )}*/}
                    {/*message={I18n.t( Keys.update_now )}*/}
                    {/*visible={this.state.updateDialogVisible}*/}
                    {/*onTouchOutside={() => this.setState( { updateDialogVisible: false } )}*/}
                    {/*positiveButton={{*/}
                    {/*title: I18n.t( Keys.yes ),*/}
                    {/*onPress: () => {*/}
                    {/*this.setState( {*/}
                    {/*updateDialogVisible: false*/}
                    {/*} );*/}
                    {/*this.doUpdate();*/}
                    {/*}*/}
                    {/*}}*/}
                    {/*negativeButton={{*/}
                    {/*title: I18n.t( Keys.no ),*/}
                    {/*onPress: () => {*/}
                    {/*this.setState( {*/}
                    {/*updateDialogVisible: false*/}
                    {/*} );*/}
                    {/*}*/}
                    {/*}}*/}
                    {/*/>*/}

                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );


    }

    initTabData(tabData) {
        const routes = [];
        const scenes = [];
        if (tabData) {
            for (let index = 0; index < tabData.length; index++) {
                routes.push({
                    key: '' + index,
                    title: tabData[index].coin_exchange_area_name
                });
                scenes ['' + index] = () => {
                    return (
                        <TradeMenuPairList
                            data={{
                                marketList: this.props.marketList,
                                coin_exchange_area_id: tabData[index].coin_exchange_area_id
                            }}
                            onPressItem={this.onPressItem.bind( this )}/>
                    );
                };
            }
        } else {
            routes.push({key: 0, title: "loading"});
            scenes.push(<View/>)
        }


        return {
            index: 0,
            routes: routes,
            scenes: scenes
        }
    }


    exchangeAreaTabs() {
        if (this.state.scenes && this.state.scenes.length > 0) {
            return (
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap(this.state.scenes)}
                    onIndexChange={index => this.setState({index})}
                    initialLayout={{width: Dimensions.get('window').width}}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            indicatorStyle={{backgroundColor: 'white'}}
                            // style={{backgroundColor: 'white',color:'blue'}}
                            tabStyle={{width: 'auto'}}
                            scrollEnabled={true}
                        />
                    }
                    lazy={true}
                />
            );
        } else {
            return null;
        }
    }

    onPressItem( coin_exchange ) {
        // return{
        //     this.props.TradePageCoinEx : coin_exchange;
        // }
        this.props.onChangeTradePageCoinExchange(coin_exchange)
        this.props.navigation.dispatch( DrawerActions.closeDrawer() )

    }


}

const styles = StyleSheet.create({});

function select(store) {
    return {
        TradePageCoinEx: store.metaStore.TradePageCoinEx,
        marketList: store.metaStore.marketList,
        coin_exchange_area: store.metaStore.coin_exchange_area,
    }
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    onChangeTradePageCoinExchange: (coinEx) => {
        dispatch(changeTradePageCoinExchange(coinEx));
    },
});
export default connect(select, mapDispatchToProps)(TradeExMenu)
