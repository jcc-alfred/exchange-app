import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import { DrawerActions } from 'react-navigation-drawer';
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Button, ListItem } from "react-native-elements";
import { Header } from 'react-navigation';
import constStyles from "../../../styles/constStyles";
import OrderHistoryPage from "../../order/OrderHistoryPage";
import I18n from "../../../I18n";
import Keys from "../../../configs/Keys";

class MainSideMenu extends React.Component {

    constructor( props ) {
        super( props );
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        this.setState = ( state, callback ) => {
        };
    }

    componentWillReceiveProps( nextProps ) {

    }

    render() {
        return (
            <View style={[ { paddingTop: getStatusBarHeight() + Header.HEIGHT } ]}>
                {
                    this.props.isLoggedIn ?
                        <ListItem
                            title={this.props.userInfo.full_name}
                            subtitle={this.props.userInfo.email}
                            onPress={() => {
                                this.props.navigation.dispatch( DrawerActions.closeDrawer() );

                                if ( this.props.userInfo.identity_status === 0 ) {
                                    this.props.navigation.navigate( "BasicUserInfoVerifyPage" )
                                } else {
                                    this.props.navigation.navigate( "MinePage" )
                                }
                            }}
                            topDivider={false}
                            bottomDivider={false}
                            chevron={{ color: constStyles.tipTitleColor }}
                        />
                        :
                        <Button
                            title={I18n.t( Keys.login )}
                            type="outline"
                            onPress={() => {
                                this.props.navigation.dispatch( DrawerActions.closeDrawer() );
                                this.props.navigation.navigate( "AuthLoginPage" )
                            }
                            }
                        />
                }

                <ListItem
                    title={I18n.t( Keys.order )}
                    onPress={() => {
                        this.props.navigation.dispatch( DrawerActions.closeDrawer() );
                        if ( this.props.isLoggedIn ) {
                            this.props.navigation.navigate( "OrderHistoryPage" )
                        } else {
                            this.props.navigation.navigate( "AuthLoginPage" )
                        }
                    }}
                    topDivider={false}
                    bottomDivider={false}
                />

                <ListItem
                    title={I18n.t( Keys.account )}
                    onPress={() => {
                        this.props.navigation.dispatch( DrawerActions.closeDrawer() );
                        if ( this.props.isLoggedIn ) {
                            this.props.navigation.navigate( "AccountInfoPage" )
                        } else {
                            this.props.navigation.navigate( "AuthLoginPage" )
                        }
                    }}
                    topDivider={true}
                    bottomDivider={false}
                />


                <ListItem
                    title={I18n.t( Keys.about )}
                    onPress={() => {
                        this.props.navigation.dispatch( DrawerActions.closeDrawer() );
                        this.props.navigation.navigate( "AboutPage" )
                    }}
                    topDivider={true}
                    bottomDivider={false}
                />


                <ListItem
                    title={I18n.t( Keys.settings )}
                    onPress={() => {
                        this.props.navigation.dispatch( DrawerActions.closeDrawer() );
                        this.props.navigation.navigate( "SettingsPage" )
                    }}
                    topDivider={true}
                    bottomDivider={false}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

function select( store ) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
        userIdentity: store.userStore.userIdentity,
    }
}


const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );
export default connect( select, mapDispatchToProps )( MainSideMenu )
