import React from 'react';
import {InteractionManager, SafeAreaView, StyleSheet, View} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import Spinner from "react-native-loading-spinner-overlay";
import { Button } from "react-native-elements";
import { NavigationActions, StackActions } from "react-navigation";
import MediaSingleComponent from "../../components/MediaSingleComponent";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import Toast from "react-native-root-toast";

class UserInfoVerifyPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            icFont: null,
            icBack: null,
            icHandle: null,
            isRequesting: false,
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: "高级认证",
            headerBackTitle: null,
        };
    };

    componentDidMount() {
        this.getPermissionAsync();
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

    getPermissionAsync = async () => {
        if ( Constants.platform.ios ) {
            const { status } = await Permissions.askAsync( Permissions.CAMERA_ROLL, Permissions.CAMERA );
            if ( status !== 'granted' ) {
                alert( I18n.t( Keys.camera_roll_permission_error ) );
            }
        }
    };


    // todo
    send() {
        let query;

        query = {
            frontImage: this.state.icFont.url,
            handImage: this.state.icHandle.url,
            backImage: this.state.icBack.url
        }


        InteractionManager.runAfterInteractions(() => {
            this.props.onSafeAddUserSeniorKYC(query, (error, resBody) => {
                if (error) {
                    this.setState({
                        isRequesting: false
                    });

                    Toast.show(error.message);
                } else {
                    this.props.navigation.dispatch(
                        StackActions.reset(
                            {
                                index: 1,
                                actions: [
                                    NavigationActions.navigate( { routeName: 'mainPage' } ),
                                    NavigationActions.navigate( { routeName: 'MinePage' } ),
                                ]
                            }
                        ) );

                    this.setState({
                        isRequesting: false,
                    });
                }
            });


        });

    }

    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="light-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>

                    <MediaSingleComponent
                        editOptions={{}}
                        item={this.state.icFont}
                        title={"证件正面照"}
                        mediaType={'Photo'}
                        isSupportEdit={true}
                        onItemChange={( item ) => {
                            this.setState( {
                                icFont: item
                            } )
                        }}
                    />

                    <MediaSingleComponent
                        editOptions={{}}
                        item={this.state.icBack}
                        title={"证件反面照"}
                        mediaType={'Photo'}
                        isSupportEdit={true}
                        onItemChange={( item ) => {
                            this.setState( {
                                icBack: item
                            } )
                        }}
                    />

                    <MediaSingleComponent
                        editOptions={{}}
                        item={this.state.icHandle}
                        title={"手持证件照"}
                        mediaType={'Photo'}
                        isSupportEdit={true}
                        onItemChange={( item ) => {
                            this.setState( {
                                icHandle: item
                            } )
                        }}
                    />

                    <Button
                        title={"Send"}
                        type="outline"
                        style={{marginStart: 16, marginEnd: 16}}
                        onPress={() => {
                            this.send()
                        }
                        }
                        containerStyle={[ commonStyles.mgt_normal ]}
                    />


                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default UserInfoVerifyPageView;

