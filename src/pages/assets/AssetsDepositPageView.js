import React from 'react';
import { Clipboard, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Text } from "react-native-elements";
import QRCode from 'react-qr-code';
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";

class AssetsDepositPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
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
                    <ScrollView style={[ commonStyles.wrapper ]}>
                        <View>
                            {this.renderCoinChoose()}
                            {this.renderQRCodeView()}
                        </View>
                    </ScrollView>

                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
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


    renderQRCodeView() {
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

