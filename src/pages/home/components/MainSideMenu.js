import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import { DrawerActions } from 'react-navigation-drawer';
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Button } from "react-native-elements";


class MainSideMenu extends React.Component {

    constructor( props ) {
        super( props );
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps( nextProps ) {

    }


    renderLogin() {
        return (
            <View>
                <Button
                    title={"Login"}
                    type="outline"
                    onPress={() => {
                        this.props.navigation.dispatch( DrawerActions.closeDrawer() )
                        this.props.navigation.navigate( "AuthLoginPage" )
                    }
                    }
                />
            </View>
        );
    }

    renderUser() {
        return (
            <View>
                <Button
                    title={"User Info"}
                    type="outline"
                    onPress={() => {
                        this.props.navigation.dispatch( DrawerActions.closeDrawer() )
                        this.props.navigation.navigate( "MinePage" )
                    }
                    }
                />

                <View style={[{flexDirection:'row'}]}>
                    <Button
                        title={"Deposit"}
                        type="outline"
                        onPress={() => {
                            this.props.navigation.dispatch( DrawerActions.closeDrawer() )
                            this.props.navigation.navigate( "AssetsDepositPage" )
                        }
                        }
                    />

                    <Button
                        title={"Withdraw"}
                        type="outline"
                        onPress={() => {
                            this.props.navigation.dispatch( DrawerActions.closeDrawer() )
                            this.props.navigation.navigate( "AssetsWithdrawPage" )
                        }
                        }
                    />
                </View>

                <Button
                    title={"Account"}
                    type="outline"
                    onPress={() => {
                        this.props.navigation.dispatch( DrawerActions.closeDrawer() )
                        this.props.navigation.navigate( "AccountInfoPage" )
                    }
                    }
                />

                <Button
                    title={"About"}
                    type="outline"
                    onPress={() => {
                        this.props.navigation.dispatch( DrawerActions.closeDrawer() )
                        this.props.navigation.navigate( "AboutPage" )
                    }
                    }
                />

                <Button
                    title={"Settings"}
                    type="outline"
                    onPress={() => {
                        this.props.navigation.dispatch( DrawerActions.closeDrawer() )
                        this.props.navigation.navigate( "SettingsPage" )
                    }
                    }
                />

            </View>
        );
    }

    render() {
        return (
            <View style={[ { paddingTop: getStatusBarHeight() } ]}>
                {
                    this.props.isLoggedIn ?
                        this.renderUser()
                        :
                        this.renderLogin()
                }
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

function select( store ) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
    }
}


const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );
export default connect( select, mapDispatchToProps )( MainSideMenu )
