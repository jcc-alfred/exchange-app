import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import commonStyles from "../style/commonStyles";
import {
    FlatList,
    RefreshControl,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TouchableHighlight,
    SafeAreaView
} from 'react-native';

import {MonoText} from '../components/StyledText';

const data = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSources: [],
            refreshing: false
        };
    }

    componentWillMount() {
        this.loadData(true);
    }

    loadData(isInit) {
        if (isInit) {
            this.setState({
                isLoading: true
            });
        } else {
            if (this.state.refreshing) {
                return;
            }

            this.setState({
                refreshing: true,
            });
        }

        fetch("https://www.asiaedx.com:3000/exchange/getMarketList", {method: "POST"})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState(
                    {
                        isLoading: false,
                        dataSources: responseData.data,
                    },
                    function () {
                    }
                );
            }).catch(error => {
            console.error(error);
        }).done();

    }

    render() {
        const viewHeight = 110;
        const separatorHeight = 1;

        if (this.state.isLoading) {
            return <View><Text>Loading...</Text></View>
        }

        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>


                    <View>

                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }
                            data={this.state.dataSources}
                            keyExtractor={(item, index) => {
                                return 'item ' + index;
                            }}
                            renderItem={({item, index}) => {
                                return renderItem(viewHeight, item, index);
                            }}
                            // renderItem={({ item }) => <Item title={item.title} />}
                            ListHeaderComponent={() => {
                                return this.header();
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


                    {/*<View style={styles.getStartedContainer}>*/}
                    {/*<DevelopmentModeNotice/>*/}

                    {/*<Text style={styles.getStartedText}>Get started by opening</Text>*/}

                    {/*<View*/}
                    {/*style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>*/}
                    {/*<MonoText>screens/HomeScreen.js</MonoText>*/}
                    {/*</View>*/}

                    {/*<Text style={styles.getStartedText}>*/}
                    {/*Change this text and your app will automatically reload.*/}
                    {/*</Text>*/}
                    {/*</View>*/}

                    {/*<View style={styles.helpContainer}>*/}
                    {/*<TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>*/}
                    {/*<Text style={styles.helpLinkText}>*/}
                    {/*Help, it didn’t automatically reload!*/}
                    {/*</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                </ScrollView>

                {/*<View style={styles.tabBarInfoContainer}>*/}
                {/*<Text style={styles.tabBarInfoText}>*/}
                {/*This is a tab bar. You can edit it in:*/}
                {/*</Text>*/}

                {/*<View*/}
                {/*style={[styles.codeHighlightContainer, styles.navigationFilename]}>*/}
                {/*<MonoText style={styles.codeHighlightText}>*/}
                {/*navigation/MainTabNavigator.js*/}
                {/*</MonoText>*/}
                {/*</View>*/}
                {/*</View>*/}
            </View>
        );
    }

    _onRefresh = () => {
        this.loadData(false);
    };

    header() {
        if (this.state.isLoading) {
            return <View><Text>Loading...</Text></View>
        }

        return (
            <View>
                <View style={styles.welcomeContainer}>
                    <Image
                        source={
                            __DEV__
                                ? require('../assets/images/logo.png')
                                : require('../assets/images/logo.png')
                        }
                        style={styles.welcomeImage}
                    />
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


function renderItem(viewHeight, item, index) {
    return (
        <TouchableHighlight
            underlayColor='#ddd'
            onPress={() => {
            }}>

            <View style={{alignItems: 'center', flexDirection: 'row', height: 50, marginStart: 40}}>

                <Text style={{flex: 1}}>
                    {item.coinEx.coin_name}/{item.coinEx.exchange_coin_name}
                </Text>

                <Text style={{flex: 1}}>
                    {item.market.last_price}
                </Text>

                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{color: item.market.change_rate > 0 ? 'green' : 'red'}}>
                        {(item.market.change_rate * 100).toFixed(2)}%
                    </Text>
                </View>

                {/*<Text style={[commonStyles.wrapper, {marginTop: 10, marginBottom: 10}]}>*/}
                {/*{item.title}*/}
                {/*</Text>*/}

            </View>
        </TouchableHighlight>
    );

}

function Item({title}) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}


HomeScreen.navigationOptions = {
    header: null,
};

function DevelopmentModeNotice() {
    if (__DEV__) {
        const learnMoreButton = (
            <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
                Learn more
            </Text>
        );

        return (
            <Text style={styles.developmentModeText}>
                Development mode is enabled: your app will be slower but you can use
                useful development tools. {learnMoreButton}
            </Text>
        );
    } else {
        return (
            <Text style={styles.developmentModeText}>
                You are not in development mode: your app will run at full speed.
            </Text>
        );
    }
}

function handleLearnMorePress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/workflow/development-mode/'
    );
}

function handleHelpPress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
    );
}

function componentDidMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
        .then(response => response.json())
        .then(responseJson => {
            this.setState(
                {
                    isLoading: false,
                    dataSource: responseJson.movies,
                },
                function () {
                }
            );
        })
        .catch(error => {
            console.error(error);
        });
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
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#152645'
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
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
