import React from 'react';
import { InteractionManager, PixelRatio, SafeAreaView, StyleSheet, View, } from 'react-native';
import { Button, Input,Image } from "react-native-elements";
import commonStyles from "../../styles/commonStyles";
import Toast from "react-native-root-toast";
import { NavigationActions, StackActions } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import CountryUtil from "../countrySelect/util/CountryUtil";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";

class AuthLoginPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            currentCountry: null,
            phone: '',
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
            title: I18n.t( Keys.login ),
            headerBackTitle: null,
        };
    };

    componentDidMount() {
        this.setState( {
            currentCountry: CountryUtil.calcCountry( null ),
        } );
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
        if ( !this.state.phone || this.state.phone.length <= 0 ||
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
            this.props.onAuthLoginPhonePassword(
                this.state.currentCountry.phoneRegion, this.state.phone, this.state.password,
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
            <View style={[ commonStyles.wrapper, ]}>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>

                    <View style={[ commonStyles.paddingCommon ]}>

                        <Image
                            style={{width: 200, height: 200, margin:20}}
                            // source={require('@expo/snack-static/react-native-logo.png')}
                        />

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
                            leftIconContainerStyle={[ commonStyles.pdr_normal, { paddingLeft: 0, marginLeft: 0 } ]}
                            value={this.state.phone}
                            onChangeText={( text ) => this.setState( { phone: text } )}
                            keyboardType={'phone-pad'}
                            label={I18n.t( Keys.phone )}
                            errorStyle={{ color: 'red' }}
                            errorMessage={
                                this.state.showError && ( !this.state.phone || this.state.phone.length <= 0 ) ?
                                    I18n.t( Keys.please_input_phone )
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
                            containerStyle={[ commonStyles.mgt_normal ]}
                        />

                        <Button
                            title={I18n.t( Keys.login_by_phone_verify )}
                            type="outline"
                            onPress={() => {
                                this.props.navigation.navigate( "AuthRegisterPage" )
                            }
                            }
                            containerStyle={[ commonStyles.mgt_normal ]}
                        />

                        {
                            __DEV__ ?
                                <Button
                                    title={I18n.t( Keys.login_history )}
                                    type="outline"
                                    onPress={() => {
                                        this.props.navigation.navigate( "AuthLoginHistoryPage", {
                                            callback: ( account ) => {
                                                this.setState( {
                                                    currentCountry: CountryUtil.calcCountry( account.phoneRegion ),
                                                    phone: account.phone,
                                                    password: account.password,
                                                } )
                                            }
                                        } )
                                    }
                                    }
                                    containerStyle={[ commonStyles.mgt_normal ]}
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


const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        fontSize: 12,
        textAlign: 'center',
        color: '#888',
        marginBottom: 5
    },
    data: {
        padding: 15,
        marginTop: 10,
        backgroundColor: '#ddd',
        borderColor: '#888',
        borderWidth: 1 / PixelRatio.get(),
        color: '#777'
    }
} );

export default AuthLoginPageView;

