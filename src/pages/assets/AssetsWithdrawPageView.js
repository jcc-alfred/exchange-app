import React from 'react';
import { InteractionManager, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Input, Text } from "react-native-elements";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import constStyles from "../../styles/constStyles";
import CountDown from "../auth/AuthRegisterPageView";
import Toast from "react-native-root-toast";

class AssetsWithdrawPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            isRequesting: false,
            coinAddress: '',
            coinCount: '',
            fee: props.coin ? '' + props.coin.withdraw_fees_rate : '',
            fundPassword: '',
            isCountingDown: false,
            code: '',
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.withdraw ),
            headerBackTitle: null,
            headerRight: (
                <View style={[ { flexDirection: 'row' } ]}>
                    <BorderlessButton
                        onPress={() => navigation.navigate( 'AssetsWithdrawHistoryPage' )}
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

    verificationCodeGet() {
        this.setState( {
            isRequesting: true
        } );

        let query;
        if ( this.state.type === 'email' ) {
            query = {
                type: this.state.type,
                email: this.state.email
            }
        } else {
            query = {
                type: this.state.type,
                areaCode: '' + this.state.currentCountry.phoneCode,
                phoneNumber: this.state.phone
            }
        }

        InteractionManager.runAfterInteractions( () => {
            this.props.onUserSendCode(
                query,
                ( error, resBody ) => {
                    this.setState( {
                        isRequesting: false
                    } );

                    if ( error ) {
                        Toast.show( error.message );
                    } else {
                        this.setState( {
                            isCountingDown: true,
                            code: '',
                        } );
                    }
                } );
        } );
    }

    onAssetsDoUserWithdraw() {
        this.setState( {
            isRequesting: true
        } );

        let query = {
            coinId: this.props.assets.coin_id,
            "toBlockAddress": this.state.coinAddress,
            "submitAmount": this.state.coinCount,
            "safePass": this.state.fundPassword,
            "emailCode": this.state.code
        };

        InteractionManager.runAfterInteractions( () => {
            this.props.onAssetsDoUserWithdraw(
                query,
                ( error, resBody ) => {
                    this.setState( {
                        isRequesting: false
                    } );

                    if ( error ) {
                        Toast.show( error.message );
                    } else {
                        Toast.show( "Withdraw success" );
                    }
                } );
        } );
    }

    render() {
        console.log( JSON.stringify( this.props.assets ) );
        console.log( JSON.stringify( this.props.marketList ) );
        console.log( JSON.stringify( this.props.coinList ) );
        console.log( JSON.stringify( this.props.coin ) );

        return (
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="light-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    {this.renderCoinChoose()}
                    {this.renderCoinAddressChoose()}
                    {this.renderCoinCountInput()}
                    {this.renderFeeView()}
                    {this.renderPassword()}
                    {this.renderEmailView()}

                    <Button
                        title={I18n.t( Keys.Confirm )}
                        titleStyle={{ fontSize: 12 }}
                        style={[ { margin: 5 } ]}
                        containerStyle={{ flex: 1, marginLeft: 40, marginRight: 40, marginTop: 40 }}
                        onPress={() => {
                            this.onAssetsDoUserWithdraw();
                        }}
                    />

                </SafeAreaView>
            </View>
        );
    }


    renderCoinChoose() {
        return (
            <View style={{ backgroundColor: '#f6f6f8', margin: 15, flexDirection: 'row' }}>
                <Text style={{ padding: 7, fontSize: 16, flex: 1.5 }}>{this.props.assets.coin_name}</Text>
            </View>
        );
    }

    renderCoinAddressChoose() {
        return (
            <View style={{ marginTop: 10, marginLeft: 5, marginRight: 5 }}>
                <Input
                    style={[ commonStyles.wrapper ]}
                    leftIconContainerStyle={[ commonStyles.pdr_normal, { paddingLeft: 0, marginLeft: 0 } ]}
                    value={this.state.coinAddress}
                    onChangeText={( text ) => this.setState( { coinAddress: text } )}
                    label={I18n.t( Keys.coin_address )}
                    errorStyle={{ color: 'red' }}
                    errorMessage={
                        this.state.showError && ( !this.state.coinAddress || this.state.coinAddress.length <= 0 ) ?
                            "Please input coin address"
                            :
                            null
                    }
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                    }}
                />

            </View>

        );
    }

    renderCoinCountInput() {
        return (
            <View style={{ marginTop: 10, marginLeft: 5, marginRight: 5 }}>
                <Input
                    style={[ commonStyles.wrapper ]}
                    leftIconContainerStyle={[ commonStyles.pdr_normal, { paddingLeft: 0, marginLeft: 0 } ]}
                    value={this.state.coinCount}
                    onChangeText={( text ) => this.setState( { coinCount: text } )}
                    label={I18n.t( Keys.Amount )}
                    errorStyle={{ color: 'red' }}
                    errorMessage={
                        this.state.showError && ( !this.state.coinCount || this.state.coinCount.length <= 0 ) ?
                            "Please input coin account"
                            :
                            null
                    }
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        // this.passwordInput.focus()
                    }}
                />

            </View>
        );
    }


    renderFeeView() {
        return (
            <View style={{ marginTop: 10, marginLeft: 5, marginRight: 5 }}>
                <Input
                    style={[ commonStyles.wrapper ]}
                    leftIconContainerStyle={[ commonStyles.pdr_normal, { paddingLeft: 0, marginLeft: 0 } ]}
                    value={this.state.fee}
                    onChangeText={( text ) => this.setState( { fee: text } )}
                    label={I18n.t( Keys.Processing_fee )}
                    errorStyle={{ color: 'red' }}
                    errorMessage={
                        this.state.showError && ( !this.state.fee || this.state.fee.length <= 0 ) ?
                            "Please input coin address"
                            :
                            null
                    }
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        // this.passwordInput.focus()
                    }}
                    editable={false}
                />
            </View>
        );
    }


    renderEmailView() {
        return (
            <View style={{ marginTop: 10, marginLeft: 5, marginRight: 5, flexDirection: 'row' }}>
                <Input
                    label={I18n.t( Keys.verify_code )}
                    style={[ commonStyles.wrapper ]}
                    maxLength={6}
                    rightIcon={
                        this.state.isCountingDown ?
                            <CountDown
                                style={[ { height: 20 } ]}
                                until={__DEV__ ? 10 : 60}
                                size={12}
                                onFinish={() => {
                                    this.setState( {
                                        isCountingDown: false
                                    } )
                                }}
                                digitStyle={{ backgroundColor: constStyles.THEME_COLOR }}
                                digitTxtStyle={{ color: 'white' }}
                                timeToShow={[ 'S' ]}
                                timeLabels={{}}
                                running={this.state.isCountingDown}
                            />
                            :
                            <Button
                                title={I18n.t( Keys.resend )}
                                type="outline"
                                buttonStyle={[ { height: 30, paddingTop: 7, paddingBottom: 7 } ]}
                                titleStyle={[ { fontSize: 14, } ]}
                                onPress={() => {
                                    this.verificationCodeGet()
                                }
                                }
                            />
                    }
                    leftIconContainerStyle={[ commonStyles.pdr_normal ]}
                    value={this.state.code}
                    onChangeText={( text ) => this.setState( {
                        code: text
                    } )}
                    keyboardType={'phone-pad'}
                    errorStyle={{ color: 'red' }}
                    errorMessage={
                        this.state.showError && ( !this.state.code || this.state.code.length <= 0 ) ?
                            I18n.t( Keys.please_input_verify_code )
                            :
                            null
                    }
                />

            </View>
        );
    }


    renderPassword() {
        return (
            <View style={{ marginTop: 10, marginLeft: 5, marginRight: 5 }}>
                <Input
                    style={[ commonStyles.wrapper ]}
                    leftIconContainerStyle={[ commonStyles.pdr_normal, { paddingLeft: 0, marginLeft: 0 } ]}
                    value={this.state.fundPassword}
                    onChangeText={( text ) => this.setState( { fundPassword: text } )}
                    label={I18n.t( Keys.password )}
                    errorStyle={{ color: 'red' }}
                    errorMessage={
                        this.state.showError && ( !this.state.fundPassword || this.state.fundPassword.length <= 0 ) ?
                            "Please input fund password"
                            :
                            null
                    }
                    returnKeyType={'next'}
                    onSubmitEditing={() => {

                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default AssetsWithdrawPageView;

