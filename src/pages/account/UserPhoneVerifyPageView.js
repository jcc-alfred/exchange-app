import React from 'react';
import { InteractionManager, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Input } from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import constStyles from "../../styles/constStyles";
import CountryUtil from "../countrySelect/util/CountryUtil";
import Toast from "react-native-root-toast";
import { NavigationActions, StackActions } from "react-navigation";
import CountDown from 'react-native-countdown-component';
import Spinner from "react-native-loading-spinner-overlay";

class UserPhoneVerifyPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            currentCountry: CountryUtil.calcCountry( null ),
            phone: '',
            phoneCode: '',
            emailCode: '',
            isPhoneCountingDown: false,
            isEmailCountingDown: false,
            isRequesting: false,
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.phone ),
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

    //todo
    resetPassword() {
        this.props.navigation.dispatch(
            StackActions.reset(
                {
                    index: 1,
                    actions: [
                        NavigationActions.navigate( { routeName: 'mainPage' } ),
                        NavigationActions.navigate( { routeName: 'AccountInfoPage' } ),
                    ]
                }
            ) );
    }


    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <ScrollView style={[commonStyles.wrapper]}>
                        <View>
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
                        label={"Phone"}
                        errorStyle={{ color: 'red' }}
                        errorMessage={
                            this.state.showError && ( !this.state.phone || this.state.phone.length <= 0 ) ?
                                "Please Input phone"
                                :
                                null
                        }
                    />

                    <Input
                        label={I18n.t( Keys.phone_verify_code )}
                        style={[ commonStyles.wrapper ]}
                        maxLength={6}
                        rightIcon={
                            this.state.isPhoneCountingDown ?
                                <CountDown
                                    style={[ { height: 20 } ]}
                                    until={__DEV__ ? 10 : 60}
                                    size={12}
                                    onFinish={() => {
                                        this.setState( {
                                            isPhoneCountingDown: false
                                        } )
                                    }}
                                    digitStyle={{ backgroundColor: constStyles.THEME_COLOR }}
                                    digitTxtStyle={{ color: 'white' }}
                                    timeToShow={[ 'S' ]}
                                    timeLabels={{}}
                                    running={this.state.isPhoneCountingDown}
                                />
                                :
                                <Button
                                    title={I18n.t( Keys.resend )}
                                    type="outline"
                                    buttonStyle={[ { height: 30, paddingTop: 7, paddingBottom: 7 } ]}
                                    titleStyle={[ { fontSize: 14, } ]}
                                    onPress={() => {
                                        this.verificationCodeGet( "phone" )
                                    }
                                    }
                                />
                        }
                        leftIconContainerStyle={[ commonStyles.pdr_normal ]}
                        value={this.state.phoneCode}
                        onChangeText={( text ) => this.setState( {
                            phoneCode: text
                        } )}
                        keyboardType={'phone-pad'}
                        errorStyle={{ color: 'red' }}
                        errorMessage={
                            this.state.showError && ( !this.state.phoneCode || this.state.phoneCode.length <= 0 ) ?
                                I18n.t( Keys.please_input_phone_verify_code )
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
                        title={"Send"}
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

export default UserPhoneVerifyPageView;

