import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, WebView } from "react-native";
import commonStyles from "../styles/commonStyles";

const styles = StyleSheet.create( {} );

class WebViewPageView extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            url: props.navigation.state.params.url,
        };

    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: state.params.webTitle,
            headerBackTitle: null,
        };
    };

    componentWillUnmount() {
    }

    componentDidMount() {
    }

    shouldComponentUpdate( nextProps, nextState ) {
        if (
            nextState.url !== this.state.url
        ) {
            return true;
        }

        return false;
    }

    render() {
        return (
            <View style={[ commonStyles.wrapper, commonStyles.commonBG ]}>
                <StatusBar backgroundColor="blue" barStyle="light-content"/>
                <SafeAreaView style={commonStyles.wrapper}>
                    <View style={[ commonStyles.wrapper, commonStyles.commonBG, commonStyles.commonBorderTop ]}>

                        <WebView
                            source={{ uri: this.state.url + "" }}
                        />
                    </View>
                </SafeAreaView></View>
        )
    }
}

export default WebViewPageView;
