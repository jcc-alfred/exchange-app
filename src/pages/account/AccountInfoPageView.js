import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
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
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
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

                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default AccountInfoPageView;

