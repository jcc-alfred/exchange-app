import React from 'react';
import { InteractionManager, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Input } from "react-native-elements";
import CountryUtil from "../countrySelect/util/CountryUtil";
import constStyles from "../../styles/constStyles";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import CountDown from 'react-native-countdown-component';
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";

class AuthRegisterPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            type: 'email',
            currentCountry: CountryUtil.calcCountry( null ),
            phone: '',
            email: '',
            code: '',
            password: '',
            isCountingDown: false,
            isRequesting: false,
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: params.isResetPassword ? I18n.t( Keys.forgot_password ) : I18n.t( Keys.sign_up_1 ),
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

    signUp() {
        this.setState( {
            isRequesting: true
        } );

        let query;
        if ( this.state.type === 'email' ) {
            query = {
                accountType: this.state.type,
                email: this.state.email,
                emailCode: this.state.code,
                loginPass: this.state.password
            }
        } else {
            query = {
                accountType: this.state.type,
                areaCode: '' + this.state.currentCountry.phoneCode,
                phoneNumber: this.state.phone,
                phoneCode: this.state.code,
                loginPass: this.state.password
            }
        }

        if ( this.props.isResetPassword ) {
            InteractionManager.runAfterInteractions( () => {
                this.props.onAuthForgotLoginPassword(
                    query,
                    ( error, resBody ) => {
                        this.setState( {
                            isRequesting: false
                        } );

                        if ( error ) {
                            Toast.show( error.message );
                        } else {
                            this.setState( {
                                code: '',
                            } );
                        }
                    } );
            } );
        } else {
            InteractionManager.runAfterInteractions( () => {
                this.props.onAuthSignUp(
                    query,
                    ( error, resBody ) => {
                        this.setState( {
                            isRequesting: false
                        } );

                        if ( error ) {
                            Toast.show( error.message );
                        } else {
                            this.setState( {
                                code: '',
                            } );
                        }
                    } );
            } );
        }
    }

    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <View style={[ commonStyles.paddingCommon ]}>

                        {
                            this.state.type === 'phone' ?
                                <Input
                                    style={[ commonStyles.wrapper ]}
                                    leftIcon={
                                        <Button
                                            title={this.state.currentCountry ? ( '+' + this.state.currentCountry.phoneCode ) : ''}
                                            type="outline"
                                            buttonStyle={[ { height: 30, paddingTop: 7, paddingBottom: 7 } ]}
                                            titleStyle={[ { fontSize: 14, } ]}
                                            onPress={() => {
                                                this.props.navigation.navigate( "CountrySelectPage", {
                                                    callback: ( country ) => {
                                                        this.setState( {
                                                            currentCountry: country
                                                        } );
                                                    }
                                                } );
                                            }
                                            }
                                        />
                                    }
                                    leftIconContainerStyle={[ commonStyles.pdr_normal, {
                                        paddingLeft: 0,
                                        marginLeft: 0
                                    } ]}
                                    value={this.state.phone}
                                    onChangeText={( text ) => this.setState( { phone: text } )}
                                    keyboardType={'phone-pad'}
                                    label={I18n.t( Keys.phone )}
                                    errorStyle={{ color: 'red' }}
                                    errorMessage={
                                        this.state.showError && ( !this.state.phone || this.state.phone.length <= 0 ) ?
                                            "Please Input phone"
                                            :
                                            null
                                    }
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => {
                                        this.verifyCodeInput.focus()
                                    }}
                                />
                                :
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
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => {
                                        this.verifyCodeInput.focus()
                                    }}
                                />
                        }

                        <Input
                            ref={( input ) => {
                                this.verifyCodeInput = input;
                            }}
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
                            returnKeyType={'next'}
                            onSubmitEditing={() => {
                                this.passwordInput.focus()
                            }}
                        />


                        <Input
                            ref={( input ) => {
                                this.passwordInput = input;
                            }}
                            label={I18n.t( Keys.password )}
                            value={this.state.password}
                            onChangeText={( text ) => this.setState( { password: text } )}
                            secureTextEntry={true}
                            errorStyle={{ color: 'red' }}
                            errorMessage={
                                this.state.showError && ( !this.state.password || this.state.password.length <= 0 ) ?
                                    I18n.t( Keys.please_input_password )
                                    :
                                    null
                            }
                            returnKeyType={'send'}
                            onSubmitEditing={() => {
                                this.signUp()
                            }}
                        />

                        <Button
                            title={this.props.isResetPassword ? I18n.t( Keys.send ) : I18n.t( Keys.sign_up )}
                            type="solid"
                            onPress={() => {
                                this.signUp()
                            }
                            }
                            containerStyle={[ commonStyles.mgt_normal ]}
                        />

                        <Button
                            title={
                                this.props.isResetPassword ?
                                    ( this.state.type === 'email' ? I18n.t( Keys.reset_by_phone ) : I18n.t( Keys.reset_by_email ) )
                                    :
                                    ( this.state.type === 'email' ? I18n.t( Keys.sign_up_by_phone ) : I18n.t( Keys.sign_up_by_email ) )}
                            type="outline"
                            onPress={() => {
                                if ( this.state.type === 'email' ) {
                                    this.setState( {
                                        type: 'phone'
                                    } )
                                } else {
                                    this.setState( {
                                        type: 'email'
                                    } )
                                }
                            }
                            }
                            containerStyle={[ commonStyles.mgt_normal ]}
                        />

                    </View>

                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default AuthRegisterPageView;

