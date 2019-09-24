import React from 'react';
import { InteractionManager, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import Toast from "react-native-root-toast";
import AuthLoginView from "../auth/components/AuthLoginView";
import Spinner from "react-native-loading-spinner-overlay";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import AssetsView from "../assets/components/AssetsView";

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
            headerRight: (
                <View style={[ { flexDirection: 'row' } ]}>
                    <BorderlessButton
                        onPress={() => navigation.navigate( 'SettingsPage' )}
                        style={{ marginRight: 15 }}>
                        <Ionicons
                            name="md-settings"
                            size={Platform.OS === 'ios' ? 22 : 25}
                            color={'white'}
                        />
                    </BorderlessButton>
                </View>
            )
        };
    };

    componentDidMount() {
        this.loadData()
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

    loadData() {
        if ( !this.props.isLoggedIn ) {
            return;
        }

        this.setState( {
            isRequesting: true
        } );

        InteractionManager.runAfterInteractions( () => {
            this.props.onAssetsGetUserAssets( ( error, resBody ) => {
                if ( error ) {
                    this.setState( {
                        isRequesting: false
                    } );

                    Toast.show( error.message );
                } else {
                    this.setState( {
                        isRequesting: false,
                        result: JSON.stringify( resBody )
                    } );
                }
            } );
        } );
    }

    renderLogin() {
        return (
            <View style={[ commonStyles.wrapper ]}>
                <AuthLoginView navigation={this.props.navigation}/>
            </View>
        );
    }

    renderUser() {
        return (
            <View style={[ commonStyles.wrapper ]}>
                <AssetsView  navigation={this.props.navigation}/>
            </View>
        );
    }

    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    {
                        this.props.isLoggedIn ?
                            this.renderUser()
                            :
                            this.renderLogin()
                    }
                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default MinePageView;

