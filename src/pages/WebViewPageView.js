import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import commonStyles from "../styles/commonStyles";
import { WebView } from 'react-native-webview';

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
        this.setState = ( state, callback ) => {
        };
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
            <View style={[commonStyles.wrapper, commonStyles.commonBG]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={commonStyles.wrapper}>
                    <View style={[commonStyles.wrapper, commonStyles.commonBG, commonStyles.commonBorderTop]}>

                        <WebView
                            source={{ uri: this.state.url + "" }}
                            useWebKit={true}
                        />
                    </View>
                </SafeAreaView></View>
        )
    }
}

export default WebViewPageView;
