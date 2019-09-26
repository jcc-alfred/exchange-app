import React from 'react';
import {PixelRatio, SafeAreaView, StyleSheet, View} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import {Button, Text, Icon} from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";

class TradePageView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isRequesting: false,
        }
    }

    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;

        return {
            title: "TradePageView",
            headerBackTitle: null,
        };
    };

    componentDidMount() {
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {

        };
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (
            <View style={[commonStyles.wrapper,]}>
                <SafeAreaView style={[commonStyles.wrapper,]}>
                    {this.renderTopBar()}
                    {this.renderPriceBar()}
                    {this.renderEntrustView({'buyList': ['232232'], 'sellList': ['232232']})}


                    {this.renderPriceBar()}

                </SafeAreaView>
            </View>
        );
    }


    renderTopBar() {
        return (
            <View style={[{flexDirection: 'row'}]}>
                <View style={[{flexDirection: 'row', flex: 2}]}>
                    <Button
                        icon={{
                            name: "arrow-right",
                            size: 15,
                            color: "blue"
                        }}
                        type='clear'

                    />
                    <Text style={[commonStyles.commonInputTextStyle]}>
                        {"EOS/USDT"}
                    </Text>
                    <Text style={[styles.smallRedFont]}>
                        -3.20%
                    </Text>
                </View>
                <View style={[{flexDirection: 'row', flex: 1}]}>

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
            </View>
        )

    }


    renderPriceBar() {

        return (

            <View style={[{flexDirection: 'row'}]}>
                <View style={[commonStyles.customerRow]}>
                    <Text style={[styles.bigFontPrice]}>2.32</Text>
                    <Text style={[styles.smallGrayFont]}>=3.12 CNY</Text>
                </View>
            </View>
        )
    }

    renderEntrustView(dataDic) {
        let buyList = new Array();
        let sellList = new Array();

        if (dataDic) {
            buyList = dataDic["buyList"];
            sellList = dataDic["sellList"];

            let list = [];
            let sellLista = [];

            for (let i = 0; i < buyList.length; i++){
                let dic = buyList[i];
                list.push(this.renderInfoCell(i,dic['entrust_price'],dic['entrust_volume'],dic['no_completed_volume']))
            }

            for (let i = 0; i < sellList.length; i++){
                let dic = sellList[i];
                sellLista.push(this.renderInfoCell(i,dic['entrust_price'],dic['entrust_volume'],dic['no_completed_volume']))
            }


            for(let i = 0; i < 5 ;i++){
                list.push(this.renderInfoCell(1,'22','33','444'));
                sellLista.push(this.renderInfoCell(1,'22','33','444'));
            }

            return (
                <View style={[{flexDirection: 'row', flex: 1}]}>
                    <View style={[{ flex: 1}]}>
                        <View style={[{flexDirection: 'row', padding: 2 ,borderColor: '#cccccc', borderWidth: 0.5}]}>
                            <Text style={[{flexDirection: 'row', flex: 1}]}>买</Text>
                            <Text style={[{flexDirection: 'row', flex: 2}]}>数量</Text>
                            <Text style={[{flexDirection: 'row', flex: 1}]}>价格</Text>
                        </View>
                        {list}
                    </View>

                    <View style={[{ flex: 1}]}>
                        <View style={[{flexDirection: 'row', padding: 2,borderColor: '#cccccc', borderWidth: 0.5}]}>
                            <Text style={[{flexDirection: 'row', flex: 1}]}>卖</Text>
                            <Text style={[{flexDirection: 'row', flex: 2}]}>数量</Text>
                            <Text style={[{flexDirection: 'row', flex: 1}]}>价格</Text>
                        </View>
                        {sellLista}
                    </View>
                </View>
            )

        } else {
            return (
                <View/>

            )
        }
    }


    renderInfoCell(index, entrust_price, entrust_volume, no_completed_volume) {
        return (
            <View style={[{flexDirection: 'row',padding: 2, borderColor: '#cccccc', borderWidth: 0.5 }]}>
                <Text style={[{ flex: 1, paddingLeft:5}]}>{index}</Text>
                <Text style={[{ flex: 2, paddingLeft:5}]}>{no_completed_volume}</Text>
                <Text style={[{ flex: 1, paddingLeft:5}]}>{entrust_price}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({

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


    smallIconButton: {

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
});

export default TradePageView;

