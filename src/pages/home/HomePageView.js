import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Text } from "react-native-elements";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from 'react-navigation-drawer';

class HomePageView extends React.Component {

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
            title: "Home",
            headerBackTitle: null,
            headerLeft: (
                <BorderlessButton
                    onPress={() => {
                        navigation.dispatch( DrawerActions.openDrawer() );
                    }}
                    style={{ marginLeft: 15 }}>
                    <Ionicons
                        name="md-menu"
                        size={Platform.OS === 'ios' ? 22 : 25}
                        color={'white'}
                    />
                </BorderlessButton>
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
                        {"HomePageView"}
                    </Text>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default HomePageView;

