import React from 'react';
import {
    Platform,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableHighlight,
    InteractionManager,
    ScrollView,
    FlatList,
    RefreshControl,
    ImageBackground
} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import Toast from "react-native-root-toast";
import { Text } from "react-native-elements";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from 'react-navigation-drawer';

class HomePageView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isRequesting: true,
            dataSources: [],
            newsList: [],
            announcementList: [],
            refreshing: false,
        }
    }

    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;

        return {
            title: "Home",
            headerBackTitle: null,
            headerLeft: (
                <BorderlessButton
                    onPress={() => {
                        navigation.dispatch( DrawerActions.openDrawer() );
                    }}
                    style={{marginLeft: 15}}>
                    <Ionicons
                        name="md-menu"
                        size={Platform.OS === 'ios' ? 22 : 25}
                        color={'white'}
                    />
                </BorderlessButton>
            )
        };
    };

    componentDidMount() {
        this.loadData()
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
                        dataSources: resBody.data,
                    });
                }
            });


        });

        try {
            setInterval(async () => {
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
                                dataSources: resBody.data,
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

    render() {
        const viewHeight = 110;
        const separatorHeight = 1;

        if (this.state.isRequesting) {
            return <Text>Loading...</Text>
        }

        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>

                    <View>
                        <View style={styles.welcomeContainer}>

                            <ImageBackground source={require('../../../assets/images/baner-image.png')}
                                             style={styles.welcomeImage}>
                                <View style={{
                                    top: 10,
                                    left: 20,
                                    right: 0,
                                    bottom: 0,
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start'
                                }}>
                                    <Text style={{fontSize: '20', color: 'white', alignItems: 'flex-start'}}>Join
                                        our</Text>
                                    <Text style={{
                                        fontSize: '20',
                                        color: 'white',
                                        alignItems: 'flex-start',
                                        marginTop: 5
                                    }}>Telegram Group</Text>
                                    <Text style={{
                                        fontSize: '16',
                                        color: 'white',
                                        alignItems: 'flex-start',
                                        marginTop: 5
                                    }}>for the latest News and Updates</Text>

                                </View>
                            </ImageBackground>

                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                height: 80,
                                justifyContent: 'center'
                            }}>

                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Text>ETH/BTC</Text>

                                <Text style={{fontSize: 16, fontWeight: 'bold', color: this.state.dataSources[0].market.change_rate < 0 ? 'red' : 'green'}}>{this.state.dataSources.length == 0 ? '' : this.state.dataSources[0].market.last_price}</Text>
                                <Text style={{color: this.state.dataSources[0].market.change_rate < 0 ? 'red' : 'green'}}>{this.state.dataSources.length == 0 ? '' : (this.state.dataSources[0].market.change_rate * 100).toFixed(2)}%</Text>
                                <Text> ≈{this.state.dataSources.length == 0 ? '' : this.state.dataSources[0].price_usd.toFixed(2)} USD</Text>


                            </View>

                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Text>GTB/BTC</Text>
                                <Text style={{fontSize: 16, fontWeight: 'bold', color: this.state.dataSources[0].market.change_rate < 0 ? 'red' : 'green'}}>{this.state.dataSources.length == 0 ? '' : this.state.dataSources[1].market.last_price}</Text>
                                <Text style={{color: this.state.dataSources[0].market.change_rate < 0 ? 'red' : 'green'}}>{this.state.dataSources.length == 0 ? '' : (this.state.dataSources[1].market.change_rate * 100).toFixed(2)}%</Text>
                                <Text> ≈{this.state.dataSources.length == 0 ? '' : this.state.dataSources[1].price_usd.toFixed(2)} USD</Text>

                            </View>

                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Text>GTB/ETH</Text>
                                <Text style={{fontSize: 16, fontWeight: 'bold', color: this.state.dataSources[0].market.change_rate < 0 ? 'red' : 'green'}}>{this.state.dataSources.length == 0 ? '' : this.state.dataSources[2].market.last_price}</Text>
                                <Text style={{color: this.state.dataSources[0].market.change_rate < 0 ? 'red' : 'green'}}>{this.state.dataSources.length == 0 ? '' : (this.state.dataSources[2].market.change_rate * 100).toFixed(2)}%</Text>
                                <Text> ≈{this.state.dataSources.length == 0 ? '' : this.state.dataSources[2].price_usd.toFixed(2)} USD</Text>
                            </View>

                        </View>

                        <View style={{height: 10, backgroundColor: '#efefef'}}/>
                    </View>


                    <View>

                        <Text style={{padding: 16, fontSize: 16}}>News</Text>

                        <FlatList
                            // refreshControl={
                            //     <RefreshControl
                            //         refreshing={this.state.refreshing}
                            //         onRefresh={this._onRefresh}
                            //     />
                            // }
                            data={this.state.newsList}
                            keyExtractor={(item, index) => {
                                return 'item ' + index;
                            }}
                            renderItem={({item, index}) => {
                                return this.renderItem(viewHeight, item, index);
                            }}
                            // ListHeaderComponent={() => {
                            //     return this.header();
                            // }}
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

                        <Text style={{padding: 16, fontSize: 16}}>Announcement</Text>

                        <FlatList
                            // refreshControl={
                            //     <RefreshControl
                            //         refreshing={this.state.refreshing}
                            //         onRefresh={this._onRefresh}
                            //     />
                            // }
                            data={this.state.announcementList}
                            keyExtractor={(item, index) => {
                                return 'item ' + index;
                            }}
                            renderItem={({item, index}) => {
                                return this.renderItem(viewHeight, item, index);
                            }}
                            // ListHeaderComponent={() => {
                            //     return this.header();
                            // }}
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

            </View>
        );
    }

    renderItem(viewHeight, item, index) {
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                style={index % 2 == 1 ? {backgroundColor: '#efefef'} : {backgroundColor: 'white'}}
                onPress={() => {
                }}>

                <View style={{alignItems: 'flex-start', height: 60, marginStart: 20, marginEnd: 20, marginTop: 10}}>

                    <Text>
                        {item.news_title}
                    </Text>

                    <Text style={{marginTop: 5}}>
                        {item.update_time}
                    </Text>
                </View>
            </TouchableHighlight>
        );

    }

    header() {
        if (this.state.isRequesting) {
            return <View><Text>Loading...</Text></View>
        }

        return (
            <View>
                <View style={styles.welcomeContainer}>
                    {/*<Image*/}
                    {/*source={*/}
                    {/*require('/assets/images/baner-image.png')*/}
                    {/*}*/}
                    {/*style={styles.welcomeImage}*/}
                    {/*/>*/}
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        height: 80,
                        justifyContent: 'center'
                    }}>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text>ETH/BTC</Text>
                        <Text>{this.state.dataSources[0].market.last_price}</Text>
                        <Text> ≈{this.state.dataSources[0].price_usd.toFixed(2)} USD</Text>
                        {/*{this.state.dataSources.map(dataSource => <Text>{dataSource.market.last_price}</Text>)}*/}


                    </View>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text>GTB/BTC</Text>
                        <Text>{this.state.dataSources[1].market.last_price}</Text>
                        <Text> ≈{this.state.dataSources[1].price_usd.toFixed(2)} USD</Text>

                    </View>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text>GTB/ETH</Text>
                        <Text>{this.state.dataSources[2].market.last_price}</Text>
                        <Text> ≈{this.state.dataSources[2].price_usd.toFixed(2)} USD</Text>
                    </View>

                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        height: 20,
                        alignItems: 'center'
                    }}>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text>名称</Text>

                    </View>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text>最新价</Text>
                    </View>

                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text>涨跌幅</Text>
                    </View>

                </View>
            </View>
        )
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

