import React from 'react';
import { InteractionManager, SafeAreaView, StatusBar, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Text,Button, Input, } from "react-native-elements";
import Spinner from "../mine/UserInfoVerifyPageView";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";



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
                    {/*<Text>otc1</Text>*/}
                    {this.renderTopMenuBar()}

                    {/*<Spinner visible={this.state.isRequesting} cancelable={true}/>*/}
                </SafeAreaView>
            </View>
        );
    }






    renderTopMenuBar() {
        return (
            <View style={{flexDirection:'row' ,}}>
                {/*<Button*/}

                <Button
                    title={I18n.t( Keys.resend )}
                    type="outline"
                    containerStyle={[{ flex:1, margin:5}]}
                    titleStyle={[ { fontSize: 14, } ]}
                    onPress={() => {

                    }
                    }
                />

                <Button
                    title={I18n.t( Keys.resend )}
                    type="outline"
                    containerStyle={[{ flex:1, margin:5}]}
                    titleStyle={[ { fontSize: 14, } ]}
                    onPress={() => {

                    }
                    }
                />

                <Button
                    title={I18n.t( Keys.resend )}
                    type="outline"
                    containerStyle={[{ flex:1, margin:5}]}
                    titleStyle={[ { fontSize: 14, } ]}
                    onPress={() => {

                    }
                    }
                />

                <Button
                    title={I18n.t( Keys.resend )}
                    type="outline"
                    containerStyle={[{ flex:1, margin:5}]}
                    titleStyle={[ { fontSize: 14, } ]}
                    onPress={() => {

                    }
                    }
                />


            </View>
        )
    }





}


export default OTCTradePageView;

