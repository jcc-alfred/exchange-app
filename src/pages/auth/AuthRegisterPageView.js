import React from 'react';
import { InteractionManager, SafeAreaView, StyleSheet, View, } from 'react-native';
import { Button, Input } from "react-native-elements";
import commonStyles from "../../styles/commonStyles";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import CountryUtil from "../countrySelect/util/CountryUtil";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";

class AuthRegisterPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            currentCountry: null,
            phone: '',
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


    verificationCodeGet() {
        if ( !this.state.phone || this.state.phone.length <= 0
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
            this.props.onCommonVerificationCodeGet(
                this.state.currentCountry.phoneRegion, this.state.phone,
                ( error, resBody ) => {
                    this.setState( {
                        isRequesting: false
                    } );

                    if ( error ) {
                        Toast.show( error.message );
                    } else {
                        this.props.navigation.navigate( "AuthRegisterNextPage", {
                            currentCountry: this.state.currentCountry,
                            phone: this.state.phone
                        } )
                    }
                } );
        } );
    }

    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>

                    <View style={[ commonStyles.paddingCommon ]}>
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
                            returnKeyType={'send'}
                            onSubmitEditing={() => {
                                this.verificationCodeGet();
                            }}
                        />

                        <Button
                            title={I18n.t( Keys.login )}
                            type="solid"
                            onPress={() => {
                                this.verificationCodeGet();
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


const styles = StyleSheet.create( {} );

export default AuthRegisterPageView;

