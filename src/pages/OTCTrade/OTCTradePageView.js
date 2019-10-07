import React from 'react';
import { InteractionManager, PixelRatio, SafeAreaView, StyleSheet, View, TextInput, StatusBar } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import {Button, Text, Input} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import io from 'socket.io-client';
import * as env from "../../env";
import Util from "../../util/Util";
import Spinner from "../mine/UserInfoVerifyPageView";

class OTCTradePageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isRequesting: false,
        }
    }

    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;

        return {
            title: "OTCTradePageView",
            headerBackTitle: null,
        };
    };

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        // this.setState({
        //     isRequesting: true
        // });

        InteractionManager.runAfterInteractions(() => {
        })

    }

    changeState(value, field) {
        let param = {};
        param[field] = value;
        this.setState(param)
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



    render() {
        return (
            <View style={[commonStyles.wrapper,]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[commonStyles.wrapper,]}>
                    <Text>otc</Text>
                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }



}




export default OTCTradePageView;

