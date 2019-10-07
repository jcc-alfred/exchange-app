import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Text } from "react-native-elements";
import commonStyles from "../../styles/commonStyles";
import Spinner from "react-native-loading-spinner-overlay";
import ColorUtil from "../../util/ColorUtil";

class NewsDetailPageView extends React.Component {

    constructor( props ) {
        super( props );
        this.news = this.props.navigation.getParam( 'news' );
        this.state = {}
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;
        const coinEx = navigation.getParam( 'coin_exchange' );


        return {
            title: 'News Detail',
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
        const { navigation } = this.props;
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[ commonStyles.wrapper ]}>
                    <ScrollView style={[ commonStyles.wrapper ]}>
                        <View>
                            <Text style={{ padding: 16 }}>{this.news.news_title}</Text>
                            <Text style={{ paddingStart: 16, color: ColorUtil.secondary_text_color }}>Update
                                Time: {this.news.update_time}</Text>
                            <Text style={{ padding: 16 }}>{this.news.news_content}</Text>

                            {/*<Text>kline page {JSON.stringify(navigation.getParam('coin_exchange'))}</Text>*/}
                            {/*<Text>*/}
                            {/*{JSON.stringify(this.state.buyList)}*/}
                            {/*</Text>*/}
                            {/*<Spinner visible={this.state.isRequesting} cancelable={true}/>*/}
                        </View>
                    </ScrollView>
                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create( {} );

export default NewsDetailPageView;

