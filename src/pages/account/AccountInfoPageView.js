import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import Spinner from "react-native-loading-spinner-overlay";
import { ListItem } from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";

class AccountInfoPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            isRequesting: false,
            text: ''
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.account ),
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

    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="light-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <ListItem
                        title={I18n.t( Keys.email )}
                        onPress={() => {
                            this.props.navigation.navigate( "UserEmailVerifyPage" )
                        }}
                        bottomDivider={true}
                    />

                    <ListItem
                        title={I18n.t( Keys.phone )}
                        onPress={() => {
                            this.props.navigation.navigate( "UserPhoneVerifyPage" )
                        }}
                        bottomDivider={true}
                    />

                    <ListItem
                        title={I18n.t( Keys.password )}
                        onPress={() => {
                            this.props.navigation.navigate( "PasswordChangePage" )
                        }}
                        bottomDivider={true}
                    />

                    <ListItem
                        title={I18n.t( Keys.fund_password )}
                        onPress={() => {
                            this.props.navigation.navigate( "FundPasswordChangePage", {
                                isReset: false
                            } )
                        }}
                        bottomDivider={true}
                    />

                    <ListItem
                        title={this.props.userInfo.google_secret === 0 ? I18n.t( Keys.google_auth_open ) : I18n.t( Keys.google_auth_close )}
                        onPress={() => {
                            if ( this.props.userInfo.google_secret === 0 ) {
                                this.props.navigation.navigate( "GoogleAuthOpenPage" )
                            } else {
                                this.props.navigation.navigate( "GoogleAuthClosePage" )
                            }
                        }}
                        bottomDivider={true}
                    />

                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default AccountInfoPageView;

