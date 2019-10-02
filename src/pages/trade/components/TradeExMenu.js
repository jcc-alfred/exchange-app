import React from "react";
import {Platform, StyleSheet, Text, View} from "react-native";
import { connect } from "react-redux";

import { DrawerActions } from 'react-navigation-drawer';
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Button, ListItem } from "react-native-elements";
import { Header } from 'react-navigation';
import constStyles from "../../../styles/constStyles";
import { Ionicons } from "@expo/vector-icons";
import commonStyles from "../../../styles/commonStyles";
import OrderHistoryPage from "../../order/OrderHistoryPage";
import TextInput from "react-native-web/dist/exports/TextInput";
import {changeTradePageCoinExchange} from "../../../actions/ExchangeAction";

class MainSideMenu extends React.Component {

    constructor( props ) {
        super( props );
    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps( nextProps ) {

    }

    render() {
        return (
            <View style={[ { paddingTop: getStatusBarHeight() + Header.HEIGHT } ]}>
                <Text>{JSON.stringify(this.props.marketList)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

function select( store ) {
    return {
        TradePageCoinEx: store.metaStore.TradePageCoinEx,
        marketList:store.metaStore.marketList,
        coin_exchange_area:store.metaStore.coin_exchange_area,
    }
}


const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onChangeTradePageCoinExchange: (coinEx) => {
        dispatch(changeTradePageCoinExchange(coinEx));
    },
} );
export default connect( select, mapDispatchToProps )( MainSideMenu )
