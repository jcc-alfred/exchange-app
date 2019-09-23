import React from 'react';
import { InteractionManager, PixelRatio, SafeAreaView, StyleSheet, View, } from 'react-native';
import { Button } from "react-native-elements";
import commonStyles from "../../styles/commonStyles";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import PhoneVerificationComponent from "../../components/PhoneVerificationComponent";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";

class AuthRegisterNextPageView extends React.Component {

    constructor( props ) {
        super( props );

        let navState = this.props.navigation.state;

        this.state = {
            currentCountry: navState.params ? navState.params.currentCountry : null,
            phone: navState.params ? navState.params.phone : null,
            code: '',
            isCountingDown: true,
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


    loginPhoneVerify() {
        if ( !this.state.code || this.state.code.length <= 0
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
            this.props.onAuthLoginPhoneVerify(
                this.state.currentCountry.phoneRegion, this.state.phone, this.state.code,
                ( error, resBody ) => {
                    this.setState( {
                        isRequesting: false
                    } );

                    if ( error ) {
                        Toast.show( error.message );
                    } else {
                        this.props.navigation.navigate( "AuthPasswordSetPage", {
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
                        <PhoneVerificationComponent
                            phoneRegion={this.state.currentCountry ? ( this.state.currentCountry.phoneRegion ) : ''}
                            phoneCode={this.state.currentCountry ? ( this.state.currentCountry.phoneCode ) : ''}
                            phone={this.state.phone}
                            type={2}
                            code={this.state.code}
                            onCodeChange={( code ) => {
                                this.setState( {
                                    code: code
                                } )
                            }}
                            onSubmit={() => {
                                this.loginPhoneVerify();
                            }
                            }
                            showError={this.state.showError}
                        />

                        <Button
                            title={I18n.t( Keys.login )}
                            type="solid"
                            onPress={() => {
                                this.loginPhoneVerify();
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

export default AuthRegisterNextPageView;

