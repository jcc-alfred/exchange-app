import React from 'react';
import { InteractionManager, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Input } from "react-native-elements";
import Toast from "react-native-root-toast";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import CountDown from 'react-native-countdown-component';
import constStyles from "../../styles/constStyles";
import { NavigationActions, StackActions } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";

class GoogleAuthOpenPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            googleAuthCode: "",
            code: '',
            isCountingDown: false,
            isRequesting: false,
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.google_auth_close ),
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

    send() {
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
            <View style={[commonStyles.wrapper,]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[commonStyles.wrapper,]}>
                    <ScrollView style={[commonStyles.wrapper]}>
                        <View>
                            <Input
                                value={this.state.googleAuthCode}
                                onChangeText={( text ) => this.setState( { password: text } )}
                                secureTextEntry={true}
                                label={I18n.t( Keys.google_auth_code )}
                                errorStyle={{ color: 'red' }}
                                errorMessage={
                                    this.state.showError && ( !this.state.googleAuthCode || this.state.googleAuthCode.length <= 0 ) ?
                                        "Please input google auth code"
                                        :
                                        null
                                }
                            />

                            <Input
                                label={I18n.t( Keys.verify_code )}
                                style={[commonStyles.wrapper]}
                                maxLength={6}
                                rightIcon={
                                    this.state.isCountingDown ?
                                        <CountDown
                                            style={[{ height: 20 }]}
                                            until={__DEV__ ? 10 : 60}
                                            size={12}
                                            onFinish={() => {
                                                this.setState( {
                                                    isCountingDown: false
                                                } )
                                            }}
                                            digitStyle={{ backgroundColor: constStyles.THEME_COLOR }}
                                            digitTxtStyle={{ color: 'white' }}
                                            timeToShow={['S']}
                                            timeLabels={{}}
                                            running={this.state.isCountingDown}
                                        />
                                        :
                                        <Button
                                            title={I18n.t( Keys.resend )}
                                            type="outline"
                                            buttonStyle={[{ height: 30, paddingTop: 7, paddingBottom: 7 }]}
                                            titleStyle={[{ fontSize: 14, }]}
                                            onPress={() => {
                                                this.verificationCodeGet()
                                            }
                                            }
                                        />
                                }
                                leftIconContainerStyle={[commonStyles.pdr_normal]}
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
                                title={I18n.t( Keys.send )}
                                type="solid"
                                onPress={() => {
                                    this.send()
                                }
                                }
                                containerStyle={[commonStyles.mgt_normal, commonStyles.mgl_normal, commonStyles.mgr_normal]}
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

export default GoogleAuthOpenPageView;

