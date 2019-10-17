import React from 'react';
import {
    FlatList,
    Image,
    ImageBackground,
    InteractionManager,
    Linking,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import Toast from "react-native-root-toast";
import {Text} from "react-native-elements";
import {BorderlessButton} from "react-native-gesture-handler";
import {Ionicons} from "@expo/vector-icons";
import {DrawerActions} from 'react-navigation-drawer';
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import {Updates} from "expo";
import {ConfirmDialog} from "react-native-simple-dialogs";
import constStyles from "../../styles/constStyles";
import Spinner from "react-native-loading-spinner-overlay";


class HomePageView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isRequesting: true,
            newsList: [],
            announcementList: [],
            refreshing: false,
            updateDialogVisible: false
        }
    }

    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;

        return {
            title: null,
            headerBackTitle: null,
            headerTitle: (<Image style={{width: 90, height: 20}}
                                 source={require('../../../assets/images/asiaedx_logo.png')}/>),
            headerLeft: (
                <BorderlessButton
                    onPress={() => {
                        navigation.dispatch(DrawerActions.openDrawer());
                    }}
                    style={{marginLeft: 15}}>

                    <View style={{flexDirection: 'row'}}>
                        <Ionicons
                            name="md-menu"
                            size={Platform.OS === 'ios' ? 22 : 25}
                            color={constStyles.THEME_COLOR}
                        />
                    </View>
                </BorderlessButton>

            )
        };
    };

    componentDidMount() {
        this.loadData();
        this.checkForUpdate();
    }

    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
        this.setState = (state, callback) => {
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    loadData(isInit) {
        if (isInit) {
            this.setState({
                refreshing: true,
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
                        isRequesting: false
                    });

                    Toast.show(error.message);
                } else {
                    this.setState({
                        isRequesting: false,
                    });
                }
            });


        });

        try {
            this.interval = setInterval(async () => {
                InteractionManager.runAfterInteractions(() => {
                    this.props.onExchangeGetMarketList((error, resBody) => {
                        if (error) {
                            this.setState({
                                isRequesting: false
                            });

                            Toast.show(error.message);
                        } else {
                            this.setState({
                                isRequesting: false,
                            });
                        }
                    });


                });
            }, 5000);
        } catch (e) {
            console.log(e);
        }


        InteractionManager.runAfterInteractions(() => {
            this.props.onGetNewsList((error, resBody1) => {
                if (error) {
                    this.setState({
                        isRequesting: false
                    });

                    Toast.show(error.message);
                } else {
                    this.setState({
                        isRequesting: false,
                        newsList: resBody1.data.news.list,
                        announcementList: resBody1.data.announcement.list,
                    });
                }
            });
        });

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
                // console.log( err.message )
                // Toast.show( err.message )
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
                // Toast.show( err.message )
            });
    }

    gotoKlinePage(coin_exchange) {
        this.props.navigation.navigate('KlinePage', {coin_exchange: coin_exchange});
    }

    render() {
        const viewHeight = 110;
        const separatorHeight = 1;

        if (this.state.isRequesting) {
            return <Text>Loading...</Text>
        }

        const EHT_BTC = this.props.marketList ? this.props.marketList.find(i => i.coinEx.coin_name.toUpperCase() === "ETH" && i.coinEx.exchange_coin_name.toUpperCase() === "BTC") : null;
        const GTB_BTC = this.props.marketList ? this.props.marketList.find(i => i.coinEx.coin_name.toUpperCase() === "GTB" && i.coinEx.exchange_coin_name.toUpperCase() === "BTC") : null;
        const GTB_ETH = this.props.marketList ? this.props.marketList.find(i => i.coinEx.coin_name.toUpperCase() === "GTB" && i.coinEx.exchange_coin_name.toUpperCase() === "ETH") : null;
        const mainTradePair = [EHT_BTC, GTB_BTC, GTB_ETH];


        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>

                    <View>
                        <TouchableOpacity onPress={() => Linking.openURL('https://t.me/AsiaEDXenglish')}
                                          underlayColor={commonStyles.backgroundColor}>
                            <View style={styles.welcomeContainer}>


                                <ImageBackground source={require('../../../assets/images/banner-image.png')}
                                                 style={styles.welcomeImage}>


                                    <View style={{
                                        top: 10,
                                        left: 20,
                                        right: 0,
                                        bottom: 0,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Text style={{
                                            fontSize: 20,
                                            color: 'white',
                                            alignItems: 'flex-start'
                                        }}>{I18n.t(Keys.join_our)}</Text>
                                        <Text style={{
                                            fontSize: 20,
                                            color: 'white',
                                            alignItems: 'flex-start',
                                            marginTop: 5
                                        }}>{I18n.t(Keys.telegram_group)}</Text>
                                        <Text style={{
                                            fontSize: 16,
                                            color: 'white',
                                            alignItems: 'flex-start',
                                            marginTop: 5
                                        }}>{I18n.t(Keys.for_latest_news)}</Text>

                                    </View>
                                </ImageBackground>

                            </View>
                        </TouchableOpacity>

                        <View
                            style={{
                                flexDirection: 'row',
                                height: 80,
                                justifyContent: 'center'
                            }}>
                            {

                                mainTradePair.map((pair, index) => {
                                    if (pair) {
                                        return (
                                            <TouchableHighlight
                                                key={"items " + index}
                                                style={{flex: 1}}
                                                underlayColor='#ddd'
                                                onPress={() => this.gotoKlinePage(pair)}>
                                                <View style={{flex: 1, alignItems: 'center'}}>
                                                    <Text>{pair.coinEx.coin_name + '/' + pair.coinEx.exchange_coin_name}</Text>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        fontWeight: 'bold',
                                                        color: pair.market.change_rate < 0 ? 'red' : 'green'
                                                    }}>{pair ? pair.market.last_price : ''}</Text>
                                                    <Text
                                                        style={{color: pair.market.change_rate < 0 ? 'red' : 'green'}}>
                                                        {pair ? (pair.market.change_rate * 100).toFixed(2) + '%' : null}
                                                    </Text>
                                                    <Text> ≈{pair ? pair.price_usd.toFixed(2) + ' USD' : null} </Text>
                                                </View>
                                            </TouchableHighlight>
                                        )
                                    } else {
                                        return null;
                                    }
                                })
                            }
                        </View>

                        <View style={{height: 10, backgroundColor: '#efefef'}}/>
                    </View>


                    <View>

                        <Text style={{padding: 10, fontSize: 22, fontWeight: 'bold'}}>{I18n.t(Keys.news)}</Text>

                        <FlatList
                            data={this.state.newsList}
                            keyExtractor={(item, index) => {
                                return 'item ' + index;
                            }}
                            renderItem={({item, index}) => {
                                return this.renderItem(viewHeight, item, index);
                            }}
                            ItemSeparatorComponent={() => {
                                return <View
                                    style={[commonStyles.commonIntervalStyle, {height: separatorHeight}]}/>;
                            }}
                            getItemLayout={(data, index) => (
                                {length: viewHeight, offset: (viewHeight + separatorHeight) * index, index}
                            )}
                            onScroll={() => {
                            }}
                        />

                        <View style={{height: 1, backgroundColor: '#efefef'}}/>

                        <Text style={{padding: 10, fontSize: 22, fontWeight: 'bold'}}>{I18n.t(Keys.announcement)}</Text>

                        <FlatList
                            data={this.state.announcementList}
                            keyExtractor={(item, index) => {
                                return 'item ' + index;
                            }}
                            renderItem={({item, index}) => {
                                return this.renderItem(viewHeight, item, index);
                            }}
                            ItemSeparatorComponent={() => {
                                return <View
                                    style={[commonStyles.commonIntervalStyle, {height: separatorHeight}]}/>;
                            }}
                            getItemLayout={(data, index) => (
                                {length: viewHeight, offset: (viewHeight + separatorHeight) * index, index}
                            )}
                            onScroll={() => {
                            }}
                        />

                    </View>

                </ScrollView>

                <Spinner visible={this.state.isRequesting} cancelable={true}/>

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

            </View>
        )
            ;
    }

    renderItem(viewHeight, item, index) {
        const url = "https://www.asiaedx.com/#/doc/newsDetail/";

        return (
            <TouchableHighlight
                underlayColor='#ddd'
                style={index % 2 === 1 ? {backgroundColor: '#efefef'} : {backgroundColor: 'white'}}
                onPress={() => {
                    this.props.navigation.navigate('WebViewPage', {
                        url: url + item.page_news_id + (I18n.locale === 'zh-Hans' ? "lang=zh-cn" : ""),
                        webTitle: I18n.locale === 'zh-Hans' ? item.news_title : item.news_title_en
                    })
                }}>

                <View style={{alignItems: 'flex-start', height: 60, marginStart: 20, marginEnd: 20, marginTop: 10}}>

                    <Text>
                        {I18n.locale === 'zh-Hans' ? item.news_title : item.news_title_en}
                    </Text>

                    <Text style={{marginTop: 5}}>
                        {item.update_time}
                    </Text>
                </View>
            </TouchableHighlight>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 10,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        marginStart: 16,
        marginEnd: 16,
    },
    welcomeImage: {
        width: '100%',
        height: 100,
        marginLeft: 20,
        marginRight: 20,
        resizeMode: 'stretch'
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {width: 0, height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    greenText: {
        fontSize: 14,
        color: '#00ff00',
    },
    redText: {
        fontSize: 14,
        color: '#ff0000',
    },
});

export default HomePageView;

