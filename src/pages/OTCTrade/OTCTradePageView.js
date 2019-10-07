import React from 'react';
import { InteractionManager, SafeAreaView, StatusBar, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Text } from "react-native-elements";
import Spinner from "../mine/UserInfoVerifyPageView";

class OTCTradePageView extends React.Component {

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
            title: "OTCTradePageView",
            headerBackTitle: null,
        };
    };

    static loadData() {
        InteractionManager.runAfterInteractions( () => {
        } )
    }

    componentDidMount() {
        OTCTradePageView.loadData()
    }

    changeState( value, field ) {
        let param = {};
        param[ field ] = value;
        this.setState( param )
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
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <Text>otc</Text>
                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }


}


export default OTCTradePageView;

