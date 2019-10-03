import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Text ,Input, Button} from "react-native-elements";
import { BorderlessButton } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";

class AssetsWithdrawPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            isRequesting: false,
            coinAddress: '',
            coinCount:0


        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: "TokenWithdrawPageView",
            headerBackTitle: null,
            headerRight: (
                <View style={[ { flexDirection: 'row' } ]}>
                    <BorderlessButton
                        onPress={() => navigation.navigate( 'AssetsWithdrawHistoryPage' )}
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
                    {this.renderCoinChoose()}
                    {this.renderCoinAddressChoose()}
                    {this.renderCoinCountInput()}

                    {this.renderFeeView()}

                    {this.renderInfoView()}

                </SafeAreaView>
            </View>
        );
    }



    renderCoinChoose(){
        return (
            <View style={{backgroundColor:'#f6f6f8',margin:15, flexDirection:'row'}}>
                <Text style={{padding:7, fontSize:16, flex:1.5}}>ETH</Text>
                <Button
                    title={I18n.t( Keys.chooseCoinType)}
                    type="clear"
                    containerStyle={{flex:1}}
                    titleStyle={{fontSize:14}}
                />
            </View>
        );
    }

    renderCoinAddressChoose(){
        return (
            <View style={{ marginTop:10,marginLeft:5,marginRight:5}}>
                <Input
                    style={[ commonStyles.wrapper ]}
                    leftIconContainerStyle={[ commonStyles.pdr_normal, { paddingLeft: 0, marginLeft: 0 } ]}
                    value={this.state.coinAddress}
                    onChangeText={( text ) => this.setState( { coinAddress: text } )}
                    label={I18n.t( Keys.Coin_address)}
                    errorStyle={{ color: 'red' }}
                    errorMessage={
                        this.state.showError && ( !this.state.coinAddress || this.state.coinAddress.length <= 0 ) ?
                            "Please input coin address"
                            :
                            null
                    }
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        // this.passwordInput.focus()
                    }}
                />

            </View>

        );
    }



    renderCoinCountInput(){
            return (
                <View style={{ marginTop:10,marginLeft:5,marginRight:5}}>
                    <Input
                        style={[ commonStyles.wrapper ]}
                        leftIconContainerStyle={[ commonStyles.pdr_normal, { paddingLeft: 0, marginLeft: 0 } ]}
                        value={this.state.coinAddress}
                        onChangeText={( text ) => this.setState( { coinAddress: text } )}
                        label={I18n.t( Keys.Amount)}
                        errorStyle={{ color: 'red' }}
                        errorMessage={
                            this.state.showError && ( !this.state.coinAddress || this.state.coinAddress.length <= 0 ) ?
                                "Please input coin address"
                                :
                                null
                        }
                        returnKeyType={'next'}
                        onSubmitEditing={() => {
                            // this.passwordInput.focus()
                        }}
                    />

                </View>
            );
    }


    renderFeeView(){
        return (
            <View style={{ marginTop:10,marginLeft:5,marginRight:5}}>
                <Input
                    style={[ commonStyles.wrapper ]}
                    leftIconContainerStyle={[ commonStyles.pdr_normal, { paddingLeft: 0, marginLeft: 0 } ]}
                    value={this.state.coinAddress}
                    onChangeText={( text ) => this.setState( { coinAddress: text } )}
                    label={'processing fee'}
                    errorStyle={{ color: 'red' }}
                    errorMessage={
                        this.state.showError && ( !this.state.coinAddress || this.state.coinAddress.length <= 0 ) ?
                            "Please input coin address"
                            :
                            null
                    }
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        // this.passwordInput.focus()
                    }}
                />
            </View>
        );
    }

    renderInfoView(){
        return (
            <View style={{margin:10, backgroundColor:'#f7f6f9',height:200}}><Text>到账数量  0.0000 ETH</Text></View>
        );
    }




}

const styles = StyleSheet.create( {} );

export default AssetsWithdrawPageView;

