import React from 'react';
import {InteractionManager, Platform, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Button, ListItem, Text} from "react-native-elements";
import commonStyles from "../../styles/commonStyles";
import {NavigationActions, StackActions} from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import I18n from "../../I18n";
import * as env from '../../env';
import Keys from "../../configs/Keys";
import {BorderlessButton} from "react-native-gesture-handler";
import {Ionicons} from "@expo/vector-icons";
import io from 'socket.io-client';

class KlinePageView extends React.Component {

    constructor(props) {
        super(props);
        this.coinEx = this.props.navigation.getParam('coin_exchange');
        this.state = {
            isRequesting: false,
            socket: null,
            range:864000
        }
    }

    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;
        const coinEx = navigation.getParam('coin_exchange');


        return {
            title: coinEx.coinEx.coin_name + '/' + coinEx.coinEx.exchange_coin_name,
            headerBackTitle: null,
            headerRight: (
                <View style={[{flexDirection: 'row'}]}>
                    <BorderlessButton
                        onPress={() => navigation.navigate('SettingsPage')}
                        style={{marginRight: 15}}>
                        <Ionicons
                            name="md-settings"
                            size={Platform.OS === 'ios' ? 22 : 25}
                            color={'white'}
                        />
                    </BorderlessButton>
                </View>
            )
        };
    };

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        this.setState({
            isRequesting: true
        });

        InteractionManager.runAfterInteractions(() => {
            this.socket = io(env.webSocket);
            if (!this.socket.connected) {
                this.socket.connect();
            }
            this.socket.on('connect', () => {
                // console.log('connect:', this.socket.connected);
                this.socket.emit('init', {
                    user_id: this.props.userInfo.user_id ?this.props.userInfo.user_id :0,
                    coin_exchange_id: this.coinEx.coin_exchange_id,
                    range: this.state.range
                });
            });
            this.socket.on('entrustList',(data)=>{
                this.setState({buyList: data.buyList});
                this.setState({sellList: data.sellList});
                if(!this.state.buyPrice){
                    this.setState({buyPrice:data.sellList.length > 0 ? data.sellList[data.sellList.length -1].entrust_price : ''});
                    this.setState({sellPrice:data.buyList.length > 0 ? data.buyList[0].entrust_price : ''});
                }
            });

        })
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
        const {navigation} = this.props;
        return (
            <View style={[commonStyles.wrapper,]}>
                <SafeAreaView style={[commonStyles.wrapper]}>
                    <Text>kline page {JSON.stringify(navigation.getParam('coin_exchange'))}</Text>
                    <Text>
                        {JSON.stringify(this.state.buyList)}
                    </Text>
                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create({});

export default KlinePageView;

