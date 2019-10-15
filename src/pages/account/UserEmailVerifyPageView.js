import React from 'react';
import { InteractionManager, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Input } from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import CountDown from 'react-native-countdown-component';
import constStyles from "../../styles/constStyles";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";

class UserEmailVerifyPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            email: '',
            newEmailCode: '',
            isNewEmailCountingDown: false,
            emailCode: '',
            isEmailCountingDown: false,
            isRequesting: false,
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.email_verify ),
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

    verificationCodeGet( type ) {
        this.setState( {
            isRequesting: true
        } );

        let query;
        if ( type === 'email' ) {
            query = {
                type: type,
                email: this.state.email
            }
        } else {
            query = {
                type: type,
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
                        if ( type === 'email' ) {
                            this.setState( {
                                isEmailCountingDown: true,
                                emailCode: '',
                            } );
                        } else {
                            this.setState( {
                                isPhoneCountingDown: true,
                                phoneCode: '',
                            } );
                        }
                    }
                } );
        } );
    }

    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <ScrollView>
                        <View>
                            <Input
                                style={[ commonStyles.wrapper ]}
                                leftIconContainerStyle={[ commonStyles.pdr_normal, {
                                    paddingLeft: 0,
                                    marginLeft: 0
                                } ]}
                                value={this.state.email}
                                onChangeText={( text ) => this.setState( { email: text } )}
                                keyboardType={'email-address'}
                                label={I18n.t( Keys.email )}
                                errorStyle={{ color: 'red' }}
                                errorMessage={
                                    this.state.showError && ( !this.state.email || this.state.email.length <= 0 ) ?
                                        "Please Input Email"
                                        :
                                        null
                                }
                            />
                            <Input
                                label={I18n.t( Keys.new_email_verify_code )}
                                style={[ commonStyles.wrapper ]}
                                maxLength={6}
                                rightIcon={
                                    this.state.isNewEmailCountingDown ?
                                        <CountDown
                                            style={[ { height: 20 } ]}
                                            until={__DEV__ ? 10 : 60}
                                            size={12}
                                            onFinish={() => {
                                                this.setState( {
                                                    isEmailCountingDown: false
                                                } )
                                            }}
                                            digitStyle={{ backgroundColor: constStyles.THEME_COLOR }}
                                            digitTxtStyle={{ color: 'white' }}
                                            timeToShow={[ 'S' ]}
                                            timeLabels={{}}
                                            running={this.state.isNewEmailCountingDown}
                                        />
                                        :
                                        <Button
                                            title={I18n.t( Keys.resend )}
                                            type="outline"
                                            buttonStyle={[ { height: 30, paddingTop: 7, paddingBottom: 7 } ]}
                                            titleStyle={[ { fontSize: 14, } ]}
                                            onPress={() => {
                                                this.verificationCodeGet( "email" )
                                            }
                                            }
                                        />
                                }
                                leftIconContainerStyle={[ commonStyles.pdr_normal ]}
                                value={this.state.newEmailCode}
                                onChangeText={( text ) => this.setState( {
                                    newEmailCode: text
                                } )}
                                keyboardType={'phone-pad'}
                                errorStyle={{ color: 'red' }}
                                errorMessage={
                                    this.state.showError && ( !this.state.newEmailCode || this.state.newEmailCode.length <= 0 ) ?
                                        I18n.t( Keys.please_input_new_email_verify_code )
                                        :
                                        null
                                }
                            />

                            <Input
                                label={I18n.t( Keys.email_verify_code )}
                                style={[ commonStyles.wrapper ]}
                                maxLength={6}
                                rightIcon={
                                    this.state.isEmailCountingDown ?
                                        <CountDown
                                            style={[ { height: 20 } ]}
                                            until={__DEV__ ? 10 : 60}
                                            size={12}
                                            onFinish={() => {
                                                this.setState( {
                                                    isEmailCountingDown: false
                                                } )
                                            }}
                                            digitStyle={{ backgroundColor: constStyles.THEME_COLOR }}
                                            digitTxtStyle={{ color: 'white' }}
                                            timeToShow={[ 'S' ]}
                                            timeLabels={{}}
                                            running={this.state.isEmailCountingDown}
                                        />
                                        :
                                        <Button
                                            title={I18n.t( Keys.resend )}
                                            type="outline"
                                            buttonStyle={[ { height: 30, paddingTop: 7, paddingBottom: 7 } ]}
                                            titleStyle={[ { fontSize: 14, } ]}
                                            onPress={() => {
                                                this.verificationCodeGet( "email" )
                                            }
                                            }
                                        />
                                }
                                leftIconContainerStyle={[ commonStyles.pdr_normal ]}
                                value={this.state.emailCode}
                                onChangeText={( text ) => this.setState( {
                                    emailCode: text
                                } )}
                                keyboardType={'phone-pad'}
                                errorStyle={{ color: 'red' }}
                                errorMessage={
                                    this.state.showError && ( !this.state.emailCode || this.state.emailCode.length <= 0 ) ?
                                        I18n.t( Keys.please_input_email_verify_code )
                                        :
                                        null
                                }
                            />


                            <Button
                                title={I18n.t( Keys.send )}
                                type="solid"
                                onPress={() => {
                                    this.resetPassword()
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

export default UserEmailVerifyPageView;

