import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import commonStyles from "../styles/commonStyles";
import { Button, Input } from "react-native-elements";
import { InteractionManager, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";
import CountDown from 'react-native-countdown-component';
import constStyles from "../styles/constStyles";
import I18n from "../I18n";
import Keys from "../configs/Keys";

class PhoneVerificationComponent extends React.Component {
    static propTypes = {
        phoneRegion: PropTypes.string,
        phoneCode: PropTypes.string,
        phone: PropTypes.string,
        type: PropTypes.number,
        code: PropTypes.string,
        onCodeChange: PropTypes.func,
        onSubmit: PropTypes.func,
        showError: PropTypes.bool,
    };

    constructor( props ) {
        super( props );

        this.state = {
            isCountingDown: true,
            isRequesting: false,
        }
    }

    verificationCodeGet() {
        this.setState( {
            isRequesting: true
        } );

        InteractionManager.runAfterInteractions( () => {
            this.props.onCommonVerificationCodeGet(
                this.props.phoneRegion, this.props.phone, this.props.type,
                ( error, resBody ) => {
                    this.setState( {
                        isRequesting: false
                    } );

                    if ( error ) {
                        Toast.show( error.message );
                    } else {
                        this.setState( {
                            isCountingDown: true
                        } );

                        this.props.onCodeChange && this.props.onCodeChange( "" )
                    }
                } );
        } );
    }

    render() {
        return (
            <View style={[]}>
                <Input
                    style={[commonStyles.wrapper]}
                    leftIcon={
                        <Button
                            title={'+' + this.props.phoneCode}
                            type="outline"
                            buttonStyle={[{ height: 30, paddingTop: 7, paddingBottom: 7 }]}
                            titleStyle={[{ fontSize: 14, }]}
                        />
                    }
                    leftIconContainerStyle={[commonStyles.pdr_normal, { paddingLeft: 0, marginLeft: 0 }]}
                    value={this.props.phone}
                    keyboardType={'phone-pad'}
                    label={I18n.t( Keys.phone )}
                    disabled={true}
                />

                <Input
                    label={I18n.t( Keys.verify_code )}
                    style={[commonStyles.wrapper]}
                    maxLength={4}
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
                    value={this.props.code}
                    onChangeText={( text ) => this.props.onCodeChange && this.props.onCodeChange( text )}
                    keyboardType={'phone-pad'}
                    errorStyle={{ color: 'red' }}
                    errorMessage={
                        this.props.showError && ( !this.props.code || this.props.code.length <= 0 ) ?
                            I18n.t( Keys.please_input_verify_code )
                            :
                            null
                    }
                    returnKeyType={'send'}
                    onSubmitEditing={() => {
                        this.props.onSubmit && this.props.onSubmit();
                    }}
                />

                <Spinner visible={this.state.isRequesting} cancelable={true}/>
            </View>
        );
    }
}


function select( store ) {
    return {}
}

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onCommonVerificationCodeGet: ( phoneRegion, phone, type, callback ) => {
    },
} );
export default connect( select, mapDispatchToProps )( PhoneVerificationComponent )

