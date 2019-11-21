import React from 'react';
import { InteractionManager, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import ColorUtil from "../../util/ColorUtil";
import { Image } from "react-native-elements";
import Toast from "react-native-root-toast";

class OTCOrderDetailPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            entrust: props.navigation.state.params.entrust,
            remark: '',
            secret_remark: ''
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.order_detail ),
            headerBackTitle: null,
        };
    };

    componentDidMount() {
        this.requestOrderDetail();
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


    requestOrderDetail() {
        InteractionManager.runAfterInteractions(
            () => {
                this.props.onOtcOrder( this.state.entrust.id,
                    ( error, resBody ) => {
                        if ( error ) {
                            this.setState( {
                                isRequesting: false
                            } );

                            Toast.show( error.message );
                        } else {

                            this.setState( {

                                remark: resBody.data.entrust.remark,
                                secret_remark: resBody.data.entrust.secret_remark
                            } );

                        }
                    }
                )
            }
        )
    }


    onSelectPayMethod( item ) {

        if ( item === "1" ) {
            return ( <Image source={require( '../../../assets/images/payment_wechat.png' )}
                            containerStyle={[{ width: 20, height: 20, marginLeft: 5 }]}/> )
        } else if ( item === "2" ) {
            return ( <Image source={require( '../../../assets/images/payment_ali.png' )}
                            containerStyle={[{ width: 20, height: 20, marginLeft: 5 }]}/> )
        } else if ( item === "3" ) {
            return ( <Image source={require( '../../../assets/images/payment_bank.png' )}
                            containerStyle={[{ width: 20, height: 20, marginLeft: 5 }]}/> )
        } else if ( item === "4" ) {
            return ( <Image source={require( '../../../assets/images/payment_gtdollar.png' )}
                            containerStyle={[{ width: 20, height: 20, marginLeft: 5 }]}/> )
        } else if ( item === "5" ) {
            return ( <Image source={require( '../../../assets/images/payment_paypal.png' )}
                            containerStyle={[{ width: 20, height: 20, marginLeft: 5 }]}/> )
        }
    }


    render() {
        return (
            <View style={[commonStyles.wrapper,]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[commonStyles.wrapper,]}>
                    <ScrollView style={[commonStyles.wrapper]}>
                        <View style={{ padding: 16 }}>
                            <Text>{I18n.t( Keys.Amount )} </Text>
                            <Text
                                style={{
                                    color: ColorUtil.secondary_text_color,
                                    marginTop: 10
                                }}>{this.state.entrust.trade_amount}</Text>
                        </View>


                        <View style={{ padding: 16 }}>
                            <Text>{I18n.t( Keys.Price )}</Text>
                            <Text
                                style={{
                                    color: ColorUtil.secondary_text_color,
                                    marginTop: 10
                                }}>{this.state.entrust.trade_price}</Text>
                        </View>

                        <View style={{ padding: 16 }}>
                            <Text>{I18n.t( Keys.Payment_Duration )}</Text>
                            <Text
                                style={{
                                    color: ColorUtil.secondary_text_color,
                                    marginTop: 10
                                }}>{this.state.entrust.end_time}</Text>
                        </View>

                        <View style={{ padding: 16 }}>
                            <Text>{I18n.t( Keys.trade_fee_rate )}</Text>
                            <Text
                                style={{
                                    color: ColorUtil.secondary_text_color,
                                    marginTop: 10
                                }}>{this.state.entrust.trade_fee_rate}</Text>
                        </View>


                        <View style={{ height: 1, backgroundColor: '#d1cfcf' }}/>

                        <View style={{ padding: 16 }}>

                            <Text>{I18n.t( Keys.trade_des )}</Text>
                            <Text style={{
                                color: ColorUtil.secondary_text_color,
                                marginTop: 10
                            }}>{this.state.remark}</Text>
                        </View>

                        <View style={{ height: 1, backgroundColor: '#d1cfcf' }}/>

                        <View style={{ padding: 16 }}>
                            <Text>{I18n.t( Keys.trade_rem )}</Text>
                            <Text
                                style={{
                                    color: ColorUtil.secondary_text_color,
                                    marginTop: 10
                                }}>{this.state.secret_remark}</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default OTCOrderDetailPageView;

