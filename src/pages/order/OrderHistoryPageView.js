import React from 'react';
import {Dimensions, InteractionManager, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import {Text} from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";
import UserEntrustList from "../../components/UserEntrustList";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import constStyles from "../../styles/constStyles";

class OrderHistoryPageView extends React.Component {

    constructor(props) {
        super(props);
        const tabData = [{title: I18n.t( Keys.all ), value: []}, {title: I18n.t( Keys.histroy ), value: []}];
        const {index, routes, scenes} = this.initTabData(tabData);

        this.state = {
            isRequesting: false,
            userEntrustList: [],
            userHistoryEntrustList: [],
            index: index ? index : 0,
            routes: routes ? routes : [],
            scenes: scenes ? scenes : []
        }
    }

    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;

        return {
            title: I18n.t(Keys.order),
            headerBackTitle: null,
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

    loadData() {
        this.setState({
            isRequesting: true
        });

        InteractionManager.runAfterInteractions(() => {
            this.props.onExchangeGetUserEntrustList((error, resBody) => {
                if (error) {
                    this.setState({
                        isRequesting: false
                    });

                    Toast.show(error.message);
                } else {
                    this.setState({
                        isRequesting: false,
                        userEntrustList: resBody.data
                    });

                    const tabData = [{title: I18n.t( Keys.all ), value: this.state.userEntrustList}, {
                        title: I18n.t( Keys.histroy ),
                        value: this.state.userHistoryEntrustList
                    }];
                    const {index, routes, scenes} = this.initTabData(tabData);
                    this.setState({
                        routes, scenes
                    })
                }
            });


        })

        InteractionManager.runAfterInteractions(() => {
            this.props.onExchangeGetUserHistoryEntrustList((error, resBody) => {
                if (error) {
                    this.setState({
                        isRequesting: false
                    });

                    Toast.show(error.message);
                    Toast.show(error.message);
                } else {
                    this.setState({
                        isRequesting: false,
                        userHistoryEntrustList: resBody.data
                    });

                    const tabData = [{title: I18n.t( Keys.all ), value: this.state.userEntrustList}, {
                        title: I18n.t( Keys.histroy ),
                        value: this.state.userHistoryEntrustList
                    }];
                    const {index, routes, scenes} = this.initTabData(tabData);
                    this.setState({
                        routes, scenes
                    })
                }
            });

        })


    }

    render() {
        return (
            <View style={[commonStyles.wrapper,]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[commonStyles.wrapper,]}>

                    {/*<Text>*/}
                    {/*{"OrderHistoryPageView"}*/}
                    {/*</Text>*/}
                    {this.exchangeAreaTabs()}

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
                    title: tabData[index].title
                });
                scenes ['' + index] = () => {
                    return (
                        <UserEntrustList
                            type={index}
                            data={tabData[index].value}
                            marketList={this.props.marketList}
                            userEntrustList={this.state.userHistoryEntrustList}
                            userInfo={this.props.userInfo}
                        />
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
                            indicatorStyle={{backgroundColor: constStyles.THEME_COLOR}}
                            inactiveColor={{color: 'red'}}
                            activeColor={{color: constStyles.THEME_COLOR}}
                            style={{backgroundColor: 'white', flexDirection: 'row'}}
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

}

const styles = StyleSheet.create({});

export default OrderHistoryPageView;

