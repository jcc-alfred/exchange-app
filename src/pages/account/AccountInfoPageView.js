import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import Spinner from "react-native-loading-spinner-overlay";
import { ListItem } from "react-native-elements";

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
            title: "账户中心",
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
                    {
                        this.props.isLoggedIn ?
                            <ListItem
                                title={"Password"}
                                onPress={() => {
                                    this.props.navigation.navigate( "PasswordChangePage" )
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
                                    this.props.navigation.navigate( "FundPasswordChangePage", {
                                        isReset: false
                                    } )
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
                                    this.props.navigation.navigate( "GoogleAuthOpenPage" )
                                }}
                                bottomDivider={true}
                            />
                            :
                            null
                    }

                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default AccountInfoPageView;

