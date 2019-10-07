import React from 'react';
import {SafeAreaView, StyleSheet, View, Platform, InteractionManager, Dimensions} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import {Button, Text} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import Keys from "../../configs/Keys";
import I18n from "../../I18n";
import Util from "../../util/Util";
import Toast from "react-native-root-toast";
import AssetTransactionList from "../../components/AssetTransactionList";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import constStyles from "../../styles/constStyles";
import Spinner from "react-native-loading-spinner-overlay";


class AssetsDetailPageView extends React.Component {

    constructor(props) {
        super(props);
        const tabData = [
            {title: I18n.t(Keys.deposit), value: []},
            {title: I18n.t(Keys.withdraw), value: []}];
        const {index, routes, scenes} = this.initTabData(tabData);

        this.state = {
            isRequesting: false,
            depositList: [],
            withdrawList: [],
            index: index ? index : 0,
            routes: routes ? routes : [],
            scenes: scenes ? scenes : []

        };
    }

    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;

        return {
            title: I18n.t(Keys.assets),
            headerBackTitle: null,
        };
    };

    seperatorView(viewHeight) {
        return (
            <View style={{backgroundColor: '#f4f3fa', height: viewHeight}}/>
        )
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({
            isRequesting: true
        });
        InteractionManager.runAfterInteractions(() => {
            this.props.onExchangeGetUserDepositListByCoinId({
                "coinId": this.props.assets.coin_id.toString(),
                "page": "0",
                "pageSize": "20"
            }, (err, res) => {
                if (!err) {
                    this.setState({depositList: res.data.list})
                } else {
                    Toast.show(err.message)
                }
            });
            this.props.onExchangeGetUserWithdrawListByCoinId({
                "coinId": this.props.assets.coin_id.toString(),
                "page": "0",
                "pageSize": "20"
            }, (err, res) => {
                if (!err) {
                    this.setState({withdrawList: res.data.list, isRequesting: false});
                } else {
                    Toast.show(err.message)
                }
            });
        })
    }

    transactionView() {
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
                            indicatorStyle={{backgroundColor: constStyles.THEME_COLOR}}
                            inactiveColor={{color: '#9c9a97'}}
                            activeColor={{color: constStyles.THEME_COLOR}}
                            style={{backgroundColor: 'white',flexDirection:'row'}}
                            tabStyle={{flex:1}}
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

    componentWillUnmount() {
        this.setState = (state, callback) => {

        };
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.depositList !== nextState.depositList || nextState.withdrawList !== this.state.withdrawList) {

            const tabData = [
                {title: "Deposit", value: nextState.depositList},
                {title: "Withdraw", value: nextState.withdrawList}];
            const {index, routes, scenes} = this.initTabData(tabData);
            this.setState({
                // index: index,
                routes: routes,
                scenes: scenes
            })
        }

        return true;
    }


    onPressItem() {

    }

    initTabData(tabData) {
        const routes = [];
        const scenes = [];
        if (tabData) {
            for (let index = 0; index < tabData.length; index++) {
                routes.push({
                    key: '' + index,
                    title: tabData[index].title
                });
                scenes ['' + index] = () => {
                    return (
                        <AssetTransactionList
                            data={tabData[index].value}
                            onPressItem={this.onPressItem.bind(this)}/>
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
        };
    }

    render() {
        return (
            <View style={[commonStyles.wrapper, {paddingLeft: 10, paddingRight: 10}]}>
                <SafeAreaView style={[commonStyles.wrapper,]}>
                    <Text style={[styles.CoinName]}>{this.props.assets.coin_name}</Text>
                    <View style={[{flexDirection: 'row', marginTop: 15}]}>
                        <Text style={[{flex: 1, paddingRight: 10}, styles.greyCommonFont]}>{I18n.t(Keys.balance)}</Text>
                        <Text
                            style={[{flex: 1, paddingRight: 10}, styles.greyCommonFont]}>{I18n.t(Keys.available)}</Text>
                        <Text style={[{flex: 1}, styles.greyCommonFont]}>{I18n.t(Keys.frozen)}</Text>
                    </View>
                    <View style={[{flexDirection: 'row'}]}>
                        <Text style={[{flex: 1, paddingRight: 10}]}>{this.props.assets.balance.toFixed(4)}</Text>
                        <Text style={[{flex: 1, paddingRight: 10}]}>{this.props.assets.available.toFixed(4)}</Text>
                        <Text style={[{flex: 1}]}>{this.props.assets.frozen.toFixed(4)}</Text>
                    </View>
                    {this.seperatorView(8)}
                    <View style={{paddingTop: 15, paddingBottom: 20}}>
                        <Text style={{fontSize: 24, fontWeight: "bold"}}>{I18n.t(Keys.finance_history)}</Text>
                    </View>
                    {this.transactionView()}

                    <View style={[{flexDirection: 'row'}, commonStyles.paddingCommon]}>
                        <Button
                            icon={
                                <Ionicons
                                    name="md-wallet"
                                    size={Platform.OS === 'ios' ? 22 : 25}
                                    color={'white'}
                                />
                            }
                            title={I18n.t(Keys.deposit)}
                            onPress={() => {
                                this.props.navigation.navigate("AssetsDepositPage", {
                                    assets: this.props.assets
                                })


                            }
                            }
                        />

                        <View style={[commonStyles.wrapper]}/>

                        <Button
                            icon={
                                <Ionicons
                                    name="md-card"
                                    size={Platform.OS === 'ios' ? 22 : 25}
                                    color={'white'}
                                />
                            }
                            title={I18n.t(Keys.withdraw)}
                            onPress={() => {
                                this.props.navigation.navigate("AssetsWithdrawPage", {
                                    assets: this.props.assets
                                })
                            }
                            }
                        />

                    </View>
                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    CoinName: {
        fontSize: 24,
        color: '#006bce',
        fontWeight: 'bold'
    },
    greyCommonFont: {
        color: '#cad5db'
    }

});

export default AssetsDetailPageView;

