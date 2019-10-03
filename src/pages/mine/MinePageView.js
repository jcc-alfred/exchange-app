import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import Spinner from "react-native-loading-spinner-overlay";
import BasicUserInfoVerifyResultView from "./components/BasicUserInfoVerifyResultView";
import UserInfoVerifyView from "./components/UserInfoVerifyView";

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
            title: "个人中心",
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

                    <BasicUserInfoVerifyResultView/>
                    {
                        this.props.userInfo.identity_status !== 0 ?
                            <UserInfoVerifyView navigation={this.props.navigation}/>
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

export default MinePageView;

