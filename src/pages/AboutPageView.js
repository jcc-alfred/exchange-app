import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from "react-native-elements";
import commonStyles from "../styles/commonStyles";
import Constants from 'expo-constants';
import I18n from "../I18n";
import Keys from "../configs/Keys";

class AboutPageView extends React.Component {

    constructor( props ) {
        super( props );


        this.state = {
            isRequesting: false,
            number: 1
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.about ),
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
                <SafeAreaView style={[ commonStyles.wrapper, commonStyles.justAlignCenter ]}>
                    <Text h4>
                        {Constants.nativeAppVersion}
                    </Text>


                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create( {} );

export default AboutPageView;

