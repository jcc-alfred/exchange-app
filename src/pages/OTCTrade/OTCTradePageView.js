import React from 'react';
import {
    InteractionManager,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    FlatList,
    TouchableHighlight
} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { TabView, SceneMap } from 'react-native-tab-view';
import { Text,Button, Input, } from "react-native-elements";
import Spinner from "../mine/UserInfoVerifyPageView";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";







const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);



class OTCTradePageView extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            index: 0,

            nList: [
                { key: 'first', title: 'Buy' },
                { key: 'second', title: 'Sell' },
            ],

            isRequesting: false,
            routes: [
                { key: 'first', title: 'Buy' },
                { key: 'second', title: 'Sell' },
            ],



        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: "OTCTradePageView",
            headerBackTitle: null,
        };
    };

    static loadData() {
        InteractionManager.runAfterInteractions( () => {
        } )
    }

    componentDidMount() {
        OTCTradePageView.loadData()
    }

    changeState( value, field ) {
        let param = {};
        param[ field ] = value;
        this.setState( param )
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


    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>

                    {this.renderTopMenuBar()}
                    {this.renderTabView()}


                </SafeAreaView>
            </View>
        );
    }



    renderFirstPage(){
        return (
            <View style={[styles.scene, { backgroundColor: '#ff4081' }]} >

                <View style={[styles.scene, { backgroundColor: '#ff4081', flexDirection: 'row'}]}>
                    <Button
                        title={"GTB"}
                        type="outline"
                        containerStyle={[{ flex:1, margin:5}]}
                        titleStyle={[ { fontSize: 12, } ]}
                        onPress={() => {

                        }
                        }
                    />
                    <Button
                        title={"BTC"}
                        type="outline"
                        containerStyle={[{ flex:1, margin:5}]}
                        titleStyle={[ { fontSize: 12, } ]}
                        onPress={() => {

                        }
                        }
                    />
                    <Button
                        title={I18n.t( Keys.resend )}
                        type="outline"
                        containerStyle={[{ flex:1, margin:5}]}
                        titleStyle={[ { fontSize: 12, } ]}
                        onPress={() => {

                        }
                        }
                    />
                    <Button
                        title={"CNY"}
                        type="outline"
                        containerStyle={[{ flex:1, margin:5}]}
                        titleStyle={[ { fontSize: 12, } ]}
                        onPress={() => {

                        }
                        }
                    />
                    <Button
                        title={"USD"}
                        type="outline"
                        containerStyle={[{ flex:1, margin:5}]}
                        titleStyle={[ { fontSize: 12, } ]}
                        onPress={() => {

                        }
                        }
                    />


                </View>


                {/*<View style={[styles.scene, { backgroundColor: '#ff4081', flexDirection: 'row'}]}>*/}
                {/*<FlatList*/}
                {/*data={this.state.nList}*/}
                {/*keyExtractor={(item, index) => {*/}
                {/*return 'item ' + index;*/}
                {/*}}*/}
                {/*renderItem={({item, index}) => {*/}
                {/*return this.renderItem(1, item, index);*/}
                {/*}}*/}
                {/*ItemSeparatorComponent={() => {*/}
                {/*return <View*/}
                {/*style={[commonStyles.commonIntervalStyle, {height: 1}]}/>;*/}
                {/*}}*/}
                {/*getItemLayout={(data, index) => (*/}
                {/*{length: 110, offset: (110 + 1) * index, index}*/}
                {/*)}*/}
                {/*onScroll={() => {*/}
                {/*}}*/}
                {/*/>*/}
                {/*</View>*/}


            </View>
        );
    }





    renderTabView(){
        return (
            <TabView
                navigationState={this.state}
                onIndexChange={index => this.setState({ index })}
                renderScene={SceneMap({
                    first: this.renderFirstPage,
                    second: SecondRoute,
                })}
            />
        );
    }



    renderTopMenuBar() {
        return (
            <View style={{flexDirection:'row' ,}}>
                {/*<Button*/}

                <Button
                    title={I18n.t( Keys.TradeHall )}
                    type="outline"
                    containerStyle={[{ flex:1, margin:5}]}

                    titleStyle={[ { fontSize: 12, } ]}
                    onPress={() => {

                    }
                    }
                />

                <Button
                    title={I18n.t( Keys.PublishPost )}
                    type="outline"
                    containerStyle={[{ flex:1, margin:5}]}
                    titleStyle={[ { fontSize: 12, } ]}
                    onPress={() => {

                    }
                    }
                />

                <Button
                    title={I18n.t( Keys.MyPost )}
                    type="outline"
                    containerStyle={[{ flex:1, margin:5}]}
                    titleStyle={[ { fontSize: 12, } ]}
                    onPress={() => {

                    }
                    }
                />

                <Button
                    title={I18n.t( Keys.MyOrder )}
                    type="outline"
                    containerStyle={[{ flex:1, margin:5}]}
                    titleStyle={[ { fontSize: 12, } ]}
                    onPress={() => {

                    }
                    }
                />
            </View>
        )
    }


    renderItem(viewHeight, item, index) {
        const url = "https://www.asiaedx.com/#/doc/newsDetail/";
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                style={index % 2 === 1 ? {backgroundColor: '#efefef'} : {backgroundColor: 'white'}}
                onPress={() => {
                    // this.props.navigation.navigate('WebViewPage', {
                    //     url: url + item.page_news_id,
                    //     webTitle: I18n.t(Keys.news)
                    // })
                }}>

                {/*<View style={{alignItems: 'flex-start', height: 60, marginStart: 20, marginEnd: 20, marginTop: 10}}>*/}

                    {/*<Text>*/}
                        {/*{item.news_title}*/}
                    {/*</Text>*/}

                    {/*<Text style={{marginTop: 5}}>*/}
                        {/*{item.update_time}*/}
                    {/*</Text>*/}
                {/*</View>*/}
            </TouchableHighlight>
        );
    }










}



const styles = StyleSheet.create( {
    scene: {
        flex: 1,
    },
} );



export default OTCTradePageView;

