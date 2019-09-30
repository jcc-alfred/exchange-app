import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import { DrawerActions } from 'react-navigation-drawer';
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Button, ListItem } from "react-native-elements";
import { Header } from 'react-navigation';
import constStyles from "../../../styles/constStyles";
import { Ionicons } from "@expo/vector-icons";
import commonStyles from "../../../styles/commonStyles";
import OrderHistoryPage from "../../order/OrderHistoryPage";

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

    render() {
        return (
            <View style={[ { paddingTop: getStatusBarHeight() + Header.HEIGHT } ]}>
                {
                    this.props.isLoggedIn ?
                        <ListItem
                            title={"Name"}
                            subtitle={"aaa"}
                            onPress={() => {
                                this.props.navigation.dispatch( DrawerActions.closeDrawer() )
                                this.props.navigation.navigate( "MinePage" )
                            }}
                            topDivider={false}
                            bottomDivider={false}
                            chevron={{ color: constStyles.tipTitleColor }}
                        />
                        :
                        <Button
                            title={"Login"}
                            type="outline"
                            onPress={() => {
                                this.props.navigation.dispatch( DrawerActions.closeDrawer() )
                                this.props.navigation.navigate( "AuthLoginPage" )
                            }
                            }
                        />
                }

                <View style={[ { flexDirection: 'row' }, commonStyles.paddingCommon ]}>
                    <Button
                        icon={
                            <Ionicons
                                name="md-wallet"
                                size={Platform.OS === 'ios' ? 22 : 25}
                                color={'white'}
                            />
                        }
                        title="Deposit"
                        onPress={() => {
                            this.props.navigation.dispatch( DrawerActions.closeDrawer() );
                            if ( this.props.isLoggedIn ) {
                                this.props.navigation.navigate( "AssetsDepositPage" )
                            } else {
                                this.props.navigation.navigate( "AuthLoginPage" )
                            }
                        }
                        }
                    />

                    <View style={[ commonStyles.wrapper ]}/>

                    <Button
                        icon={
                            <Ionicons
                                name="md-card"
                                size={Platform.OS === 'ios' ? 22 : 25}
                                color={'white'}
                            />
                        }
                        title="Withdraw"
                        onPress={() => {
                            this.props.navigation.dispatch( DrawerActions.closeDrawer() )
                            if ( this.props.isLoggedIn ) {
                                this.props.navigation.navigate( "AssetsWithdrawPage" )
                            } else {
                                this.props.navigation.navigate( "AuthLoginPage" )
                            }
                        }
                        }
                    />

                </View>


                <ListItem
                    title={"Order"}
                    onPress={() => {
                        this.props.navigation.dispatch( DrawerActions.closeDrawer() )
                        if ( this.props.isLoggedIn ) {
                            this.props.navigation.navigate( "OrderHistoryPage" )
                        } else {
                            this.props.navigation.navigate( "AuthLoginPage" )
                        }
                    }}
                    topDivider={true}
                    bottomDivider={false}
                />

                <ListItem
                    title={"Account"}
                    onPress={() => {
                        this.props.navigation.dispatch( DrawerActions.closeDrawer() )
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
                    title={"About"}
                    onPress={() => {
                        this.props.navigation.dispatch( DrawerActions.closeDrawer() )
                        this.props.navigation.navigate( "AboutPage" )
                    }}
                    topDivider={true}
                    bottomDivider={false}
                />


                <ListItem
                    title={"Settings"}
                    onPress={() => {
                        this.props.navigation.dispatch( DrawerActions.closeDrawer() )
                        this.props.navigation.navigate( "SettingsPage" )
                    }}
                    topDivider={true}
                    bottomDivider={true}
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
    }
}


const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );
export default connect( select, mapDispatchToProps )( MainSideMenu )
