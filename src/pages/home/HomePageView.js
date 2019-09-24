import React from 'react';
import {
    FlatList,
    InteractionManager,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    View,
    Dimensions
} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import {Updates} from 'expo';
import {ConfirmDialog} from "react-native-simple-dialogs";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import {Text} from "react-native-elements";
import commonStyles from "../../styles/commonStyles";
import Toast from "react-native-root-toast";
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

import ExchangePairList from '../../components/ExchangePairList';


class HomePageView extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            isRequesting: false,
            dataSources: [],
            coinExchangeArea: [],
            navigation_state: {
                index: 0,
                routes: [
                    { key: 'first', title: 'First' },
                    { key: 'second', title: 'Second' },
                ],
            },
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


    loadData(isInit) {
        if (isInit) {
            this.setState({
                isRequesting: true
            });
        } else {
            if (this.state.refreshing) {
                return;
            }

            this.setState({
                refreshing: true,
            });
        }

        InteractionManager.runAfterInteractions(() => {
            this.props.onExchangeGetMarketList((error, resBody) => {
                if (error) {
                    this.setState({
                        isRequesting: false,
                        refreshing: false
                    });

                    Toast.show(error.message);
                } else {
                    this.setState({
                        isRequesting: false,
                        refreshing: false,
                        dataSources: resBody.data
                    });
                }
            });
            this.props.onExchangeGetCoinExchangeArea((error, resBody) => {
                if (error) {
                    this.setState({
                        isRequesting: false,
                        refreshing: false
                    });
                    Toast.show(error.message);
                } else {
                    this.setState({
                        isRequesting: false,
                        refreshing: false,
                        coinExchangeArea: resBody.data,
                        navigation_state: {
                            index: 0,
                            routes: resBody.data.map(i => {
                                return ({key: i.coin_exchange_area_id, title: i.coin_exchange_area_name})
                            })
                        }
                    })
                }
            });
            console.log(this.state)
        });
    }


    _onRefresh = () => {
        this.loadData(false);
    };


    setTabIndex(index) {
        this.setState({activeTabIndex: index})
    }

    FirstRoute = () => (
        <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
    );

    SecondRoute = () => (
        <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
    );

    _renderLazyPlaceholder(route){
        return(
            <View>
                <Text> Loading</Text>
            </View>
        )
    }
    _handleIndexChange = index => this.setState({ index });

    exchangeAreaTabs() {
        if (this.state.navigation_state) {
            return (
                <TabView
                    lazy
                    navigationState={this.state.navigation_state}
                    renderScene={SceneMap({
                        first: this.FirstRoute,
                        second: this.SecondRoute,
                    })}
                    renderLazyPlaceholder={this._renderLazyPlaceholder}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    style={styles.container}
                />
            )
        }
    }

    render() {
        const viewHeight = 110;
        const separatorHeight = 1;


        return (
            <View style={commonStyles.wrapper}>
                <SafeAreaView style={[commonStyles.wrapper]}>
                    {this.exchangeAreaTabs()}
                    {/*<ExchangePairList data={this.state.dataSources}/>*/}

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

