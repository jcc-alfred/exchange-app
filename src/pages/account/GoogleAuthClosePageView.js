import React from 'react';
import { Clipboard, InteractionManager, SafeAreaView, ScrollView, View, StyleSheet, StatusBar } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Input, ListItem } from "react-native-elements";
import QRCode from 'react-qr-code';
import Toast from "react-native-root-toast";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import CountDown from 'react-native-countdown-component';
import constStyles from "../../styles/constStyles";
import { NavigationActions, StackActions } from "react-navigation";

class GoogleAuthClosePageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            googleAuthKey: "EWJRYTWEYRWE",
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
            title: "Google Auth Open",
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


    // todo
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

    //todo
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
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <ScrollView style={[ commonStyles.wrapper ]}>
                        <View>
                            <ListItem
                                title={'验证码'}
                                subtitle={
                                    <View>
                                        <QRCode value="Hello, World!"/>
                                        <ListItem
                                            title={'EWJRYTWEYRWE'}
                                            rightTitle={
                                                <Button
                                                    title={"Copy"}
                                                    type="outline"
                                                    onPress={() => {
                                                        Clipboard.setString( this.state.googleAuthKey );
                                                        Toast.show( "Copy Success" );
                                                    }
                                                    }
                                                />
                                            }
                                        />
                                    </View>
                                }
                            />

                            <Input
                                value={this.state.googleAuthCode}
                                onChangeText={( text ) => this.setState( { password: text } )}
                                secureTextEntry={true}
                                label={"Google Auth Code"}
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
                                title={"Send"}
                                type="solid"
                                onPress={() => {
                                    this.send()
                                }
                                }
                                containerStyle={[ commonStyles.mgt_normal, commonStyles.mgl_normal, commonStyles.mgr_normal ]}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default GoogleAuthClosePageView;

