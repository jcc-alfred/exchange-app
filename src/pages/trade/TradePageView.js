import React from 'react';
import {PixelRatio, SafeAreaView, StyleSheet, View} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import {Button, Text, Icon} from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";

class TradePageView extends React.Component {

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
            title: "TradePageView",
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
                    {this.renderTopBar()}
                    {this.renderPriceBar()}
                </SafeAreaView>
            </View>
        );
    }


    renderTopBar (){
        return(
            <View style={[{flexDirection:'row'}]}>

                <Button
                    icon={{
                        name: "arrow-right",
                        size: 15,
                        color: "blue"
                    }}
                    type= 'clear'

                />
                <Text style={[ commonStyles.commonInputTextStyle ]}>
                    {"EOS/USDT"}
                </Text>
                <Text style={[styles.smallRedFont]}>
                    -3.20%
                </Text>

                <Button
                    icon={{
                        name: "arrow-right",
                        size: 15,
                        color: "blue"
                    }}
                    type="clear"
                />
                <Button
                    icon={{
                        name: "arrow-right",
                        size: 15,
                        color: "blue"
                    }}

                    type="clear"

                />

                <Button
                    icon={{
                        name: "arrow-right",
                        size: 15,
                        color: "blue"
                    }}
                    type="clear"
                />
            </View>


        )

    }


    renderPriceBar (){

        return (

            <View style={[commonStyles.customerRow]}>
                <View style={[commonStyles.customerRow]}>
                    <Text style={[styles.bigFontPrice]}>2.32</Text>
                    <Text style={[styles.smallGrayFont]}>=3.12 CNY</Text>
                </View>
                <View style={[commonStyles.customerRow]}>

                </View>
            </View>


        )

    }





}








const styles = StyleSheet.create( {

    smallRedFont: {
        color: '#e7234c',
        fontSize: 12,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 8
    },

    smallGrayFont: {

        color: '#aaa',
        paddingLeft: 5,
        paddingRight: 10,
        paddingTop: 12,
        paddingBottom: 8,
        fontSize: 12,


    },

    bigFontPrice: {
        color: '#009d7a',
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 5,
        paddingTop: 6,
        paddingBottom: 6
    },


    smallIconButton:{

        // backgroundColor: '#ddd',
    },



    data: {
        padding: 15,
        marginTop: 10,
        backgroundColor: '#ddd',
        borderColor: '#888',
        borderWidth: 1 / PixelRatio.get(),
        color: '#777'
    }
} );

export default TradePageView;

