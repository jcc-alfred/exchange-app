import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Image, ListItem, Text } from "react-native-elements";
import * as env from "../../env";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";

class MinePageView extends React.Component {

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
            title: I18n.t( Keys.me ),
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


    renderUserInfo() {
        return (
            <View style={[ { height: 100, justifyContent: 'center' } ]}>
                {
                    !this.props.isLoggedIn ?
                        <View style={[ commonStyles.wrapper, commonStyles.justAlignCenter ]}>
                            <Button
                                title={I18n.t( Keys.login )}
                                type="outline"
                                buttonStyle={[ { width: 100 } ]}
                                onPress={() => {
                                    this.props.navigation.navigate( "AuthLoginPage" )
                                }
                                }
                            />
                        </View>
                        :
                        <ListItem
                            containerStyle={[ { height: 100 } ]}
                            title={
                                <Text h4>
                                    {
                                        this.props.userInfo.account
                                    }
                                </Text>
                            }
                            rightIcon={
                                <TouchableHighlight onPress={() => {
                                    this.props.navigation.navigate( 'WebViewPage',
                                        {
                                            url: env.VIP_DES_URL,
                                            webTitle: "VIP"
                                        } )
                                }}>
                                    <View style={[ {
                                        backgroundColor: 'white', flexDirection: 'row', alignItems: 'center',
                                        justifyContent: 'center'
                                    } ]}>
                                        <Image
                                            source={require( '../../../assets/images/vip.png' )}
                                            style={[ { width: 20, height: 20 } ]}
                                        />

                                        <Text style={[ { marginLeft: 4 } ]} h4>
                                            {
                                                this.props.userInfo.vipLevel
                                            }
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            }
                            onPress={() => {
                                this.props.navigation.navigate( "UserInfoEditPage" )
                            }}
                        />}
            </View>
        );
    }

    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <ScrollView>
                        {
                            this.renderUserInfo()
                        }

                        <ListItem
                            title={I18n.t( Keys.settings )}
                            onPress={() => {
                                this.props.navigation.navigate( "SettingsPage" )
                            }}
                        />
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default MinePageView;
