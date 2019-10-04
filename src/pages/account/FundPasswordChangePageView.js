import React from 'react';
import { InteractionManager, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Input } from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import CountDown from "../auth/AuthRegisterPageView";
import constStyles from "../../styles/constStyles";
import { NavigationActions, StackActions } from "react-navigation";
import Toast from "react-native-root-toast";

class FundPasswordChangePageView extends React.Component {

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
            title: params.isReset ? "FundPassword reset" : "FundPassword Change",
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
                <StatusBar backgroundColor="blue" barStyle="light-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <ScrollView style={[ commonStyles.wrapper ]}>
                        <View>
                            {
                                this.props.isReset ?
                                    null
                                    :
                                    <Input
                                        label={"Old password"}
                                        value={this.state.oldPassword}
                                        onChangeText={( text ) => this.setState( { oldPassword: text } )}
                                        secureTextEntry={true}
                                        errorStyle={{ color: 'red' }}
                                        errorMessage={
                                            this.state.showError && ( !this.state.oldPassword || this.state.oldPassword.length <= 0 ) ?
                                                "Please input old password"
                                                :
                                                null
                                        }
                                    />
                            }

                            <Input
                                label={"Password"}
                                value={this.state.password}
                                onChangeText={( text ) => this.setState( { password: text } )}
                                secureTextEntry={true}
                                errorStyle={{ color: 'red' }}
                                errorMessage={
                                    this.state.showError && ( !this.state.password || this.state.password.length <= 0 ) ?
                                        "Please input password"
                                        :
                                        null
                                }
                            />
                            <Input
                                label={"Repeat Password"}
                                value={this.state.repeatPassword}
                                onChangeText={( text ) => this.setState( { repeatPassword: text } )}
                                secureTextEntry={true}
                                errorStyle={{ color: 'red' }}
                                errorMessage={
                                    this.state.showError && ( !this.state.repeatPassword || this.state.repeatPassword.length <= 0 ) ?
                                        "Please input password"
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
                                    this.resetPassword()
                                }
                                }
                                containerStyle={[ commonStyles.mgt_normal, commonStyles.mgl_normal, commonStyles.mgr_normal ]}
                            />


                            {
                                this.props.isReset ?
                                    null
                                    :
                                    <Button
                                        title={"Reset"}
                                        type="outline"
                                        onPress={() => {
                                            this.props.navigation.navigate( "FundPasswordChangePage", {
                                                isReset: true
                                            } )
                                        }
                                        }
                                        containerStyle={[ commonStyles.mgt_normal, commonStyles.mgl_normal, commonStyles.mgr_normal ]}
                                    />
                            }
                        </View>

                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default FundPasswordChangePageView;

