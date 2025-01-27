import React from 'react';
import { InteractionManager, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { Button, Input } from "react-native-elements";
import * as env from "../../env";
import { NavigationActions, StackActions } from "react-navigation";

class AuthLoginPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            account: '',
            password: '',
            isRequesting: false,
            showError: false
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.Login ),
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

    login() {
        if ( !this.state.account || this.state.account.length <= 0 ||
            !this.state.password || this.state.password.length <= 0
        ) {
            this.setState( {
                showError: true
            } );
            return;
        }

        this.setState( {
            isRequesting: true
        } );

        InteractionManager.runAfterInteractions( () => {
            this.props.onAuthLogin(
                this.state.account, this.state.password, env.adminImageCode,
                ( error, resBody ) => {
                    if ( error ) {
                        this.setState( {
                            isRequesting: false
                        } );

                        Toast.show( error.message );
                    } else {
                        this.props.navigation.dispatch(
                            StackActions.reset(
                                {
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate( { routeName: 'mainPage' } ),
                                    ]
                                }
                            )
                        );
                    }
                } );
        } );
    }


    render() {
        return (
            <View style={[commonStyles.wrapper,]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[commonStyles.wrapper,]}>

                    <View style={[commonStyles.paddingCommon]}>


                        <Input
                            style={[commonStyles.wrapper]}
                            leftIconContainerStyle={[commonStyles.pdr_normal, { paddingLeft: 0, marginLeft: 0 }]}
                            value={this.state.account}
                            onChangeText={( text ) => this.setState( { account: text } )}
                            label={I18n.t( Keys.account )}
                            errorStyle={{ color: 'red' }}
                            errorMessage={
                                this.state.showError && ( !this.state.account || this.state.account.length <= 0 ) ?
                                    I18n.t( Keys.please_input_account_number )
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
                            value={this.state.password}
                            onChangeText={( text ) => this.setState( { password: text } )}
                            secureTextEntry={true}
                            label={I18n.t( Keys.password )}
                            errorStyle={{ color: 'red' }}
                            errorMessage={
                                this.state.showError && ( !this.state.password || this.state.password.length <= 0 ) ?
                                    I18n.t( Keys.please_input_password )
                                    :
                                    null
                            }
                            returnKeyType={'send'}
                            onSubmitEditing={() => {
                                this.login();
                            }}
                        />

                        <Button
                            title={I18n.t( Keys.login )}
                            type="solid"
                            onPress={() => {
                                this.login();
                            }
                            }
                            containerStyle={[commonStyles.mgt_normal]}
                        />

                        <View style={[{ flexDirection: 'row' }, commonStyles.mgt_normal]}>
                            <Button
                                title={I18n.t( Keys.forgot_password )}
                                type="outline"
                                onPress={() => {
                                    this.props.navigation.navigate( "AuthRegisterPage", {
                                        isResetPassword: true
                                    } )
                                }
                                }
                            />
                            <View style={[commonStyles.wrapper]}/>

                            <Button
                                title={I18n.t( Keys.sign_up_1 )}
                                type="outline"
                                onPress={() => {
                                    this.props.navigation.navigate( "AuthRegisterPage", {
                                        isResetPassword: false
                                    } )
                                }
                                }
                            />
                        </View>
                        {
                            __DEV__ ?
                                <Button
                                    title={I18n.t( Keys.login_history )}
                                    type="outline"
                                    onPress={() => {
                                        this.props.navigation.navigate( "AuthLoginHistoryPage", {
                                            callback: ( account ) => {
                                                this.setState( {
                                                    account: account.account,
                                                    password: account.password,
                                                } )
                                            }
                                        } )
                                    }
                                    }
                                    containerStyle={[commonStyles.mgt_normal]}
                                />
                                :
                                null
                        }
                    </View>

                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default AuthLoginPageView;

