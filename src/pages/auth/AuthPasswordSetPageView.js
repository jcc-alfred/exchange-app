import React from 'react';
import { InteractionManager, SafeAreaView, StyleSheet, View, } from 'react-native';
import { Button, Input } from "react-native-elements";
import commonStyles from "../../styles/commonStyles";
import Toast from "react-native-root-toast";
import { NavigationActions, StackActions } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";

class AuthPasswordSetPageView extends React.Component {

    constructor( props ) {
        super( props );


        this.state = {
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
            title: I18n.t( Keys.set_password ),
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

    setPassword() {
        if ( !this.state.password || this.state.password.length <= 0
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
            this.props.onUserSetPassword(
                this.props.account.phoneRegion, this.props.account.phone, this.state.password,
                ( error, resBody ) => {
                    this.setState( {
                        isRequesting: false
                    } );

                    if ( error ) {
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
                        <Input
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
                                this.setPassword();
                            }}
                        />

                        <Button
                            title={I18n.t( Keys.save )}
                            type="outline"
                            onPress={() => {
                                this.setPassword();
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

export default AuthPasswordSetPageView;

