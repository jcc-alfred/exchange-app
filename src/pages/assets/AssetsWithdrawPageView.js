import React from 'react';
import { InteractionManager, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Input, Text } from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import constStyles from "../../styles/constStyles";
import Toast from "react-native-root-toast";
import CountDown from 'react-native-countdown-component';
import Spinner from "react-native-loading-spinner-overlay";

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
        if ( this.props.userInfo.email && this.props.userInfo.email.length > 0 ) {
            query = {
                type: "email",
                email: this.props.userInfo.email
            }
        } else {
            query = {
                type: "phone",
                areaCode: this.props.userInfo.area_code,
                phoneNumber: this.props.userInfo.phone_number
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
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <ScrollView style={[ commonStyles.wrapper ]}>
                        <View>
                            <View style={{ backgroundColor: '#f6f6f8', margin: 15, flexDirection: 'row' }}>
                                <Text
                                    style={{ padding: 7, fontSize: 16, flex: 1.5 }}>{this.props.assets.coin_name}</Text>
                            </View>

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
                                }}
                            />

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
                                }}
                                editable={false}
                            />

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

                            <Button
                                title={I18n.t( Keys.Confirm )}
                                type="solid"
                                onPress={() => {
                                    this.onAssetsDoUserWithdraw();
                                }
                                }
                                containerStyle={[ commonStyles.mgt_normal, commonStyles.mgl_normal, commonStyles.mgr_normal ]}
                            />

                        </View>
                    </ScrollView>
                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default AssetsWithdrawPageView;

