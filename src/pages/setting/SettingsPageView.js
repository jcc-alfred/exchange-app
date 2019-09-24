import React from 'react';
import { InteractionManager, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, ListItem } from "react-native-elements";
import commonStyles from "../../styles/commonStyles";
import { NavigationActions, StackActions } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import GoogleAuthPage from "./GoogleAuthPage";

class SettingsPageView extends React.Component {

    constructor( props ) {
        super( props );


        this.state = {
            isRequesting: false,
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.settings ),
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

    logout() {
        this.setState( {
            isRequesting: true
        } );

        InteractionManager.runAfterInteractions( () => {
            this.props.onAuthLogout(
                ( error, resBody ) => {
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
                } );
        } );
    }

    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <ScrollView>
                        <View style={[ commonStyles.pdt_normal, commonStyles.pdb_normal ]}>
                            {
                                this.props.isLoggedIn ?
                                    <ListItem
                                        title={"Password"}
                                        onPress={() => {
                                            this.props.navigation.navigate( "PasswordResetPage" )
                                        }}
                                        bottomDivider={true}
                                    />
                                    :
                                    null
                            }

                            {
                                this.props.isLoggedIn ?
                                    <ListItem
                                        title={"Fund Password"}
                                        onPress={() => {
                                            this.props.navigation.navigate( "FundPasswordResetPage" )
                                        }}
                                        bottomDivider={true}
                                    />
                                    :
                                    null
                            }

                            {
                                this.props.isLoggedIn ?
                                    <ListItem
                                        title={"Google Auth"}
                                        onPress={() => {
                                            this.props.navigation.navigate( "GoogleAuthPage" )
                                        }}
                                        bottomDivider={true}
                                    />
                                    :
                                    null
                            }

                            <ListItem
                                title={I18n.t( Keys.languages )}
                                onPress={() => {
                                    this.props.navigation.navigate( "SettingLanguagePage" )
                                }}
                                bottomDivider={true}
                            />

                            <ListItem
                                title={I18n.t( Keys.about )}
                                onPress={() => {
                                    this.props.navigation.navigate( "AboutPage" )
                                }}
                                bottomDivider={true}
                            />

                            {
                                this.props.isLoggedIn ?
                                    <Button
                                        title={I18n.t( Keys.logout )}
                                        type="outline"
                                        onPress={() => {
                                            this.logout();
                                        }
                                        }
                                        containerStyle={[ commonStyles.mgt_normal, commonStyles.mgl_normal, commonStyles.mgr_normal ]}
                                    />
                                    :
                                    null
                            }
                        </View>
                    </ScrollView>
                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create( {} );

export default SettingsPageView;

