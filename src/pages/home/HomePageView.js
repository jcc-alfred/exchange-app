import React from 'react';
import {Dimensions, InteractionManager, SafeAreaView, StyleSheet, View} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import {Updates} from 'expo';
import {ConfirmDialog} from "react-native-simple-dialogs";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import {Text} from "react-native-elements";
import commonStyles from "../../styles/commonStyles";
import Toast from "react-native-root-toast";

import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

import {DrawerActions} from 'react-navigation-drawer';
import ExchangePairList from "../../components/ExchangePairList";

class HomePageView extends React.Component {
    constructor(props) {
        super(props);
        const {index, routes, scenes} = this.initTabData(this.props.coin_exchange_area);
        this.state = {
            isRequesting: false,
            refreshing: false,
            marketList: [],
            index: index,
            routes: routes,
            scenes: scenes,
            updateDialogVisible: false
        }

    }

    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;

        return {
            title: I18n.t(Keys.home),
            headerBackTitle: null,
        };
    };

    componentDidMount() {
        this.checkForUpdate();
        this.loadData(true);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {

        };
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.coin_exchange_area !== nextProps.coin_exchange_area || nextState.marketList !== this.state.marketList) {
            const {index, routes, scenes} = this.initTabData(nextProps.coin_exchange_area);

            this.setState({
                // index: index,
                routes: routes,
                scenes: scenes
            })
        }

        return true;
    }


    checkForUpdate() {
        Updates.checkForUpdateAsync()
            .then((update) => {
                if (update.isAvailable) {
                    this.setState({
                        updateDialogVisible: true
                    });
                }
            })
            .catch(err => {

            })
    }

    doUpdate() {
        Updates.fetchUpdateAsync()
            .then((update) => {
                Updates.reload()
                    .then(() => {

                    })
                    .catch(err => {

                    });
            })
            .catch(err => {

            });
    }


    loadData() {
        this.setState({
            isRequesting: true
        });

        InteractionManager.runAfterInteractions(() => {
            this.props.onExchangeGetCoinExchangeArea((error, resBody) => {
                if (error) {
                    this.setState({
                        isRequesting: false,
                    });
                    Toast.show(error.message);
                } else {
                    this.props.onExchangeGetMarketList((error1, resBody1) => {
                        if (error1) {
                            this.setState({
                                isRequesting: false,
                            });

                            Toast.show(error1.message);
                        } else {
                            this.setState({
                                isRequesting: false,
                                marketList: resBody1.data,
                            });
                        }
                    });
                }
            });
        });
    }


    onPressItem(coin_exchange_id) {
        console.log('aaa', coin_exchange_id)
    }

    RefreshMarketList() {
        this.setState({
            refreshing: true
        });
        InteractionManager.runAfterInteractions(() => {
            this.props.onExchangeGetMarketList((error1, resBody1) => {
                if (error1) {
                    this.setState({
                        refreshing: false,
                    });

                    Toast.show(error1.message);
                } else {
                    this.setState({
                        refreshing: false,
                        marketList: resBody1.data,
                    });
                }
            });
        });
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
                        <ExchangePairList
                            refreshing={this.state.refreshing}
                            onRefresh={this.RefreshMarketList.bind(this)}
                            data={{
                                marketList: this.state.marketList,
                                coin_exchange_area_id: tabData[index].coin_exchange_area_id
                            }}
                            onPressItem={this.onPressItem.bind(this)}/>
                    );
                };
            }
        }

        return {
            index: 0,
            routes: routes,
            scenes: scenes
        }
    }


    exchangeAreaTabs() {
        if (this.props.coin_exchange_area && this.props.coin_exchange_area.length > 0) {
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


    render() {
        return (
            <View style={commonStyles.wrapper}>
                <SafeAreaView style={[commonStyles.wrapper]}>
                    {this.exchangeAreaTabs()}

                    <ConfirmDialog
                        title={I18n.t(Keys.notification)}
                        message={I18n.t(Keys.update_now)}
                        visible={this.state.updateDialogVisible}
                        onTouchOutside={() => this.setState({updateDialogVisible: false})}
                        positiveButton={{
                            title: I18n.t(Keys.yes),
                            onPress: () => {
                                this.setState({
                                    updateDialogVisible: false
                                });
                                this.doUpdate();
                            }
                        }}
                        negativeButton={{
                            title: I18n.t(Keys.no),
                            onPress: () => {
                                this.setState({
                                    updateDialogVisible: false
                                });
                            }
                        }}
                    />

                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});

export default HomePageView;

