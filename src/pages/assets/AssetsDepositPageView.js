import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import {Button, Text} from "react-native-elements";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import QRCode from 'react-qr-code';
import I18n from "../../I18n";
import Keys from "../../configs/Keys";

class AssetsDepositPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            isRequesting: false,
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: "TokenDepositPageView",
            headerBackTitle: null,
            headerRight: (
                <View style={[ { flexDirection: 'row' } ]}>
                    <BorderlessButton
                        onPress={() => navigation.navigate( 'AssetsDepositHistoryPage' )}
                        style={{ marginRight: 15 }}>
                        <Ionicons
                            name="md-time"
                            size={Platform.OS === 'ios' ? 22 : 25}
                            color={'white'}
                        />
                    </BorderlessButton>
                </View>
            )
        };
    };

    componentDidMount() {
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
                <SafeAreaView style={[ commonStyles.wrapper, ]}>

                    {this.renderCoinChoose()}
                    {this.renderQRcodeView()}

                    {/*<QRCode value="Hello, World!"/>*/}
                </SafeAreaView>
            </View>
        );
    }


    renderCoinChoose(){
        return (
            <View style={{backgroundColor:'#f6f6f8',margin:15, flexDirection:'row'}}>
                <Text style={{padding:7, fontSize:16, flex:1.5}}>ETH</Text>
                <Button
                    title={I18n.t( Keys.chooseCoinType)}
                    type="clear"
                    containerStyle={{flex:1}}
                    titleStyle={{fontSize:14}}
                />
            </View>
        );
    }


    renderQRcodeView(){
        return (
            <View style={{backgroundColor:'#f6f6f8',margin:15}}>
                <View style={{flex:1}}>
                    <QRCode value="Hello, World!"/>
                </View>
                <Button
                    title={I18n.t( Keys.chooseCoinType)}
                    type="clear"
                    containerStyle={{flex:1}}
                    titleStyle={{fontSize:14}}
                />
            </View>
        );
    }





}

const styles = StyleSheet.create( {} );

export default AssetsDepositPageView;

