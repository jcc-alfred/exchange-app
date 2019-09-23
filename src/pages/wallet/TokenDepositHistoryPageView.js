import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Text } from "react-native-elements";

class TokenDepositHistoryPageView extends React.Component {

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
            title: "TokenDepositHistoryPageView",
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
                    <Text>
                        {"TokenDepositHistoryPageView"}
                    </Text>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default TokenDepositHistoryPageView;

