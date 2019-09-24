import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Text } from "react-native-elements";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

class AssetsDepositPageView extends React.Component {

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
            title: "TokenDepositPageView",
            headerBackTitle: null,
            headerRight: (
                <View style={[ { flexDirection: 'row' } ]}>
                    <BorderlessButton
                        onPress={() => navigation.navigate( 'AssetsDepositHistoryPage' )}
                        style={{ marginRight: 15 }}>
                        <Ionicons
                            name="md-time"
                            size={Platform.OS === 'ios' ? 22 : 25}
                            color={'white'}
                        />
                    </BorderlessButton>
                </View>
            )
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
                        {"TokenDepositPageView"}
                    </Text>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default AssetsDepositPageView;

