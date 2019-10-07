import React from 'react';
import { Clipboard, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Text } from "react-native-elements";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import QRCode from 'react-qr-code';
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import Toast from "react-native-root-toast";
import constStyles from "../../styles/constStyles";

class AssetsDepositPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            items: [ { label: "wo", value: "wo" }, { label: "yao", value: "yao" }, {
                label: "zuo",
                value: "zuo"
            }, { label: "ai", value: "ai" } ],
            selectItem: null,
            isRequesting: false,
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.deposit ),
            headerBackTitle: null,
            headerRight: (
                <View style={[ { flexDirection: 'row' } ]}>
                    <BorderlessButton
                        onPress={() => navigation.navigate( 'AssetsDepositHistoryPage' )}
                        style={{ marginRight: 15 }}>
                        <Ionicons
                            name="md-time"
                            size={Platform.OS === 'ios' ? 22 : 25}
                            color={constStyles.THEME_COLOR}
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
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>

                    {this.renderCoinChoose()}
                    {this.renderQRcodeView()}

                    {/*<QRCode value="Hello, World!"/>*/}
                </SafeAreaView>
            </View>
        );
    }


    renderCoinChoose() {
        return (

            <View style={{
                backgroundColor: '#f6f6f8',
                margin: 15,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ padding: 7, fontSize: 16, flex: 1.5 }}>{this.props.assets.coin_name}</Text>
            </View>

        );
    }


    renderQRcodeView() {
        return (
            <View style={{
                backgroundColor: '#f6f6f8',
                margin: 15,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 15,
                paddingBottom: 15
            }}>
                <QRCode value={this.props.assets.block_address}/>
                <Button
                    title={I18n.t( Keys.copy_coin_address )}
                    type="outline"
                    titleStyle={{ fontSize: 14 }}
                    containerStyle={{ marginTop: 10, marginLeft: 40, marginRight: 40, marginBottom: 10 }}
                    onPress={() => {
                        Clipboard.setString( this.props.assets.block_address );
                        // this.props.toast( I18n.t( Keys.copy_address_success ) );
                        Toast.show( I18n.t( Keys.copy_success ) );
                    }}
                />

                <Text style={commonStyles.commonSmallSubTextStyle}>{I18n.t( Keys.topUp_Coin_address )}</Text>
                <Text>{this.props.assets.block_address}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default AssetsDepositPageView;

